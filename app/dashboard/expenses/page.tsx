"use client";
import { useEffect, useState } from "react";

const DIVISIONS = [
  { key: "jajan", label: "Jajan" },
  { key: "transport", label: "Transport" },
  { key: "hiburan", label: "Hiburan" },
  { key: "kebutuhan", label: "Kebutuhan" },
  { key: "wishlist", label: "Wishlist" },
  { key: "lainnya", label: "Lainnya" },
];

type Expense = { _id: string; title: string; amount: number; division: string; source?: string; date: string };

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function ExpensesPage() {
  const [list, setList] = useState<Expense[]>([]);
  const [active, setActive] = useState("semua");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [division, setDivision] = useState("jajan");
  const [editing, setEditing] = useState<string | null>(null);

  async function load(div: string) {
    const url = div === "semua" ? "/api/expenses" : `/api/expenses?division=${div}`;
    const r = await fetch(url);
    setList(await r.json());
  }
  useEffect(() => { load(active); }, [active]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !amount) return;
    const payload = { title, amount: Number(amount), division };
    if (editing) {
      await fetch(`/api/expenses/${editing}`, { method: "PUT", body: JSON.stringify(payload) });
    } else {
      await fetch("/api/expenses", { method: "POST", body: JSON.stringify(payload) });
    }
    setTitle(""); setAmount(""); setEditing(null);
    await load(active);
  }

  async function remove(id: string) {
    if (!confirm("Hapus catatan ini?")) return;
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    await load(active);
  }

  function startEdit(e: Expense) {
    setEditing(e._id);
    setTitle(e.title);
    setAmount(String(e.amount));
    setDivision(e.division);
  }

  function reset() {
    setEditing(null); setTitle(""); setAmount(""); setDivision("jajan");
  }

  const total = list.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">pengeluaran</h1>
          <p className="mt-1 text-sm font-semibold text-ink/60">total: <span className="font-bold text-ink">{formatRp(total)}</span></p>
        </div>
      </div>

      {/* division filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("semua")}
          className={`rounded-full px-3 py-1.5 text-xs font-bold border-2 border-ink transition ${
            active === "semua" ? "bg-pistachio text-ink" : "bg-paper text-ink/70 hover:bg-cream"
          }`}
        >semua</button>
        {DIVISIONS.map((d) => (
          <button
            key={d.key}
            onClick={() => setActive(d.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold border-2 border-ink transition ${
              active === d.key ? "bg-pistachio text-ink" : "bg-paper text-ink/70 hover:bg-cream"
            }`}
          >{d.label.toLowerCase()}</button>
        ))}
      </div>

      {/* form */}
      <form onSubmit={submit} className="card bg-paper p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="judul pengeluaran"
            className="field"
          />
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="nominal"
            className="field"
          />
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="field"
          >
            {DIVISIONS.map((d) => (<option key={d.key} value={d.key}>{d.label}</option>))}
          </select>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary text-sm">
            {editing ? "simpan perubahan" : "tambah catatan"}
          </button>
          {editing && (
            <button type="button" onClick={reset} className="btn btn-ghost text-sm">batal</button>
          )}
        </div>
      </form>

      {/* list */}
      <div className="space-y-2.5">
        {list.length === 0 && (
          <div className="card bg-paper/70 border-dashed p-10 text-center text-sm font-semibold text-ink/50">
            belum ada catatan. tambahin satu yuk~
          </div>
        )}
        {list.map((e) => {
          const div = DIVISIONS.find((d) => d.key === e.division);
          return (
            <div key={e._id} className="card flex items-center gap-4 bg-paper p-4">
              <div className="min-w-0 flex-1">
                <div className="font-display text-base font-bold text-ink">{e.title}</div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-ink">{formatRp(e.amount)}</span>
                  <span className="text-ink/30">·</span>
                  <span className="font-bold text-ink/70">{div?.label}</span>
                  {e.source && e.source !== "manual" && (
                    <>
                      <span className="text-ink/30">·</span>
                      <span className="font-bold text-pistachioDeep">auto</span>
                    </>
                  )}
                  <span className="text-ink/30">·</span>
                  <span className="text-ink/50">{new Date(e.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</span>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => startEdit(e)} className="btn btn-ghost text-xs">edit</button>
                <button onClick={() => remove(e._id)} className="btn btn-blush text-xs">hapus</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
