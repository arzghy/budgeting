import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { UserProfile } from "@/models/UserProfile";
import { auth } from "@/app/api/auth/options";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  await dbConnect();
  const userId = (session as any).userId;
  let profile = await UserProfile.findOne({ userId });

  if (!profile) {
    profile = await UserProfile.create({
      userId,
      displayName: session.user?.name || "Teman Paus",
      motto: "Menuju financial freedom bareng Paus 🐋",
      avatarIcon: "whale-classic",
      imageUrl: "",
      monthlyBudget: 0,
    });
  }

  return NextResponse.json(profile);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  await dbConnect();
  const userId = (session as any).userId;
  const body = await req.json();

  const updateData: any = {};
  if (body.displayName !== undefined) updateData.displayName = body.displayName;
  if (body.motto !== undefined) updateData.motto = body.motto;
  if (body.avatarIcon !== undefined) updateData.avatarIcon = body.avatarIcon;
  if (body.monthlyBudget !== undefined) updateData.monthlyBudget = Number(body.monthlyBudget);

  const profile = await UserProfile.findOneAndUpdate(
    { userId },
    { $set: updateData },
    { new: true, upsert: true }
  );

  return NextResponse.json(profile);
}
