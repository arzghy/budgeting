import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Need } from "@/models/Need";
import { Expense } from "@/models/Expense";
import { auth } from "@/app/api/auth/options";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const body = await req.json();
  const userId = (session as any).userId;

  // kalau status diupdate jadi 'habis', auto-buat expense
  if (body.status === "habis") {
    const need = await Need.findOne({ _id: params.id, userId });
    if (need && need.status !== "habis") {
      await Expense.create({
        userId,
        title: need.name,
        amount: need.amount,
        division: need.division || "kebutuhan",
        source: "kebutuhan",
      });
    }
  }

  const updated = await Need.findOneAndUpdate(
    { _id: params.id, userId },
    body,
    { new: true }
  );
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  await Need.findOneAndDelete({ _id: params.id, userId: (session as any).userId });
  return NextResponse.json({ ok: true });
}
