"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Whale } from "./Whale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMoneyBillWave,
  faCartShopping,
  faStar,
  faPiggyBank,
  faBell,
  faUserGear,
  faArrowRightFromBracket,
  faSun,
  faMoon,
  faXmark,
  faBars,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  { href: "/dashboard", label: "Beranda", icon: faHouse, badge: null },
  { href: "/dashboard/expenses", label: "Pengeluaran", icon: faMoneyBillWave, badge: "Buku Kas" },
  { href: "/dashboard/needs", label: "Kebutuhan", icon: faCartShopping, badge: "Otomatis" },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: faStar, badge: "Target" },
  { href: "/dashboard/save", label: "Nabung", icon: faPiggyBank, badge: "Celengan" },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Stok Kebutuhan Menipis",
    desc: "Ada item kebutuhan pokok yang ditandai habis. Pastikan kamu belanja ulang minggu ini.",
    time: "Baru saja",
    read: false,
    icon: faCartShopping,
  },
  {
    id: "notif-2",
    title: "Progress Wishlist Meningkat",
    desc: "Tabungan wishlist kamu telah mencapai 75% dari target. Sedikit lagi tercapai!",
    time: "2 jam lalu",
    read: false,
    icon: faStar,
  },
  {
    id: "notif-3",
    title: "Tips Paus Sanctuary",
    desc: "Kondisi keuangan bulan September terpantau sehat dan terkontrol dengan baik.",
    time: "1 hari lalu",
    read: true,
    icon: faPiggyBank,
  },
];

function getInitials(name: string) {
  if (!name || !name.trim()) return "W";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

export default function Sidebar() {
  const path = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Profile State ──
  const [displayName, setDisplayName] = useState("");
  const [motto, setMotto] = useState("Menuju financial freedom bareng Paus 🐋");
  const [imageUrl, setImageUrl] = useState("");

  // ── Notifications State (Clean Centered Modal) ──
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // ── Theme & Language States ──
  const [lang, setLang] = useState<"id" | "en">("id");
  const [isDark, setIsDark] = useState(false);

  // Fetch profile from MongoDB and sync localStorage
  useEffect(() => {
    async function loadUserProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.displayName) setDisplayName(data.displayName);
          if (data.motto) setMotto(data.motto);
          if (data.imageUrl) setImageUrl(data.imageUrl);
          return;
        }
      } catch (e) {
        console.error(e);
      }

      // Fallback to localStorage
      const saved = localStorage.getItem("whale_user_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.displayName) setDisplayName(parsed.displayName);
          if (parsed.motto) setMotto(parsed.motto);
          if (parsed.imageUrl) setImageUrl(parsed.imageUrl);
        } catch (e) {
          console.error(e);
        }
      } else if (session?.user?.name) {
        setDisplayName(session.user.name);
      }
    }

    loadUserProfile();

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, [session, path]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const markAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const initialLetters = getInitials(displayName || session?.user?.name || "Faza Izzaturrafi");

  return (
    <>
      {/* ═══ MOBILE / TABLET PORTRAIT TOP NAVBAR (< 1024px) ═══ */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b-2 border-ink/15 bg-gradient-to-r from-[#f6dbe2] via-[#f6c5c1] to-[#f6dbe2] px-3 sm:px-5 py-2.5 shadow-[0_6px_25px_rgba(246,219,226,0.45)] backdrop-blur-xl lg:hidden">
        {/* Left: Hamburger & Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-2xl border-2 border-ink bg-white text-sm font-bold text-ink shadow-[0_2px_0_rgba(31,43,24,0.15)] transition active:scale-95"
            aria-label="Buka Menu Sidebar"
          >
            <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} className="text-base" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Whale size={30} />
            <div>
              <span className="font-display text-xs sm:text-sm font-bold text-ink leading-tight block">
                WHALE BUDGET
              </span>
              <span className="text-[9px] font-extrabold text-ink/75 uppercase tracking-wider block">
                Sanctuary
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Notifications Button, Edit Profile Link, and Sign Out */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Notification Button */}
          <button
            type="button"
            onClick={() => setNotifModalOpen(true)}
            className="relative grid h-9 w-9 place-items-center rounded-full border-2 border-ink/15 bg-white text-sm shadow-sm transition hover:bg-cream active:scale-95 text-ink"
            title="Pusat Notifikasi"
          >
            <FontAwesomeIcon icon={faBell} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-coral text-[9px] font-bold text-white shadow-sm animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Mobile Edit Profile Button -> /dashboard/profile */}
          <Link
            href="/dashboard/profile"
            className={`flex items-center gap-1.5 rounded-full border-2 px-2.5 sm:px-3 py-1.5 text-xs font-bold transition active:scale-95 ${
              path === "/dashboard/profile"
                ? "border-ink bg-white text-ink shadow-xs"
                : "border-ink/15 bg-white/85 text-ink hover:bg-white"
            }`}
            title="Edit Profil"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Foto Profil"
                className="h-5 w-5 rounded-full object-cover border border-ink/20"
              />
            ) : (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-sage font-display text-[10px] font-black text-ink">
                {initialLetters.charAt(0)}
              </span>
            )}
            <span className="hidden xs:inline">Profil</span>
          </Link>

          {/* Mobile Sign Out */}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-full border border-ink/20 bg-white/90 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-ink shadow-sm transition hover:bg-white flex items-center gap-1.5"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-[11px]" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* ═══ MOBILE SLIDE-OVER BACKDROP OVERLAY ═══ */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity lg:hidden"
        />
      )}

      {/* ═══ CLEAN CENTERED NOTIFICATION MODAL DIALOG ═══ */}
      {notifModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl border-2 border-ink bg-paper p-5 sm:p-6 shadow-[0_25px_60px_rgba(31,43,24,0.2)]">
            <div className="flex items-center justify-between border-b-2 border-ink/10 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#f6dbe2] text-sm text-ink border border-ink/15">
                  <FontAwesomeIcon icon={faBell} />
                </span>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#1f2b18]">
                    Pemberitahuan Sanctuary
                  </h3>
                  <span className="text-[11px] text-ink/75 font-semibold block">
                    {unreadCount > 0 ? `${unreadCount} pesan belum dibaca` : "Semua pesan telah dibaca"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setNotifModalOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full border border-ink/20 text-xs font-bold text-ink hover:bg-cream"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="mt-3 divide-y divide-ink/10 max-h-[340px] overflow-y-auto pr-1">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`py-3 flex items-start gap-3 transition rounded-2xl px-2.5 my-1 ${
                    !n.read ? "bg-cream/70 border border-ink/10 font-semibold" : "opacity-80"
                  }`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white border border-ink/15 text-sm text-ink shrink-0 shadow-sm">
                    <FontAwesomeIcon icon={n.icon} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-display text-xs sm:text-sm font-bold text-ink truncate">
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-ink/60 shrink-0 font-bold">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-ink/80 leading-relaxed mt-0.5">
                      {n.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between gap-2">
              {unreadCount > 0 ? (
                <button
                  onClick={markAllNotifsAsRead}
                  className="text-xs font-bold text-sage-deep hover:underline flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
                  <span>Tandai Semua Dibaca</span>
                </button>
              ) : (
                <span className="text-xs text-ink/60 font-semibold">Semua bersih ✨</span>
              )}
              <button
                onClick={() => setNotifModalOpen(false)}
                className="rounded-full border border-ink/20 bg-white px-4 py-1.5 text-xs font-bold text-ink transition hover:bg-cream"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ SIDEBAR CONTAINER (DESKTOP: DOMINANT #f6dbe2 & #f6c5c1) ═══ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r-2 border-ink/15 bg-gradient-to-b from-[#f6dbe2] via-[#f6c5c1]/60 to-[#f6dbe2] p-5 shadow-[12px_0_40px_rgba(246,219,226,0.5)] backdrop-blur-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* ── Top Header Brand ── */}
        <div>
          <div className="flex items-center justify-between border-b-2 border-ink/10 pb-4">
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-ink bg-gradient-to-br from-[#f6ffd3] via-[#f6dbe2] to-[#c2d772] shadow-[0_3px_0_rgba(31,43,24,0.15)] transition-transform group-hover:scale-105">
                <Whale size={34} />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base font-extrabold tracking-wider text-[#1f2b18]">
                  WHALE BUDGET
                </span>
                <span className="text-[9px] font-extrabold tracking-[0.22em] text-ink/80 uppercase">
                  Sanctuary Keuangan
                </span>
              </div>
            </Link>

            {/* Mobile close button inside drawer */}
            <button
              onClick={() => setMobileOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full border border-ink/20 bg-white/70 text-xs font-bold text-ink hover:bg-white lg:hidden"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* ── DESKTOP NOTIFICATION & EDIT PROFILE BAR ── */}
          <div className="hidden lg:flex items-center justify-between gap-2 mt-4 p-2 rounded-2xl border-2 border-ink/10 bg-[#f6c5c1]/35 backdrop-blur-sm">
            {/* Notification Button */}
            <button
              type="button"
              onClick={() => setNotifModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white/90 py-1.5 text-xs font-bold text-ink shadow-sm transition hover:bg-[#f6ffd3] active:scale-95"
            >
              <FontAwesomeIcon icon={faBell} className="text-xs text-ink/80" />
              <span>Notifikasi</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-coral px-1.5 py-0.2 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Edit Profile Link -> /dashboard/profile */}
            <Link
              href="/dashboard/profile"
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl border py-1.5 text-xs font-bold shadow-sm transition active:scale-95 ${
                path === "/dashboard/profile"
                  ? "border-ink bg-white text-ink shadow-xs"
                  : "border-ink/15 bg-white/90 text-ink hover:bg-[#c2d772]/40"
              }`}
            >
              <FontAwesomeIcon icon={faUserGear} className="text-xs text-ink/80" />
              <span>Edit Profil</span>
            </Link>
          </div>

          {/* ── Navigation Menu List ── */}
          <div className="mt-5 space-y-1.5">
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-[0.25em] text-ink/75 block mb-2">
              ✦ Modul Sanctuary
            </span>

            {menuItems.map((item) => {
              const isActive = path === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "border-2 border-ink bg-gradient-to-r from-[#c2d772] via-[#cee57a] to-[#c2d772] text-ink shadow-[0_4px_0_rgba(31,43,24,0.18)] translate-x-1"
                      : "border-2 border-transparent text-ink/90 hover:bg-white/70 hover:text-ink hover:border-ink/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-xl bg-white/60 border border-ink/10 text-xs text-ink transition-transform group-hover:scale-110">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    <span className="font-bold">{item.label}</span>
                  </div>

                  {item.badge && !isActive && (
                    <span className="rounded-full bg-[#f6ffd3] border border-ink/10 px-2 py-0.5 text-[9px] font-bold text-ink/80">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-ink animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Section: Profile Card, Theme/Lang & Logout ── */}
        <div className="border-t-2 border-ink/10 pt-4 space-y-3">
          {/* User Info Card linking to /dashboard/profile */}
          <Link
            href="/dashboard/profile"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-2xl border-2 p-2.5 transition group ${
              path === "/dashboard/profile"
                ? "border-ink bg-white shadow-xs"
                : "border-ink/10 bg-gradient-to-r from-[#f6ffd3]/90 via-white/80 to-[#f6c5c1]/60 hover:bg-white hover:border-ink/20"
            }`}
            title="Klik untuk Pengaturan Profil"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#c2d772] to-[#f6c5c1] overflow-hidden flex items-center justify-center font-display text-sm font-black text-ink border border-ink/20 shrink-0 shadow-sm group-hover:scale-105 transition select-none">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Foto Profil"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initialLetters}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-bold text-ink truncate leading-tight">
                  {displayName || session?.user?.name || "Teman Paus"}
                </span>
                <span className="text-[10px] text-sage-deep opacity-0 group-hover:opacity-100 transition">
                  <FontAwesomeIcon icon={faUserGear} />
                </span>
              </div>
              <div className="text-[10px] text-ink/75 truncate font-semibold mt-0.5">
                {motto}
              </div>
            </div>
          </Link>

          {/* ── CONTROLS: Light/Dark Mode + Language Switch + Logout ── */}
          <div className="flex items-center justify-between gap-1.5">
            {/* Language Switcher Pill */}
            <div className="flex items-center rounded-full border border-ink/15 bg-[#f6ffd3]/90 p-0.5 text-[11px] font-bold shadow-sm">
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`rounded-full px-2 py-0.5 transition ${
                  lang === "id" ? "bg-[#c2d772] text-ink font-bold shadow-xs" : "text-ink/70 hover:text-ink"
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-2 py-0.5 transition ${
                  lang === "en" ? "bg-[#c2d772] text-ink font-bold shadow-xs" : "text-ink/70 hover:text-ink"
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 bg-[#f6ffd3]/90 text-xs text-ink shadow-sm transition hover:bg-white active:scale-95"
              title={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
            >
              <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
            </button>

            {/* Keluar Button */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full border-2 border-ink bg-gradient-to-r from-[#f6c5c1] to-[#f6dbe2] px-3.5 py-1 text-xs font-bold text-ink shadow-[0_2px_0_rgba(31,43,24,0.15)] transition hover:bg-white active:translate-y-0.5 flex items-center gap-1.5"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-[10px]" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
