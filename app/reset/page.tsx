"use client";
import { Suspense, useState } from "react";
import Link from "next/link";

function ResetContent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Silakan masukkan alamat email kamu.");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate sending password reset email
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <main className="relative flex min-h-screen w-full overflow-hidden bg-[#fffdf6] text-ink">
      <div className="grid w-full grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* ═══ LEFT SIDE: PURE LUXURY PASTEL GRADIENT CANVAS ═══ */}
        <div className="relative hidden lg:block lg:col-span-6 xl:col-span-7 overflow-hidden bg-gradient-to-br from-[#f6dbe2] via-[#f6ffd3] to-[#c2d772]">
          {/* Ambient Floating Glow Blobs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-[550px] w-[550px] rounded-full bg-[#f6c5c1]/55 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-[550px] w-[550px] rounded-full bg-[#c2d772]/55 blur-[120px]" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-white/60 blur-[100px]" />
          {/* Subtle Right Border Divider */}
          <div className="absolute right-0 inset-y-0 w-px bg-ink/10" />
        </div>

        {/* ═══ RIGHT SIDE: ELEGANT RESET FORM ═══ */}
        <div className="relative col-span-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 bg-[#fffdf6]">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs font-bold text-ink/75 shadow-sm transition hover:bg-white hover:text-ink"
            >
              <span>←</span>
              <span>Kembali ke Login</span>
            </Link>

            <div className="lg:hidden flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-sage font-display text-sm font-bold text-ink">
                W
              </span>
              <span className="font-display text-sm font-bold text-ink">WHALE BUDGET</span>
            </div>
          </div>

          {/* Main Form Center */}
          <div className="mx-auto w-full max-w-md my-auto py-8">
            <div className="text-center sm:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3.5 py-1 text-[10px] font-bold tracking-[0.2em] text-ink/75 uppercase shadow-sm">
                <span className="h-2 w-2 rounded-full bg-sage-deep" />
                Pemulihan Sandi
              </span>

              <h1 className="font-display mt-3.5 text-3xl sm:text-4xl font-bold text-[#242f1b] leading-tight">
                Atur ulang sandi.
              </h1>
              <p className="mt-2 text-sm text-ink/70">
                Masukkan email yang terdaftar untuk menerima instruksi pemulihan kata sandi.
              </p>
            </div>

            {/* Error Notification Banner */}
            {error && (
              <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-coral bg-[#fdf2f1] p-3.5 text-xs font-bold text-[#c44f45] animate-shake">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {submitted ? (
              <div className="mt-6 rounded-3xl border-2 border-sage/40 bg-sage/15 p-6 text-center">
                <span className="text-3xl">📬</span>
                <h3 className="font-display mt-3 text-lg font-bold text-[#242f1b]">
                  Tautan Pemulihan Terkirim!
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/80">
                  Kami telah mengirimkan instruksi ke <span className="font-bold text-ink">{email}</span>. Silakan periksa kotak masuk atau spam email Anda.
                </p>
                <div className="mt-5">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-full border-2 border-ink bg-sage px-6 py-2.5 text-xs font-bold text-ink shadow-[0_3px_0_rgba(74,84,64,0.15)] transition hover:-translate-y-0.5"
                  >
                    Kembali ke Halaman Masuk
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReset} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1.5">
                    Email Akun
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      required
                      className="w-full rounded-2xl border-2 border-ink/15 bg-white/90 px-4 py-3.5 pl-11 text-sm font-medium text-ink transition focus:border-sage focus:bg-white focus:outline-none focus:ring-4 focus:ring-sage/20"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-ink/40">
                      ✉️
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-ink bg-gradient-to-br from-sage via-[#cee57a] to-[#b8d462] px-6 py-3.5 font-display text-base font-bold text-ink shadow-[0_5px_0_rgba(74,84,64,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_0_rgba(74,84,64,0.18)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(74,84,64,0.18)] disabled:opacity-60"
                >
                  <span>{loading ? "Mengirim Tautan..." : "Kirim Tautan Reset"}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              </form>
            )}

            {/* Sudah Ingat Kata Sandi Switch */}
            <div className="mt-8 text-center text-xs font-semibold text-ink/75">
              Ingat kata sandi kamu?{" "}
              <Link href="/login" className="font-bold text-sage-deep hover:underline">
                Masuk kembali
              </Link>
            </div>
          </div>

          {/* Bottom Security Assurance */}
          <div className="border-t border-ink/10 pt-4 text-center text-xs font-semibold text-ink/60">
            Data kamu terlindungi secara privat di cloud · Whale Sanctuary 2026
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Reset() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#fffdf6]">
          <div className="font-display text-lg font-bold text-ink animate-pulse">
            Memuat Sanctuary...
          </div>
        </main>
      }
    >
      <ResetContent />
    </Suspense>
  );
}

