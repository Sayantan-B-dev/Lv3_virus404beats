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
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/beats");
    const data = await res.json();
    setBeats(data.beats ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const uploadFile = async (file: File, folder: string, resourceType = "video"): Promise<string | null> => {
    const publicId = `${folder}/${file.name.replace(/\.[^.]+$/, "")}-${Date.now()}`;
    const signRes = await fetch("/api/admin/cloudinary/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId, folder: `virus404beats/${folder}`, resourceType }),
    });
    const signData = await signRes.json();
    if (!signRes.ok) throw new Error(signData.error ?? "Sign failed");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signData.apiKey);
    formData.append("timestamp", signData.timestamp.toString());
    formData.append("signature", signData.signature);
    for (const [k, v] of Object.entries(signData.params)) {
      formData.append(k, String(v));
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dhw3ttwaz";
    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: "POST",
      body: formData,
    });
    const uploadData = await uploadRes.json();
    if (!uploadRes.ok) throw new Error(uploadData.error?.message ?? "Upload failed");
    return uploadData.public_id;
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const publicId = await uploadFile(file, "beats");
      set("cloudinaryPublicId", publicId);
      setMsg("Audio uploaded to Cloudinary");
    } catch (err: any) {
      setMsg(`Upload failed: ${err.message}`);
    }
    setUploading(false);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const publicId = await uploadFile(file, "covers", "image");
      set("cover", publicId);
      setMsg("Cover uploaded to Cloudinary");
    } catch (err: any) {
      setMsg(`Upload failed: ${err.message}`);
    }
    setUploading(false);
  };

  const save = async () => {
    setMsg("");
    const body = { ...form, price: Number(form.price), sortOrder: Number(form.sortOrder), cloudinaryPublicId: form.cloudinaryPublicId || null, youtubeId: form.youtubeId || null, cover: form.cover || null };
    if (editing) {
      await fetch("/api/admin/beats", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...body }) });
      setMsg("Beat updated");
    } else {
      const res = await fetch("/api/admin/beats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) { setMsg(`Error: ${data.error}`); return; }
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

      {msg && <div className={`mb-4 text-xs border rounded p-2 ${msg.startsWith("Error") || msg.includes("failed") ? "text-red-400 border-red-500/30 bg-red-500/10" : "text-green-400 border-green-500/30 bg-green-500/10"}`}>{msg}</div>}

      <div className="border border-line rounded-lg p-4 bg-bg-soft mb-6">
        <h3 className="text-xs text-caps text-faint mb-3">{editing ? "Edit Beat" : "Add Beat"}</h3>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Title" value={form.title} onChange={(e) => set("title", e.target.value)} className="col-span-2 border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Credits / description" value={form.meta} onChange={(e) => set("meta", e.target.value)} className="col-span-2 border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Year" value={form.year} onChange={(e) => set("year", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
          <input placeholder="Price (INR)" type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className="border border-line rounded px-3 py-2 bg-bg text-fg text-sm" />
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

        <div className="mt-3 space-y-2">
          <div>
            <label className="text-xs text-faint block mb-1">Audio preview (Cloudinary)</label>
            <input type="file" accept="audio/*" onChange={handleAudioUpload} disabled={uploading} className="text-xs text-fg file:mr-3 file:py-1 file:px-3 file:rounded file:border file:border-line file:text-xs file:bg-bg-soft file:text-fg hover:file:border-fg" />
            {form.cloudinaryPublicId && <p className="text-[10px] text-green-400 mt-1">✓ {form.cloudinaryPublicId}</p>}
          </div>
          <div>
            <label className="text-xs text-faint block mb-1">Cover image</label>
            <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploading} className="text-xs text-fg file:mr-3 file:py-1 file:px-3 file:rounded file:border file:border-line file:text-xs file:bg-bg-soft file:text-fg hover:file:border-fg" />
            {form.cover && <p className="text-[10px] text-green-400 mt-1">✓ {form.cover}</p>}
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <button onClick={save} disabled={uploading} className="px-4 py-2 text-xs border border-fg bg-fg text-bg rounded hover:bg-transparent hover:text-fg transition-colors disabled:opacity-50">{editing ? "Update" : "Create"}</button>
          {editing && <button onClick={() => { setEditing(null); setForm(emptyBeat); }} className="px-4 py-2 text-xs border border-line rounded text-muted hover:text-fg transition-colors">Cancel</button>}
        </div>
      </div>

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
