import { useEffect, useRef } from "react"

export interface ShortcutHandlers {
  toggleSidebar: () => void
  save: () => void
  newDocument: () => void
  prevView: () => void
  nextView: () => void
  toggleFullscreen: () => void
}

/**
 * Global command shortcuts (Ctrl on Windows/Linux, ⌘ on macOS):
 * `B` painel · `S` salvar · `N` novo · `←/→` alternar visão · `F` tela cheia.
 *
 * Handlers are read through a ref so the listener binds once and always calls
 * the latest closures (e.g. the current view for cycling).
 */
export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  const handlersRef = useRef(handlers)
  handlersRef.current = handlers

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey) return
      const handler = handlersRef.current

      switch (event.key.toLowerCase()) {
        case "b":
          event.preventDefault()
          handler.toggleSidebar()
          break
        case "s":
          event.preventDefault()
          handler.save()
          break
        case "n":
          event.preventDefault()
          handler.newDocument()
          break
        case "f":
          event.preventDefault()
          handler.toggleFullscreen()
          break
        case "arrowleft":
          event.preventDefault()
          handler.prevView()
          break
        case "arrowright":
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
