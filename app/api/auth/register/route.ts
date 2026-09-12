import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { hashPassword, isValidEmail, isValidPassword } from "@/lib/password";
import { Account } from "@/models/Account";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (name.length < 2 || name.length > 80 || !isValidEmail(email)) {
      return NextResponse.json({ error: "Nama atau email tidak valid." }, { status: 400 });
    }
    if (!isValidPassword(password)) {
      return NextResponse.json({ error: "Kata sandi minimal 8 karakter, berisi huruf dan angka." }, { status: 400 });
    }

    await dbConnect();
    const existing = await Account.findOne({ email });
    if (existing) return NextResponse.json({ error: "Email sudah terdaftar." }, { status: 409 });

    await Account.create({ email, name, passwordHash: hashPassword(password) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Pendaftaran gagal. Coba lagi." }, { status: 500 });
  }
}
