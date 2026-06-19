/**
 * localStorage keys for the persisted session. The `vitrine:theme` key is
 * owned by next-themes (configured in the Provider), so it is intentionally
 * absent here.
 */
export const STORAGE_KEYS = {
  docs: "vitrine:docs",
  current: "vitrine:current",
  view: "vitrine:view",
  sidebar: "vitrine:sidebar",
  split: "vitrine:split",
} as const
