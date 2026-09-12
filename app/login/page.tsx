"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
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
    <main className="relative flex h-dvh w-full overflow-hidden bg-[#fffdf6] text-[#203022]">
      <div className="grid h-dvh min-h-0 w-full grid-cols-1 lg:grid-cols-12">
        <div className="relative hidden h-dvh min-h-0 overflow-hidden bg-[#f6dbe2] lg:col-span-6 lg:block xl:col-span-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(246,197,193,0.8),transparent_26%),radial-gradient(circle_at_78%_82%,rgba(194,215,114,0.72),transparent_32%)]" />
          <div className="absolute inset-y-0 right-0 w-px bg-[#203022]/15" />
          <div className="absolute bottom-14 left-14 max-w-sm text-[#203022]">
            <p className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.05em]">Uang harian,<br />terlihat jelas.</p>
            <p className="mt-6 max-w-xs text-sm leading-6 text-[#203022]/65">Catat yang penting. Pahami ruang gerakmu. Lanjutkan dengan tenang.</p>
          </div>
        </div>

        <div data-lenis-prevent="true" className="relative col-span-1 flex h-dvh min-h-0 flex-col justify-between overflow-y-auto overscroll-contain bg-[#fffdf6] p-6 sm:p-10 md:p-12 lg:col-span-6 lg:p-14 xl:col-span-5 xl:p-16">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 border-b border-[#203022]/25 pb-1 text-xs font-semibold text-[#203022]/75 transition hover:border-[#203022] hover:text-[#203022]">
              <FontAwesomeIcon icon={faArrowLeft} className="text-[10px]" />
              <span>Kembali ke Beranda</span>
            </Link>
            <div className="flex items-center gap-2 lg:hidden">
              <span className="grid h-8 w-8 place-items-center bg-[#c2d772] font-display text-sm font-semibold text-[#203022]">M</span>
              <span className="font-display text-sm font-semibold text-[#203022]">MiBudge</span>
            </div>
          </div>

          <div className="mx-auto my-auto w-full max-w-md py-8">
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#647534]">Akun MiBudge</p>
              <h1 className="font-display mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#203022] sm:text-5xl">Selamat datang kembali.</h1>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#203022]/65">Masuk untuk melihat catatan, kebutuhan, dan ruang anggaranmu.</p>
            </div>

            {error && (
              <div className="mt-6 flex items-center gap-3 border border-[#c44f45]/35 bg-[#f9e9e5] p-3.5 text-xs font-semibold text-[#9d3d36] animate-shake">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCredentialsLogin} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#203022]/75">Email atau username</label>
                <div className="relative">
                  <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="nama@email.com atau username" required className="w-full border border-[#203022]/20 bg-[#fffdf8] px-4 py-3.5 pl-11 text-sm font-medium text-[#203022] placeholder:text-[#203022]/35 focus:border-[#647534] focus:outline-none focus:ring-4 focus:ring-[#c2d772]/35" />
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#203022]/35" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#203022]/75">Kata sandi</label>
                  <Link href="/reset" className="text-[11px] font-semibold text-[#647534] underline-offset-4 hover:underline">Lupa kata sandi?</Link>
                </div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="password-input w-full border border-[#203022]/20 bg-[#fffdf8] px-4 py-3.5 pl-11 pr-11 text-sm font-medium text-[#203022] placeholder:text-[#203022]/35 focus:border-[#647534] focus:outline-none focus:ring-4 focus:ring-[#c2d772]/35" />
                  <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#203022]/35" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#203022]/45 hover:text-[#203022]" title={showPassword ? "Sembunyikan" : "Tampilkan"} aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="remember" defaultChecked className="h-4 w-4 rounded border-[#203022]/25 text-[#647534] focus:ring-[#c2d772]" />
                <label htmlFor="remember" className="cursor-pointer select-none text-xs font-medium text-[#203022]/65">Ingat sesi saya di perangkat ini</label>
              </div>

              <button type="submit" disabled={loading} className="group flex w-full items-center justify-center gap-3 bg-[#c2d772] px-6 py-3.5 font-display text-sm font-semibold text-[#203022] transition hover:bg-[#a8b85a] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60">
                <span>{loading ? "Memproses..." : "Masuk sekarang"}</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>

            <div className="relative my-7 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#203022]/15" /></div>
              <span className="relative bg-[#fffdf6] px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#203022]/45">atau masuk dengan</span>
            </div>

            <button type="button" onClick={handleGoogleLogin} className="flex w-full items-center justify-center gap-3 border border-[#203022]/20 bg-[#fffdf8] px-6 py-3.5 text-sm font-semibold text-[#203022] transition hover:border-[#203022]/50 hover:bg-white active:translate-y-px">
              <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c3 0 5.7 1.1 7.7 3l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.7 0 19.5-7.8 19.5-19.5 0-1.2-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12.5 24 12.5c3 0 5.7 1.1 7.7 3l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 16.3 4.5 9.6 8.7 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.9 13-5.1l-6-5c-2 1.4-4.4 2.1-7 2.1-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.4 38.5 16.2 43.5 24 43.5z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6 5c-.4.4 6.3-4.6 6.3-14.7 0-1.2-.1-2.4-.4-3.5z" />
              </svg>
              <span>Lanjutkan dengan Google</span>
            </button>

            <div className="mt-7 text-center text-xs font-medium text-[#203022]/65">Belum punya akun? <Link href="/register" className="font-semibold text-[#647534] underline-offset-4 hover:underline">Daftar sekarang</Link></div>
          </div>

          <div className="border-t border-[#203022]/15 pt-4 text-center text-[11px] font-medium text-[#203022]/45">Data kamu terlindungi secara privat di cloud · MiBudge 2026</div>
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
          <div className="font-display text-lg font-semibold text-[#203022] animate-pulse">
            Memuat MiBudge...
          </div>
        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
