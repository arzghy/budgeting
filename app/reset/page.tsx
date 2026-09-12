"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function ResetContent() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (action: string, body: Record<string, string>) => {
    const response = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...body }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Permintaan reset gagal.");
    return data;
  };

  const handleEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      setError("Silakan masukkan alamat email kamu.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await request("request", { email: email.trim() });
      setStep("code");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kode gagal dikirim. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleCode = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\d{5}$/.test(code)) {
      setError("Masukkan kode 5 digit dari email kamu.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await request("verify", { email: email.trim(), code });
      setStep("password");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kode tidak valid.");
    } finally {
      setLoading(false);
    }
  };

  const handlePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError("Kata sandi minimal 8 karakter, berisi huruf dan angka.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await request("reset", { email: email.trim(), code, password });
      router.push("/login");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kata sandi gagal diubah.");
      setLoading(false);
    }
  };

  return (
    <main className="relative flex h-dvh w-full overflow-hidden bg-[#fffdf6] text-[#203022]">
      <div className="grid h-dvh min-h-0 w-full grid-cols-1 lg:grid-cols-12">
        <div className="relative hidden h-dvh min-h-0 overflow-hidden bg-[#f6dbe2] lg:col-span-6 lg:block xl:col-span-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(246,197,193,0.8),transparent_26%),radial-gradient(circle_at_78%_82%,rgba(194,215,114,0.72),transparent_32%)]" />
          <div className="absolute inset-y-0 right-0 w-px bg-[#203022]/15" />
          <div className="absolute bottom-14 left-14 max-w-sm text-[#203022]">
            <p className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.05em]">Kembali dengan tenang.</p>
            <p className="mt-6 max-w-xs text-sm leading-6 text-[#203022]/65">Pulihkan akses akunmu dan lanjutkan mencatat hal yang penting.</p>
          </div>
        </div>

        <div data-lenis-prevent="true" className="relative col-span-1 flex h-dvh min-h-0 flex-col justify-between overflow-y-auto overscroll-contain bg-[#fffdf6] p-6 sm:p-10 md:p-12 lg:col-span-6 lg:p-14 xl:col-span-5 xl:p-16">
          <div className="flex items-center justify-between">
            <Link href="/login" className="inline-flex items-center gap-2 border-b border-[#203022]/25 pb-1 text-xs font-semibold text-[#203022]/75 transition hover:border-[#203022] hover:text-[#203022]">
              <FontAwesomeIcon icon={faArrowLeft} className="text-[10px]" />
              <span>Kembali ke Login</span>
            </Link>
            <div className="flex items-center gap-2 lg:hidden">
              <span className="grid h-8 w-8 place-items-center bg-[#c2d772] font-display text-sm font-semibold text-[#203022]">M</span>
              <span className="font-display text-sm font-semibold text-[#203022]">MiBudge</span>
            </div>
          </div>

          <div className="mx-auto my-auto w-full max-w-md py-8">
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#647534]">Pemulihan akun</p>
              <h1 className="font-display mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#203022] sm:text-5xl">Atur ulang sandi.</h1>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#203022]/65">
                {step === "email" && "Masukkan email terdaftar untuk menerima kode pemulihan."}
                {step === "code" && `Kode 5 digit telah dikirim ke ${email}.`}
                {step === "password" && "Buat kata sandi baru untuk mengamankan akunmu."}
              </p>
            </div>

            {error && (
              <div className="mt-6 flex items-center gap-3 border border-[#c44f45]/35 bg-[#f9e9e5] p-3.5 text-xs font-semibold text-[#9d3d36] animate-shake">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                <span>{error}</span>
              </div>
            )}

            {step === "email" && (
              <form onSubmit={handleEmail} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#203022]/75">Email akun</label>
                  <div className="relative">
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" required className="w-full border border-[#203022]/20 bg-[#fffdf8] px-4 py-3.5 pl-11 text-sm font-medium text-[#203022] placeholder:text-[#203022]/35 focus:border-[#647534] focus:outline-none focus:ring-4 focus:ring-[#c2d772]/35" />
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#203022]/35" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="group flex w-full items-center justify-center gap-3 bg-[#c2d772] px-6 py-3.5 font-display text-sm font-semibold text-[#203022] transition hover:bg-[#a8b85a] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60">
                  <span>{loading ? "Mengirim kode..." : "Kirim kode reset"}</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>
            )}

            {step === "code" && (
              <form onSubmit={handleCode} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#203022]/75">Kode verifikasi</label>
                  <input inputMode="numeric" autoComplete="one-time-code" maxLength={5} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} placeholder="12345" required className="w-full border border-[#203022]/20 bg-[#fffdf8] px-4 py-3.5 text-center font-mono text-xl font-semibold tracking-[0.5em] text-[#203022] placeholder:text-[#203022]/25 focus:border-[#647534] focus:outline-none focus:ring-4 focus:ring-[#c2d772]/35" />
                </div>
                <button type="submit" disabled={loading} className="group flex w-full items-center justify-center gap-3 bg-[#c2d772] px-6 py-3.5 font-display text-sm font-semibold text-[#203022] transition hover:bg-[#a8b85a] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60">
                  <span>{loading ? "Memeriksa kode..." : "Verifikasi kode"}</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <button type="button" onClick={() => { setStep("email"); setError(null); }} className="w-full text-xs font-semibold text-[#647534] underline-offset-4 hover:underline">Kirim ulang ke email lain</button>
              </form>
            )}

            {step === "password" && (
              <form onSubmit={handlePassword} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#203022]/75">Kata sandi baru</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Min. 8 karakter, huruf dan angka" required className="password-input w-full border border-[#203022]/20 bg-[#fffdf8] px-4 py-3.5 pl-11 pr-11 text-sm font-medium text-[#203022] placeholder:text-[#203022]/35 focus:border-[#647534] focus:outline-none focus:ring-4 focus:ring-[#c2d772]/35" />
                    <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#203022]/35" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#203022]/45 hover:text-[#203022]" title={showPassword ? "Sembunyikan" : "Tampilkan"} aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></button>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#203022]/75">Konfirmasi kata sandi</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Ulangi kata sandi" required className="password-input w-full border border-[#203022]/20 bg-[#fffdf8] px-4 py-3.5 pl-11 pr-11 text-sm font-medium text-[#203022] placeholder:text-[#203022]/35 focus:border-[#647534] focus:outline-none focus:ring-4 focus:ring-[#c2d772]/35" />
                    <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#203022]/35" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#203022]/45 hover:text-[#203022]" title={showConfirmPassword ? "Sembunyikan" : "Tampilkan"} aria-label={showConfirmPassword ? "Sembunyikan konfirmasi kata sandi" : "Tampilkan konfirmasi kata sandi"}><FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} /></button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="group flex w-full items-center justify-center gap-3 bg-[#c2d772] px-6 py-3.5 font-display text-sm font-semibold text-[#203022] transition hover:bg-[#a8b85a] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60">
                  <span>{loading ? "Menyimpan..." : "Simpan kata sandi"}</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>
            )}

            <div className="mt-7 text-center text-xs font-medium text-[#203022]/65">Ingat kata sandi kamu? <Link href="/login" className="font-semibold text-[#647534] underline-offset-4 hover:underline">Masuk kembali</Link></div>
          </div>

          <div className="border-t border-[#203022]/15 pt-4 text-center text-[11px] font-medium text-[#203022]/45">Data kamu terlindungi secara privat di cloud · MiBudge 2026</div>
        </div>
      </div>
    </main>
  );
}

export default function Reset() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-[#fffdf6]"><div className="font-display text-lg font-semibold text-[#203022] animate-pulse">Memuat MiBudge...</div></main>}>
      <ResetContent />
    </Suspense>
  );
}
