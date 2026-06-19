/** The three layout modes of the studio. */
export type ViewMode = "code" | "split" | "preview"

export const VIEW_MODES: readonly ViewMode[] = ["code", "split", "preview"]

export const DEFAULT_VIEW: ViewMode = "split"

export function isViewMode(value: unknown): value is ViewMode {
  return value === "code" || value === "split" || value === "preview"
}

/** Step through the view modes (clamped at the ends): code ↔ split ↔ preview. */
export function cycleView(view: ViewMode, direction: 1 | -1): ViewMode {
  const index = VIEW_MODES.indexOf(view)
  const next = Math.min(VIEW_MODES.length - 1, Math.max(0, index + direction))
  return VIEW_MODES[next]
}
