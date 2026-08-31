"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const WhaleScene = dynamic(() => import("@/components/WhaleScene"), { ssr: false });

function useReveals() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>("[data-rv]");
    els.forEach((el, i) => {
      el.style.setProperty("--rv-delay", `${i * 85}ms`);
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            io.unobserve(t);
            const d = Number(t.style.getPropertyValue("--rv-delay")) || 0;
            setTimeout(() => t.classList.add("rv-in"), d);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.04 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const chapters = [
  { num: "01", b: "Gerbang", p: "Temukan pintu masuk yang menuju jalan yang lebih dalam." },
  { num: "02", b: "Taman Sunyi", p: "Saksikan halaman tempat keheningan terbuka pelan-pelan." },
  { num: "03", b: "Kerajinan", p: "Rangkul tangan dan warisan yang membentuk sebuah karya." },
  { num: "04", b: "Ritual Malam", p: "Jelajahi kebiasaan yang bangun saat hari berganti." },
];

const stats = [
  { b: "06", span: "Fitur utama" },
  { b: "02", span: "Section besar" },
  { b: "∞", span: "Rencana" },
  { b: "01", span: "Paus pelindung" },
];

const cards = [
  { title: "Skincare & Make Up", jp: "Kecantikan", meta: "Catat semua produk", n: "01 / 03" },
  { title: "Nabung", jp: "Celengan", meta: "Wishlist & jaga-jaga", n: "02 / 03" },
  { title: "Pengeluaran", jp: "Uang keluar", meta: "Semua tercatat", n: "03 / 03" },
];

const lessons = [
  { k: "01", t: "Catat Pengeluaran", jp: "Uang", d: "Setiap rupiah tercatat. Tidak ada yang bikin bingung lagi.", m: "1 menit" },
  { k: "02", t: "Kelola Kebutuhan", jp: "Perlu", d: "Tandai habis, otomatis pindah ke catatan pengeluaran.", m: "2 menit" },
  { k: "03", t: "Bangun Nabung", jp: "Simpan", d: "Pisahkan celengan wishlist dan jaga-jaga.", m: "3 menit" },
  { k: "04", t: "Kejar Wishlist", jp: "Idaman", d: "Lihat sisa tabungan dan pencapaianmu.", m: "setiap hari" },
  { k: "05", t: "Belanja Tenang", jp: "Beli", d: "Semua keuangan jelas, beli tanpa rasa was-was.", m: "selamanya" },
];

export default function Landing() {
  const { status } = useSession();
  const router = useRouter();
  const pageRef = useReveals() as React.RefObject<HTMLElement>;

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status, router]);

  return (
    <main ref={pageRef} className="relative">
      {/* fixed whale scene background */}
      <div className="fixed inset-0 z-0 opacity-90">
        <WhaleScene />
      </div>

      <div className="relative z-10">
        {/* ── NAV ── */}
        <header className="sticky top-0 z-50 border-b border-line bg-cream/70 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
            <a href="#top" className="flex items-center gap-3">
              <svg width="36" height="36" viewBox="0 0 44 44" fill="none" aria-hidden>
                <circle cx="22" cy="24" r="9.5" stroke="#c2d772" strokeWidth="2.4" />
                <path d="M6 12h32M9.5 17h25M22 8v28" stroke="#4a5440" strokeWidth="2.2" />
              </svg>
              <span className="flex flex-col leading-none">
                <b className="text-[12px] font-bold tracking-[0.26em] text-ink">WHALE BUDGET</b>
                <i className="text-[8px] font-semibold tracking-[0.34em] text-ink/50 not-italic">KEUANGAN LEMBUT</i>
              </span>
            </a>
            <nav className="ml-auto hidden items-center gap-6 md:flex">
              {["fitur", "cara", "janji"].map((h) => (
                <a
                  key={h}
                  href={`#${h}`}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60 transition hover:text-ink"
                >
                  {h === "fitur" ? "Fitur" : h === "cara" ? "Cara Pakai" : "Janji"}
                </a>
              ))}
            </nav>
            <Link href="/login" className="ml-4 rounded-full border-2 border-ink bg-sage px-4 py-1.5 text-xs font-bold text-ink transition hover:-translate-y-0.5">
              Masuk
            </Link>
          </div>
        </header>

        {/* ── HERO ── */}
        <section className="relative flex min-h-[92vh] flex-col px-5 md:px-8" id="top">
          <div className="mx-auto w-full max-w-6xl flex-1 pt-[16vh]">
            <p data-rv="fade" className="eyebrow text-ink/60">
              <span className="inline-block h-2 w-2 rounded-full bg-peach" />
              Kelola uang tanpa pusing
            </p>
            <h1 data-rv="up" className="display font-display mt-6 text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-[1.05] text-ink">
              catat duit,
              <br />
              santai,
              <br />
              ditemani paus.
            </h1>
            <p data-rv="fade" className="mt-6 max-w-[24rem] text-ink/70">
              Budgeting lembut untuk skincare, makeup, nabung, dan wishlist. Semua rapi, tanpa drama, ditemani paus kecil.
            </p>
            <div data-rv="up" className="mt-8 flex items-center gap-3">
              <Link href="/login" className="btn-primary">mulai gratis</Link>
              <a href="#fitur" className="btn-ghost">liat fitur</a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-6xl pb-6 pt-10">
            <div className="mb-3 flex items-center justify-end gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-ink/40">
              Scroll untuk mulai
              <span className="track relative h-px w-14 overflow-hidden bg-ink/15">
                <i className="absolute inset-0 origin-left animate-cue bg-ink" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t-2 border-ink/10 pt-4 md:grid-cols-4">
              {chapters.map((c) => (
                <div key={c.num} data-rv="up" className="cursor-pointer">
                  <span className="font-display text-3xl font-bold text-sage-deep md:text-4xl">{c.num}</span>
                  <div className="mt-1">
                    <b className="block text-[10px] font-bold uppercase tracking-[0.2em] text-ink/80">{c.b}</b>
                    <p className="mt-1 text-[11px] leading-snug text-ink/50">{c.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FITUR ── */}
        <section className="bg-blush/60 px-5 py-24 md:px-8 md:py-32" id="fitur">
          <div className="mx-auto max-w-6xl">
            <div className="sec-head">
              <span className="k"><b>01 — Fitur</b></span>
              <span className="rule" />
              <span className="jp font-display text-ink/40">Fitur</span>
            </div>
            <div className="gate-grid mt-10 grid gap-10 md:grid-cols-2">
              <h2 data-rv="up" className="display font-display text-[clamp(1.9rem,4vw,3.4rem)] font-bold leading-[1.08] text-ink">
                Semua yang kamu butuhin.
              </h2>
              <div data-rv="fade" className="max-w-md text-ink/70">
                <p>
                  Website budgeting ringan dan lembut. Skincare, makeup, pengeluaran, kebutuhan, nabung, dan wishlist — semua dalam satu tempat, terbagi rapi.
                </p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {cards.map((c, i) => (
                <article key={c.title} data-rv="up" className="rounded-3xl border-2 border-line bg-paper/90 p-6 shadow-[0_4px_0_rgba(74,84,64,0.12)] transition hover:-translate-y-1">
                  <div className="rounded-2xl border-2 border-line bg-cream p-3 text-sm font-bold text-ink/70">{c.jp}</div>
                  <div className="mt-4">
                    <b className="font-display text-lg font-bold text-ink">{c.title}</b>
                    <span className="mt-1 block text-xs font-semibold text-ink/50">{c.meta}</span>
                  </div>
                  <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-widest text-ink/40">
                    <span>0{i + 1}</span>
                    <span>{c.n}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-2 border-t-2 border-ink/10 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.span} data-rv="up" className="border-ink/10 py-6 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                  <div className="font-display text-3xl font-bold text-sage-deep md:text-4xl">{s.b}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-widest text-ink/50">{s.span}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CARA PAKAI ── */}
        <section className="bg-paper px-5 py-24 md:px-8 md:py-32" id="cara">
          <div className="mx-auto max-w-6xl">
            <div className="sec-head">
              <span className="k"><b>02 — Cara Pakai</b></span>
              <span className="rule" />
              <span className="jp font-display text-ink/40">Langkah</span>
            </div>
            <div className="cur-head mt-10">
              <h2 data-rv="up" className="display font-display text-[clamp(1.9rem,4vw,3.4rem)] font-bold leading-[1.08] text-ink">
                Lima langkah. Tanpa drama. Pikiran tenang.
              </h2>
              <p data-rv="fade" className="mt-4 max-w-xl text-ink/60">
                Setiap langkah adalah kebiasaan kecil, bukan ceramah. Kamu buka aplikasi, catat, dan selesai — paus yang jagain.
              </p>
            </div>
            <div className="mt-10 space-y-1" id="cur">
              {lessons.map((l) => (
                <div key={l.k} data-rv="up" className="group flex cursor-pointer items-center gap-5 border-b-2 border-ink/10 py-5 transition hover:bg-cream/60 md:gap-8">
                  <span className="font-display text-2xl font-bold text-sage-deep md:text-3xl">{l.k}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-bold text-ink">
                      {l.t} <em className="font-display text-sm font-semibold text-ink/40 not-italic">{l.jp}</em>
                    </h3>
                    <p className="mt-1 text-sm text-ink/60">{l.d}</p>
                  </div>
                  <span className="hidden text-xs font-bold uppercase tracking-widest text-ink/40 md:block">{l.m}</span>
                  <span className="h-px w-0 bg-sage transition-all duration-300 group-hover:w-16" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JANJI ── */}
        <section className="bg-peach/50 px-5 py-24 md:px-8 md:py-32" id="janji">
          <div className="mx-auto max-w-4xl rounded-[2rem] border-2 border-line bg-paper p-10 text-center md:p-16">
            <div data-rv="up">
              <span className="eyebrow text-ink/60">Penutup</span>
              <h2 className="display font-display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] text-ink">
                Siap ditemani paus?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-ink/60">
                Gratis. Tanpa kartu kredit, tanpa email promo. Hanya kamu, uangmu, dan paus.
              </p>
              <Link href="/login" className="btn-primary mt-8 inline-flex">
                mulai sekarang
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t-2 border-ink/10 bg-cream/80 px-5 py-10 md:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm font-bold text-ink/60">
            <span>© 2026 Whale Budget</span>
            <span className="font-display text-ink/40">uang itu teman, bukan musuh</span>
            <span>WebGL · Lenis · Pastel</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
