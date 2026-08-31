"use client";
import { useEffect, useState } from "react";

type Need = { _id: string; name: string; amount: number; division: string; status: "tersisa" | "habis" };

const DIVISIONS = ["kebutuhan", "rumah", "mandi", "dapur"];

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function NeedsPage() {
  const [list, setList] = useState<Need[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [division, setDivision] = useState("kebutuhan");
  const [editing, setEditing] = useState<string | null>(null);

  async function load() {
    const r = await fetch("/api/needs");
    setList(await r.json());
  }
  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;
    const payload = { name, amount: Number(amount) || 0, division };
    if (editing) {
      await fetch(`/api/needs/${editing}`, { method: "PUT", body: JSON.stringify(payload) });
    } else {
      await fetch("/api/needs", { method: "POST", body: JSON.stringify(payload) });
    }
    reset();
    await load();
  }

  async function toggleStatus(n: Need) {
    const status = n.status === "tersisa" ? "habis" : "tersisa";
    await fetch(`/api/needs/${n._id}`, { method: "PUT", body: JSON.stringify({ status }) });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Hapus kebutuhan ini?")) return;
    await fetch(`/api/needs/${id}`, { method: "DELETE" });
    await load();
  }

  function startEdit(n: Need) {
    setEditing(n._id);
    setName(n.name);
    setAmount(String(n.amount));
    setDivision(n.division);
  }

  function reset() {
    setEditing(null); setName(""); setAmount(""); setDivision("kebutuhan");
  }

  const tersisa = list.filter((n) => n.status === "tersisa");
  const habis = list.filter((n) => n.status === "habis");

  function NeedRow({ n, habis }: { n: Need; habis: boolean }) {
    return (
      <div className={`card flex items-center gap-4 p-4 ${habis ? "bg-blush/60" : "bg-paper"}`}>
        <div className="min-w-0 flex-1">
          <div className={`font-display text-base font-bold text-ink ${habis ? "line-through opacity-60" : ""}`}>
            {n.name}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-ink">{formatRp(n.amount)}</span>
            <span className="text-ink/30">·</span>
            <span className="font-bold text-ink/70">{n.division}</span>
            {habis && (
              <>
                <span className="text-ink/30">·</span>
                <span className="font-bold text-pistachioDeep">auto ke pengeluaran</span>
              </>
            )}
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => toggleStatus(n)} className={`btn text-xs ${habis ? "btn-ghost" : "btn-primary"}`}>
            {habis ? "reset" : "tandai habis"}
          </button>
          <button onClick={() => startEdit(n)} className="btn btn-ghost text-xs">edit</button>
          <button onClick={() => remove(n._id)} className="btn btn-blush text-xs">hapus</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">kebutuhan</h1>
        <p className="mt-1 text-sm font-semibold text-ink/60">kalau habis, otomatis pindah ke catatan pengeluaran</p>
      </div>

      <form onSubmit={submit} className="card bg-paper p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="nama kebutuhan"
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
            {DIVISIONS.map((d) => (<option key={d} value={d}>{d}</option>))}
          </select>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary text-sm">
            {editing ? "simpan perubahan" : "tambah kebutuhan"}
          </button>
          {editing && (
            <button type="button" onClick={reset} className="btn btn-ghost text-sm">batal</button>
          )}
        </div>
      </form>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">tersisa</h2>
          <span className="text-xs font-bold text-ink/50">{tersisa.length} item</span>
        </div>
        <div className="space-y-2.5">
          {tersisa.length === 0 && (
            <div className="card bg-paper/70 border-dashed p-8 text-center text-sm font-semibold text-ink/50">
              semua kebutuhan habis
            </div>
          )}
          {tersisa.map((n) => <NeedRow key={n._id} n={n} habis={false} />)}
        </div>
      </section>

      {habis.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">habis</h2>
            <span className="text-xs font-bold text-ink/50">{habis.length} item</span>
          </div>
          <div className="space-y-2.5">
            {habis.map((n) => <NeedRow key={n._id} n={n} habis={true} />)}
          </div>
        </section>
      )}
    </div>
  );
}
