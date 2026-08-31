import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Saving } from "@/models/Saving";
import { auth } from "@/app/api/auth/options";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const filter: any = { userId: (session as any).userId };
  if (searchParams.get("type")) filter.type = searchParams.get("type");
  const list = await Saving.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const body = await req.json();
  const s = await Saving.create({ ...body, userId: (session as any).userId });
  return NextResponse.json(s);
}
