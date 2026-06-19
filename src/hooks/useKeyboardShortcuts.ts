import { useEffect, useRef } from "react"

export interface ShortcutHandlers {
  toggleSidebar: () => void
  save: () => void
  newDocument: () => void
  toggleTheme: () => void
  prevView: () => void
  nextView: () => void
  toggleFullscreen: () => void
}

/**
 * Global command shortcuts (Ctrl on Windows/Linux, ⌘ on macOS):
 * `B` painel · `S` salvar · `Alt+N` novo · `Shift+L` tema ·
 * `←/→` alternar visão · `F` tela cheia.
 *
 * Matched on `event.code` (physical key) so combos with Alt stay reliable on
 * macOS, where Option rewrites `event.key`. Handlers are read through a ref so
 * the listener binds once and always calls the latest closures.
 */
export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  const handlersRef = useRef(handlers)
  handlersRef.current = handlers

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return
      const handler = handlersRef.current
      const { code, shiftKey: shift, altKey: alt } = event

      // Modifier-extended shortcuts.
      if (alt && !shift && code === "KeyN") {
        event.preventDefault()
        handler.newDocument()
        return
      }
      if (shift && !alt && code === "KeyL") {
        event.preventDefault()
        handler.toggleTheme()
        return
      }

      // Plain Ctrl/⌘ shortcuts (no Shift/Alt).
      if (shift || alt) return
      switch (code) {
        case "KeyB":
          event.preventDefault()
          handler.toggleSidebar()
          break
        case "KeyS":
          event.preventDefault()
          handler.save()
          break
        case "KeyF":
          event.preventDefault()
          handler.toggleFullscreen()
          break
        case "ArrowLeft":
          event.preventDefault()
          handler.prevView()
          break
        case "ArrowRight":
          event.preventDefault()
          handler.nextView()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])
}
