"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const WhaleScene = dynamic(() => import("@/components/WhaleScene"), { ssr: false });

/* ── Multilingual Dictionary (ID / EN) ── */
const dict = {
  id: {
    heroBadge: "✦ EDISI KHUSUS · FINANCIAL SANCTUARY",
    heroTitlePrefix: "Kelola uang lebih lembut, ",
    heroTitleHighlight: "bersama paus impian.",
    heroDesc: "Website budgeting interaktif dan estetik untuk mencatat skincare, make up, kebutuhan harian, dan tabungan wishlist tanpa pusing. Ditemani visual 3D yang menenangkan.",
    heroCta: "Mulai Budgeting Gratis",
    heroSubCta: "Lihat 6 Fitur",
    trust1: "100% Bebas Biaya",
    trust2: "OAuth Google Terintegrasi",
    trust3: "Modul Skincare & Makeup Terpisah",
    sec2Tag: "Arsitektur Fitur",
    sec2TitlePrefix: "Dirancang rapi, ",
    sec2TitleHighlight: "tanpa pusing & serba otomatis.",
    sec2Desc: "Setiap modul saling tersinkronisasi untuk mempermudah pencatatan keuangan harian, perawatan diri, hingga rencana tabungan jangka panjang.",
    features: [
      {
        title: "Skincare Catalog",
        tag: "Section 01",
        desc: "Katalog khusus produk skincare lengkap dengan harga, tanggal beli, dan sisa stok agar perawatan kulitmu tetap terkontrol.",
        icon: "✧",
        accent: "from-coral/30 to-blush/40",
      },
      {
        title: "Makeup Wardrobe",
        tag: "Section 02",
        desc: "Koleksi kosmetik dipisah dalam modul terpisah. Pantau shade, brand, dan budget make up tanpa tercampur.",
        icon: "◈",
        accent: "from-sage/30 to-cream/40",
      },
      {
        title: "Pengeluaran Terpadu",
        tag: "Section 03",
        desc: "Catat jajan, transportasi, hiburan, hingga belanja bulanan dengan pembagian kategori yang jelas dan rapi.",
        icon: "◇",
        accent: "from-blush/35 to-coral/25",
      },
      {
        title: "Kebutuhan Otomatis",
        tag: "Section 04",
        desc: "Daftar stok kebutuhan pokok dengan status habis/ada. Begitu status ditandai habis, otomatis terkonversi jadi pengeluaran.",
        icon: "△",
        accent: "from-cream/40 to-sage/30",
      },
      {
        title: "Wishlist & One-Click Buy",
        tag: "Section 05",
        desc: "Simpan barang impian dengan target harga, catat progress tabungan manual, dan klik tombol purchase untuk langsung mencatat belanja.",
        icon: "☆",
        accent: "from-coral/30 to-sage/30",
      },
      {
        title: "Celengan Ganda (Save Money)",
        tag: "Section 06",
        desc: "Bagi tabungan jadi dua pilar utama: celengan impian untuk wishlist dan dana darurat untuk kebutuhan jaga-jaga.",
        icon: "◎",
        accent: "from-sage/35 to-blush/35",
      },
    ],
    sec3Tag: "Alur Praktis",
    sec3TitlePrefix: "Tiga langkah ringan ",
    sec3TitleHighlight: "menuju finansial santai.",
    sec3Desc: "Sederhana dan tidak berbelit-belit. Siapa saja bisa mulai mengatur keuangan dan perawatannya dalam hitungan menit.",
    steps: [
      {
        num: "01",
        title: "Masuk Cepat via Google",
        desc: "Satu klik dengan akun Google. Langsung terenkripsi, aman, tanpa perlu repot menghafal kata sandi baru.",
      },
      {
        num: "02",
        title: "Isi Katalog & Rencana",
        desc: "Daftarkan skincare, makeup, dan kebutuhan harianmu. Pisahkan pos tabungan wishlist dan jaga-jaga.",
      },
      {
        num: "03",
        title: "Pantau & Nikmati Ketenangan",
        desc: "Buka ringkasan kapan saja. Visual 3D menemani setiap progress finansialmu dengan visual pastel yang menenangkan.",
      },
    ],
    sec4Tag: "Tampilan Antarmuka",
    sec4TitlePrefix: "Dashboard estetik, ",
    sec4TitleHighlight: "menenangkan mata & hati.",
    sec4Desc: "Setiap tombol, card, dan warna pastel dipilih agar mencatat keuangan tidak lagi terasa menegangkan.",
    livePreview: "Live Dashboard Preview",
    connected: "Terhubung",
    card1Title: "Skincare Budget",
    card1Val: "Rp 450.000",
    card1Sub: "6 Produk Aktif",
    card2Title: "Makeup Wardrobe",
    card2Val: "Rp 320.000",
    card2Sub: "4 Item Tercatat",
    card3Title: "Wishlist Impian",
    card3Val: "75% Tercapai",
    card3Sub: "Target Bulan Ini",
    card4Title: "Celengan Darurat",
    card4Val: "Aman & Terjaga",
    card4Sub: "Dana Terpisah",
    autoNote: "✦ Otomatisasi Kebutuhan Habis → Pengeluaran",
    active100: "Aktif 100%",
    sec5Badge: "✦ MULAI PERJALANAN FINANSIAL BARU",
    sec5TitlePrefix: "Saatnya kelola uangmu ",
    sec5TitleHighlight: "dengan tenang dan bahagia.",
    sec5Desc: "Masuk dengan satu klik menggunakan Google, tanpa instalasi rumit, dan nikmati pencatatan budgeting terindah yang pernah kamu coba.",
    sec5Cta: "Masuk via Google Sekarang",
    sec5Feat1: "Gratis Selamanya",
    sec5Feat2: "Data Tersimpan di Cloud",
    sec5Feat3: "Desain Estetik & Tenang",
    footerText: "Dibuat khusus penuh kasih sayang 🐋",
    backToTop: "Kembali ke Atas ↑",
    loginBtn: "Masuk",
  },
  en: {
    heroBadge: "✦ SPECIAL EDITION · FINANCIAL SANCTUARY",
    heroTitlePrefix: "Manage your finances gently, ",
    heroTitleHighlight: "guided by your dream whale.",
    heroDesc: "An aesthetic, interactive budgeting sanctuary to track skincare, makeup, daily essentials, and wishlist savings with ease. Accompanied by soothing 3D visuals.",
    heroCta: "Start Budgeting Free",
    heroSubCta: "Explore 6 Features",
    trust1: "100% Free Forever",
    trust2: "Integrated Google OAuth",
    trust3: "Dedicated Skincare & Makeup Modals",
    sec2Tag: "Feature Architecture",
    sec2TitlePrefix: "Elegantly crafted, ",
    sec2TitleHighlight: "intuitive & fully automated.",
    sec2Desc: "Every module connects seamlessly to balance daily expenses, self-care routines, and long-term milestone savings.",
    features: [
      {
        title: "Skincare Catalog",
        tag: "Section 01",
        desc: "Dedicated skincare catalog with price, purchase date, and stock tracking so your self-care remains balanced.",
        icon: "✧",
        accent: "from-coral/30 to-blush/40",
      },
      {
        title: "Makeup Wardrobe",
        tag: "Section 02",
        desc: "Separate cosmetic module. Monitor shades, brands, and makeup allocations without clutter.",
        icon: "◈",
        accent: "from-sage/30 to-cream/40",
      },
      {
        title: "Unified Expenses",
        tag: "Section 03",
        desc: "Log food, commute, leisure, and monthly groceries with structured, crystal clear categorization.",
        icon: "◇",
        accent: "from-blush/35 to-coral/25",
      },
      {
        title: "Automated Needs",
        tag: "Section 04",
        desc: "Essential stock tracker with in-stock/empty status. When marked empty, it auto-converts to an expense.",
        icon: "△",
        accent: "from-cream/40 to-sage/30",
      },
      {
        title: "Wishlist & One-Click Buy",
        tag: "Section 05",
        desc: "Save dream items with target goals, log progress, and click purchase to instantly book it as an expense.",
        icon: "☆",
        accent: "from-coral/30 to-sage/30",
      },
      {
        title: "Dual Savings Pillars",
        tag: "Section 06",
        desc: "Split your savings into two core pillars: dream wishlist fund and emergency safety buffer.",
        icon: "◎",
        accent: "from-sage/35 to-blush/35",
      },
    ],
    sec3Tag: "Practical Flow",
    sec3TitlePrefix: "Three gentle steps ",
    sec3TitleHighlight: "to effortless financial peace.",
    sec3Desc: "Simple and straightforward. Anyone can start mastering their budget and self-care in just a few minutes.",
    steps: [
      {
        num: "01",
        title: "Instant Sign-In with Google",
        desc: "One click with your Google account. Fully encrypted, secure, with no new passwords to remember.",
      },
      {
        num: "02",
        title: "Fill Catalog & Allocations",
        desc: "Register your skincare, makeup, and daily needs. Separate wishlist pots from emergency funds.",
      },
      {
        num: "03",
        title: "Monitor & Enjoy Serenity",
        desc: "Open your sanctuary overview anytime. Interactive 3D visuals accompany your progress every day.",
      },
    ],
    sec4Tag: "Interface Preview",
    sec4TitlePrefix: "Aesthetic dashboard, ",
    sec4TitleHighlight: "soothing for mind and soul.",
    sec4Desc: "Every button, card, and pastel tone is designed to make budgeting relaxing instead of stressful.",
    livePreview: "Live Dashboard Preview",
    connected: "Connected",
    card1Title: "Skincare Budget",
    card1Val: "Rp 450,000",
    card1Sub: "6 Active Products",
    card2Title: "Makeup Wardrobe",
    card2Val: "Rp 320,000",
    card2Sub: "4 Items Logged",
    card3Title: "Dream Wishlist",
    card3Val: "75% Reached",
    card3Sub: "This Month's Target",
    card4Title: "Emergency Buffer",
    card4Val: "Safe & Guarded",
    card4Sub: "Separated Fund",
    autoNote: "✦ Automated Out-of-Stock → Expense Conversion",
    active100: "100% Active",
    sec5Badge: "✦ START A NEW FINANCIAL JOURNEY",
    sec5TitlePrefix: "It's time to manage your money ",
    sec5TitleHighlight: "with calm and joy.",
    sec5Desc: "Sign in with one click via Google, zero complex setup, and enjoy the most delightful budgeting experience.",
    sec5Cta: "Sign In with Google Now",
    sec5Feat1: "Free Forever",
    sec5Feat2: "Cloud Synced Data",
    sec5Feat3: "Serene & Aesthetic Design",
    footerText: "Crafted with love and serenity 🐋",
    backToTop: "Back to Top ↑",
    loginBtn: "Sign In",
  },
};

export default function Landing() {
  const { status } = useSession();
  const router = useRouter();
  const pageRef = useRef<HTMLElement | null>(null);
  const model3dRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const fiturSectionRef = useRef<HTMLElement | null>(null);
  const combinedHeroFiturRef = useRef<HTMLDivElement | null>(null);
  const [scrollProg, setScrollProg] = useState(0);

  /* ── Interactive Theme & Language States ── */
  const [lang, setLang] = useState<"id" | "en">("id");
  const [isDark, setIsDark] = useState(false);

  const t = dict[lang];

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status, router]);

  /* ── Smooth Scroll-Triggered Reveal ── */
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-anim]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  /* ── GSAP ScrollTrigger: Pro UI/UX Responsive Animation via matchMedia ── */
  useEffect(() => {
    const modelEl = model3dRef.current;
    const heroEl = heroSectionRef.current;
    const fiturEl = fiturSectionRef.current;
    const combinedEl = combinedHeroFiturRef.current;
    if (!modelEl || !heroEl || !fiturEl || !combinedEl) return;

    let mm: ReturnType<typeof import("gsap").gsap.matchMedia> | null = null;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      mm = gsap.matchMedia();

      // ── DESKTOP (>= 1024px): Full interactive cross-section glide + pin throughout Section 2 ──
      mm.add("(min-width: 1024px)", () => {
        const getTravelX = () => {
          const vw = window.innerWidth;
          const modelW = modelEl.offsetWidth;
          return -(vw - modelW - vw * 0.04);
        };

        ScrollTrigger.create({
          trigger: heroEl,
          start: "top top",
          endTrigger: fiturEl,
          end: "bottom bottom",
          pin: modelEl,
          pinSpacing: false,
        });

        gsap.fromTo(
          modelEl,
          { x: 0 },
          {
            x: getTravelX,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: heroEl,
              start: "top top",
              endTrigger: fiturEl,
              end: "top top",
              scrub: 1.2,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                setScrollProg(self.progress);
              },
            },
          }
        );
      });
    })();

    return () => {
      mm?.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className={`relative min-h-screen overflow-x-clip transition-colors duration-500 selection:bg-sage selection:text-ink ${
        isDark ? "bg-[#141b13] text-[#f1f6ed]" : "bg-[#fffdf6] text-ink"
      }`}
    >
      {/* ═══ LUXURY FLOATING NAVBAR (Logo, Title, Light/Dark Toggle, Language Switcher, Masuk Button) ═══ */}
      <header className="fixed inset-x-0 top-3 sm:top-5 z-50 px-3 sm:px-6">
        <div
          className={`mx-auto flex max-w-5xl items-center justify-between gap-2.5 sm:gap-4 rounded-full border px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_10px_35px_rgba(246,197,193,0.4)] backdrop-blur-2xl transition-all duration-300 ${
            isDark
              ? "border-white/15 bg-[#222e20]/90 text-[#f1f6ed]"
              : "border-white/70 bg-[#f6c5c1]/85 text-ink hover:bg-[#f6c5c1]/95"
          }`}
        >
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <span
              className={`grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border font-display text-base sm:text-lg font-bold shadow-sm transition-transform duration-200 group-hover:scale-105 ${
                isDark
                  ? "border-white/20 bg-gradient-to-br from-[#2a3827] to-[#3a4f36] text-sage"
                  : "border-white/80 bg-gradient-to-br from-cream via-blush to-sage text-ink"
              }`}
            >
              W
            </span>
            <div className="flex flex-col leading-none">
              <span className={`font-display text-[13px] sm:text-[15px] font-bold tracking-wider ${isDark ? "text-white" : "text-ink"}`}>
                WHALE BUDGET
              </span>
              <span
                className={`hidden xs:block text-[8px] sm:text-[9px] font-bold tracking-[0.22em] uppercase ${
                  isDark ? "text-white/60" : "text-ink/60"
                }`}
              >
                {lang === "id" ? "Sanctuary Keuangan" : "Financial Sanctuary"}
              </span>
            </div>
          </Link>

          {/* Right Controls: Language Switcher, Dark/Light Mode, Masuk Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Switcher Pill */}
            <div
              className={`flex items-center rounded-full border p-0.5 text-[11px] sm:text-xs font-bold transition-all ${
                isDark ? "border-white/15 bg-white/10" : "border-ink/15 bg-white/70 shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`rounded-full px-2 sm:px-2.5 py-1 transition-all ${
                  lang === "id"
                    ? isDark
                      ? "bg-sage text-ink font-extrabold shadow-sm"
                      : "bg-sage text-ink font-extrabold shadow-sm"
                    : isDark
                    ? "text-white/60 hover:text-white"
                    : "text-ink/60 hover:text-ink"
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-2 sm:px-2.5 py-1 transition-all ${
                  lang === "en"
                    ? isDark
                      ? "bg-sage text-ink font-extrabold shadow-sm"
                      : "bg-sage text-ink font-extrabold shadow-sm"
                    : isDark
                    ? "text-white/60 hover:text-white"
                    : "text-ink/60 hover:text-ink"
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Light / Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className={`grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border transition-all hover:scale-105 active:scale-95 ${
                isDark
                  ? "border-white/20 bg-white/15 text-yellow-300 shadow-sm"
                  : "border-ink/15 bg-white/75 text-ink shadow-sm hover:bg-white"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle dark mode"
            >
              <span className="text-sm sm:text-base leading-none select-none">
                {isDark ? "☀️" : "🌙"}
              </span>
            </button>

            {/* Tombol Masuk */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-full border border-ink/20 bg-gradient-to-br from-sage to-[#d6eb82] px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-[13px] font-bold text-ink shadow-[0_3px_0_rgba(74,84,64,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_0_rgba(74,84,64,0.18)] active:translate-y-0.5"
            >
              <span>{t.loginBtn}</span>
              <span className="text-xs">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ═══ COMBINED HERO + FITUR WRAPPER ═══ */}
      <div ref={combinedHeroFiturRef} className="relative">
        {/* ── DESKTOP PINNED 3D CALCULATOR (Active on >= 1024px) ── */}
        <div
          ref={model3dRef}
          className="pointer-events-none hidden lg:block absolute right-0 top-[20vh] z-10 h-[580px] w-[620px] xl:right-[1%] xl:h-[640px] xl:w-[700px]"
          style={{ willChange: "transform" }}
        >
          <div className="pointer-events-auto h-full w-full">
            <WhaleScene scrollProgress={scrollProg} />
          </div>
        </div>

        {/* ═══ SECTION 1: LUXURY HERO ═══ */}
        <section
          ref={heroSectionRef}
          id="top"
          className="relative flex min-h-[92vh] items-center overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-24"
        >
          {/* Ambient Lighting Aura */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
              isDark
                ? "bg-[radial-gradient(ellipse_75%_65%_at_70%_35%,rgba(58,79,54,0.45),transparent_65%),radial-gradient(ellipse_55%_55%_at_15%_65%,rgba(194,215,114,0.15),transparent_60%)]"
                : "bg-[radial-gradient(ellipse_75%_65%_at_70%_35%,rgba(246,219,226,0.85),transparent_65%),radial-gradient(ellipse_55%_55%_at_15%_65%,rgba(194,215,114,0.35),transparent_60%),radial-gradient(ellipse_45%_45%_at_85%_85%,rgba(246,197,193,0.45),transparent_55%)]"
            }`}
          />

          {/* Ambient Floating Glow Blobs */}
          <div className="pointer-events-none absolute top-1/4 left-[8%] h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-sage/20 blur-[80px] sm:blur-[100px]" />
          <div className="pointer-events-none absolute top-1/3 right-[5%] h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-coral/25 blur-[90px] sm:blur-[120px]" />

          <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Hero Text Content */}
              <div className="lg:col-span-7 max-w-xl text-center lg:text-left mx-auto lg:mx-0">
                <div
                  data-anim
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] shadow-sm backdrop-blur-md ${
                    isDark ? "border-white/15 bg-white/10 text-white/90" : "border-ink/10 bg-white/90 text-ink/80"
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-deep opacity-80" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-deep" />
                  </span>
                  {t.heroBadge}
                </div>

                <h1
                  data-anim
                  className={`font-display mt-5 sm:mt-6 text-[clamp(2.3rem,6vw,4.5rem)] font-bold leading-[1.06] ${
                    isDark ? "text-white" : "text-[#242f1b]"
                  }`}
                >
                  {t.heroTitlePrefix}{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-[#e06359] via-[#bf6378] to-[#60822c] bg-clip-text text-transparent">
                      {t.heroTitleHighlight}
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 320 14" fill="none" preserveAspectRatio="none">
                      <path d="M4 10 Q 160 2 316 8" stroke="url(#luxUnderline)" strokeWidth="6" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="luxUnderline" x1="0" x2="1" y1="0" y2="0">
                          <stop stopColor="#e06359" />
                          <stop offset="0.5" stopColor="#bf6378" />
                          <stop offset="1" stopColor="#60822c" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </h1>

                {/* Mobile/Tablet Clean 3D Calculator (Significantly enlarged for tablet portrait mode) */}
                <div className="block lg:hidden my-3 sm:my-6">
                  <div className="relative mx-auto h-[280px] w-full max-w-[340px] sm:h-[440px] sm:max-w-[500px] md:h-[540px] md:max-w-[600px]">
                    <WhaleScene scrollProgress={scrollProg} />
                  </div>
                </div>

                <p
                  data-anim
                  className={`mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed ${
                    isDark ? "text-white/80" : "text-ink/85"
                  }`}
                >
                  {t.heroDesc}
                </p>

                <div data-anim className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <Link
                    href="/login"
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-ink bg-gradient-to-br from-sage via-[#cee57a] to-[#b8d462] px-7 sm:px-8 py-3.5 sm:py-4 font-display text-sm sm:text-base font-bold text-ink shadow-[0_5px_0_rgba(74,84,64,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_0_rgba(74,84,64,0.18)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(74,84,64,0.2)]"
                  >
                    <span>{t.heroCta}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                  <a
                    href="#fitur"
                    className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 sm:px-7 py-3.5 sm:py-4 font-display text-sm sm:text-base font-bold backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 ${
                      isDark
                        ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                        : "border-ink/30 bg-white/80 text-ink shadow-[0_3px_0_rgba(74,84,64,0.1)] hover:bg-white hover:border-ink/60"
                    }`}
                  >
                    <span>{t.heroSubCta}</span>
                    <span className="text-xs opacity-60">↓</span>
                  </a>
                </div>

                {/* Verified Trust Badges */}
                <div data-anim className="mt-9 sm:mt-11 border-t border-current/10 pt-5 sm:pt-6">
                  <div
                    className={`flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-x-6 sm:gap-y-2.5 text-xs sm:text-[13px] font-bold ${
                      isDark ? "text-white/80" : "text-ink/80"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-full bg-sage text-[10px] text-ink font-bold">✓</span>
                      <span>{t.trust1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-full bg-coral text-[10px] text-white font-bold">✓</span>
                      <span>{t.trust2}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-full bg-blush text-[10px] text-ink font-bold">✓</span>
                      <span>{t.trust3}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Desktop Placeholder to preserve grid spacing */}
              <div className="hidden lg:block lg:col-span-5 h-[520px]" />
            </div>
          </div>
        </section>

        {/* ═══ SEAMLESS AMBIENT TRANSITION ═══ */}
        <div
          className={`relative h-16 sm:h-20 w-full bg-gradient-to-b from-transparent ${
            isDark ? "via-[#1f2c1d]/40 to-[#1b2619]/60" : "via-blush/30 to-blush/50"
          }`}
        />

        {/* ═══ SECTION 2: LUXURY 6-FEATURE SUITE ═══ */}
        <section
          ref={fiturSectionRef}
          id="fitur"
          className={`relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 transition-colors duration-500 ${
            isDark
              ? "bg-gradient-to-b from-[#1b2619]/60 via-[#162015] to-[#141b13]"
              : "bg-gradient-to-b from-blush/50 via-cream/40 to-[#fffdf6]"
          }`}
        >
          <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-coral/20 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sage/20 blur-[120px]" />

          <div className="relative z-20 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
              {/* Left Column: Dedicated clean slot on desktop where the pinned 3D calculator sits */}
              <div className="hidden lg:col-span-5 lg:block min-h-[500px]" />

              {/* Right Column: Section 2 Header + 6 Feature Cards */}
              <div className="lg:col-span-7">
                <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
                  <span
                    data-anim
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm backdrop-blur-md ${
                      isDark ? "border-white/15 bg-white/10 text-white/75" : "border-ink/10 bg-white/80 text-ink/75"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-sage-deep" />
                    {t.sec2Tag}
                  </span>
                  <h2
                    data-anim
                    className={`font-display mt-3 sm:mt-4 text-[clamp(1.9rem,5vw,3.4rem)] font-bold leading-[1.08] ${
                      isDark ? "text-white" : "text-[#242f1b]"
                    }`}
                  >
                    {t.sec2TitlePrefix} <br />
                    <span className="bg-gradient-to-r from-[#e06359] via-[#bf6378] to-[#60822c] bg-clip-text text-transparent">
                      {t.sec2TitleHighlight}
                    </span>
                  </h2>
                  <p data-anim className={`mt-3 sm:mt-4 text-sm sm:text-base ${isDark ? "text-white/75" : "text-ink/80"}`}>
                    {t.sec2Desc}
                  </p>
                </div>

                {/* 6 Luxury Feature Cards (1 col on mobile, 2 cols on tablet & desktop) */}
                <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
                  {t.features.map((f, i) => (
                    <article
                      key={f.title}
                      data-anim
                      className={`group relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border p-5 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
                        isDark
                          ? "border-white/10 bg-[#1d271c]/80 hover:border-sage/40 hover:bg-[#233022]/95 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
                          : "border-white/80 bg-white/80 shadow-[0_8px_30px_rgba(74,84,64,0.06)] hover:border-sage/40 hover:bg-white/95 hover:shadow-[0_20px_45px_rgba(246,197,193,0.35)]"
                      }`}
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      {/* Glow Orb in Card */}
                      <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${f.accent} blur-2xl transition-transform duration-500 group-hover:scale-150`} />

                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <span
                            className={`grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-2xl border text-base sm:text-lg font-bold shadow-sm ${
                              isDark
                                ? "border-white/15 bg-white/10 text-sage"
                                : "border-white/80 bg-gradient-to-br from-white to-cream text-sage-deep"
                            }`}
                          >
                            {f.icon}
                          </span>
                          <span
                            className={`rounded-full border px-2.5 sm:px-3 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase ${
                              isDark ? "border-white/10 bg-white/10 text-white/70" : "border-ink/10 bg-white/90 text-ink/70"
                            }`}
                          >
                            {f.tag}
                          </span>
                        </div>

                        <h3
                          className={`font-display mt-4 sm:mt-5 text-lg sm:text-xl font-bold transition-colors group-hover:text-sage ${
                            isDark ? "text-white" : "text-[#242f1b]"
                          }`}
                        >
                          {f.title}
                        </h3>

                        <p className={`mt-2 text-xs sm:text-[14px] leading-relaxed ${isDark ? "text-white/70" : "text-ink/75"}`}>
                          {f.desc}
                        </p>

                        <div className="mt-4 sm:mt-5 flex items-center justify-between border-t border-current/10 pt-3">
                          <span className={`text-[10px] sm:text-[11px] font-bold ${isDark ? "text-white/40" : "text-ink/50"}`}>
                            Whale Engine
                          </span>
                          <span className="text-[11px] sm:text-[12px] font-bold text-sage-deep transition-transform duration-200 group-hover:translate-x-1">
                            Explore →
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══ SECTION 3: STEP-BY-STEP FLOW ═══ */}
      <section
        id="cara"
        className={`relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 transition-colors duration-500 ${
          isDark ? "bg-[#141b13]" : "bg-[#fffdf6]"
        }`}
      >
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-coral/10 via-blush/15 to-sage/10 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-end gap-6 sm:gap-8 md:grid-cols-2 text-center sm:text-left">
            <div>
              <span
                data-anim
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm backdrop-blur-md ${
                  isDark ? "border-white/15 bg-white/10 text-white/75" : "border-ink/10 bg-white/80 text-ink/75"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-coral" />
                {t.sec3Tag}
              </span>
              <h2
                data-anim
                className={`font-display mt-3 sm:mt-4 text-[clamp(1.9rem,5vw,3.6rem)] font-bold leading-[1.08] ${
                  isDark ? "text-white" : "text-[#242f1b]"
                }`}
              >
                {t.sec3TitlePrefix} <br />
                <span className="bg-gradient-to-r from-[#e06359] to-[#60822c] bg-clip-text text-transparent">
                  {t.sec3TitleHighlight}
                </span>
              </h2>
            </div>
            <p data-anim className={`max-w-md text-sm sm:text-base lg:text-lg mx-auto sm:mx-0 ${isDark ? "text-white/75" : "text-ink/80"}`}>
              {t.sec3Desc}
            </p>
          </div>

          <div className="mt-10 sm:mt-16 grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-3">
            {t.steps.map((s, i) => (
              <div
                key={s.num}
                data-anim
                className={`group relative rounded-[1.5rem] sm:rounded-[2rem] border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
                  isDark
                    ? "border-white/10 bg-[#1d271c]/80 hover:bg-[#233022]/95 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
                    : "border-white/80 bg-white/80 shadow-[0_8px_30px_rgba(74,84,64,0.05)] hover:bg-white/95 hover:shadow-[0_16px_40px_rgba(246,197,193,0.3)]"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-[#e06359] transition-transform duration-300 group-hover:scale-110">
                    {s.num}
                  </span>
                  <span
                    className={`grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border text-xs sm:text-sm font-bold ${
                      isDark ? "border-white/15 bg-white/10 text-white/80" : "border-ink/10 bg-cream/70 text-ink/70"
                    }`}
                  >
                    →
                  </span>
                </div>
                <h3 className={`font-display mt-4 sm:mt-6 text-xl sm:text-2xl font-bold ${isDark ? "text-white" : "text-[#242f1b]"}`}>
                  {s.title}
                </h3>
                <p className={`mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed ${isDark ? "text-white/70" : "text-ink/75"}`}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: AESTHETIC SHOWCASE PREVIEW ═══ */}
      <section
        id="showcase"
        className={`relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#141b13] via-[#1a2318] to-[#141b13]"
            : "bg-gradient-to-b from-[#fffdf6] via-blush/35 to-cream/40"
        }`}
      >
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span
              data-anim
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 sm:px-4 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm backdrop-blur-md ${
                isDark ? "border-white/15 bg-white/10 text-white/75" : "border-ink/10 bg-white/90 text-ink/75"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-sage" />
              {t.sec4Tag}
            </span>
            <h2
              data-anim
              className={`font-display mt-3 sm:mt-4 text-[clamp(1.9rem,5vw,3.6rem)] font-bold leading-[1.08] ${
                isDark ? "text-white" : "text-[#242f1b]"
              }`}
            >
              {t.sec4TitlePrefix} <br />
              <span className="bg-gradient-to-r from-[#e06359] via-[#bf6378] to-[#60822c] bg-clip-text text-transparent">
                {t.sec4TitleHighlight}
              </span>
            </h2>
            <p data-anim className={`mx-auto mt-3 sm:mt-4 max-w-lg text-sm sm:text-base lg:text-lg ${isDark ? "text-white/75" : "text-ink/80"}`}>
              {t.sec4Desc}
            </p>
          </div>

          <div
            data-anim
            className={`relative mx-auto mt-10 sm:mt-16 max-w-4xl overflow-hidden rounded-[1.8rem] sm:rounded-[2.5rem] border-2 p-3 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl ${
              isDark ? "border-white/15 bg-[#1e291d]/90" : "border-white/80 bg-white/80"
            }`}
          >
            <div
              className={`relative aspect-[16/11] sm:aspect-[16/9] w-full overflow-hidden rounded-[1.4rem] sm:rounded-[1.8rem] border p-3.5 sm:p-8 md:p-10 ${
                isDark
                  ? "border-white/10 bg-gradient-to-br from-[#253324]/50 via-[#1e2a1d]/60 to-[#2c3d2a]/50"
                  : "border-ink/10 bg-gradient-to-br from-[#f6dbe2]/40 via-[#f6ffd3]/50 to-[#c2d772]/30"
              }`}
            >
              <div className="flex h-full flex-col justify-between gap-3">
                <div className="flex items-center justify-between border-b border-current/10 pb-2.5 sm:pb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="grid h-7 w-7 sm:h-9 sm:w-9 place-items-center rounded-xl bg-sage font-display text-xs sm:text-base font-bold text-ink shadow-sm">
                      W
                    </span>
                    <div>
                      <div className={`font-display text-xs sm:text-sm font-bold ${isDark ? "text-white" : "text-[#242f1b]"}`}>
                        Whale Financial Sanctuary
                      </div>
                      <div className={`text-[8px] sm:text-[10px] font-bold ${isDark ? "text-white/60" : "text-ink/60"}`}>
                        {t.livePreview}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full border border-sage-deep/30 bg-sage/30 px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold text-sage-deep">
                    ● {t.connected}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 my-auto">
                  <div className={`rounded-xl sm:rounded-2xl border p-2 sm:p-3.5 shadow-sm ${isDark ? "border-white/10 bg-white/10" : "border-white/80 bg-white/90"}`}>
                    <div className={`text-[9px] sm:text-[11px] font-bold ${isDark ? "text-white/70" : "text-ink/70"}`}>{t.card1Title}</div>
                    <div className={`font-display mt-0.5 sm:mt-1 text-xs sm:text-lg font-bold ${isDark ? "text-white" : "text-[#242f1b]"}`}>{t.card1Val}</div>
                    <div className="mt-0.5 text-[8px] sm:text-[10px] font-bold text-sage">{t.card1Sub}</div>
                  </div>
                  <div className={`rounded-xl sm:rounded-2xl border p-2 sm:p-3.5 shadow-sm ${isDark ? "border-white/10 bg-white/10" : "border-white/80 bg-white/90"}`}>
                    <div className={`text-[9px] sm:text-[11px] font-bold ${isDark ? "text-white/70" : "text-ink/70"}`}>{t.card2Title}</div>
                    <div className={`font-display mt-0.5 sm:mt-1 text-xs sm:text-lg font-bold ${isDark ? "text-white" : "text-[#242f1b]"}`}>{t.card2Val}</div>
                    <div className="mt-0.5 text-[8px] sm:text-[10px] font-bold text-[#e06359]">{t.card2Sub}</div>
                  </div>
                  <div className={`rounded-xl sm:rounded-2xl border p-2 sm:p-3.5 shadow-sm ${isDark ? "border-white/10 bg-white/10" : "border-white/80 bg-white/90"}`}>
                    <div className={`text-[9px] sm:text-[11px] font-bold ${isDark ? "text-white/70" : "text-ink/70"}`}>{t.card3Title}</div>
                    <div className={`font-display mt-0.5 sm:mt-1 text-xs sm:text-lg font-bold ${isDark ? "text-white" : "text-[#242f1b]"}`}>{t.card3Val}</div>
                    <div className="mt-0.5 text-[8px] sm:text-[10px] font-bold text-sage">{t.card3Sub}</div>
                  </div>
                  <div className={`rounded-xl sm:rounded-2xl border p-2 sm:p-3.5 shadow-sm ${isDark ? "border-white/10 bg-white/10" : "border-white/80 bg-white/90"}`}>
                    <div className={`text-[9px] sm:text-[11px] font-bold ${isDark ? "text-white/70" : "text-ink/70"}`}>{t.card4Title}</div>
                    <div className={`font-display mt-0.5 sm:mt-1 text-xs sm:text-lg font-bold ${isDark ? "text-white" : "text-[#242f1b]"}`}>{t.card4Val}</div>
                    <div className="mt-0.5 text-[8px] sm:text-[10px] font-bold text-sage">{t.card4Sub}</div>
                  </div>
                </div>

                <div className={`flex items-center justify-between rounded-xl sm:rounded-2xl border px-3 sm:px-4 py-1.5 sm:py-3 text-[10px] sm:text-xs font-bold ${isDark ? "border-white/10 bg-white/10 text-white/80" : "border-ink/10 bg-white/80 text-ink/80"}`}>
                  <span className="truncate">{t.autoNote}</span>
                  <span className="shrink-0 ml-2 rounded-full bg-sage px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[11px] text-ink font-bold">{t.active100}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GRAND CLOSING CTA SECTION ═══ */}
      <section
        id="mulai"
        className={`relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:py-32 transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#141b13] via-[#1f2b1d] to-[#141b13]"
            : "bg-gradient-to-b from-cream/40 via-blush/50 to-[#fffdf6]"
        }`}
      >
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-coral/20 via-sage/20 to-blush/30 blur-[100px] sm:blur-[130px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div
            data-anim
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] shadow-sm backdrop-blur-md ${
              isDark ? "border-white/15 bg-white/10 text-white/80" : "border-ink/10 bg-white/90 text-ink/80"
            }`}
          >
            {t.sec5Badge}
          </div>

          <h2
            data-anim
            className={`font-display mt-5 sm:mt-6 text-[clamp(2rem,5.5vw,4.5rem)] font-bold leading-[1.05] ${
              isDark ? "text-white" : "text-[#242f1b]"
            }`}
          >
            {t.sec5TitlePrefix} <br />
            <span className="bg-gradient-to-r from-[#e06359] via-[#bf6378] to-[#60822c] bg-clip-text text-transparent">
              {t.sec5TitleHighlight}
            </span>
          </h2>

          <p data-anim className={`mx-auto mt-4 sm:mt-6 max-w-lg text-sm sm:text-base lg:text-lg leading-relaxed ${isDark ? "text-white/75" : "text-ink/80"}`}>
            {t.sec5Desc}
          </p>

          <div data-anim className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-ink bg-gradient-to-br from-sage via-[#cee57a] to-[#b8d462] px-7 sm:px-9 py-3.5 sm:py-4 font-display text-base sm:text-lg font-bold text-ink shadow-[0_5px_0_rgba(74,84,64,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_0_rgba(74,84,64,0.18)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(74,84,64,0.2)]"
            >
              <span>{t.sec5Cta}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div data-anim className={`mt-10 sm:mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-8 text-xs sm:text-[13px] font-bold ${isDark ? "text-white/70" : "text-ink/75"}`}>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sage font-bold">✓</span> {t.sec5Feat1}
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#e06359] font-bold">✓</span> {t.sec5Feat2}
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sage font-bold">✓</span> {t.sec5Feat3}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className={`relative border-t px-4 py-8 sm:px-6 sm:py-12 transition-colors duration-500 ${isDark ? "border-white/10 bg-[#111710]" : "border-ink/10 bg-[#fffdf6]"}`}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sage font-display text-sm font-bold text-ink">
              W
            </span>
            <div>
              <div className={`font-display text-sm font-bold ${isDark ? "text-white" : "text-ink"}`}>Whale Budgeting Sanctuary</div>
              <div className={`text-[11px] ${isDark ? "text-white/60" : "text-ink/60"}`}>{t.footerText}</div>
            </div>
          </div>

          <div className={`flex items-center gap-6 text-xs font-bold ${isDark ? "text-white/65" : "text-ink/65"}`}>
            <a href="#top" className="transition hover:text-sage">{t.backToTop}</a>
            <Link href="/login" className="transition hover:text-sage">{t.loginBtn}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
