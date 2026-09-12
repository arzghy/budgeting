import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Wishlist } from "@/models/Wishlist";
import { Expense } from "@/models/Expense";
import { auth } from "@/app/api/auth/options";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  const body = await req.json();
  const userId = (session as any).userId;

  // kalau di-purchase, auto-buat expense
  if (body.purchased === true) {
    const w = await Wishlist.findOne({ _id: params.id, userId });
    if (w && !w.purchased) {
      await Expense.create({
        userId,
        title: w.name,
        amount: w.target,
        division: "wishlist",
        source: "wishlist",
      });
    }
  }

  const updated = await Wishlist.findOneAndUpdate(
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
  await Wishlist.findOneAndDelete({ _id: params.id, userId: (session as any).userId });
  return NextResponse.json({ ok: true });
}
