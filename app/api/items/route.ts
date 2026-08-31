import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Item } from "@/models/Item";
import { auth } from "@/app/api/auth/options";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const filter: any = { userId: (session as any).userId };
  if (category) filter.category = category;
  const items = await Item.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const body = await req.json();
  const item = await Item.create({ ...body, userId: (session as any).userId });
  return NextResponse.json(item);
}
