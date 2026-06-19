import { useCallback, useState } from "react"

import { preferenceRepository } from "@/infrastructure/storage/preferenceRepository"

const isMobileViewport = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches

/**
 * Open/closed state of the recents panel. On desktop it's a collapsible grid
 * column (persisted). On mobile it's an off-canvas drawer that starts closed,
 * so the editor is visible first.
 */
export function useSidebar() {
  const [open, setOpen] = useState<boolean>(() =>
    isMobileViewport() ? false : preferenceRepository.loadSidebarOpen(true),
  )

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev
      preferenceRepository.saveSidebarOpen(next)
      return next
    })
  }, [])

  // Used by the mobile backdrop / auto-close — intentionally non-persisting so
  // a mobile dismissal doesn't collapse the desktop sidebar.
  const close = useCallback(() => setOpen(false), [])

  return { open, toggle, close }
}
