import { randomInt } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { hashResetCode, hashPassword, isValidEmail, isValidPassword } from "@/lib/password";
import { Account } from "@/models/Account";

const CODE_TTL_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const REQUEST_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_ATTEMPTS = 5;

async function sendResetEmail(email: string, code: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) throw new Error("Resend is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Kode reset kata sandi MiBudge",
      html: `<div style="font-family:system-ui,sans-serif;max-width:520px;margin:auto;color:#203022"><div style="background:#f6dbe2;padding:32px"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#647534">MiBudge · Pemulihan akun</p><h1 style="font-size:28px;margin:20px 0 8px">Kode reset kata sandi</h1><p>Gunakan kode ini untuk melanjutkan pemulihan akunmu.</p><div style="background:#f6ffd3;padding:18px;text-align:center;margin:24px 0"><strong style="font-size:32px;letter-spacing:9px">${code}</strong></div><p>Kode berlaku selama 10 menit. Jika kamu tidak meminta reset, abaikan email ini.</p></div></div>`,
    }),
  });

  if (!response.ok) throw new Error("Email delivery failed");
}

function invalidCode() {
  return NextResponse.json({ error: "Kode tidak valid atau sudah kedaluwarsa." }, { status: 400 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = String(body.action || "");
    const email = String(body.email || "").trim().toLowerCase();
    if (!isValidEmail(email)) return NextResponse.json({ error: "Alamat email tidak valid." }, { status: 400 });

    await dbConnect();
    const account = await Account.findOne({ email });

    if (action === "request") {
      if (account) {
        const now = Date.now();
        const windowStart = account.resetRequestWindowStartedAt?.getTime() || 0;
        const inWindow = now - windowStart < REQUEST_WINDOW_MS;
        const requestCount = inWindow ? account.resetRequestCount : 0;
        if (account.resetCodeRequestedAt && now - account.resetCodeRequestedAt.getTime() < RESEND_COOLDOWN_MS) {
          return NextResponse.json({ error: "Tunggu 60 detik sebelum meminta kode baru." }, { status: 429 });
        }
        if (requestCount >= MAX_REQUESTS) {
          return NextResponse.json({ error: "Terlalu banyak permintaan. Coba lagi dalam 15 menit." }, { status: 429 });
        }

        const code = String(randomInt(10000, 100000));
        account.resetCodeHash = hashResetCode(code);
        account.resetCodeExpiresAt = new Date(now + CODE_TTL_MS);
        account.resetCodeAttempts = 0;
        account.resetRequestCount = requestCount + 1;
        account.resetRequestWindowStartedAt = inWindow ? account.resetRequestWindowStartedAt : new Date(now);
        account.resetCodeRequestedAt = new Date(now);
        await account.save();
        await sendResetEmail(email, code);
      }
      return NextResponse.json({ ok: true });
    }

    if (!account || !account.resetCodeHash || !account.resetCodeExpiresAt || account.resetCodeAttempts >= MAX_ATTEMPTS) return invalidCode();

    if (action === "verify" || action === "reset") {
      const code = String(body.code || "");
      const valid = /^\d{5}$/.test(code) && account.resetCodeExpiresAt.getTime() > Date.now() && hashResetCode(code) === account.resetCodeHash;
      if (!valid) {
        account.resetCodeAttempts += 1;
        if (account.resetCodeAttempts >= MAX_ATTEMPTS) account.resetCodeHash = "";
        await account.save();
        return invalidCode();
      }

      if (action === "verify") return NextResponse.json({ ok: true });

      const password = String(body.password || "");
      if (!isValidPassword(password)) return NextResponse.json({ error: "Kata sandi minimal 8 karakter, berisi huruf dan angka." }, { status: 400 });
      account.passwordHash = hashPassword(password);
      account.sessionVersion += 1;
      account.resetCodeHash = "";
      account.resetCodeExpiresAt = null;
      account.resetCodeAttempts = 0;
      account.resetCodeRequestedAt = null;
      await account.save();
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Aksi tidak valid." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Permintaan reset gagal. Coba lagi." }, { status: 500 });
  }
}
