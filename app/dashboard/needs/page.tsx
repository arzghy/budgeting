"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faBoxesStacked,
  faCheck,
  faHouse,
  faLink,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faUtensils,
  faShower,
} from "@fortawesome/free-solid-svg-icons";

type Need = {
  _id: string;
  name: string;
  amount: number;
  division: string;
  status: "tersisa" | "habis";
  url?: string;
};

const DIVISIONS = [
  { key: "kebutuhan", label: "Pokok", icon: faBoxesStacked },
  { key: "dapur", label: "Dapur", icon: faUtensils },
  { key: "mandi", label: "Kamar Mandi", icon: faShower },
  { key: "rumah", label: "Rumah Tangga", icon: faHouse },
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
    const divObj = DIVISIONS.find((d) => d.key === n.division) || { label: n.division, icon: faBoxesStacked };

    return (
      <article className={`needs-row ${isHabis ? "needs-row-empty" : "needs-row-ready"}`}>
        <div className="flex min-w-0 items-start gap-4">
          <span className={`needs-row-icon ${isHabis ? "bg-[#f6dbe2] text-[#c44f45]" : "bg-[#f6ffd3] text-sage-deep"}`}>
            <FontAwesomeIcon icon={divObj.icon} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`font-display text-base font-bold leading-tight ${isHabis ? "text-ink/55 line-through" : "text-ink"}`}>
                {n.name}
              </h3>
              {isHabis && <span className="needs-status needs-status-empty">Perlu dibeli</span>}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className="font-bold text-ink/80">{formatRp(n.amount)}</span>
              <span className="text-ink/30">{divObj.label}</span>
              {n.url && (
                <a href={n.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-sage-deep hover:underline">
                  <FontAwesomeIcon icon={faLink} className="text-[10px]" />
                  <span>Link beli</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="needs-row-actions">
          <button onClick={() => toggleStatus(n)} className={`needs-action ${isHabis ? "needs-action-secondary" : "needs-action-primary"}`}>
            <FontAwesomeIcon icon={isHabis ? faArrowsRotate : faCheck} />
            <span>{isHabis ? "Stok tersedia" : "Tandai habis"}</span>
          </button>
          <button onClick={() => startEdit(n)} className="needs-action needs-action-secondary">
            <FontAwesomeIcon icon={faPenToSquare} />
            <span>Edit</span>
          </button>
          <button onClick={() => remove(n._id)} className="needs-action needs-action-danger">
            <FontAwesomeIcon icon={faTrashCan} />
            <span>Hapus</span>
          </button>
        </div>
      </article>
    );
  }

  return (
    <div className="needs-page space-y-10 sm:space-y-12">
      {/* ═══ HEADER & METRICS ═══ */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
<div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sage-deep">
             <FontAwesomeIcon icon={faBoxesStacked} />
             <span>Daftar kebutuhan</span>
           </div>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.045em] text-ink sm:text-4xl">
            Kebutuhan Rumah Tangga
          </h1>
          <p className="mt-3 max-w-[42rem] text-xs font-semibold leading-6 text-ink/70 sm:text-sm">
            Daftar kebutuhan logistik harian. Saat ditandai habis, otomatis terkonversi ke pos pengeluaran.
          </p>
        </div>

<div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-ink/10 sm:min-w-[18rem]">
           <div className="bg-[#f6ffd3] px-4 py-3 text-left">
             <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">Tersisa</span>
             <span className="font-display mt-1 block text-base font-extrabold text-ink">{tersisa.length} item</span>
           </div>
           <div className="bg-[#f6dbe2] px-4 py-3 text-left">
             <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">Perlu beli</span>
             <span className="font-display mt-1 block text-base font-extrabold text-[#c44f45]">{habis.length} item</span>
           </div>
         </div>
      </div>

      {/* ═══ FORM INPUT (WITH URL FIELD) ═══ */}
      <form onSubmit={submit} className="needs-panel bg-[#f6ffd3] p-6 sm:p-9 space-y-7">
<div className="flex items-center justify-between border-b border-ink/10 pb-5">
           <div className="flex items-center gap-3">
             <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f6c5c1] font-bold text-xs text-ink">
               <FontAwesomeIcon icon={editing ? faPenToSquare : faPlus} />
             </span>
            <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
              {editing ? "Edit Item Kebutuhan" : "Tambah Kebutuhan Baru"}
            </h2>
          </div>
          {editing && (
            <span className="rounded-md bg-[#f6dbe2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
              Mode Edit
            </span>
          )}
        </div>

        <div className="needs-form-fields grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-12 sm:gap-6">
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
              className="field needs-field"
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
              className="field needs-field"
            />
          </div>

          {/* Kategori */}
          <div className="sm:col-span-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Kategori Kebutuhan
            </label>
            <input
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              placeholder="Contoh: Dapur"
              required
              className="field needs-field"
            />
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
                className="field needs-field pl-9"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink/40">
                 <FontAwesomeIcon icon={faLink} className="text-xs" />
               </span>
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-col items-stretch gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center">
          <button disabled={loading} className="btn btn-primary text-xs sm:text-sm">
<FontAwesomeIcon icon={loading ? faArrowsRotate : editing ? faCheck : faPlus} className={loading ? "animate-spin" : ""} />
             <span>{loading ? "Menyimpan..." : editing ? "Simpan perubahan" : "Tambah kebutuhan"}</span>
          </button>
          {editing && (
            <button type="button" onClick={reset} className="btn btn-ghost text-xs sm:text-sm">
              Batal
            </button>
          )}
        </div>
      </form>

      {/* ═══ TERSISA (IN-STOCK) SECTION ═══ */}
      <section className="needs-section space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="needs-section-marker bg-[#c2d772]" />
            <h2 className="font-display text-lg font-bold text-[#242f1b]">
              Stok Tersedia (Siap Pakai)
            </h2>
          </div>
          <span className="text-xs font-bold text-ink/60">{tersisa.length} Item</span>
        </div>

        <div className="space-y-4">
          {tersisa.length === 0 && (
            <div className="needs-empty bg-[#f6ffd3]/45 p-10 text-center text-sm font-semibold text-ink/60">
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
        <section className="needs-section space-y-5 border-t border-ink/10 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="needs-section-marker bg-[#f6c5c1]" />
              <h2 className="font-display text-lg font-bold text-[#c44f45]">
                Stok Habis (Perlu Dibeli)
              </h2>
            </div>
            <span className="text-xs font-bold text-coral">{habis.length} Item</span>
          </div>

          <div className="space-y-4">
            {habis.map((n) => (
              <NeedRow key={n._id} n={n} isHabis={true} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
