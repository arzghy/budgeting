"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Whale } from "./Whale";

const links = [
  { href: "/dashboard", label: "Beranda" },
  { href: "/dashboard/skincare", label: "Skincare" },
  { href: "/dashboard/makeup", label: "Make Up" },
  { href: "/dashboard/expenses", label: "Pengeluaran" },
  { href: "/dashboard/needs", label: "Kebutuhan" },
  { href: "/dashboard/wishlist", label: "Wishlist" },
  { href: "/dashboard/save", label: "Nabung" },
];

export default function Navbar() {
  const path = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border-2 border-ink bg-paper px-4 py-2 shadow-sticker backdrop-blur-sm">
        <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-2.5">
          <Whale size={36} />
          <span className="font-display text-base font-bold text-ink">whale budget</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {session &&
            links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${
                  path === l.href
                    ? "bg-pistachio text-ink border-2 border-ink"
                    : "text-ink/70 hover:bg-cream hover:text-ink border-2 border-transparent"
                }`}
              >
                {l.label}
              </Link>
            ))}
        </nav>
        <div className="flex items-center gap-2">
          {session ? (
            <button onClick={() => signOut({ callbackUrl: "/" })} className="btn btn-blush text-sm">
              keluar
            </button>
          ) : (
            <button onClick={() => signIn("google")} className="btn btn-primary text-sm">
              masuk
            </button>
          )}
        </div>
      </div>
      {session && (
        <nav className="mx-auto mt-2 flex max-w-6xl flex-wrap gap-1.5 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-1 text-xs font-bold border-2 border-ink ${
                path === l.href ? "bg-pistachio text-ink" : "bg-paper text-ink/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
