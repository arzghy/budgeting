"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { Whale } from "@/components/Whale";

function LoginContent() {
  const { status } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (status === "authenticated") router.push(params.get("callbackUrl") || "/dashboard");
  }, [status, router, params]);

  return (
    <main className="bg-pastel-mesh flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <div className="animate-bob">
            <Whale size={130} />
          </div>
        </div>
        <div className="card bg-paper p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-ink">halo, sayang.</h1>
          <p className="mt-2 text-sm font-semibold text-ink/60">
            masuk dulu biar bisa mulai budgeting bareng paus
          </p>
          <button
            onClick={() => signIn("google", { callbackUrl: params.get("callbackUrl") || "/dashboard" })}
            className="btn btn-primary mt-6 w-full"
          >
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c3 0 5.7 1.1 7.7 3l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.7 0 19.5-7.8 19.5-19.5 0-1.2-.1-2.4-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12.5 24 12.5c3 0 5.7 1.1 7.7 3l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 16.3 4.5 9.6 8.7 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.9 13-5.1l-6-5c-2 1.4-4.4 2.1-7 2.1-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.4 38.5 16.2 43.5 24 43.5z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6 5c-.4.4 6.3-4.6 6.3-14.7 0-1.2-.1-2.4-.4-3.5z" />
            </svg>
            masuk dengan google
          </button>
          <p className="mt-5 text-xs font-semibold text-ink/40">data kamu aman, ga akan dibagi</p>
        </div>
      </div>
    </main>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <main className="bg-pastel-mesh flex min-h-screen items-center justify-center">
        <Whale size={120} />
      </main>
    }>
      <LoginContent />
    </Suspense>
  );
}
