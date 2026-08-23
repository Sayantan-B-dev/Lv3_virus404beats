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

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dhw3ttwaz";

// Upload FormData with progress via XHR (fetch has no upload progress).
function uploadFormData(
  url: string,
  formData: FormData,
  onProgress: (percent: number) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.onprogress = (e) => {
      if (e.total > 0) onProgress(Math.min(100, Math.round((e.loaded / e.total) * 100)));
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(data);
        else reject(new Error(data?.error?.message ?? "Upload failed"));
      } catch {
        reject(new Error("Upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}

export function BeatsManager() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [editing, setEditing] = useState<Beat | null>(null);
  const [form, setForm] = useState(emptyBeat);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [coverProgress, setCoverProgress] = useState(0);
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

  const signUpload = async (publicId: string, resourceType: string) => {
    const signRes = await fetch("/api/admin/cloudinary/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId, resourceType }),
    });
    const signData = await signRes.json();
    if (!signRes.ok) throw new Error(signData.error ?? "Sign failed");
    return signData;
  };

  const uploadWithProgress = async (
    file: File,
    section: "beats" | "covers",
    resourceType: string,
    onProgress: (p: number) => void
  ): Promise<string> => {
    onProgress(0);
    const base = file.name.replace(/\.[^.]+$/, "")
      .normalize("NFKD")
      .replace(/[^\w\-]+/g, "_")
      .replace(/_+/g, "_")
      .slice(0, 40)
      .replace(/^_+|_+$/g, ""); // only [A-Za-z0-9_-]
    const publicId = `virus404beats/${section}/${base || "asset"}-${Date.now()}`;
    const signData = await signUpload(publicId, resourceType);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signData.apiKey);
    formData.append("timestamp", signData.timestamp.toString());
    formData.append("signature", signData.signature);
    for (const [k, v] of Object.entries(signData.params)) {
      formData.append(k, String(v));
    }

    const uploadData = await uploadFormData(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      formData,
      onProgress
    );
    onProgress(100);
    return uploadData.public_id;
  };

  const save = async () => {
    setMsg("");
    if (!form.title.trim()) {
      setMsg("Error: Title is required");
      return;
    }
    setUploading(true);
    try {
      let cloudinaryPublicId = form.cloudinaryPublicId || null;
      let cover = form.cover || null;

      if (audioFile) {
        const publicId = await uploadWithProgress(audioFile, "beats", "video", setAudioProgress);
        cloudinaryPublicId = publicId;
        set("cloudinaryPublicId", publicId);
      }
      if (coverFile) {
        const publicId = await uploadWithProgress(coverFile, "covers", "image", setCoverProgress);
        cover = publicId;
        set("cover", publicId);
      }

      const body = {
        ...form,
        price: Number(form.price),
        sortOrder: Number(form.sortOrder),
        cloudinaryPublicId,
        youtubeId: form.youtubeId || null,
        cover,
      };

      if (editing) {
        const res = await fetch("/api/admin/beats", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...body }) });
        if (!res.ok) { const d = await res.json(); setMsg(`Error: ${d.error ?? "Update failed"}`); setUploading(false); return; }
        setMsg("Beat updated");
      } else {
        const res = await fetch("/api/admin/beats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        const data = await res.json();
        if (!res.ok) { setMsg(`Error: ${data.error}`); setUploading(false); return; }
        setMsg("Beat created");
      }

      setEditing(null);
      setForm(emptyBeat);
      setAudioFile(null);
      setCoverFile(null);
      setAudioProgress(0);
      setCoverProgress(0);
      load();
    } catch (err: any) {
      setMsg(`Error: ${err.message}`);
    }
    setUploading(false);
  };

  const del = async (id: number) => {
    if (!confirm("Delete this beat?")) return;
    const res = await fetch("/api/admin/beats", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (!res.ok) { const d = await res.json(); setMsg(`Error: ${d.error ?? "Delete failed"}`); return false; }
    setMsg("Beat deleted");
    load();
  };

  const edit = (b: Beat) => {
    setEditing(b);
    setForm({ title: b.title, meta: b.meta, year: b.year, price: b.price, currency: b.currency, cover: b.cover ?? "", cloudinaryPublicId: b.cloudinaryPublicId ?? "", youtubeId: b.youtubeId ?? "", isTop: b.isTop, sortOrder: b.sortOrder, status: b.status });
  };

  const ProgressBar = ({ value, label }: { value: number; label?: string }) => (
    <div className="flex items-center gap-2 text-[10px] text-muted">
      <div className="h-1.5 w-24 bg-bg-soft rounded overflow-hidden">
        <div className="h-full bg-lime-400 transition-all" style={{ width: `${value}%` }} />
      </div>
      <span>{value}%{label ? ` ${label}` : ""}</span>
    </div>
  );

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
            <input type="file" accept="audio/*" onChange={(e) => { setAudioFile(e.target.files?.[0] ?? null); setAudioProgress(0); }} disabled={uploading} className="text-xs text-fg file:mr-3 file:py-1 file:px-3 file:rounded file:border file:border-line file:text-xs file:bg-bg-soft file:text-fg hover:file:border-fg" />
            {audioFile && <p className="text-[10px] text-faint mt-1">{audioFile.name} (will upload on Create)</p>}
            {!audioFile && form.cloudinaryPublicId && <p className="text-[10px] text-green-400 mt-1">✓ {form.cloudinaryPublicId}</p>}
            {audioProgress > 0 && audioProgress < 100 && <div className="mt-1"><ProgressBar value={audioProgress} /></div>}
          </div>
          <div>
            <label className="text-xs text-faint block mb-1">Cover image</label>
            <input type="file" accept="image/*" onChange={(e) => { setCoverFile(e.target.files?.[0] ?? null); setCoverProgress(0); }} disabled={uploading} className="text-xs text-fg file:mr-3 file:py-1 file:px-3 file:rounded file:border file:border-line file:text-xs file:bg-bg-soft file:text-fg hover:file:border-fg" />
            {coverFile && <p className="text-[10px] text-faint mt-1">{coverFile.name} (will upload on Create)</p>}
            {!coverFile && form.cover && <p className="text-[10px] text-green-400 mt-1">✓ {form.cover}</p>}
            {coverProgress > 0 && coverProgress < 100 && <div className="mt-1"><ProgressBar value={coverProgress} /></div>}
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <button onClick={save} disabled={uploading} className="px-4 py-2 text-xs border border-fg bg-fg text-bg rounded hover:bg-transparent hover:text-fg transition-colors disabled:opacity-50">{uploading ? "Uploading…" : editing ? "Update" : "Create"}</button>
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