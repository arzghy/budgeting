"use client";
import React, { useEffect, useState } from "react";

type Need = {
  _id: string;
  name: string;
  amount: number;
  division: string;
  status: "tersisa" | "habis";
  url?: string;
};

const DIVISIONS = [
  { key: "kebutuhan", label: "Pokok", icon: "🛒" },
  { key: "dapur", label: "Dapur", icon: "🍳" },
  { key: "mandi", label: "Kamar Mandi", icon: "🚿" },
  { key: "rumah", label: "Rumah Tangga", icon: "🏠" },
];

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function NeedsPage() {
  const [list, setList] = useState<Need[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [division, setDivision] = useState("kebutuhan");
  const [url, setUrl] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const r = await fetch("/api/needs");
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
    if (!name.trim()) return;
    setLoading(true);

    let cleanUrl = url.trim();
    if (cleanUrl && !cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const payload = {
      name: name.trim(),
      amount: Number(amount) || 0,
      division,
      url: cleanUrl,
    };

    try {
      if (editing) {
        await fetch(`/api/needs/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/needs", {
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

  async function toggleStatus(n: Need) {
    const status = n.status === "tersisa" ? "habis" : "tersisa";
    await fetch(`/api/needs/${n._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Hapus item kebutuhan ini?")) return;
    await fetch(`/api/needs/${id}`, { method: "DELETE" });
    await load();
  }

  function startEdit(n: Need) {
    setEditing(n._id);
    setName(n.name);
    setAmount(n.amount ? String(n.amount) : "");
    setDivision(n.division);
    setUrl(n.url || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setEditing(null);
    setName("");
    setAmount("");
    setDivision("kebutuhan");
    setUrl("");
  }

  const tersisa = list.filter((n) => n.status === "tersisa");
  const habis = list.filter((n) => n.status === "habis");

  function NeedRow({ n, isHabis }: { n: Need; isHabis: boolean }) {
    const divObj = DIVISIONS.find((d) => d.key === n.division) || { label: n.division, icon: "🛒" };

    return (
      <div
        className={`card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-2 transition ${
          isHabis ? "bg-blush/40 border-coral/30" : "bg-paper border-ink/15 hover:shadow-sticker"
        }`}
      >
        <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cream border border-ink/15 text-base shadow-sm">
            {divObj.icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`font-display text-base font-bold leading-tight ${isHabis ? "line-through text-ink/50" : "text-[#242f1b]"}`}>
                {n.name}
              </h3>
              {isHabis && (
                <span className="rounded-full bg-coral/30 px-2 py-0.5 text-[9px] font-bold text-[#c44f45]">
                  Habis · Auto Pengeluaran
                </span>
              )}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-ink/80">{formatRp(n.amount)}</span>
              <span className="text-ink/30">·</span>
              <span className="font-semibold text-ink/60">{divObj.label}</span>
              {n.url && (
                <>
                  <span className="text-ink/30">·</span>
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-sage-deep hover:underline"
                  >
                    <span>🔗 Link Beli</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-ink/10">
          <button
            onClick={() => toggleStatus(n)}
            className={`btn text-xs font-bold ${isHabis ? "btn-ghost" : "btn-primary"}`}
          >
            {isHabis ? "🔄 Reset Stok Ada" : "✓ Tandai Habis"}
          </button>
          <button onClick={() => startEdit(n)} className="btn btn-ghost text-xs">
            Edit
          </button>
          <button onClick={() => remove(n._id)} className="btn btn-blush text-xs">
            Hapus
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ═══ HEADER & METRICS ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-bold text-ink shadow-sm">
            <span>🛒</span>
            <span>Manajemen Kebutuhan Pokok</span>
          </div>
          <h1 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-[#242f1b]">
            Kebutuhan Rumah Tangga
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-ink/70">
            Daftar kebutuhan logistik harian. Saat ditandai habis, otomatis terkonversi ke pos pengeluaran.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-2xl border-2 border-ink/15 bg-sage/40 px-4 py-2.5 text-center shadow-sm">
            <span className="block text-[10px] font-bold uppercase text-ink/60">Tersisa</span>
            <span className="font-display text-lg font-bold text-ink">{tersisa.length} Item</span>
          </div>
          <div className="rounded-2xl border-2 border-ink/15 bg-blush px-4 py-2.5 text-center shadow-sm">
            <span className="block text-[10px] font-bold uppercase text-ink/60">Perlu Beli</span>
            <span className="font-display text-lg font-bold text-[#c44f45]">{habis.length} Item</span>
          </div>
        </div>
      </div>

      {/* ═══ FORM INPUT (WITH URL FIELD) ═══ */}
      <form onSubmit={submit} className="card bg-paper p-5 sm:p-7 space-y-4 border-2 border-ink shadow-sticker">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-xl bg-sage font-bold text-xs">
              {editing ? "✏️" : "🛒"}
            </span>
            <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
              {editing ? "Edit Item Kebutuhan" : "Tambah Kebutuhan Baru"}
            </h2>
          </div>
          {editing && (
            <span className="rounded-full bg-peach px-3 py-0.5 text-xs font-bold text-ink">
              Mode Edit
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12">
          {/* Nama Kebutuhan */}
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Nama Kebutuhan *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Beras Premium 5kg / Sabun Cuci"
              required
              className="field"
            />
          </div>

          {/* Estimasi Harga */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Estimasi Harga (Rp)
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="Contoh: 75000"
              className="field"
            />
          </div>

          {/* Kategori */}
          <div className="sm:col-span-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Kategori Kebutuhan
            </label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="field capitalize"
            >
              {DIVISIONS.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.icon} {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* URL Form Input */}
          <div className="sm:col-span-12">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              URL Toko / Link Pembelian Ulang (Opsional)
            </label>
            <div className="relative">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://tokopedia.link/... atau supermarket online"
                type="url"
                className="field pl-9"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/40">🔗</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2.5 pt-2">
          <button disabled={loading} className="btn btn-primary text-xs sm:text-sm">
            <span>{loading ? "Menyimpan..." : editing ? "Simpan Perubahan" : "+ Tambah Kebutuhan"}</span>
            <span>→</span>
          </button>
          {editing && (
            <button type="button" onClick={reset} className="btn btn-ghost text-xs sm:text-sm">
              Batal
            </button>
          )}
        </div>
      </form>

      {/* ═══ TERSISA (IN-STOCK) SECTION ═══ */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-sage" />
            <h2 className="font-display text-lg font-bold text-[#242f1b]">
              Stok Tersedia (Siap Pakai)
            </h2>
          </div>
          <span className="text-xs font-bold text-ink/60">{tersisa.length} Item</span>
        </div>

        <div className="space-y-2.5">
          {tersisa.length === 0 && (
            <div className="card bg-paper/70 border-dashed border-2 border-ink/20 p-8 text-center text-sm font-semibold text-ink/60">
              Semua stok kebutuhan habis atau belum ada item tercatat.
            </div>
          )}
          {tersisa.map((n) => (
            <NeedRow key={n._id} n={n} isHabis={false} />
          ))}
        </div>
      </section>

      {/* ═══ HABIS (OUT-OF-STOCK) SECTION ═══ */}
      {habis.length > 0 && (
        <section className="space-y-3 pt-4 border-t border-ink/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-coral" />
              <h2 className="font-display text-lg font-bold text-[#c44f45]">
                Stok Habis (Perlu Dibeli)
              </h2>
            </div>
            <span className="text-xs font-bold text-coral">{habis.length} Item</span>
          </div>

          <div className="space-y-2.5">
            {habis.map((n) => (
              <NeedRow key={n._id} n={n} isHabis={true} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
