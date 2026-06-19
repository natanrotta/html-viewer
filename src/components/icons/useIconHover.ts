import { useMemo, useRef } from "react"

/** Shared imperative handle exposed by every lucide-animated icon. */
export interface IconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

/**
 * Drives a lucide-animated icon from its parent's hover state.
 *
 * Spread `hoverProps` on the interactive element (button/row) and pass `ref`
 * to the icon. The glyph then plays while the whole control is hovered — not
 * only when the cursor is directly over the icon.
 */
export function useIconHover() {
  const ref = useRef<IconHandle>(null)

  const hoverProps = useMemo(
    () => ({
      onMouseEnter: () => ref.current?.startAnimation(),
      onMouseLeave: () => ref.current?.stopAnimation(),
    }),
    [],
  )

  return { ref, hoverProps }
}
