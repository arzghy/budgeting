import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Saving } from "@/models/Saving";
import { auth } from "@/app/api/auth/options";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await dbConnect();
  await Saving.findOneAndDelete({ _id: params.id, userId: (session as any).userId });
  return NextResponse.json({ ok: true });
}
