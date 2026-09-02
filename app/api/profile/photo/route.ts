import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { UserProfile } from "@/models/UserProfile";
import { auth } from "@/app/api/auth/options";
import cloudinary from "@/lib/cloudinary";

export async function DELETE() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    await dbConnect();
    const userId = (session as any).userId;
    const profile = await UserProfile.findOne({ userId });

    if (profile?.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(profile.cloudinaryPublicId);
      } catch (err) {
        console.warn("Cloudinary destroy error:", err);
      }
    }

    const updated = await UserProfile.findOneAndUpdate(
      { userId },
      {
        imageUrl: "",
        cloudinaryPublicId: "",
      },
      { new: true }
    );

    return NextResponse.json({ success: true, profile: updated });
  } catch (error: any) {
    console.error("Delete photo error:", error);
    return NextResponse.json({ error: "Gagal menghapus foto profil" }, { status: 500 });
  }
}

