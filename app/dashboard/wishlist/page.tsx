"use client";
import React, { useEffect, useState } from "react";

type Wish = {
  _id: string;
  name: string;
  target: number;
  saved: number;
  purchased: boolean;
  url?: string;
};

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function WishlistPage() {
  const [list, setList] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [url, setUrl] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [savedInput, setSavedInput] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const r = await fetch("/api/wishlist");
      if (r.ok) {
        setList(await r.json());
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !target) return;
    setLoading(true);

    let cleanUrl = url.trim();
    if (cleanUrl && !cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const payload = {
      name: name.trim(),
      target: Number(target),
      saved: 0,
      url: cleanUrl,
    };

    try {
      if (editing) {
        await fetch(`/api/wishlist/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      reset();
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateSaved(w: Wish, val: number) {
    await fetch(`/api/wishlist/${w._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ saved: Math.max(0, Math.min(val, w.target)) }),
    });
    setSavedInput((prev) => ({ ...prev, [w._id]: "" }));
    await load();
  }

  async function purchase(w: Wish) {
    if (!confirm(`Beli "${w.name}" sekarang? Nominal akan otomatis dicatat ke Buku Kas Pengeluaran.`)) return;
    await fetch(`/api/wishlist/${w._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ purchased: true, saved: w.target }),
    });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Hapus wishlist ini?")) return;
    await fetch(`/api/wishlist/${id}`, { method: "DELETE" });
    await load();
  }

  function startEdit(w: Wish) {
    setEditing(w._id);
    setName(w.name);
    setTarget(String(w.target));
    setUrl(w.url || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setEditing(null);
    setName("");
    setTarget("");
    setUrl("");
  }

  const totalTarget = list.reduce((s, w) => s + (w.target || 0), 0);
  const totalSaved = list.reduce((s, w) => s + (w.saved || 0), 0);
  const purchasedCount = list.filter((w) => w.purchased).length;
  const overallPercent = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* ═══ HEADER & METRICS ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-bold text-ink shadow-sm">
            <span>⭐</span>
            <span>Impian & Target Belanja</span>
          </div>
          <h1 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-[#242f1b]">
            Wishlist Sanctuary
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-ink/70">
            Kumpulkan tabungan untuk barang idamanmu, pantau progress, dan beli tanpa rasa bersalah.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-2xl border-2 border-ink/15 bg-sage/40 px-4 py-2.5 text-center shadow-sm">
            <span className="block text-[10px] font-bold uppercase text-ink/60">Terkumpul</span>
            <span className="font-display text-lg font-bold text-[#242f1b]">{formatRp(totalSaved)}</span>
          </div>
          <div className="rounded-2xl border-2 border-ink/15 bg-peach px-4 py-2.5 text-center shadow-sm">
            <span className="block text-[10px] font-bold uppercase text-ink/60">Progress Total</span>
            <span className="font-display text-lg font-bold text-ink">{overallPercent}%</span>
          </div>
        </div>
      </div>

      {/* ═══ FORM INPUT (WITH URL FIELD) ═══ */}
      <form onSubmit={submit} className="card bg-paper p-5 sm:p-7 space-y-4 border-2 border-ink shadow-sticker">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-xl bg-sage font-bold text-xs">
              {editing ? "✏️" : "⭐"}
            </span>
            <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
              {editing ? "Edit Barang Impian" : "Tambah Wishlist Baru"}
            </h2>
          </div>
          {editing && (
            <span className="rounded-full bg-peach px-3 py-0.5 text-xs font-bold text-ink">
              Mode Edit
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12">
          {/* Nama Barang */}
          <div className="sm:col-span-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Nama Barang Impian *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: iPad Air M2 256GB / Parfum Maison"
              required
              className="field"
            />
          </div>

          {/* Target Harga */}
          <div className="sm:col-span-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Target Harga (Rp) *
            </label>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              type="number"
              placeholder="Contoh: 10500000"
              required
              className="field"
            />
          </div>

          {/* URL Form Input */}
          <div className="sm:col-span-12">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              URL Produk / Toko Marketplace (Opsional)
            </label>
            <div className="relative">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://ibox.co.id/... atau link marketplace"
                type="url"
                className="field pl-9"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/40">🔗</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2.5 pt-2">
          <button disabled={loading} className="btn btn-primary text-xs sm:text-sm">
            <span>{loading ? "Menyimpan..." : editing ? "Simpan Perubahan" : "+ Tambah ke Wishlist"}</span>
            <span>→</span>
          </button>
          {editing && (
            <button type="button" onClick={reset} className="btn btn-ghost text-xs sm:text-sm">
              Batal
            </button>
          )}
        </div>
      </form>

      {/* ═══ WISHLIST CARDS ═══ */}
      <div className="space-y-4">
        {list.length === 0 && (
          <div className="card bg-paper/70 border-dashed border-2 border-ink/20 p-10 text-center text-sm font-semibold text-ink/60">
            <span className="text-3xl block mb-2">⭐</span>
            Belum ada barang impian yang dicatat. Buat target pertamamu sekarang!
          </div>
        )}

        {list.map((w) => {
          const pct = w.target > 0 ? Math.min(100, (w.saved / w.target) * 100) : 0;
          const remaining = Math.max(0, w.target - w.saved);
          const inputVal = savedInput[w._id] ?? "";

          return (
            <div
              key={w._id}
              className={`card p-5 sm:p-6 transition hover:shadow-sticker border-2 ${
                w.purchased ? "bg-blush/50 border-peach" : "bg-paper border-ink/15"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-[#242f1b]">
                      {w.name}
                    </h3>
                    {w.purchased ? (
                      <span className="rounded-full bg-sage px-2.5 py-0.5 text-[10px] font-bold text-ink">
                        🎉 Sudah Dibeli
                      </span>
                    ) : (
                      <span className="rounded-full bg-cream border border-ink/10 px-2.5 py-0.5 text-[10px] font-bold text-ink/70">
                        {pct >= 100 ? "Siap Dibeli ✨" : "Sedang Menabung"}
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-sage-deep text-sm">{formatRp(w.saved)}</span>
                    <span className="text-ink/40">terkumpul dari target</span>
                    <span className="font-bold text-ink text-sm">{formatRp(w.target)}</span>
                    {w.url && (
                      <>
                        <span className="text-ink/30">·</span>
                        <a
                          href={w.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-sage-deep hover:underline"
                        >
                          <span>🔗 Buka Link Produk</span>
                          <span className="text-[10px]">↗</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-start">
                  <button onClick={() => startEdit(w)} className="btn btn-ghost text-xs">
                    Edit
                  </button>
                  <button onClick={() => remove(w._id)} className="btn btn-blush text-xs">
                    Hapus
                  </button>
                </div>
              </div>

              {!w.purchased && (
                <div className="mt-4 pt-3 border-t border-ink/10">
                  {/* Progress Bar */}
                  <div className="h-4 w-full overflow-hidden rounded-full border-2 border-ink bg-cream">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sage via-[#b8d462] to-sage-deep transition-all duration-500"
                      style={{ width: `${Math.max(4, pct)}%` }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs font-semibold text-ink/70">
                    <span>
                      Sisa yang dibutuhkan: <span className="font-bold text-ink">{formatRp(remaining)}</span>
                    </span>
                    <span className="font-display text-sm font-bold text-sage-deep">{pct.toFixed(0)}%</span>
                  </div>

                  {/* Quick Save Allocation Form */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 bg-cream/50 rounded-2xl p-3 border border-ink/10">
                    <span className="text-xs font-bold text-ink/75">Update Saldo Tabungan:</span>
                    <input
                      type="number"
                      placeholder={String(w.saved)}
                      value={inputVal}
                      onChange={(e) => setSavedInput({ ...savedInput, [w._id]: e.target.value })}
                      className="field w-32 py-1.5 text-xs"
                    />
                    <button
                      onClick={() => inputVal !== "" && updateSaved(w, Number(inputVal))}
                      className="btn btn-ghost text-xs py-1.5"
                    >
                      Simpan Saldo
                    </button>
                    <button
                      onClick={() => purchase(w)}
                      className="btn btn-primary text-xs py-1.5 ml-auto"
                    >
                      🛒 Beli Sekarang
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
