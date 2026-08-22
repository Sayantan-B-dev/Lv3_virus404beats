"use client";

import { useState, useEffect, useCallback } from "react";

interface Beat {
  id: number;
  title: string;
  meta: string;
  year: string;
  price: number;
  currency: string;
  cover: string | null;
  cloudinaryPublicId: string | null;
  youtubeId: string | null;
  isTop: boolean;
  sortOrder: number;
  status: string;
}

const emptyBeat = { title: "", meta: "", year: "2026", price: 999, currency: "INR", cover: "", cloudinaryPublicId: "", youtubeId: "", isTop: false, sortOrder: 0, status: "draft" };

export function BeatsManager() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [editing, setEditing] = useState<Beat | null>(null);
  const [form, setForm] = useState(emptyBeat);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/beats");
    const data = await res.json();
    setBeats(data.beats ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setMsg("");
    const body = { ...form, price: Number(form.price), sortOrder: Number(form.sortOrder), cloudinaryPublicId: form.cloudinaryPublicId || null, youtubeId: form.youtubeId || null, cover: form.cover || null };
    if (editing) {
      await fetch("/api/admin/beats", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...body }) });
      setMsg("Beat updated");
    } else {
      await fetch("/api/admin/beats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      setMsg("Beat created");
    }
    setEditing(null);
    setForm(emptyBeat);
    load();
  };

  const del = async (id: number) => {
    if (!confirm("Delete this beat?")) return;
    await fetch("/api/admin/beats", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setMsg("Beat deleted");
    load();
  };

  const edit = (b: Beat) => {
    setEditing(b);
    setForm({ title: b.title, meta: b.meta, year: b.year, price: b.price, currency: b.currency, cover: b.cover ?? "", cloudinaryPublicId: b.cloudinaryPublicId ?? "", youtubeId: b.youtubeId ?? "", isTop: b.isTop, sortOrder: b.sortOrder, status: b.status });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm text-caps text-muted">Beats</h2>
        <span className="text-xs text-faint">{beats.length} total</span>
      </div>

      {msg && <div className="mb-4 text-xs text-green-400 border border-green-500/30 bg-green-500/10 rounded p-2">{msg}</div>}

      {/* Form */}
      <div className="border border-line rounded-lg p-4 bg-bg-soft mb-6">
        <h3 className="text-xs text-caps text-faint mb-3">{editing ? "Edit Beat" : "Add Beat"}</h3>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Title" value={form.title} onChange={(e) => set("title", e.target.value)} className="col-span-2 border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Meta (credits)" value={form.meta} onChange={(e) => set("meta", e.target.value)} className="col-span-2 border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Year" value={form.year} onChange={(e) => set("year", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Price" type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Cover image" value={form.cover} onChange={(e) => set("cover", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Cloudinary public ID" value={form.cloudinaryPublicId} onChange={(e) => set("cloudinaryPublicId", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="YouTube ID (optional)" value={form.youtubeId} onChange={(e) => set("youtubeId", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Sort order" type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <select value={form.status} onChange={(e) => set("status", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" checked={form.isTop} onChange={(e) => set("isTop", e.target.checked)} className="accent-lime-400" />
            Top 10
          </label>
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={save} className="px-4 py-2 text-xs border border-fg bg-fg text-bg rounded hover:bg-transparent hover:text-fg transition-colors">{editing ? "Update" : "Create"}</button>
          {editing && <button onClick={() => { setEditing(null); setForm(emptyBeat); }} className="px-4 py-2 text-xs border border-line rounded text-muted hover:text-fg transition-colors">Cancel</button>}
        </div>
      </div>

      {/* List */}
      {loading ? <p className="text-xs text-faint">Loading...</p> : (
        <div className="space-y-2">
          {beats.map((b) => (
            <div key={b.id} className="flex items-center justify-between border border-line rounded-lg px-4 py-3 bg-bg-soft">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-fg font-medium truncate">{b.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${b.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{b.status}</span>
                  {b.isTop && <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime-500/20 text-lime-400">top</span>}
                </div>
                <p className="text-xs text-faint mt-0.5">{b.meta} · {b.year} · ₹{b.price}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => edit(b)} className="text-xs text-muted hover:text-fg transition-colors px-2 py-1">Edit</button>
                <button onClick={() => del(b.id)} className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1">Del</button>
              </div>
            </div>
          ))}
          {beats.length === 0 && <p className="text-xs text-faint">No beats yet.</p>}
        </div>
      )}
    </div>
  );
}
