"use client";

import { useState, useEffect, useCallback } from "react";

interface Work {
  id: number;
  kind: string;
  youtubeId: string | null;
  cloudinaryId: string | null;
  title: string;
  meta: string;
  year: string;
  sortOrder: number;
  status: string;
}

const emptyWork = { kind: "youtube", youtubeId: "", cloudinaryId: "", title: "", meta: "", year: "2026", sortOrder: 0, status: "draft" };

export function WorksManager() {
  const [works, setWorks] = useState<Work[]>([]);
  const [editing, setEditing] = useState<Work | null>(null);
  const [form, setForm] = useState(emptyWork);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/works");
    const data = await res.json();
    setWorks(data.works ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setMsg("");
    const body = { ...form, sortOrder: Number(form.sortOrder), youtubeId: form.youtubeId || null, cloudinaryId: form.cloudinaryId || null };
    if (editing) {
      await fetch("/api/admin/works", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...body }) });
      setMsg("Work updated");
    } else {
      await fetch("/api/admin/works", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      setMsg("Work created");
    }
    setEditing(null);
    setForm(emptyWork);
    load();
  };

  const del = async (id: number) => {
    if (!confirm("Delete this work?")) return;
    await fetch("/api/admin/works", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setMsg("Work deleted");
    load();
  };

  const edit = (w: Work) => {
    setEditing(w);
    setForm({ kind: w.kind, youtubeId: w.youtubeId ?? "", cloudinaryId: w.cloudinaryId ?? "", title: w.title, meta: w.meta, year: w.year, sortOrder: w.sortOrder, status: w.status });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm text-caps text-muted">Works</h2>
        <span className="text-xs text-faint">{works.length} total</span>
      </div>

      {msg && <div className="mb-4 text-xs text-green-400 border border-green-500/30 bg-green-500/10 rounded p-2">{msg}</div>}

      {/* Form */}
      <div className="border border-line rounded-lg p-4 bg-bg-soft mb-6">
        <h3 className="text-xs text-caps text-faint mb-3">{editing ? "Edit Work" : "Add Work"}</h3>
        <div className="grid grid-cols-2 gap-3">
          <select value={form.kind} onChange={(e) => set("kind", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm">
            <option value="youtube">YouTube</option>
            <option value="uploaded">Uploaded Audio</option>
          </select>
          <input placeholder="Title" value={form.title} onChange={(e) => set("title", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Meta (credits)" value={form.meta} onChange={(e) => set("meta", e.target.value)} className="col-span-2 border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          {form.kind === "youtube" ? (
            <input placeholder="YouTube video ID" value={form.youtubeId} onChange={(e) => set("youtubeId", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          ) : (
            <input placeholder="Cloudinary public ID" value={form.cloudinaryId} onChange={(e) => set("cloudinaryId", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          )}
          <input placeholder="Year" value={form.year} onChange={(e) => set("year", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Sort order" type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <select value={form.status} onChange={(e) => set("status", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={save} className="px-4 py-2 text-xs border border-fg bg-fg text-bg rounded hover:bg-transparent hover:text-fg transition-colors">{editing ? "Update" : "Create"}</button>
          {editing && <button onClick={() => { setEditing(null); setForm(emptyWork); }} className="px-4 py-2 text-xs border border-line rounded text-muted hover:text-fg transition-colors">Cancel</button>}
        </div>
      </div>

      {/* List */}
      {loading ? <p className="text-xs text-faint">Loading...</p> : (
        <div className="space-y-2">
          {works.map((w) => (
            <div key={w.id} className="flex items-center justify-between border border-line rounded-lg px-4 py-3 bg-bg-soft">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-fg font-medium truncate">{w.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">{w.kind}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${w.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{w.status}</span>
                </div>
                <p className="text-xs text-faint mt-0.5">{w.meta} · {w.year}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => edit(w)} className="text-xs text-muted hover:text-fg transition-colors px-2 py-1">Edit</button>
                <button onClick={() => del(w.id)} className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1">Del</button>
              </div>
            </div>
          ))}
          {works.length === 0 && <p className="text-xs text-faint">No works yet.</p>}
        </div>
      )}
    </div>
  );
}
