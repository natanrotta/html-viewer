import type { VitrineDocument } from "@/domain/document"
import { STORAGE_KEYS } from "./keys"
import { readJSON, readString, removeKey, writeJSON, writeString } from "./safeStorage"

/** Persistence port for documents and the currently open document id. */
export const documentRepository = {
  loadAll(): VitrineDocument[] {
    const docs = readJSON<VitrineDocument[]>(STORAGE_KEYS.docs, [])
    return Array.isArray(docs) ? docs : []
  },

  saveAll(docs: VitrineDocument[]): void {
    writeJSON(STORAGE_KEYS.docs, docs)
  },

  loadCurrentId(): string | null {
    return readString(STORAGE_KEYS.current)
  },

  saveCurrentId(id: string | null): void {
    if (id == null) removeKey(STORAGE_KEYS.current)
    else writeString(STORAGE_KEYS.current, id)
  },

  clear(): void {
    removeKey(STORAGE_KEYS.docs)
    removeKey(STORAGE_KEYS.current)
  },
}
