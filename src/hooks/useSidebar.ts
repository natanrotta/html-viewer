import { useCallback, useState } from "react"

import { preferenceRepository } from "@/infrastructure/storage/preferenceRepository"

/** Persisted open/closed state of the recents panel. */
export function useSidebar() {
  const [open, setOpen] = useState<boolean>(() =>
    preferenceRepository.loadSidebarOpen(true),
  )

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev
      preferenceRepository.saveSidebarOpen(next)
      return next
    })
  }, [])

  return { open, toggle }
}
