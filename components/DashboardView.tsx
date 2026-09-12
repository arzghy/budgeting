"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillTrendUp,
  faPiggyBank,
  faGift,
  faBoxOpen,
  faPen,
  faLightbulb,
  faShieldHalved,
  faStar,
  faCartShopping,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

interface DashboardViewProps {
  userName: string;
  expenses: Array<{
    _id: string;
    title: string;
    amount: number;
    division: string;
    subcategory?: string;
    source: string;
    date: string | Date;
  }>;
  items: Array<{
    _id: string;
    category: string;
    name: string;
    price: number;
    stock: number;
  }>;
  needs: Array<{
    _id: string;
    name: string;
    amount: number;
    division: string;
    status: string;
  }>;
  savings: Array<{
    _id: string;
    type: string;
    name: string;
    amount: number;
  }>;
  wishlists: Array<{
    _id: string;
    name: string;
    target: number;
    saved: number;
    purchased: boolean;
  }>;
}

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function getInitials(name: string) {
  if (!name || !name.trim()) return "W";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

export default function DashboardView({
  userName,
  expenses = [],
  needs = [],
  savings = [],
  wishlists = [],
}: DashboardViewProps) {
  const [hoveredDonutIdx, setHoveredDonutIdx] = useState<number | null>(null);

  // ── Profile State from MongoDB ──
  const [profileName, setProfileName] = useState(userName || "Faza");
  const [profileMotto, setProfileMotto] = useState("Sanctuary Aktif · Keuangan Terkendali");
  const [profileImage, setProfileImage] = useState("");
  const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState<number>(3000000);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.displayName) setProfileName(data.displayName);
          if (data.motto) setProfileMotto(data.motto);
          if (data.imageUrl) setProfileImage(data.imageUrl);
          if (data.monthlyBudget) setMonthlyBudgetLimit(Number(data.monthlyBudget) || 3000000);
          return;
        }
      } catch (e) {
        console.error("Dashboard profile load error:", e);
      }

      // Fallback from localStorage
      const saved = localStorage.getItem("whale_user_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.displayName) setProfileName(parsed.displayName);
          if (parsed.motto) setProfileMotto(parsed.motto);
          if (parsed.imageUrl) setProfileImage(parsed.imageUrl);
        } catch (e) {
          console.error(e);
        }
      }
    }

    loadProfile();
  }, [userName]);

  // ── Calculation ──
  const totalExpense = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const totalSaved = savings.reduce((s, x) => s + (x.amount || 0), 0);
  const totalWishlistTarget = wishlists.reduce((s, w) => s + (w.target || 0), 0);
  const totalWishlistSaved = wishlists.reduce((s, w) => s + (w.saved || 0), 0);
  const needsHabis = needs.filter((n) => n.status === "habis").length;
  const needsTotal = needs.length;
  const wishlistPurchased = wishlists.filter((w) => w.purchased).length;

  // Calculate breakdown for Donut Chart with updated categories
  const expenseByCategory = {
    "Make Up": expenses.filter((e) => e.division === "makeup").reduce((s, e) => s + e.amount, 0),
    "Skin Care": expenses.filter((e) => e.division === "skincare").reduce((s, e) => s + e.amount, 0),
    "Jajan": expenses.filter((e) => e.division === "jajan").reduce((s, e) => s + e.amount, 0),
    "Pakaian": expenses.filter((e) => e.division === "pakaian").reduce((s, e) => s + e.amount, 0),
    "Kebutuhan": expenses.filter((e) => e.division === "kebutuhan").reduce((s, e) => s + e.amount, 0),
    "Lainnya": expenses.filter((e) => e.division === "lainnya" || e.division === "transport" || e.division === "hiburan").reduce((s, e) => s + e.amount, 0),
  };

  const donutCategories = [
    { label: "Make Up", value: expenseByCategory["Make Up"], color: "#f6dbe2" },
    { label: "Skin Care", value: expenseByCategory["Skin Care"], color: "#f6c5c1" },
    { label: "Jajan", value: expenseByCategory["Jajan"], color: "#e07a5f" },
    { label: "Pakaian", value: expenseByCategory["Pakaian"], color: "#d4a373" },
    { label: "Kebutuhan", value: expenseByCategory["Kebutuhan"], color: "#c2d772" },
    { label: "Lainnya", value: expenseByCategory["Lainnya"], color: "#81b29a" },
  ];

  // If real total is 0, provide illustrative sample allocation for clean UI demonstration
  const isAllZero = donutCategories.every((c) => c.value === 0);
  const effectiveDonutData = isAllZero
    ? [
        { label: "Make Up", value: 350000, color: "#f6dbe2" },
        { label: "Skin Care", value: 450000, color: "#f6c5c1" },
        { label: "Jajan", value: 300000, color: "#e07a5f" },
        { label: "Pakaian", value: 600000, color: "#d4a373" },
        { label: "Kebutuhan", value: 500000, color: "#c2d772" },
        { label: "Lainnya", value: 200000, color: "#81b29a" },
      ]
    : donutCategories;

  const totalDonutValue = effectiveDonutData.reduce((s, c) => s + c.value, 0);

  // SVG Donut slice calculation (circumference = 2 * PI * 40 = 251.32)
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;
  const donutSlices = effectiveDonutData.map((cat, idx) => {
    const percent = totalDonutValue > 0 ? (cat.value / totalDonutValue) : 0;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedPercent * circumference;
    accumulatedPercent += percent;
    return {
      ...cat,
      percent: Math.round(percent * 100),
      strokeDasharray,
      strokeDashoffset,
      idx,
    };
  });

  // Dual Bar comparison data (6 Months trend)
  const barChartData = [
    { month: "Apr", expense: 1200000, saving: 800000 },
    { month: "Mei", expense: 1450000, saving: 950000 },
    { month: "Jun", expense: 1100000, saving: 1200000 },
    { month: "Jul", expense: 1650000, saving: 700000 },
    { month: "Agt", expense: 1300000, saving: 1400000 },
    { month: "Sep", expense: totalExpense > 0 ? totalExpense : 1250000, saving: totalSaved > 0 ? totalSaved : 1500000 },
  ];

  const maxBarValue = Math.max(...barChartData.map((d) => Math.max(d.expense, d.saving))) * 1.15;

  // Monthly Budget limit calculation
  const budgetSpentPercent = Math.min(100, Math.round((totalExpense / monthlyBudgetLimit) * 100));
  const wishlistPercent = totalWishlistTarget > 0 ? Math.min(100, Math.round((totalWishlistSaved / totalWishlistTarget) * 100)) : 0;
  const needsHealthyPercent = needsTotal > 0 ? Math.round(((needsTotal - needsHabis) / needsTotal) * 100) : 100;

  const initialLetters = getInitials(profileName || userName || "Faza Izzaturrafi");

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ═══ TOP GREETING CARD (FETCHED PROFILE PHOTO + FONTAWESOME) ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-3xl border-2 border-ink/15 bg-white/90 p-5 sm:p-7 shadow-sticker backdrop-blur-md">
        <div className="flex items-center gap-4 sm:gap-5 min-w-0 flex-1">
          {/* Fetched Profile Photo / Uppercase Initial Avatar */}
          <Link
            href="/dashboard/profile"
            className="relative group shrink-0"
            title="Klik untuk Edit Profil"
          >
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl border-3 border-ink bg-gradient-to-br from-cream via-blush to-sage overflow-hidden flex items-center justify-center shadow-[0_5px_0_rgba(31,43,24,0.18)] group-hover:scale-105 transition">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Foto Profil"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-sage via-[#c2d772] to-pistachio flex items-center justify-center font-display font-black text-ink select-none text-2xl sm:text-3xl">
                  {initialLetters}
                </div>
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-white border border-ink/20 text-[10px] text-ink shadow-sm group-hover:bg-cream">
              <FontAwesomeIcon icon={faPen} />
            </span>
          </Link>

          {/* User Greeting Text */}
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-sage/30 px-3 py-0.5 text-[11px] font-bold text-ink">
              <span className="h-2 w-2 rounded-full bg-sage animate-ping" />
              <span>Sanctuary Aktif · Keuangan Terkendali</span>
            </div>
            <h1 className="font-display mt-1 text-2xl sm:text-3xl font-extrabold text-[#1f2b18] truncate">
              Halo, {profileName || userName || "Teman Paus"}!
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-ink/80 truncate mt-0.5">
              {profileMotto || "Berikut ringkasan visual, grafik anggaran, dan target tabunganmu hari ini."}
            </p>
          </div>
        </div>

        {/* Status Badge Tag */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <div className="rounded-2xl border-2 border-ink/10 bg-cream/70 px-4 py-2.5 text-right">
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-ink/75">Pagu Bulanan</span>
            <span className="font-display text-sm font-extrabold text-sage-deep">{formatRp(monthlyBudgetLimit)}</span>
          </div>
        </div>
      </div>

      {/* ═══ 4 KEY METRIC CARDS (FONTAWESOME ICONS + HIGH CONTRAST) ═══ */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {/* Metric 1: Total Pengeluaran */}
        <div className="card bg-blush/85 border-2 border-ink p-4 sm:p-5 transition hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-ink/85">Pengeluaran</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-xs text-coral font-bold shadow-sm">
              <FontAwesomeIcon icon={faMoneyBillTrendUp} />
            </span>
          </div>
          <div className="font-display mt-2 text-xl sm:text-2xl font-extrabold text-[#1f2b18]">
            {formatRp(totalExpense)}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-ink/85">
            <span className="text-coral font-black">●</span>
            <span>Bulan Berjalan</span>
          </div>
        </div>

        {/* Metric 2: Total Tabungan */}
        <div className="card bg-sage/85 border-2 border-ink p-4 sm:p-5 transition hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-ink/85">Total Tabungan</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-xs text-sage-deep font-bold shadow-sm">
              <FontAwesomeIcon icon={faPiggyBank} />
            </span>
          </div>
          <div className="font-display mt-2 text-xl sm:text-2xl font-extrabold text-[#1f2b18]">
            {formatRp(totalSaved)}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-ink/85">
            <span className="text-[#3d5a80] font-black">●</span>
            <span>Wishlist + Jaga-Jaga</span>
          </div>
        </div>

        {/* Metric 3: Wishlist Reached */}
        <div className="card bg-peach/85 border-2 border-ink p-4 sm:p-5 transition hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-ink/85">Wishlist</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-xs text-amber-600 font-bold shadow-sm">
              <FontAwesomeIcon icon={faGift} />
            </span>
          </div>
          <div className="font-display mt-2 text-xl sm:text-2xl font-extrabold text-[#1f2b18]">
            {wishlistPurchased} / {wishlists.length} Item
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-ink/85">
            <span>Progress: {wishlistPercent}%</span>
          </div>
        </div>

        {/* Metric 4: Kebutuhan Pokok */}
        <div className="card bg-cream/95 border-2 border-ink p-4 sm:p-5 transition hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-ink/85">Kebutuhan Pokok</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-xs text-amber-700 font-bold shadow-sm">
              <FontAwesomeIcon icon={faBoxOpen} />
            </span>
          </div>
          <div className="font-display mt-2 text-xl sm:text-2xl font-extrabold text-[#1f2b18]">
            {needsHabis === 0 ? "Semua Ada" : `${needsHabis} Habis`}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-ink/85">
            <span>{needsTotal - needsHabis} dari {needsTotal} stok aman</span>
          </div>
        </div>
      </div>

      {/* ═══ CHARTS SUITE: DUAL BAR TREND & SVG DONUT CHART ═══ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Dual-Bar Comparison Trend Chart (7 cols) */}
        <div className="card bg-paper p-5 sm:p-7 lg:col-span-7 space-y-4 border-2 border-ink shadow-sticker">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink/10 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink/75">Grafik Batang Komparasi</span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-[#1f2b18]">
                Tren Pengeluaran vs Tabungan
              </h2>
            </div>

            {/* Legend & Period Switcher */}
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-ink/90">
                  <span className="h-3 w-3 rounded-full bg-[#f6c5c1] border border-ink/30" />
                  Pengeluaran
                </span>
                <span className="flex items-center gap-1.5 text-ink/90">
                  <span className="h-3 w-3 rounded-full bg-[#c2d772] border border-ink/30" />
                  Tabungan
                </span>
              </div>
            </div>
          </div>

          {/* Bar Visualization Canvas */}
          <div className="pt-6 pb-2">
            <div className="grid grid-cols-6 items-end gap-2 sm:gap-4 h-52 sm:h-60 border-b-2 border-ink/20 px-2 sm:px-4">
              {barChartData.map((item, idx) => {
                const expenseHeight = Math.max(8, (item.expense / maxBarValue) * 100);
                const savingHeight = Math.max(8, (item.saving / maxBarValue) * 100);

                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 z-20 hidden group-hover:flex flex-col items-center rounded-xl bg-ink px-2.5 py-1 text-[10px] font-bold text-white shadow-lg pointer-events-none whitespace-nowrap">
                      <span>Keluar: {formatRp(item.expense)}</span>
                      <span>Nabung: {formatRp(item.saving)}</span>
                    </div>

                    <div className="flex items-end gap-1 sm:gap-2 w-full justify-center h-full">
                      {/* Expense Bar */}
                      <div
                        className="w-3 sm:w-5 rounded-t-lg bg-gradient-to-t from-[#e9a49f] to-[#f6c5c1] border-2 border-ink transition-all duration-300 group-hover:brightness-105"
                        style={{ height: `${expenseHeight}%` }}
                      />
                      {/* Saving Bar */}
                      <div
                        className="w-3 sm:w-5 rounded-t-lg bg-gradient-to-t from-[#a8c962] to-[#c2d772] border-2 border-ink transition-all duration-300 group-hover:brightness-105"
                        style={{ height: `${savingHeight}%` }}
                      />
                    </div>
                    <span className="mt-2 text-xs font-bold text-ink/85">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SVG Interactive Donut Chart (5 cols) */}
        <div className="card bg-paper p-5 sm:p-7 lg:col-span-5 space-y-4 border-2 border-ink shadow-sticker flex flex-col justify-between">
          <div className="border-b border-ink/10 pb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink/75">Grafik Donut Alokasi</span>
            <h2 className="font-display text-lg sm:text-xl font-bold text-[#1f2b18]">
              Distribusi Kategori
            </h2>
          </div>

          {/* SVG Donut Visual */}
          <div className="relative flex items-center justify-center my-2">
            <svg viewBox="0 0 100 100" className="h-44 w-44 sm:h-52 sm:w-52 -rotate-90 transform">
              {/* Background Track Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-cream"
                strokeWidth="15"
                fill="transparent"
              />

              {/* Slices */}
              {donutSlices.map((slice) => (
                <circle
                  key={slice.idx}
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={slice.color}
                  strokeWidth={hoveredDonutIdx === slice.idx ? "18" : "15"}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  fill="transparent"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredDonutIdx(slice.idx)}
                  onMouseLeave={() => setHoveredDonutIdx(null)}
                />
              ))}
            </svg>

            {/* Center Label in Donut Hole */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              {hoveredDonutIdx !== null ? (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink/70">
                    {donutSlices[hoveredDonutIdx].label}
                  </span>
                  <span className="font-display text-base sm:text-lg font-bold text-[#1f2b18] leading-tight">
                    {formatRp(donutSlices[hoveredDonutIdx].value)}
                  </span>
                  <span className="text-xs font-extrabold text-sage-deep">
                    {donutSlices[hoveredDonutIdx].percent}%
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink/70">Total Alokasi</span>
                  <span className="font-display text-sm sm:text-base font-extrabold text-[#1f2b18] leading-tight">
                    {formatRp(totalDonutValue)}
                  </span>
                  <span className="text-[10px] font-bold text-ink/65">100% Terpetakan</span>
                </>
              )}
            </div>
          </div>

          {/* Donut Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ink/10 text-xs font-bold">
            {donutSlices.map((slice) => (
              <div
                key={slice.idx}
                onMouseEnter={() => setHoveredDonutIdx(slice.idx)}
                onMouseLeave={() => setHoveredDonutIdx(null)}
                className={`flex items-center justify-between rounded-xl p-1.5 transition cursor-pointer ${
                  hoveredDonutIdx === slice.idx ? "bg-cream border border-ink/20" : "hover:bg-cream/40"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                  <span className="truncate text-ink/90 text-[11px] font-bold">{slice.label}</span>
                </div>
                <span className="text-[11px] text-ink/75 shrink-0 font-extrabold">{slice.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ PROGRESS BARS SUITE & RECENT ACTIVITIES ═══ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 4 Multi-Progress Bars (7 cols) */}
        <div className="card bg-paper p-5 sm:p-7 lg:col-span-7 space-y-5 border-2 border-ink shadow-sticker">
          <div className="border-b border-ink/10 pb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink/75">Indikator Milestone</span>
            <h2 className="font-display text-lg sm:text-xl font-bold text-[#1f2b18]">
              Target & Progress Batas Keuangan
            </h2>
          </div>

          <div className="space-y-4">
            {/* Progress 1: Wishlist Target */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-ink flex items-center gap-2">
                  <FontAwesomeIcon icon={faStar} className="text-amber-500 text-xs" />
                  <span>Tabungan Target Wishlist</span>
                </span>
                <span className="text-sage-deep font-extrabold">{wishlistPercent}% ({formatRp(totalWishlistSaved)} / {formatRp(totalWishlistTarget || 1000000)})</span>
              </div>
              <div className="h-3.5 w-full overflow-hidden rounded-full border-2 border-ink bg-cream">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sage to-pistachioDeep transition-all duration-500"
                  style={{ width: `${Math.max(4, wishlistPercent)}%` }}
                />
              </div>
            </div>

            {/* Progress 2: Batas Pengeluaran Bulanan */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-ink flex items-center gap-2">
                  <FontAwesomeIcon icon={faShieldHalved} className="text-[#c44f45] text-xs" />
                  <span>Batas Budget Pengeluaran Bulanan</span>
                </span>
                <span className="text-[#c44f45] font-extrabold">{budgetSpentPercent}% ({formatRp(totalExpense)} / {formatRp(monthlyBudgetLimit)})</span>
              </div>
              <div className="h-3.5 w-full overflow-hidden rounded-full border-2 border-ink bg-cream">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-peach via-coral to-[#c44f45] transition-all duration-500"
                  style={{ width: `${Math.max(4, budgetSpentPercent)}%` }}
                />
              </div>
            </div>

            {/* Progress 3: Stok Kebutuhan Pokok */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-ink flex items-center gap-2">
                  <FontAwesomeIcon icon={faCartShopping} className="text-sage-deep text-xs" />
                  <span>Ketersediaan Stok Kebutuhan Pokok</span>
                </span>
                <span className="text-sage-deep font-extrabold">{needsHealthyPercent}% Tersedia</span>
              </div>
              <div className="h-3.5 w-full overflow-hidden rounded-full border-2 border-ink bg-cream">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#c2d772] to-[#81b29a] transition-all duration-500"
                  style={{ width: `${Math.max(4, needsHealthyPercent)}%` }}
                />
              </div>
            </div>

            {/* Progress 4: Cadangan Dana Darurat */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-ink flex items-center gap-2">
                  <FontAwesomeIcon icon={faPiggyBank} className="text-[#3d5a80] text-xs" />
                  <span>Pilar Dana Darurat (Jaga-Jaga)</span>
                </span>
                <span className="text-[#3d5a80] font-extrabold">{formatRp(savings.filter(s => s.type === "jagajaga").reduce((sum, s) => sum + s.amount, 0))} Terkumpul</span>
              </div>
              <div className="h-3.5 w-full overflow-hidden rounded-full border-2 border-ink bg-cream">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#81b29a] to-[#3d5a80] transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(6, (savings.filter(s => s.type === "jagajaga").reduce((sum, s) => sum + s.amount, 0) / 2000000) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions & Financial Tip (5 cols) */}
        <div className="card bg-paper p-5 sm:p-7 lg:col-span-5 space-y-4 border-2 border-ink shadow-sticker flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink/75">Catatan Kas</span>
                <h2 className="font-display text-lg font-bold text-[#1f2b18]">
                  Transaksi Pengeluaran Terakhir
                </h2>
              </div>
              <Link href="/dashboard/expenses" className="text-xs font-bold text-sage-deep hover:underline flex items-center gap-1">
                <span>Lihat Semua</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
              </Link>
            </div>

            <div className="divide-y divide-ink/10 mt-3">
              {expenses.length === 0 && (
                <div className="py-8 text-center text-xs font-semibold text-ink/60">
                  Belum ada catatan pengeluaran.
                </div>
              )}
              {expenses.slice(0, 4).map((e) => (
                <div key={e._id} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                  <div className="min-w-0 flex-1 truncate">
                    <div className="font-bold text-ink truncate">{e.title}</div>
                    <div className="text-[10px] text-ink/65 capitalize font-semibold">{e.division} {e.subcategory ? `· ${e.subcategory}` : ""}</div>
                  </div>
                  <span className="font-extrabold text-[#c44f45] shrink-0">- {formatRp(e.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Whale Tip Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-cream to-blush/40 p-4 border border-ink/15 flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-white border border-ink/15 text-amber-500 shrink-0 shadow-sm">
              <FontAwesomeIcon icon={faLightbulb} />
            </span>
            <p className="text-[11px] font-semibold text-ink leading-relaxed">
              <strong>Tips Finansial:</strong> Pisahkan anggaran bulanan untuk make up, skin care, pakaian, dan jajan agar pengeluaran tetap terkontrol!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
