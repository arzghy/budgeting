"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBookmark,
  faCoins,
  faReceipt,
  faTrashCan,
  faPlus,
  faVault,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="save-page space-y-10 sm:space-y-12">
      {/* ═══ HEADER & METRICS ═══ */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
<div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sage-deep">
             <FontAwesomeIcon icon={faReceipt} />
             <span>Ruang tabungan</span>
           </div>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.045em] text-ink sm:text-4xl">
            Celengan Ganda (Nabung)
          </h1>
          <p className="mt-3 max-w-[42rem] text-xs font-semibold leading-6 text-ink/70 sm:text-sm">
            Pisahkan tabungan impian untuk wishlist dan dana darurat untuk kebutuhan jaga-jaga.
          </p>
        </div>

<div className="shrink-0 rounded-xl bg-[#c2d772] px-5 py-4 text-left">
           <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">Total tabungan</span>
           <span className="font-display mt-1 block text-xl font-extrabold text-ink">{formatRp(total)}</span>
         </div>
      </div>

      {/* ═══ 2 PILLAR SUMMARY CARDS ═══ */}
<div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-ink/10 sm:grid-cols-2">
         <section className="save-pillar bg-[#f6dbe2] p-6">
           <div className="flex items-center justify-between">
             <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">Wishlist</span>
             <FontAwesomeIcon icon={faBookmark} className="text-ink/60" />
           </div>
           <div className="font-display mt-3 text-2xl font-extrabold text-ink">{formatRp(totalWishlist)}</div>
           <p className="mt-2 max-w-sm text-xs font-semibold leading-5 text-ink/60">Terhubung otomatis ke target barang idamanmu.</p>
         </section>

         <section className="save-pillar bg-[#c2d772] p-6">
           <div className="flex items-center justify-between">
             <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">Jaga-jaga</span>
             <FontAwesomeIcon icon={faVault} className="text-ink/60" />
           </div>
           <div className="font-display mt-3 text-2xl font-extrabold text-ink">{formatRp(totalJaga)}</div>
           <p className="mt-2 max-w-sm text-xs font-semibold leading-5 text-ink/60">Cadangan darurat yang bisa dipakai kapan saja.</p>
         </section>
       </div>

      {/* ═══ FORM INPUT (WITH URL FIELD) ═══ */}
      <form onSubmit={submit} className="save-panel bg-[#f6ffd3] p-6 sm:p-9 space-y-7">
<div className="flex items-center gap-3 border-b border-ink/10 pb-5">
           <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f6c5c1] font-bold text-xs text-ink">
             <FontAwesomeIcon icon={faReceipt} />
           </span>
          <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
            Setor / Catat Tabungan Baru
          </h2>
        </div>

        <div className="save-form-fields grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-12 sm:gap-6">
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
              className="field save-field"
            >
<option value="jagajaga">Dana jaga-jaga (darurat)</option>
               <option value="wishlist">Untuk wishlist tertentu</option>
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
                className="field save-field"
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
                className="field save-field"
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
              className="field save-field"
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
                className="field save-field pl-9"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/40">
                 <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
               </span>
            </div>
          </div>
        </div>

<div className="mt-2 border-t border-ink/10 pt-5">
           <button disabled={loading} className="btn btn-primary min-h-11 px-5 text-xs sm:text-sm">
             <FontAwesomeIcon icon={loading ? faCoins : faPlus} className={loading ? "animate-pulse" : ""} />
             <span>{loading ? "Menyimpan..." : "Masukkan ke celengan"}</span>
          </button>
        </div>
      </form>

      {/* ═══ SAVINGS HISTORY LIST (WITH URL LINK PREVIEW) ═══ */}
<div className="save-history space-y-5">
         <h2 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">
          Riwayat Setoran Tabungan
        </h2>

        {savings.length === 0 && (
<div className="save-empty bg-[#f6ffd3]/45 p-10 text-center text-sm font-semibold text-ink/60">
             <FontAwesomeIcon icon={faReceipt} className="mb-3 block w-full text-2xl text-sage-deep" />
            Belum ada catatan setoran tabungan. Mulai nabung sekarang!
          </div>
        )}

        {savings.map((s) => (
<article
             key={s._id}
             className={`saving-row ${s.type === "wishlist" ? "saving-row-wishlist" : "saving-row-emergency"}`}
           >
            <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
<span className={`saving-row-icon ${s.type === "wishlist" ? "bg-[#f6dbe2]" : "bg-[#f6ffd3]"}`}>
                 <FontAwesomeIcon icon={s.type === "wishlist" ? faBookmark : faVault} />
               </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-bold text-[#242f1b]">
                    {s.name}
                  </h3>
                  <span
className={`saving-status ${s.type === "wishlist" ? "saving-status-wishlist" : "saving-status-emergency"}`}
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
<FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                         <span>Buka link bukti</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

<div className="saving-row-action">
               <div className="font-display text-lg font-extrabold text-sage-deep">+ {formatRp(s.amount)}</div>
               <button onClick={() => remove(s._id)} className="saving-delete">
                 <FontAwesomeIcon icon={faTrashCan} /> Hapus
               </button>
             </div>
           </article>
        ))}
      </div>
    </div>
  );
}
