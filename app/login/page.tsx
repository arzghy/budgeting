"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

function LoginContent() {
  const { status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError("Silakan isi email/username dan kata sandi.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier: identifier.trim(),
        password: password,
        callbackUrl,
      });

      if (res?.error) {
        setError("Gagal masuk. Periksa kembali email/username dan kata sandi kamu.");
        setLoading(false);
      } else {
        router.push(callbackUrl);
      }
    } catch {
      setError("Terjadi kesalahan saat masuk. Coba lagi.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl });
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

        {/* ═══ RIGHT SIDE: ELEGANT LOGIN FORM ═══ */}
        <div className="relative col-span-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 bg-[#fffdf6]">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs font-bold text-ink/75 shadow-sm transition hover:bg-white hover:text-ink"
            >
              <span>←</span>
              <span>Kembali ke Beranda</span>
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
                Masuk Akun
              </span>

              <h1 className="font-display mt-3.5 text-3xl sm:text-4xl font-bold text-[#242f1b] leading-tight">
                Selamat datang kembali.
              </h1>
              <p className="mt-2 text-sm text-ink/70">
                Masukkan email/username dan kata sandi kamu untuk membuka sanctuary budgeting.
              </p>
            </div>

            {/* Error Notification Banner */}
            {error && (
              <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-coral bg-[#fdf2f1] p-3.5 text-xs font-bold text-[#c44f45] animate-shake">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Credential Form */}
            <form onSubmit={handleCredentialsLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1.5">
                  Email atau Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="nama@email.com atau username"
                    required
                    className="w-full rounded-2xl border-2 border-ink/15 bg-white/90 px-4 py-3.5 pl-11 text-sm font-medium text-ink transition focus:border-sage focus:bg-white focus:outline-none focus:ring-4 focus:ring-sage/20"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-ink/40">
                    ✉️
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/75">
                    Kata Sandi
                  </label>
                  <Link
                    href="/reset"
                    className="text-[11px] font-bold text-sage-deep hover:underline"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-2xl border-2 border-ink/15 bg-white/90 px-4 py-3.5 pl-11 pr-11 text-sm font-medium text-ink transition focus:border-sage focus:bg-white focus:outline-none focus:ring-4 focus:ring-sage/20"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-ink/40">
                    🔒
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink/50 hover:text-ink"
                    title={showPassword ? "Sembunyikan" : "Tampilkan"}
                  >
                    {showPassword ? "👁️‍🗨️" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  defaultChecked
                  className="h-4 w-4 rounded border-ink/20 text-sage focus:ring-sage"
                />
                <label htmlFor="remember" className="text-xs font-semibold text-ink/70 select-none cursor-pointer">
                  Ingat sesi saya di perangkat ini
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-ink bg-gradient-to-br from-sage via-[#cee57a] to-[#b8d462] px-6 py-3.5 font-display text-base font-bold text-ink shadow-[0_5px_0_rgba(74,84,64,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_0_rgba(74,84,64,0.18)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(74,84,64,0.18)] disabled:opacity-60"
              >
                <span>{loading ? "Memproses..." : "Masuk Sekarang"}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-ink/10" />
              </div>
              <span className="relative bg-[#fffdf6] px-4 text-xs font-bold uppercase tracking-wider text-ink/50">
                atau masuk dengan
              </span>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-ink/15 bg-white px-6 py-3.5 text-sm font-bold text-ink shadow-sm transition hover:border-ink/40 hover:bg-[#fafaf8] active:translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c3 0 5.7 1.1 7.7 3l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.7 0 19.5-7.8 19.5-19.5 0-1.2-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12.5 24 12.5c3 0 5.7 1.1 7.7 3l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 16.3 4.5 9.6 8.7 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.9 13-5.1l-6-5c-2 1.4-4.4 2.1-7 2.1-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.4 38.5 16.2 43.5 24 43.5z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6 5c-.4.4 6.3-4.6 6.3-14.7 0-1.2-.1-2.4-.4-3.5z" />
              </svg>
              <span>Lanjutkan dengan Google</span>
            </button>

            {/* Belum Punya Akun Switch */}
            <div className="mt-6 text-center text-xs font-semibold text-ink/75">
              Belum punya akun?{" "}
              <Link href="/register" className="font-bold text-sage-deep hover:underline">
                Daftar sekarang
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

export default function Login() {
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
      <LoginContent />
    </Suspense>
  );
}
