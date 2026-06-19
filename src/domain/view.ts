/** The three layout modes of the studio. */
export type ViewMode = "code" | "split" | "preview"

export const VIEW_MODES: readonly ViewMode[] = ["code", "split", "preview"]

export const DEFAULT_VIEW: ViewMode = "split"

export function isViewMode(value: unknown): value is ViewMode {
  return value === "code" || value === "split" || value === "preview"
}
