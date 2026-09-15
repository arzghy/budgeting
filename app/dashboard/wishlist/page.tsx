"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCartShopping,
  faCircleCheck,
  faLink,
  faPenToSquare,
  faPlus,
  faStar,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

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
  const overallPercent = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  return (
    <div className="wishlist-page space-y-10 sm:space-y-12">
      {/* ═══ HEADER & METRICS ═══ */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
<div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sage-deep">
             <FontAwesomeIcon icon={faStar} />
             <span>Target belanja</span>
           </div>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.045em] text-ink sm:text-4xl">
            Wishlist Sanctuary
          </h1>
          <p className="mt-3 max-w-[42rem] text-xs font-semibold leading-6 text-ink/70 sm:text-sm">
            Kumpulkan tabungan untuk barang idamanmu, pantau progress, dan beli tanpa rasa bersalah.
          </p>
        </div>

<div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-ink/10 sm:min-w-[18rem]">
           <div className="bg-[#c2d772] px-4 py-3 text-left">
             <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">Terkumpul</span>
             <span className="font-display mt-1 block text-base font-extrabold text-ink">{formatRp(totalSaved)}</span>
           </div>
           <div className="bg-[#f6dbe2] px-4 py-3 text-left">
             <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">Progress total</span>
             <span className="font-display mt-1 block text-base font-extrabold text-ink">{overallPercent}%</span>
           </div>
         </div>
      </div>

      {/* ═══ FORM INPUT (WITH URL FIELD) ═══ */}
      <form onSubmit={submit} className="wishlist-panel bg-[#f6ffd3] p-6 sm:p-9 space-y-7">
<div className="flex items-center justify-between border-b border-ink/10 pb-5">
           <div className="flex items-center gap-3">
             <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f6c5c1] font-bold text-xs text-ink">
               <FontAwesomeIcon icon={editing ? faPenToSquare : faPlus} />
             </span>
            <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
              {editing ? "Edit Barang Impian" : "Tambah Wishlist Baru"}
            </h2>
          </div>
          {editing && (
            <span className="rounded-md bg-[#f6dbe2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
              Mode Edit
            </span>
          )}
        </div>

        <div className="wishlist-form-fields grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-12 sm:gap-6">
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
              className="field wishlist-field"
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
              className="field wishlist-field"
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
                className="field wishlist-field pl-9"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/40">
                 <FontAwesomeIcon icon={faLink} className="text-xs" />
               </span>
            </div>
          </div>
        </div>

<div className="mt-2 flex flex-col items-stretch gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center">
           <button disabled={loading} className="btn btn-primary min-h-11 px-5 text-xs sm:text-sm">
             <FontAwesomeIcon icon={loading ? faCircleCheck : faPlus} className={loading ? "animate-pulse" : ""} />
             <span>{loading ? "Menyimpan..." : editing ? "Simpan perubahan" : "Tambah ke wishlist"}</span>
          </button>
          {editing && (
            <button type="button" onClick={reset} className="btn btn-ghost text-xs sm:text-sm">
              Batal
            </button>
          )}
        </div>
      </form>

      {/* ═══ WISHLIST CARDS ═══ */}
      <div className="wishlist-list space-y-4">
        {list.length === 0 && (
<div className="wishlist-empty bg-[#f6ffd3]/45 p-10 text-center text-sm font-semibold text-ink/60">
             <FontAwesomeIcon icon={faStar} className="mb-3 block w-full text-2xl text-sage-deep" />
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
className={`wishlist-item ${w.purchased ? "wishlist-item-purchased" : "wishlist-item-active"}`}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-[#242f1b]">
                      {w.name}
                    </h3>
{w.purchased ? (
                       <span className="wishlist-status wishlist-status-done">
                         <FontAwesomeIcon icon={faCircleCheck} /> Sudah dibeli
                       </span>
                     ) : (
                       <span className="wishlist-status wishlist-status-active">
                         <FontAwesomeIcon icon={pct >= 100 ? faCircleCheck : faStar} /> {pct >= 100 ? "Siap dibeli" : "Sedang menabung"}
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
<FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                           <span>Buka link produk</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>

<div className="wishlist-item-actions self-end sm:self-start">
                   <button onClick={() => startEdit(w)} className="wishlist-action wishlist-action-edit">
                     <FontAwesomeIcon icon={faPenToSquare} /> Edit
                   </button>
                   <button onClick={() => remove(w._id)} className="wishlist-action wishlist-action-delete">
                     <FontAwesomeIcon icon={faTrashCan} /> Hapus
                   </button>
                 </div>
              </div>

              {!w.purchased && (
<div className="wishlist-progress mt-6 border-t border-ink/10 pt-5">
                   <div className="h-2 w-full overflow-hidden rounded-full bg-[#f6dbe2]">
                     <div
                       className="h-full rounded-full bg-[#8a9e42] transition-all duration-500"
                       style={{ width: `${pct}%` }}
                     />
                   </div>

                  <div className="mt-2 flex items-center justify-between text-xs font-semibold text-ink/70">
                    <span>
                      Sisa yang dibutuhkan: <span className="font-bold text-ink">{formatRp(remaining)}</span>
                    </span>
                    <span className="font-display text-sm font-bold text-sage-deep">{pct.toFixed(0)}%</span>
                  </div>

                  {/* Quick Save Allocation Form */}
                  <div className="wishlist-save-panel mt-6 grid gap-3 rounded-xl border border-ink/10 bg-[#f6ffd3]/55 p-4 sm:flex sm:flex-wrap sm:items-center">
                    <span className="text-xs font-bold text-ink/75">Update Saldo Tabungan:</span>
                    <input
                      type="number"
                      placeholder={String(w.saved)}
                      value={inputVal}
                      onChange={(e) => setSavedInput({ ...savedInput, [w._id]: e.target.value })}
                      className="field wishlist-field w-full py-2 text-xs sm:w-36"
                    />
                    <button
                      onClick={() => inputVal !== "" && updateSaved(w, Number(inputVal))}
                      className="btn btn-ghost min-h-10 px-4 text-xs"
                    >
                      Simpan Saldo
                    </button>
                    <button
                      onClick={() => purchase(w)}
className="btn btn-primary min-h-10 px-4 text-xs sm:ml-auto"
                     >
                       <FontAwesomeIcon icon={faCartShopping} /> Beli sekarang
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
