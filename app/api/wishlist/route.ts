import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Wishlist } from "@/models/Wishlist";
import { auth } from "@/app/api/auth/options";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const list = await Wishlist.find({ userId: (session as any).userId }).sort({ createdAt: -1 });
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const body = await req.json();
  const w = await Wishlist.create({ ...body, userId: (session as any).userId });
  return NextResponse.json(w);
}
