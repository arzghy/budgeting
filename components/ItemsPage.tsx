"use client";
import { useEffect, useState } from "react";

type Item = { _id: string; name: string; price: number; stock: number; notes?: string };

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
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    const r = await fetch(`/api/items?category=${category}`);
    setItems(await r.json());
  }
  useEffect(() => { load(); }, [category]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;
    setLoading(true);
    const payload = { category, name, price: Number(price) || 0, stock: Number(stock) || 1, notes };
    if (editing) {
      await fetch(`/api/items/${editing}`, { method: "PUT", body: JSON.stringify(payload) });
    } else {
      await fetch("/api/items", { method: "POST", body: JSON.stringify(payload) });
    }
    reset();
    await load();
    setLoading(false);
  }

  function startEdit(it: Item) {
    setEditing(it._id);
    setName(it.name);
    setPrice(String(it.price));
    setStock(String(it.stock));
    setNotes(it.notes || "");
  }

  async function remove(id: string) {
    if (!confirm("Hapus item ini?")) return;
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    await load();
  }

  function reset() {
    setEditing(null); setName(""); setPrice(""); setStock("1"); setNotes("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-1 text-sm font-semibold text-ink/60">catatan {title.toLowerCase()} kamu, biar ga lupa lagi</p>
      </div>

      <form onSubmit={submit} className="card bg-paper p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="nama item"
            className="field md:col-span-2"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="harga"
            type="number"
            className="field"
          />
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="stok"
            type="number"
            className="field"
          />
        </div>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="catatan (opsional)"
          className="field mt-3"
        />
        <div className="mt-4 flex gap-2">
          <button disabled={loading} className="btn btn-primary text-sm">
            {editing ? "simpan perubahan" : "tambah item"}
          </button>
          {editing && (
            <button type="button" onClick={reset} className="btn btn-ghost text-sm">
              batal
            </button>
          )}
        </div>
      </form>

      <div className="space-y-2.5">
        {items.length === 0 && (
          <div className="card bg-paper/70 border-dashed p-10 text-center text-sm font-semibold text-ink/50">
            belum ada {title.toLowerCase()}. tambahin satu yuk~
          </div>
        )}
        {items.map((it) => (
          <div key={it._id} className="card flex items-center gap-4 bg-paper p-4">
            <div className="min-w-0 flex-1">
              <div className="font-display text-base font-bold text-ink">{it.name}</div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-ink/70">Rp {it.price.toLocaleString("id-ID")}</span>
                <span className="text-ink/30">·</span>
                <span className="font-bold text-ink/70">stok {it.stock}</span>
                {it.notes && <span className="text-ink/50">· {it.notes}</span>}
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => startEdit(it)} className="btn btn-ghost text-xs">edit</button>
              <button onClick={() => remove(it._id)} className="btn btn-blush text-xs">hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
