"use client";
import { SessionProvider } from "next-auth/react";
import LenisProvider from "./lenis";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LenisProvider>{children}</LenisProvider>
    </SessionProvider>
  );
}
