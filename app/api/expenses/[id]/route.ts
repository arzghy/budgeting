import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Expense } from "@/models/Expense";
import { auth } from "@/app/api/auth/options";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const body = await req.json();
  const e = await Expense.findOneAndUpdate(
    { _id: params.id, userId: (session as any).userId },
    body,
    { new: true }
  );
  return NextResponse.json(e);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  await Expense.findOneAndDelete({ _id: params.id, userId: (session as any).userId });
  return NextResponse.json({ ok: true });
}
