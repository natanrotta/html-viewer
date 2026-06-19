const isApple =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || "")

/** Display label for the command modifier — "⌘" on Apple, "Ctrl" elsewhere. */
export const MOD_KEY = isApple ? "⌘" : "Ctrl"
