"use client";
import React, { useEffect, useState } from "react";

type Item = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  notes?: string;
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

export default function ItemsPage({
  category,
  title,
}: {
  category: "skincare" | "makeup";
  title: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("1");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const icon = category === "skincare" ? "🧴" : "💄";
  const bgBadge = category === "skincare" ? "bg-sage/40 text-ink" : "bg-blush text-ink";

  async function load() {
    try {
      const r = await fetch(`/api/items?category=${category}`);
      if (r.ok) {
        setItems(await r.json());
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, [category]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);

    let cleanUrl = url.trim();
    if (cleanUrl && !cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const payload = {
      category,
      name: name.trim(),
      price: Number(price) || 0,
      stock: Number(stock) || 1,
      notes: notes.trim(),
      url: cleanUrl,
    };

    try {
      if (editing) {
        await fetch(`/api/items/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/items", {
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

  function startEdit(it: Item) {
    setEditing(it._id);
    setName(it.name);
    setPrice(it.price ? String(it.price) : "");
    setStock(String(it.stock || 1));
    setNotes(it.notes || "");
    setUrl(it.url || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function updateStock(it: Item, newStock: number) {
    if (newStock < 0) return;
    await fetch(`/api/items/${it._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: newStock }),
    });
    await load();
  }

  async function remove(id: string) {
    if (!confirm(`Hapus item ${title.toLowerCase()} ini?`)) return;
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    await load();
  }

  function reset() {
    setEditing(null);
    setName("");
    setPrice("");
    setStock("1");
    setNotes("");
    setUrl("");
  }

  const totalValue = items.reduce((s, it) => s + (it.price || 0) * (it.stock || 1), 0);
  const totalStock = items.reduce((s, it) => s + (it.stock || 0), 0);

  const filteredItems = items.filter((it) =>
    it.name.toLowerCase().includes(search.toLowerCase()) ||
    (it.notes && it.notes.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* ═══ HEADER & SUMMARY CARDS ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-bold text-ink shadow-sm">
            <span>{icon}</span>
            <span>Katalog {title}</span>
          </div>
          <h1 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-[#242f1b] capitalize">
            {title} Sanctuary
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-ink/70">
            Kelola inventaris, harga produk, sisa stok, dan tautan belanja {title.toLowerCase()} kamu.
          </p>
        </div>

        {/* Mini Stats Summary */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-2xl border-2 border-ink/15 bg-white/90 px-4 py-2.5 text-center shadow-sm">
            <span className="block text-[10px] font-bold uppercase text-ink/60">Total Item</span>
            <span className="font-display text-lg font-bold text-ink">{items.length} Produk</span>
          </div>
          <div className="rounded-2xl border-2 border-ink/15 bg-sage/40 px-4 py-2.5 text-center shadow-sm">
            <span className="block text-[10px] font-bold uppercase text-ink/60">Total Nilai</span>
            <span className="font-display text-lg font-bold text-[#242f1b]">{formatRp(totalValue)}</span>
          </div>
        </div>
      </div>

      {/* ═══ FORM INPUT (WITH URL FIELD) ═══ */}
      <form onSubmit={submit} className="card bg-paper p-5 sm:p-7 space-y-4 border-2 border-ink shadow-sticker">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-xl bg-sage font-bold text-xs">
              {editing ? "✏️" : "✨"}
            </span>
            <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
              {editing ? `Edit Produk ${title}` : `Tambah Produk ${title} Baru`}
            </h2>
          </div>
          {editing && (
            <span className="rounded-full bg-peach px-3 py-0.5 text-xs font-bold text-ink">
              Mode Edit
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12">
          {/* Nama Produk */}
          <div className="sm:col-span-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Nama Produk *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Contoh: ${category === "skincare" ? "Serum Niacinamide 10%" : "Cushion Matte Shade 02"}`}
              required
              className="field"
            />
          </div>

          {/* Harga */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Harga Satuan (Rp)
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Contoh: 125000"
              type="number"
              className="field"
            />
          </div>

          {/* Stok */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Jumlah Stok
            </label>
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="1"
              type="number"
              min="0"
              className="field"
            />
          </div>

          {/* URL Form Input */}
          <div className="sm:col-span-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              URL Produk / Toko (Opsional)
            </label>
            <div className="relative">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://shopee.co.id/... atau link toko"
                type="url"
                className="field pl-9"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/40">🔗</span>
            </div>
          </div>

          {/* Catatan */}
          <div className="sm:col-span-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Catatan Khusus (Opsional)
            </label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Expire Okt 2026, Shade Light Beige"
              className="field"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2.5 pt-2">
          <button disabled={loading} className="btn btn-primary text-xs sm:text-sm">
            <span>{loading ? "Menyimpan..." : editing ? "Simpan Perubahan" : `+ Tambah ke ${title}`}</span>
            <span>→</span>
          </button>
          {editing && (
            <button type="button" onClick={reset} className="btn btn-ghost text-xs sm:text-sm">
              Batal
            </button>
          )}
        </div>
      </form>

      {/* ═══ FILTER & SEARCH BAR ═══ */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Cari ${title.toLowerCase()}...`}
            className="field pl-9 py-2 text-xs"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-ink/40">🔍</span>
        </div>
        <span className="text-xs font-bold text-ink/60">
          Menampilkan {filteredItems.length} dari {items.length} item
        </span>
      </div>

      {/* ═══ ITEM LIST (WITH URL LINK PREVIEW) ═══ */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {filteredItems.length === 0 && (
          <div className="col-span-full card bg-paper/70 border-dashed border-2 border-ink/20 p-10 text-center text-sm font-semibold text-ink/60">
            <span className="text-3xl block mb-2">{icon}</span>
            Belum ada produk {title.toLowerCase()} yang dicatat. Tambahkan produk pertamamu di form atas!
          </div>
        )}

        {filteredItems.map((it) => (
          <div
            key={it._id}
            className="card bg-paper p-5 transition hover:-translate-y-1 hover:shadow-sticker flex flex-col justify-between border-2 border-ink/15"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#242f1b] leading-snug">
                    {it.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-display text-sm sm:text-base font-bold text-sage-deep">
                      {it.price ? formatRp(it.price) : "Rp 0"}
                    </span>
                    <span className="text-ink/30">·</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      it.stock > 0 ? "bg-sage/40 text-ink" : "bg-coral/40 text-[#c44f45]"
                    }`}>
                      {it.stock > 0 ? `Stok: ${it.stock}` : "Habis"}
                    </span>
                  </div>
                </div>

                {/* Stock Stepper */}
                <div className="flex items-center rounded-full border border-ink/20 bg-cream/70 p-0.5 text-xs font-bold">
                  <button
                    onClick={() => updateStock(it, (it.stock || 1) - 1)}
                    className="h-6 w-6 rounded-full hover:bg-white flex items-center justify-center text-ink"
                    title="Kurangi stok"
                  >
                    -
                  </button>
                  <span className="px-2">{it.stock}</span>
                  <button
                    onClick={() => updateStock(it, (it.stock || 0) + 1)}
                    className="h-6 w-6 rounded-full hover:bg-white flex items-center justify-center text-ink"
                    title="Tambah stok"
                  >
                    +
                  </button>
                </div>
              </div>

              {it.notes && (
                <p className="mt-2.5 text-xs text-ink/70 bg-cream/50 rounded-xl p-2 border border-ink/10">
                  💬 {it.notes}
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 pt-3">
              {/* URL Preview Button */}
              {it.url ? (
                <a
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-ink/20 bg-white px-3 py-1 text-[11px] font-bold text-ink shadow-sm transition hover:bg-sage/40 hover:border-ink/40"
                >
                  <span>🔗</span>
                  <span>Buka Link Produk</span>
                  <span className="text-[10px]">↗</span>
                </a>
              ) : (
                <span className="text-[11px] text-ink/40 italic">Tanpa URL</span>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  onClick={() => startEdit(it)}
                  className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs font-bold text-ink transition hover:bg-cream"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(it._id)}
                  className="rounded-full border border-ink/20 bg-[#fde8e7] px-3 py-1 text-xs font-bold text-[#c44f45] transition hover:bg-[#fbd0ce]"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
