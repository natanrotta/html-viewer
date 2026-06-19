import { useCallback, useState } from "react"

import { DEFAULT_VIEW, type ViewMode } from "@/domain/view"
import { preferenceRepository } from "@/infrastructure/storage/preferenceRepository"

/** Persisted layout mode: code · split · preview. */
export function useViewMode() {
  const [view, setViewState] = useState<ViewMode>(() =>
    preferenceRepository.loadView(DEFAULT_VIEW),
  )

  const setView = useCallback((next: ViewMode) => {
    preferenceRepository.saveView(next)
    setViewState(next)
  }, [])

  return { view, setView }
}
