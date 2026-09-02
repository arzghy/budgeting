"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faBullseye,
  faLock,
  faPenToSquare,
  faWandMagicSparkles,
  faBottleDroplet,
  faMugHot,
  faShirt,
  faBoxesStacked,
  faArrowUpRightFromSquare,
  faMagnifyingGlass,
  faTrashCan,
  faPlus,
  faShieldHalved,
  faPersonDress,
  faShoePrints,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

const DIVISIONS = [
  { key: "makeup", label: "Make Up", icon: faWandMagicSparkles },
  { key: "skincare", label: "Skin Care", icon: faBottleDroplet },
  { key: "jajan", label: "Jajan", icon: faMugHot },
  { key: "pakaian", label: "Pakaian", icon: faShirt },
  { key: "lainnya", label: "Lainnya", icon: faBoxesStacked },
];

const CLOTHING_SUBCATEGORIES = [
  { key: "baju", label: "Baju", icon: faShirt },
  { key: "celana", label: "Celana", icon: faLayerGroup },
  { key: "dress", label: "Dress", icon: faPersonDress },
  { key: "sepatu", label: "Sepatu", icon: faShoePrints },
];

type Expense = {
  _id: string;
  title: string;
  amount: number;
  division: string;
  subcategory?: string;
  source?: string;
  url?: string;
  date: string;
};

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ExpensesPage() {
  const [list, setList] = useState<Expense[]>([]);
  const [active, setActive] = useState("semua");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [division, setDivision] = useState("makeup");
  const [subcategory, setSubcategory] = useState("baju");
  const [url, setUrl] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ── Monthly Budget Limit State ──
  const [monthlyLimit, setMonthlyLimit] = useState<number>(0);
  const [budgetInput, setBudgetInput] = useState<string>("");
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [savingBudget, setSavingBudget] = useState(false);

  // Load expenses and profile budget limit
  async function loadData(div: string) {
    try {
      const endpoint = div === "semua" ? "/api/expenses" : `/api/expenses?division=${div}`;
      const [resExpenses, resProfile] = await Promise.all([
        fetch(endpoint),
        fetch("/api/profile"),
      ]);

      if (resExpenses.ok) {
        setList(await resExpenses.json());
      }

      if (resProfile.ok) {
        const prof = await resProfile.json();
        if (prof.monthlyBudget !== undefined) {
          setMonthlyLimit(Number(prof.monthlyBudget) || 0);
          setBudgetInput(prof.monthlyBudget ? String(prof.monthlyBudget) : "");
        }
      }
    } catch (e) {
      console.error("Error loading expenses data:", e);
    }
  }

  useEffect(() => {
    loadData(active);
  }, [active]);

  // Save Monthly Budget Limit to MongoDB
  async function handleSetMonthlyBudget(e: React.FormEvent) {
    e.preventDefault();
    const val = Number(budgetInput);
    if (!val || val <= 0) return;
    setSavingBudget(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monthlyBudget: val }),
      });

      if (res.ok) {
        setMonthlyLimit(val);
        setIsEditingBudget(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingBudget(false);
    }
  }

  async function submitExpense(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !amount) return;
    setLoading(true);

    let cleanUrl = url.trim();
    if (cleanUrl && !cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const payload = {
      title: title.trim(),
      amount: Number(amount),
      division,
      subcategory: division === "pakaian" ? subcategory : "",
      url: cleanUrl,
    };

    try {
      if (editing) {
        await fetch(`/api/expenses/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/expenses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      await loadData(active);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Hapus catatan pengeluaran ini?")) return;
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    await loadData(active);
  }

  function startEdit(e: Expense) {
    setEditing(e._id);
    setTitle(e.title);
    setAmount(String(e.amount));
    setDivision(e.division);
    if (e.subcategory) setSubcategory(e.subcategory);
    setUrl(e.url || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditing(null);
    setTitle("");
    setAmount("");
    setDivision("makeup");
    setSubcategory("baju");
    setUrl("");
  }

  const total = list.reduce((s, e) => s + (e.amount || 0), 0);
  const remainingBudget = Math.max(0, monthlyLimit - total);
  const percentUsed = monthlyLimit > 0 ? Math.min(100, Math.round((total / monthlyLimit) * 100)) : 0;

  const filteredList = list.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.subcategory && e.subcategory.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* ═══ HEADER & METRICS ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/90 px-3.5 py-1 text-xs font-bold text-ink shadow-sm">
            <FontAwesomeIcon icon={faWallet} className="text-sage-deep" />
            <span>Buku Kas Pengeluaran</span>
          </div>
          <h1 className="font-display mt-2 text-2xl sm:text-3xl font-extrabold text-[#1f2b18]">
            Catatan Pengeluaran
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-ink/80">
            Kelola pagu maksimal bulanan dan pantau pos belanja make up, skin care, jajan, dan pakaian.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-2xl border-2 border-ink bg-blush/80 px-4 py-2.5 text-center shadow-sticker">
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-ink/75">Total Pengeluaran</span>
            <span className="font-display text-lg font-extrabold text-[#c44f45]">{formatRp(total)}</span>
          </div>
          <div className="rounded-2xl border-2 border-ink bg-white px-4 py-2.5 text-center shadow-sticker">
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-ink/75">Jumlah Transaksi</span>
            <span className="font-display text-lg font-extrabold text-ink">{list.length} Catatan</span>
          </div>
        </div>
      </div>

      {/* ═══ GATEKEEPER 1: SET MAKSIMAL PENGELUARAN 1 BULAN (JIKA BELUM DISET) ═══ */}
      {monthlyLimit <= 0 || isEditingBudget ? (
        <form
          onSubmit={handleSetMonthlyBudget}
          className="card bg-paper p-5 sm:p-7 space-y-4 border-3 border-ink shadow-[0_8px_0_rgba(31,43,24,0.2)] animate-in fade-in duration-300"
        >
          <div className="flex items-center justify-between border-b border-ink/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-peach text-sm text-ink shadow-sm">
                <FontAwesomeIcon icon={faBullseye} />
              </span>
              <div>
                <h2 className="font-display text-base sm:text-lg font-bold text-[#1f2b18]">
                  {monthlyLimit > 0 ? "Ubah Batas Maksimal Pengeluaran 1 Bulan" : "Set Maksimal Pengeluaran Selama 1 Bulan"}
                </h2>
                <p className="text-xs font-semibold text-ink/80">
                  {monthlyLimit > 0
                    ? "Perbarui target pagu anggaran pengeluaran bulananmu."
                    : "Sebelum mencatat pengeluaran, tentukan batas maksimal anggaran 1 bulan terlebih dahulu."}
                </p>
              </div>
            </div>
            {monthlyLimit > 0 && isEditingBudget && (
              <button
                type="button"
                onClick={() => setIsEditingBudget(false)}
                className="btn btn-ghost text-xs py-1"
              >
                Tutup
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end pt-2">
            <div className="sm:col-span-8">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/85 mb-1.5">
                Nominal Batas Maksimal Bulanan (Rp) *
              </label>
              <input
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                type="number"
                placeholder="Contoh: 3000000"
                required
                className="field text-base font-bold"
              />
            </div>
            <div className="sm:col-span-4">
              <button
                type="submit"
                disabled={savingBudget}
                className="btn btn-primary w-full text-xs sm:text-sm py-3 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faLock} className="text-xs" />
                <span>{savingBudget ? "Menyimpan..." : "Kunci & Tetapkan Pagu →"}</span>
              </button>
            </div>
          </div>

          {/* Quick suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-bold text-ink/75">Pilihan Cepat:</span>
            {[1500000, 2500000, 3000000, 5000000, 10000000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setBudgetInput(String(val))}
                className="rounded-full border border-ink/20 bg-cream/80 px-3 py-1 text-xs font-bold text-ink hover:bg-white transition"
              >
                {formatRp(val)}
              </button>
            ))}
          </div>
        </form>
      ) : (
        /* ═══ LIVE BUDGET MONITOR CARD (JIKA SUDAH DISET) ═══ */
        <div className="card bg-paper p-5 sm:p-6 border-2 border-ink shadow-sticker space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ink/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-sage text-sm text-ink">
                <FontAwesomeIcon icon={faShieldHalved} />
              </span>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink/70 block">
                  Pagu Maksimal Bulanan
                </span>
                <h3 className="font-display text-lg font-bold text-[#1f2b18]">
                  {formatRp(monthlyLimit)}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-extrabold uppercase text-ink/70 block">Sisa Anggaran</span>
                <span className="font-display text-sm sm:text-base font-extrabold text-sage-deep">
                  {formatRp(remainingBudget)}
                </span>
              </div>
              <button
                onClick={() => setIsEditingBudget(true)}
                className="rounded-full border border-ink/20 bg-white px-3.5 py-1.5 text-xs font-bold text-ink shadow-sm hover:bg-cream transition flex items-center gap-1.5"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="text-xs text-ink/70" />
                <span>Ubah Pagu</span>
              </button>
            </div>
          </div>

          {/* Progress Bar of Budget Used */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-ink/85">
                Pengeluaran Terpakai: <span className="font-extrabold text-ink">{formatRp(total)}</span>
              </span>
              <span className={percentUsed >= 85 ? "text-coral font-black" : "text-sage-deep font-black"}>
                {percentUsed}% {percentUsed >= 100 ? "(Batas Tercapai!)" : ""}
              </span>
            </div>

            <div className="h-3.5 w-full overflow-hidden rounded-full border-2 border-ink bg-cream">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentUsed >= 85
                    ? "bg-gradient-to-r from-peach via-coral to-[#c44f45]"
                    : "bg-gradient-to-r from-sage to-pistachioDeep"
                }`}
                style={{ width: `${Math.max(3, percentUsed)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══ FORM INPUT PENGELUARAN ═══ */}
      {monthlyLimit > 0 && (
        <form onSubmit={submitExpense} className="card bg-paper p-5 sm:p-7 space-y-4 border-2 border-ink shadow-sticker">
          <div className="flex items-center justify-between border-b border-ink/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-xl bg-sage font-bold text-xs text-ink">
                <FontAwesomeIcon icon={editing ? faPenToSquare : faPlus} />
              </span>
              <h2 className="font-display text-base sm:text-lg font-bold text-[#1f2b18]">
                {editing ? "Edit Catatan Pengeluaran" : "Tambah Pengeluaran Baru"}
              </h2>
            </div>
            {editing && (
              <span className="rounded-full bg-peach px-3 py-0.5 text-xs font-bold text-ink">
                Mode Edit
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12">
            {/* Judul Pengeluaran */}
            <div className="sm:col-span-5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/85 mb-1">
                Judul Pengeluaran *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Lipstik Velvet / Kaos Polos / Kopi"
                required
                className="field"
              />
            </div>

            {/* Nominal */}
            <div className="sm:col-span-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/85 mb-1">
                Nominal (Rp) *
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="Contoh: 85000"
                required
                className="field"
              />
            </div>

            {/* Kategori Pos (Make Up, Skin Care, Jajan, Pakaian, Lainnya) */}
            <div className="sm:col-span-4">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/85 mb-1">
                Kategori Pos *
              </label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="field capitalize font-bold"
              >
                {DIVISIONS.map((d) => (
                  <option key={d.key} value={d.key}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Subkategori Pakaian (Baju, Celana, Dress, Sepatu) */}
            {division === "pakaian" && (
              <div className="sm:col-span-12 bg-cream/60 p-3.5 rounded-2xl border-2 border-ink/15 animate-in fade-in zoom-in-95 duration-200">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/85 mb-2 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faShirt} className="text-sage-deep" />
                  <span>Jenis Pakaian:</span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {CLOTHING_SUBCATEGORIES.map((sub) => (
                    <button
                      key={sub.key}
                      type="button"
                      onClick={() => setSubcategory(sub.key)}
                      className={`flex items-center gap-2 rounded-xl border-2 px-3.5 py-1.5 text-xs font-bold transition ${
                        subcategory === sub.key
                          ? "border-ink bg-sage text-ink shadow-xs scale-102 font-extrabold"
                          : "border-ink/15 bg-white text-ink/80 hover:bg-cream hover:text-ink"
                      }`}
                    >
                      <FontAwesomeIcon icon={sub.icon} className="text-xs" />
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* URL Form Input */}
            <div className="sm:col-span-12">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/85 mb-1">
                URL Bukti Pembayaran / Toko / Merchant (Opsional)
              </label>
              <div className="relative">
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://shopee.co.id/... atau link struk belanja"
                  type="url"
                  className="field pl-9"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/50">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2.5 pt-2">
            <button disabled={loading} className="btn btn-primary text-xs sm:text-sm">
              <span>{loading ? "Menyimpan..." : editing ? "Simpan Perubahan" : "+ Catat Pengeluaran"}</span>
              <span>→</span>
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="btn btn-ghost text-xs sm:text-sm">
                Batal
              </button>
            )}
          </div>
        </form>
      )}

      {/* ═══ CATEGORY FILTER TABS & SEARCH ═══ */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActive("semua")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold border-2 transition ${
              active === "semua"
                ? "border-ink bg-sage text-ink shadow-sm font-extrabold"
                : "border-ink/15 bg-white text-ink/80 hover:bg-cream"
            }`}
          >
            Semua ({list.length})
          </button>
          {DIVISIONS.map((d) => (
            <button
              key={d.key}
              onClick={() => setActive(d.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold border-2 transition flex items-center gap-1.5 ${
                active === d.key
                  ? "border-ink bg-sage text-ink shadow-sm font-extrabold"
                  : "border-ink/15 bg-white text-ink/80 hover:bg-cream"
              }`}
            >
              <FontAwesomeIcon icon={d.icon} className="text-[11px]" />
              <span>{d.label}</span>
            </button>
          ))}
        </div>

        <div className="relative max-w-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pengeluaran atau jenis pakaian..."
            className="field pl-9 py-2 text-xs"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-ink/50">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        </div>
      </div>

      {/* ═══ EXPENSE LIST ═══ */}
      <div className="space-y-3">
        {filteredList.length === 0 && (
          <div className="card bg-paper/70 border-dashed border-2 border-ink/20 p-10 text-center text-sm font-semibold text-ink/70">
            <FontAwesomeIcon icon={faWallet} className="text-3xl block mb-2 text-ink/40" />
            Belum ada catatan pengeluaran di kategori ini.
          </div>
        )}

        {filteredList.map((e) => {
          const divInfo = DIVISIONS.find((d) => d.key === e.division) || { label: e.division, icon: faBoxesStacked };
          const subInfo = CLOTHING_SUBCATEGORIES.find((s) => s.key === e.subcategory);

          return (
            <div
              key={e._id}
              className="card bg-paper p-4 sm:p-5 transition hover:-translate-y-0.5 hover:shadow-sticker flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-2 border-ink/15"
            >
              <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cream border border-ink/15 text-sm text-ink shadow-sm">
                  <FontAwesomeIcon icon={subInfo ? subInfo.icon : divInfo.icon} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-bold text-[#1f2b18] leading-tight">
                      {e.title}
                    </h3>
                    {e.subcategory && (
                      <span className="rounded-full bg-peach/80 border border-ink/15 px-2.5 py-0.5 text-[10px] font-bold text-ink flex items-center gap-1">
                        <FontAwesomeIcon icon={subInfo?.icon || faShirt} className="text-[9px]" />
                        <span>{subInfo?.label || e.subcategory}</span>
                      </span>
                    )}
                    {e.source && e.source !== "manual" && (
                      <span className="rounded-full bg-sage/40 px-2 py-0.5 text-[9px] font-bold text-ink">
                        ⚡ Otomatis ({e.source})
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-ink/80">{divInfo.label}</span>
                    <span className="text-ink/30">·</span>
                    <span className="text-ink/60 font-semibold">
                      {new Date(e.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {e.url && (
                      <>
                        <span className="text-ink/30">·</span>
                        <a
                          href={e.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-sage-deep hover:underline"
                        >
                          <span>Buka Link</span>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-ink/10">
                <div className="font-display text-lg font-extrabold text-[#c44f45]">
                  - {formatRp(e.amount)}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => startEdit(e)}
                    className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs font-bold text-ink transition hover:bg-cream flex items-center gap-1"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} className="text-[10px]" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => remove(e._id)}
                    className="rounded-full border border-ink/20 bg-[#fde8e7] px-3 py-1 text-xs font-bold text-[#c44f45] transition hover:bg-[#fbd0ce] flex items-center gap-1"
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="text-[10px]" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
