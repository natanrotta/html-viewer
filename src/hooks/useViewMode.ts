import { useCallback, useState } from "react"

import { DEFAULT_VIEW, type ViewMode } from "@/domain/view"
import { preferenceRepository } from "@/infrastructure/storage/preferenceRepository"

const isMobileViewport = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches

/** Persisted layout mode: code · split · preview. Split is coerced to preview
 *  on small screens (no room for side-by-side). */
export function useViewMode() {
  const [view, setViewState] = useState<ViewMode>(() => {
    const loaded = preferenceRepository.loadView(DEFAULT_VIEW)
    return loaded === "split" && isMobileViewport() ? "preview" : loaded
  })

  const setView = useCallback((next: ViewMode) => {
    preferenceRepository.saveView(next)
    setViewState(next)
  }, [])

  return { view, setView }
}
