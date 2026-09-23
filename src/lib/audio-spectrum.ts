// Shared Web Audio spectrum engine. Singleton context, one analyser
// per media element. Consumers receive quantized 0-12 levels and switch
// CSS classes (sb-0 to sb-12). No style values leave this module.

export const SPECTRUM_BARS = 64;
export const SPECTRUM_LEVELS = 12;

export type LevelCallback = (levels: number[]) => void;

interface SpectrumEntry {
  analyser: AnalyserNode;
  listeners: Set<LevelCallback>;
  started: boolean;
}

let context: AudioContext | null = null;
const entries = new WeakMap<HTMLMediaElement, SpectrumEntry>();

function sampleLevels(data: Uint8Array<ArrayBuffer>): number[] {
  const levels: number[] = [];
  const usable = Math.min(data.length, 120);
  for (let i = 0; i < SPECTRUM_BARS; i++) {
    const bin = 2 + Math.floor(Math.pow(i / SPECTRUM_BARS, 1.6) * usable);
    const value = data[Math.min(bin, data.length - 1)] / 255;
    levels.push(Math.max(0, Math.min(SPECTRUM_LEVELS, Math.round(value * SPECTRUM_LEVELS))));
  }
  return levels;
}

function pump(entry: SpectrumEntry, data: Uint8Array<ArrayBuffer>) {
  entry.analyser.getByteFrequencyData(data);
  const levels = sampleLevels(data);
  entry.listeners.forEach((fn) => fn(levels));
  requestAnimationFrame(() => {
    if (entry.listeners.size > 0) pump(entry, data);
    else entry.started = false;
  });
}

function ensurePump(entry: SpectrumEntry, data: Uint8Array<ArrayBuffer>) {
  if (entry.started) return;
  entry.started = true;
  pump(entry, data);
}

export function attachSpectrum(
  el: HTMLAudioElement,
  callback: LevelCallback
): { detach: () => void; live: boolean } {
  const noop = () => {};
  try {
    if (!context) context = new AudioContext();
    if (context.state === "suspended") void context.resume();
    let entry = entries.get(el);
    if (!entry) {
      const source = context.createMediaElementSource(el);
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.78;
      source.connect(analyser);
      analyser.connect(context.destination);
      entry = { analyser, listeners: new Set(), started: false };
      entries.set(el, entry);
    }
    const current = entry;
    const data = new Uint8Array(current.analyser.frequencyBinCount);
    current.listeners.add(callback);
    ensurePump(current, data);
    return {
      live: true,
      detach: () => {
        current.listeners.delete(callback);
      },
    };
  } catch {
    return { live: false, detach: noop };
  }
}

// Procedural fallback. Same level contract, smooth random walk.
export function startFallback(callback: LevelCallback): () => void {
  const levels = Array.from({ length: SPECTRUM_BARS }, (_, i) => 2 + ((i * 37) % 6));
  const targets = [...levels];
  const timer = setInterval(() => {
    for (let i = 0; i < SPECTRUM_BARS; i++) {
      if (Math.random() < 0.3) targets[i] = Math.floor(Math.random() * (SPECTRUM_LEVELS + 1));
      levels[i] += Math.sign(targets[i] - levels[i]);
    }
    callback([...levels]);
  }, 140);
  return () => clearInterval(timer);
}
