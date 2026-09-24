"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import whaleSwim from "@/public/images/whale-swim.json";

const techStack: [string, string][] = [["Next.js", "/images/nextjs.png"], ["React", "/images/react.png"], ["Tailwind CSS", "/images/tailwind.png"], ["MongoDB", "/images/mongodb.png"], ["Mongoose", "/images/mongoose.png"]];

function TypewriterEffectSmooth({ text }: { text: string }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(text.length);
      return;
    }

    let cancelled = false;
    let timer: number | undefined;
    let current = 0;
    let deleting = false;

    const schedule = (delay: number) => {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        if (deleting) {
          current -= 1;
          setVisible(current);
          if (current === 0) deleting = false;
           schedule(10);

        } else {
          current += 1;
          setVisible(current);
          if (current === text.length) {
            deleting = true;
            schedule(3000);
          } else {
            schedule(10);
          }
        }
      }, delay);
    };

    setVisible(0);
    schedule(1);
    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [text]);

  return <span>{text.slice(0, visible)}<span className="typewriter-caret" aria-hidden="true" /></span>;
}

const copy = {
  id: {
    login: "Masuk",
    hero: "Uang harian, terlihat jelas dengan",
    heroAccent: "Mibudge.",
    intro: "Catat pengeluaran, rencanakan kebutuhan, dan lihat ruang anggaranmu dalam satu tempat.",
    start: "Mulai mencatat",

    how: "Tiga hal yang perlu terlihat.",
    howIntro: "MiBudge menyusun informasi berdasarkan keputusan yang perlu kamu ambil hari ini.",
    capabilities: [
      ["Catat", "Pengeluaran, skincare, makeup, dan kebutuhan tetap terpisah tanpa terasa rumit."],
      ["Rencanakan", "Simpan wishlist dan tabungan dengan target yang mudah dibaca."],
      ["Pantau", "Lihat sisa anggaran, pembelian terbaru, dan kebutuhan yang harus diisi ulang."],
    ],
    flow: "Dari rencana ke catatan.",
    flowIntro: "Saat kebutuhan habis atau wishlist dibeli, MiBudge membantu menjaga catatan tetap tersambung.",
    steps: ["Masuk dengan akunmu", "Tambah catatan atau target", "Gunakan ringkasan untuk menentukan langkah berikutnya"],
    close: "Mulai dari catatan pertama.",
    closeIntro: "Tidak perlu menata semuanya sekaligus. Mulai dengan pengeluaran hari ini.",
    footer: "MiBudge · budgeting personal",
  },
  en: {
    login: "Sign in",
    hero: "See your daily money clearly with",
    heroAccent: "Mibudge.",
    intro: "Track spending, plan essentials, and understand your available budget in one place.",
    start: "Start tracking",

    how: "Three things worth seeing.",
    howIntro: "MiBudge organizes information around the decisions you need to make today.",
    capabilities: [
      ["Track", "Keep expenses, skincare, makeup, and essentials distinct without extra friction."],
      ["Plan", "Save wishlist items and savings goals with progress that is easy to read."],
      ["Review", "See available budget, recent purchases, and essentials due for a refill."],
    ],
    flow: "From plan to record.",
    flowIntro: "When an essential runs out or a wishlist item is purchased, MiBudge helps keep your records connected.",
    steps: ["Sign in to your account", "Add a record or target", "Use the overview to decide what comes next"],
    close: "Start with one record.",
    closeIntro: "You do not need to organize everything at once. Start with today’s spending.",
    footer: "MiBudge · personal budgeting",
  },
};

export default function Landing() {
  const { status } = useSession();
  const router = useRouter();
  const [lang, setLang] = useState<"id" | "en">("id");
  const [floatingNav, setFloatingNav] = useState(false);
  const heroTopRef = useRef<HTMLDivElement | null>(null);
  const t = copy[lang];

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [router, status]);

  useEffect(() => {
    const sentinel = heroTopRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setFloatingNav(!entry.isIntersecting), { threshold: 0 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let ctx: { revert: () => void } | undefined;
      let refreshFrame = 0;
      let disposed = false;
     void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
       if (disposed) return;
       gsap.registerPlugin(ScrollTrigger);
       ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
           if (section.classList.contains("budget-route")) return;

           const content = section.firstElementChild;
          if (!content) return;
          gsap.from(content, {
            opacity: 0,
            y: 24,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
              scrub: false,
            },
           });
         });
          const route = document.querySelector<HTMLElement>(".budget-route");
           const routeTrack = route?.querySelector<HTMLElement>(".budget-route-track");
           const routeWhale = route?.querySelector<HTMLElement>(".budget-route-whale");
           if (route && routeTrack && routeWhale && window.matchMedia("(min-width: 768px)").matches) {
             const viewport = routeTrack.parentElement!;
             const distance = () => Math.max(0, routeTrack.scrollWidth - viewport.clientWidth);
             const whaleDistance = () => Math.max(0, viewport.clientWidth - routeWhale.offsetWidth - 32);
             gsap.timeline({
               defaults: { ease: "none" },
               scrollTrigger: {
                 trigger: route,
                 start: "top top",
                 end: () => `+=${Math.max(window.innerWidth * 2.2, distance() + window.innerWidth * 0.7)}`,
                 pin: true,
                 pinType: "fixed",
                 anticipatePin: 1,
                 fastScrollEnd: true,
                 scrub: 1.4,
                 invalidateOnRefresh: true,
               },
             })
               .to({}, { duration: 0.2 })
               .to(routeTrack, { x: () => -distance(), duration: 0.6 }, 0.2)
               .to(routeWhale, { x: whaleDistance, duration: 0.6 }, 0.2)
               .to({}, { duration: 0.2 });
           }
        });
       refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
     });
     return () => { disposed = true; window.cancelAnimationFrame(refreshFrame); ctx?.revert(); };
  }, []);

  return (
    <main id="top" className="landing-page min-h-[100dvh] bg-[#f6dbe2] text-[var(--ink)]">
<header className={`sticky top-0 z-[100] transition-all duration-300 ${floatingNav ? "px-4 pt-3 sm:px-8" : "border-b border-[var(--line)] bg-white"}`}>
        <div className={floatingNav ? "mx-auto max-w-7xl rounded-2xl border border-[var(--line)] bg-white/95 shadow-[0_12px_35px_rgba(32,48,34,0.14)] backdrop-blur-xl" : ""}>
        <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Navigasi utama">
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-[var(--ink)]"><Image src="/images/logo-mibudge.png" alt="" width={56} height={56} className="h-14 w-14 object-contain" priority />MiBudge</Link>
          <div className="flex items-center gap-3">
            <div className="flex border border-[var(--ink)]/20 p-0.5 text-xs font-semibold text-[var(--ink)]">
              <button type="button" onClick={() => setLang("id")} className={lang === "id" ? "bg-[#f6dbe2] px-2 py-1 text-[var(--ink)]" : "px-2 py-1 text-[var(--ink-soft)]"}>ID</button>
              <button type="button" onClick={() => setLang("en")} className={lang === "en" ? "bg-[#f6dbe2] px-2 py-1 text-[var(--ink)]" : "px-2 py-1 text-[var(--ink-soft)]"}>EN</button>
            </div>
            <Link href="/login" className="bg-[#f6dbe2] px-4 py-2 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-white/70">{t.login}</Link>
          </div>
        </nav>
        </div>
      </header>
<div ref={heroTopRef} className="absolute top-0 h-px w-px" aria-hidden="true" />
<section className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-gradient-to-b from-[#f6c5c1] to-[#f6dbe2] px-5 pt-16 sm:px-8">
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center py-10 text-center">
          <div className="relative isolate flex w-full flex-col items-center">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(220,38,38,0.5)_0%,rgba(220,38,38,0.2)_50%,rgba(220,38,38,0)_72%)] blur-2xl sm:h-[26rem] sm:w-[56rem] lg:h-[30rem] lg:w-[72rem]" />
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.0] tracking-[-0.05em] text-balance text-[var(--ink)] sm:text-5xl lg:text-6xl">{t.hero} <span className="hero-accent-gradient">{t.heroAccent}</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-7 text-[#6f3b45] sm:text-lg"><TypewriterEffectSmooth text={t.intro} /></p>
            <div className="mt-8 flex justify-center">
              <Link href="/login" className="btn btn-fill px-6 py-3.5 text-sm">{t.start}</Link>
            </div>
          </div>
                     <aside className="mt-6 aspect-video h-auto w-full translate-y-4 overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--paper)] text-left shadow-[0_0_26px_rgba(220,38,38,0.28),0_24px_55px_rgba(74,92,54,0.16)] sm:mt-8 sm:translate-y-6" aria-label="Pratinjau dashboard MiBudge">
            <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4 sm:px-7"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center bg-[var(--sage)] font-display font-semibold">M</span><span className="font-display text-lg font-semibold">MiBudge</span></div><span className="text-sm text-[var(--ink-soft)]">Ringkasan bulan ini</span></div>
            <div className="grid h-full min-h-0 md:grid-cols-[13rem_1fr]">
              <div className="hidden border-r border-[var(--line)] bg-[var(--rose)]/45 p-6 md:block"><p className="text-sm font-medium">Catatanmu</p><div className="mt-8 space-y-3"><div className="h-2 w-20 bg-[var(--ink)]/15" /><div className="h-2 w-28 bg-[var(--ink)]/10" /><div className="h-2 w-16 bg-[var(--ink)]/10" /></div></div>
              <div className="flex min-h-0 flex-col justify-between overflow-hidden p-6 sm:p-8"><div><div className="flex items-start justify-between"><div><p className="text-sm text-[var(--ink-soft)]">Prioritas sekarang</p><h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">Lihat yang perlu dicatat.</h2></div><span className="hidden bg-[var(--cream)] px-3 py-1 text-sm font-medium sm:block">Hari ini</span></div><div className="mt-10 grid gap-4 sm:grid-cols-[1.4fr_1fr]"><div className="bg-[var(--sage)]/35 p-5"><p className="text-sm font-medium">Sisa anggaran</p><div className="mt-10 h-2 w-full bg-[var(--ink)]/10"><div className="h-full w-3/5 bg-[var(--sage-deep)]" /></div></div><div className="border-t border-[var(--line)] p-5 sm:border-l sm:border-t-0"><p className="text-sm font-medium">Berikutnya</p><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">Tambahkan pengeluaran atau perbarui target tabungan.</p></div></div></div><div className="mt-10 border-t border-[var(--line)] pt-5 text-sm text-[var(--ink-soft)]">Pratinjau dashboard. Tempatkan screenshot dashboard asli pada area ini saat tersedia.</div></div>
            </div>
          </aside>
        </div>
        <div className="h-10 sm:h-16" />
      </section>


       <section className="budget-route relative z-20 mt-16 px-5 pb-0 pt-20 text-[var(--bg)] sm:mt-24 sm:px-8 lg:pt-28" aria-labelledby="flow-heading">
         <div className="relative mx-auto max-w-7xl">
           <header className="max-w-xl">
             <p className="text-sm font-medium text-[var(--cream)]/75">MiBudge / langkah berikutnya</p>
             <h2 id="flow-heading" className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{t.flow}</h2>
             <p className="mt-5 leading-7 text-white/75">{t.flowIntro}</p>
            </header>
             <div className="budget-route-viewport mt-12">
              <div className="budget-route-water" aria-hidden="true"><span /><span /><span /></div>
              <div className="budget-route-whale" aria-hidden="true">
                <Lottie animationData={whaleSwim} loop />
              </div>
              <ol className="budget-route-track">
                {t.steps.concat([t.close]).map((step, index) => (
                  <li key={step} className="budget-route-step">
                    <article className="budget-route-card">
                      <span className="budget-route-index">0{index + 1}</span>
                      <p>{step}</p>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
       </section>

         <section className="relative overflow-hidden border-0 bg-[#f6dbe2] pb-8 pt-4 shadow-none sm:py-6" aria-label="Teknologi yang digunakan">
          <div className="mx-auto max-w-7xl px-5 sm:px-8"><p className="font-display text-3xl font-semibold tracking-tight">Dibuat dengan teknologi</p></div>
          <div className="mt-8 overflow-hidden px-2"><div className="tech-marquee flex w-max items-center gap-20 px-8 py-6">{techStack.concat(techStack, techStack, techStack).map(([name, src], index) => <div key={`${name as string}-${index}`} className="tech-logo group flex min-w-48 flex-col items-center gap-3 rounded-2xl px-8 pt-12 pb-4 text-sm font-semibold text-[var(--ink)]"><span className="grid h-16 w-16 place-items-center drop-shadow-[0_0_38px_rgba(220,38,38,0.9)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.12] group-hover:drop-shadow-[0_0_64px_rgba(220,38,38,1)]">{src ? <Image src={src as string} alt={`${name} logo`} width={64} height={64} className="h-16 w-16 object-contain" /> : <FontAwesomeIcon icon={faArrowsRotate} className="text-4xl text-[var(--sage-deep)]" />}</span><span>{name as string}</span></div>)}</div></div>
        </section>


        <section className="rounded-[2.5rem] bg-[#f6c5c1] px-5 py-24 sm:rounded-[4rem] sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><h2 className="max-w-3xl font-display text-5xl font-semibold leading-tight tracking-tight sm:text-7xl">Mulai dengan satu catatan.</h2><p className="mt-6 max-w-lg text-base leading-7 text-[var(--ink-soft)]">Tidak perlu menata semuanya sekaligus. Masuk, catat pengeluaran pertama, lalu lanjutkan dari sana.</p><Link href="/login" className="btn btn-primary mt-9 px-6 py-3.5 text-sm">{t.start}</Link></div></section>

        <footer className="px-5 py-6 text-sm text-[var(--ink-soft)] sm:px-8"><div className="mx-auto flex max-w-7xl justify-between"><span>{t.footer}</span><a href="#top">↑</a></div></footer>
    </main>
  );
}
