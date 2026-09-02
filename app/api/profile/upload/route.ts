import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { UserProfile } from "@/models/UserProfile";
import { auth } from "@/app/api/auth/options";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    await dbConnect();
    const userId = (session as any).userId;
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File gambar tidak ditemukan" }, { status: 400 });
    }

    // Convert file to base64 buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Get current profile to remove old Cloudinary image if exists
    const current = await UserProfile.findOne({ userId });
    if (current?.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(current.cloudinaryPublicId);
      } catch (err) {
        console.warn("Cloudinary delete old photo error:", err);
      }
    }

    // Upload new image to Cloudinary (folder: whale_profiles)
    const uploadRes = await cloudinary.uploader.upload(base64Image, {
      folder: "whale_profiles",
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto", fetch_format: "auto" },
      ],
    });

    // Update MongoDB with the new Cloudinary URL (MongoDB only stores lightweight string URL)
    const updated = await UserProfile.findOneAndUpdate(
      { userId },
      {
        imageUrl: uploadRes.secure_url,
        cloudinaryPublicId: uploadRes.public_id,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      imageUrl: updated.imageUrl,
      profile: updated,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    if (error?.http_code === 401 || error?.message?.includes("API key")) {
      return NextResponse.json(
        {
          error:
            "Kunci API Cloudinary belum terpasang atau tidak valid. Silakan ikuti panduan setup Cloudinary di .env.",
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Gagal mengunggah foto ke Cloudinary" },
      { status: 500 }
    );
  }
}
