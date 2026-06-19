import { useCallback, useEffect, useState } from "react"

/** Fullscreen preview overlay, dismissable with the Escape key. */
export function useFullscreen() {
  const [active, setActive] = useState(false)

  const toggle = useCallback(() => setActive((value) => !value), [])
  const exit = useCallback(() => setActive(false), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive((value) => (value ? false : value))
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return { active, toggle, exit }
}
