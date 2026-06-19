/**
 * Cuidda motion tokens — calm, confident easing; no bounce.
 * Durations and easing mirror the design handoff exactly.
 */
export const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)"

export const DUR = {
  fast: "150ms",
  base: "200ms",
  slow: "240ms",
  slower: "380ms",
} as const

export type Duration = keyof typeof DUR

/** Signature brand gradient — mark tiles and accents (blue → care-green). */
export const GRADIENT_BRAND = "linear-gradient(135deg, #2f80ed, #1eb28a)"

/**
 * App accent colour, used by the active sidebar item and active doc icon.
 * Declared as a CSS custom property in the global styles so it can be tuned
 * in one place (handoff default: brand blue).
 */
export const ACCENT_APP = "var(--accent-app)"

/** Mix the app accent with another colour — e.g. `accentMix("11%")`. */
export const accentMix = (amount: string, base = "transparent") =>
  `color-mix(in srgb, ${ACCENT_APP} ${amount}, ${base})`

/** Build a transition string with the house easing for one or more properties. */
export const ease = (properties: string, duration: Duration = "base") =>
  properties
    .split(",")
    .map((property) => `${property.trim()} ${DUR[duration]} ${EASE_OUT}`)
    .join(", ")
