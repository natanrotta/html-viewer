const isApple =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || "")

/** Display labels for modifier keys — Apple symbols vs. word labels. */
export const MOD_KEY = isApple ? "⌘" : "Ctrl"
export const ALT_KEY = isApple ? "⌥" : "Alt"
export const SHIFT_KEY = isApple ? "⇧" : "Shift"
