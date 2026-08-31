import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import { auth } from "@/app/api/auth/options";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const filter: any = { userId: (session as any).userId };
  if (searchParams.get("division")) filter.division = searchParams.get("division");
  const list = await Expense.find(filter).sort({ date: -1 });
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const body = await req.json();
  const e = await Expense.create({ ...body, userId: (session as any).userId });
  return NextResponse.json(e);
}
