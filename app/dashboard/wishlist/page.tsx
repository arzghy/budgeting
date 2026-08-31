"use client";
import { useEffect, useState } from "react";

type Wish = { _id: string; name: string; target: number; saved: number; purchased: boolean };

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function WishlistPage() {
  const [list, setList] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [savedInput, setSavedInput] = useState<Record<string, string>>({});

  async function load() {
    const r = await fetch("/api/wishlist");
    setList(await r.json());
  }
  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !target) return;
    const payload = { name, target: Number(target), saved: 0 };
    if (editing) {
      await fetch(`/api/wishlist/${editing}`, { method: "PUT", body: JSON.stringify(payload) });
    } else {
      await fetch("/api/wishlist", { method: "POST", body: JSON.stringify(payload) });
    }
    reset();
    await load();
  }

  async function updateSaved(w: Wish, val: number) {
    await fetch(`/api/wishlist/${w._id}`, {
      method: "PUT",
      body: JSON.stringify({ saved: Math.max(0, Math.min(val, w.target)) }),
    });
    setSavedInput((prev) => ({ ...prev, [w._id]: "" }));
    await load();
  }

  async function purchase(w: Wish) {
    if (!confirm(`Beli ${w.name} sekarang? Akan otomatis masuk ke Pengeluaran.`)) return;
    await fetch(`/api/wishlist/${w._id}`, {
      method: "PUT",
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
  }

  function reset() {
    setEditing(null); setName(""); setTarget("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">wishlist</h1>
        <p className="mt-1 text-sm font-semibold text-ink/60">catat idaman, nabung, lalu beli</p>
      </div>

      <form onSubmit={submit} className="card bg-paper p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="nama barang"
            className="field"
          />
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            type="number"
            placeholder="target harga"
            className="field"
          />
          <div className="flex gap-2">
            <button className="btn btn-primary flex-1 text-sm">
              {editing ? "simpan" : "tambah"}
            </button>
            {editing && (
              <button type="button" onClick={reset} className="btn btn-ghost text-sm">batal</button>
            )}
          </div>
        </div>
      </form>

      <div className="space-y-3">
        {list.length === 0 && (
          <div className="card bg-paper/70 border-dashed p-10 text-center text-sm font-semibold text-ink/50">
            belum ada wishlist. tambahin satu yuk~
          </div>
        )}
        {list.map((w) => {
          const pct = w.target > 0 ? Math.min(100, (w.saved / w.target) * 100) : 0;
          const remaining = Math.max(0, w.target - w.saved);
          const inputVal = savedInput[w._id] ?? "";
          return (
            <div key={w._id} className={`card p-5 ${w.purchased ? "bg-blush/60" : "bg-paper"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-ink">{w.name}</h3>
                    {w.purchased && (
                      <span className="rounded-full border-2 border-ink bg-peach px-2 py-0.5 text-[10px] font-bold text-ink">
                        sudah dibeli
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-sm font-bold text-ink/70">
                    {formatRp(w.saved)} <span className="text-ink/40">/</span> {formatRp(w.target)}
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => startEdit(w)} className="btn btn-ghost text-xs">edit</button>
                  <button onClick={() => remove(w._id)} className="btn btn-blush text-xs">hapus</button>
                </div>
              </div>

              {!w.purchased && (
                <>
                  <div className="mt-3 h-4 w-full overflow-hidden rounded-full border-2 border-ink bg-cream">
                    <div className="h-full rounded-full bg-pistachio transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs font-semibold text-ink/60">
                    <span>sisa: <span className="font-bold text-ink">{formatRp(remaining)}</span></span>
                    <span className="font-bold text-pistachioDeep">{pct.toFixed(0)}%</span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t-2 border-ink/10 pt-4">
                    <label className="text-xs font-bold text-ink/60">nabung:</label>
                    <input
                      type="number"
                      placeholder={String(w.saved)}
                      value={inputVal}
                      onChange={(e) => setSavedInput({ ...savedInput, [w._id]: e.target.value })}
                      className="field w-28"
                    />
                    <button
                      onClick={() => inputVal !== "" && updateSaved(w, Number(inputVal))}
                      className="btn btn-ghost text-xs"
                    >update</button>
                    <button onClick={() => purchase(w)} className="btn btn-primary text-xs">beli</button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
