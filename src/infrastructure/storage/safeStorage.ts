import { compressToUTF16, decompressFromUTF16 } from "lz-string"

/**
 * Thin, exception-safe wrappers around localStorage. Every access is guarded
 * so private-mode / disabled-storage browsers degrade gracefully instead of
 * throwing.
 */

export function readString(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeString(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* storage unavailable — ignore */
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    /* storage unavailable — ignore */
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    const parsed = JSON.parse(raw)
    return (parsed ?? fallback) as T
  } catch {
    return fallback
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable / quota — ignore */
  }
}

/**
 * Compressed JSON storage (lz-string, UTF-16 safe). Cuts the footprint of
 * large payloads — chiefly the documents' HTML — by ~50-70%. Reads fall back
 * to plain JSON so data written before compression keeps loading.
 */
export function readCompressedJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback

    const decompressed = decompressFromUTF16(raw)
    if (decompressed) {
      try {
        const parsed = JSON.parse(decompressed)
        return (parsed ?? fallback) as T
      } catch {
        /* not compressed JSON — try the legacy plain format below */
      }
    }

    const parsed = JSON.parse(raw)
    return (parsed ?? fallback) as T
  } catch {
    return fallback
  }
}

export function writeCompressedJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, compressToUTF16(JSON.stringify(value)))
  } catch {
    /* storage unavailable / quota — ignore */
  }
}
