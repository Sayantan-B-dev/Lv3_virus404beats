"use client";

import { useState, useEffect, useCallback } from "react";

const CONTENT_KEYS = ["services", "hero", "about"] as const;

export function ContentManager() {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [formValue, setFormValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    const data = await res.json();
    const raw = data.overrides ?? {};
    const mapped: Record<string, string> = {};
    for (const k of CONTENT_KEYS) {
      mapped[k] = typeof raw[k] === "string" ? raw[k] : JSON.stringify(raw[k] ?? null, null, 2);
    }
    setOverrides(mapped);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (key: string) => {
    setMsg("");
    try {
      JSON.parse(formValue); // validate JSON
    } catch {
      setMsg("Invalid JSON");
      return;
    }
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: JSON.parse(formValue) }),
    });
    setMsg(`${key} updated`);
    setEditing(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm text-caps text-muted">Content Overrides</h2>
        <span className="text-xs text-faint">Overrides site.ts defaults</span>
      </div>

      {msg && <div className={`mb-4 text-xs border rounded p-2 ${msg.includes("Invalid") ? "text-red-400 border-red-500/30 bg-red-500/10" : "text-green-400 border-green-500/30 bg-green-500/10"}`}>{msg}</div>}

      {loading ? <p className="text-xs text-faint">Loading...</p> : (
        <div className="space-y-4">
          {CONTENT_KEYS.map((key) => (
            <div key={key} className="border border-line rounded-lg bg-bg-soft">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <span className="text-sm text-fg font-medium">{key}</span>
                  <span className="text-xs text-faint ml-2">
                    {overrides[key] === "null" ? "not set" : `${overrides[key].length} chars`}
                  </span>
                </div>
                <button
                  onClick={() => { setEditing(editing === key ? null : key); setFormValue(overrides[key] ?? "null"); }}
                  className="text-xs text-muted hover:text-fg transition-colors px-2 py-1"
                >
                  {editing === key ? "Cancel" : "Edit"}
                </button>
              </div>
              {editing === key && (
                <div className="px-4 pb-4">
                  <textarea
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    rows={12}
                    className="w-full border border-line rounded px-3 py-2 bg-bg text-fg text-xs font-mono resize-y"
                    spellCheck={false}
                  />
                  <button onClick={() => save(key)} className="mt-2 px-4 py-2 text-xs border border-fg bg-fg text-bg rounded hover:bg-transparent hover:text-fg transition-colors">
                    Save {key}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
