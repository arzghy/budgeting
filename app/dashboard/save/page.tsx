"use client";
import { useEffect, useState } from "react";

type Saving = { _id: string; type: "wishlist" | "jagajaga"; refId?: string | null; name: string; amount: number; createdAt: string };
type Wish = { _id: string; name: string; target: number; saved: number };

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function SavePage() {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"wishlist" | "jagajaga">("jagajaga");
  const [refId, setRefId] = useState<string>("");

  async function load() {
    const [s, w] = await Promise.all([
      fetch("/api/savings").then((r) => r.json()),
      fetch("/api/wishlist").then((r) => r.json()),
    ]);
    setSavings(s);
    setWishes(w);
  }
  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount) return;
    const payload = {
      type,
      refId: type === "wishlist" ? refId || null : null,
      name: type === "wishlist" ? wishes.find((x) => x._id === refId)?.name || name || "Wishlist" : name || "Jaga-jaga",
      amount: Number(amount),
    };
    await fetch("/api/savings", { method: "POST", body: JSON.stringify(payload) });

    if (type === "wishlist" && refId) {
      const w = wishes.find((x) => x._id === refId);
      if (w) {
        await fetch(`/api/wishlist/${refId}`, {
          method: "PUT",
          body: JSON.stringify({ saved: (w.saved || 0) + Number(amount) }),
        });
      }
    }

    setName(""); setAmount(""); setRefId("");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Hapus catatan nabung ini?")) return;
    await fetch(`/api/savings/${id}`, { method: "DELETE" });
    await load();
  }

  const totalWishlist = savings.filter((s) => s.type === "wishlist").reduce((s, x) => s + x.amount, 0);
  const totalJaga = savings.filter((s) => s.type === "jagajaga").reduce((s, x) => s + x.amount, 0);
  const total = totalWishlist + totalJaga;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">nabung</h1>
        <p className="mt-1 text-sm font-semibold text-ink/60">simpan buat wishlist dan jaga-jaga</p>
      </div>

      {/* summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card bg-blush p-4">
          <div className="text-xs font-bold text-ink/60">wishlist</div>
          <div className="mt-1 font-display text-base font-bold text-ink leading-tight">{formatRp(totalWishlist)}</div>
        </div>
        <div className="card bg-sage p-4">
          <div className="text-xs font-bold text-ink/60">jaga-jaga</div>
          <div className="mt-1 font-display text-base font-bold text-ink leading-tight">{formatRp(totalJaga)}</div>
        </div>
        <div className="card bg-peach p-4">
          <div className="text-xs font-bold text-ink/70">total</div>
          <div className="mt-1 font-display text-base font-bold text-ink leading-tight">{formatRp(total)}</div>
        </div>
      </div>

      {/* form */}
      <form onSubmit={submit} className="card bg-paper p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <select
            value={type}
            onChange={(e) => { setType(e.target.value as any); setRefId(""); setName(""); }}
            className="field"
          >
            <option value="jagajaga">Jaga-jaga</option>
            <option value="wishlist">Untuk Wishlist</option>
          </select>
          {type === "wishlist" ? (
            <select
              value={refId}
              onChange={(e) => { setRefId(e.target.value); setName(e.target.value); }}
              className="field"
            >
              <option value="">pilih wishlist...</option>
              {wishes.map((w) => (<option key={w._id} value={w._id}>{w.name}</option>))}
            </select>
          ) : (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="keterangan (opsional)"
              className="field"
            />
          )}
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="nominal"
            className="field md:col-span-1"
          />
          <button className="btn btn-primary text-sm md:col-span-1">catat nabung</button>
        </div>
      </form>

      {/* list */}
      <div className="space-y-2.5">
        {savings.length === 0 && (
          <div className="card bg-paper/70 border-dashed p-10 text-center text-sm font-semibold text-ink/50">
            belum ada catatan nabung
          </div>
        )}
        {savings.map((s) => (
          <div key={s._id} className="card flex items-center gap-4 bg-paper p-4">
            <div className="min-w-0 flex-1">
              <div className="font-display text-base font-bold text-ink">{s.name}</div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-ink">{formatRp(s.amount)}</span>
                <span className="text-ink/30">·</span>
                <span className={`font-bold ${s.type === "wishlist" ? "text-pistachioDeep" : "text-coral"}`}>
                  {s.type === "wishlist" ? "wishlist" : "jaga-jaga"}
                </span>
                <span className="text-ink/30">·</span>
                <span className="text-ink/50">{new Date(s.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</span>
              </div>
            </div>
            <button onClick={() => remove(s._id)} className="btn btn-blush text-xs shrink-0">hapus</button>
          </div>
        ))}
      </div>
    </div>
  );
}
