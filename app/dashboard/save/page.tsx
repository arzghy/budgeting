"use client";
import React, { useEffect, useState } from "react";

type Saving = {
  _id: string;
  type: "wishlist" | "jagajaga";
  refId?: string | null;
  name: string;
  amount: number;
  url?: string;
  createdAt: string;
};

type Wish = {
  _id: string;
  name: string;
  target: number;
  saved: number;
};

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function SavePage() {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"wishlist" | "jagajaga">("jagajaga");
  const [refId, setRefId] = useState<string>("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const [s, w] = await Promise.all([
        fetch("/api/savings").then((r) => r.json()),
        fetch("/api/wishlist").then((r) => r.json()),
      ]);
      setSavings(s || []);
      setWishes(w || []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount) return;
    setLoading(true);

    let cleanUrl = url.trim();
    if (cleanUrl && !cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const payload = {
      type,
      refId: type === "wishlist" ? refId || null : null,
      name:
        type === "wishlist"
          ? wishes.find((x) => x._id === refId)?.name || name || "Wishlist"
          : name || "Dana Jaga-jaga",
      amount: Number(amount),
      url: cleanUrl,
    };

    try {
      await fetch("/api/savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (type === "wishlist" && refId) {
        const w = wishes.find((x) => x._id === refId);
        if (w) {
          await fetch(`/api/wishlist/${refId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ saved: (w.saved || 0) + Number(amount) }),
          });
        }
      }

      setName("");
      setAmount("");
      setRefId("");
      setUrl("");
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Hapus catatan nabung ini?")) return;
    await fetch(`/api/savings/${id}`, { method: "DELETE" });
    await load();
  }

  const totalWishlist = savings
    .filter((s) => s.type === "wishlist")
    .reduce((s, x) => s + (x.amount || 0), 0);
  const totalJaga = savings
    .filter((s) => s.type === "jagajaga")
    .reduce((s, x) => s + (x.amount || 0), 0);
  const total = totalWishlist + totalJaga;

  return (
    <div className="space-y-6">
      {/* ═══ HEADER & METRICS ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-bold text-ink shadow-sm">
            <span>🏦</span>
            <span>Pilar Tabungan & Celengan</span>
          </div>
          <h1 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-[#242f1b]">
            Celengan Ganda (Nabung)
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-ink/70">
            Pisahkan tabungan impian untuk wishlist dan dana darurat untuk kebutuhan jaga-jaga.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-ink/15 bg-sage/40 px-5 py-3 text-center shadow-sm shrink-0">
          <span className="block text-[10px] font-bold uppercase text-ink/60">Total Tabungan Akumulasi</span>
          <span className="font-display text-2xl font-bold text-[#242f1b]">{formatRp(total)}</span>
        </div>
      </div>

      {/* ═══ 2 PILLAR SUMMARY CARDS ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card bg-blush/60 p-5 border-2 border-ink transition hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/70">Pilar 1: Tabungan Wishlist</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs shadow-sm">⭐</span>
          </div>
          <div className="font-display mt-2 text-2xl font-bold text-ink leading-tight">
            {formatRp(totalWishlist)}
          </div>
          <p className="mt-1 text-xs font-semibold text-ink/60">
            Terhubung otomatis ke target barang idamanmu
          </p>
        </div>

        <div className="card bg-sage/60 p-5 border-2 border-ink transition hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/70">Pilar 2: Dana Jaga-Jaga</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs shadow-sm">🛡️</span>
          </div>
          <div className="font-display mt-2 text-2xl font-bold text-ink leading-tight">
            {formatRp(totalJaga)}
          </div>
          <p className="mt-1 text-xs font-semibold text-ink/60">
            Cadangan darurat siap pakai kapan saja
          </p>
        </div>
      </div>

      {/* ═══ FORM INPUT (WITH URL FIELD) ═══ */}
      <form onSubmit={submit} className="card bg-paper p-5 sm:p-7 space-y-4 border-2 border-ink shadow-sticker">
        <div className="flex items-center gap-2 border-b border-ink/10 pb-3">
          <span className="grid h-7 w-7 place-items-center rounded-xl bg-sage font-bold text-xs">
            🏦
          </span>
          <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
            Setor / Catat Tabungan Baru
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12">
          {/* Tipe Celengan */}
          <div className="sm:col-span-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Pilih Pilar Celengan
            </label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as any);
                setRefId("");
                setName("");
              }}
              className="field"
            >
              <option value="jagajaga">🛡️ Dana Jaga-Jaga (Darurat)</option>
              <option value="wishlist">⭐ Untuk Wishlist Tertentu</option>
            </select>
          </div>

          {/* Wishlist Selector / Keterangan */}
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              {type === "wishlist" ? "Pilih Target Wishlist" : "Keterangan (Opsional)"}
            </label>
            {type === "wishlist" ? (
              <select
                value={refId}
                onChange={(e) => {
                  setRefId(e.target.value);
                  setName(e.target.value);
                }}
                required
                className="field"
              >
                <option value="">-- Pilih Wishlist Terdaftar --</option>
                {wishes.map((w) => (
                  <option key={w._id} value={w._id}>
                    {w.name} (Terkumpul: {formatRp(w.saved)})
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Sisih gaji bulan ini / Tabungan cadangan"
                className="field"
              />
            )}
          </div>

          {/* Nominal */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Nominal Setoran (Rp) *
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="Contoh: 500000"
              required
              className="field"
            />
          </div>

          {/* URL Form Input */}
          <div className="sm:col-span-12">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              URL Bukti Transfer / Rekening Tabungan (Opsional)
            </label>
            <div className="relative">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://mutasi.link/... atau bukti transfer bank"
                type="url"
                className="field pl-9"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/40">🔗</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-2">
          <button disabled={loading} className="btn btn-primary text-xs sm:text-sm">
            <span>{loading ? "Menyimpan..." : "+ Masukkan ke Celengan"}</span>
            <span>→</span>
          </button>
        </div>
      </form>

      {/* ═══ SAVINGS HISTORY LIST (WITH URL LINK PREVIEW) ═══ */}
      <div className="space-y-3">
        <h2 className="font-display text-lg font-bold text-[#242f1b]">
          Riwayat Setoran Tabungan
        </h2>

        {savings.length === 0 && (
          <div className="card bg-paper/70 border-dashed border-2 border-ink/20 p-10 text-center text-sm font-semibold text-ink/60">
            <span className="text-3xl block mb-2">🏦</span>
            Belum ada catatan setoran tabungan. Mulai nabung sekarang!
          </div>
        )}

        {savings.map((s) => (
          <div
            key={s._id}
            className="card bg-paper p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-2 border-ink/15 transition hover:shadow-sticker"
          >
            <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cream border border-ink/15 text-base shadow-sm">
                {s.type === "wishlist" ? "⭐" : "🛡️"}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-bold text-[#242f1b]">
                    {s.name}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      s.type === "wishlist" ? "bg-peach text-ink" : "bg-sage/40 text-ink"
                    }`}
                  >
                    {s.type === "wishlist" ? "Pilar Wishlist" : "Pilar Jaga-Jaga"}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-ink/60">
                    {new Date(s.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {s.url && (
                    <>
                      <span className="text-ink/30">·</span>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-sage-deep hover:underline"
                      >
                        <span>🔗 Buka Link Bukti</span>
                        <span className="text-[10px]">↗</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-ink/10">
              <div className="font-display text-lg font-bold text-sage-deep">
                + {formatRp(s.amount)}
              </div>
              <button
                onClick={() => remove(s._id)}
                className="rounded-full border border-ink/20 bg-[#fde8e7] px-3 py-1 text-xs font-bold text-[#c44f45] transition hover:bg-[#fbd0ce]"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
