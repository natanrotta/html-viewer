import { DEFAULT_VIEW, isViewMode, type ViewMode } from "@/domain/view"
import { STORAGE_KEYS } from "./keys"
import { readString, writeString } from "./safeStorage"

/** Persistence port for layout preferences (view mode, sidebar open state). */
export const preferenceRepository = {
  loadView(fallback: ViewMode = DEFAULT_VIEW): ViewMode {
    const value = readString(STORAGE_KEYS.view)
    return isViewMode(value) ? value : fallback
  },

  saveView(view: ViewMode): void {
    writeString(STORAGE_KEYS.view, view)
  },

  loadSidebarOpen(fallback = true): boolean {
    const value = readString(STORAGE_KEYS.sidebar)
    if (value == null) return fallback
    return value !== "0"
  },

  saveSidebarOpen(open: boolean): void {
    writeString(STORAGE_KEYS.sidebar, open ? "1" : "0")
  },
}
