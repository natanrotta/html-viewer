import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

/**
 * Cuidda Design System — Chakra v3 system.
 *
 * Raw tokens (colour ramps, fonts, radii, durations) live under `theme.tokens`.
 * Mode-aware aliases (surfaces, content, lines, feedback, shadows) live under
 * `theme.semanticTokens` and flip automatically in dark mode via the `.dark`
 * class set by next-themes. Values are transcribed verbatim from the handoff
 * token files (colors.css / typography.css / spacing.css).
 */
const config = defineConfig({
  globalCss: {
    ":root": {
      // Single tunable app accent (handoff default: brand blue).
      "--accent-app": "#2f80ed",
    },
    "html, body, #root": { height: "100%" },
    "html, body": { margin: 0, padding: 0 },
    html: { colorScheme: "light" },
    "html.dark": { colorScheme: "dark" },
    body: {
      background: "surface.canvas",
      color: "content.primary",
      fontFamily: "sans",
    },
    "::selection": {
      background: "color-mix(in srgb, var(--accent-app) 22%, transparent)",
    },
    // Slim, unobtrusive scrollbars (explicit vars: deterministic in raw CSS).
    "::-webkit-scrollbar": { width: "10px", height: "10px" },
    "::-webkit-scrollbar-track": { background: "transparent" },
    "::-webkit-scrollbar-thumb": {
      background: "var(--chakra-colors-line-strong)",
      borderRadius: "99px",
      border: "3px solid transparent",
      backgroundClip: "padding-box",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "var(--chakra-colors-content-muted)",
      backgroundClip: "padding-box",
    },
  },

  theme: {
    tokens: {
      fonts: {
        sans: {
          value: '"Nunito Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        },
        heading: {
          value: '"Nunito Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        },
        mono: {
          value: '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, monospace',
        },
      },

      radii: {
        xs: { value: "4px" },
        sm: { value: "6px" },
        md: { value: "10px" },
        lg: { value: "14px" },
        xl: { value: "18px" },
        "2xl": { value: "24px" },
        "3xl": { value: "32px" },
        full: { value: "9999px" },
      },

      durations: {
        fast: { value: "150ms" },
        base: { value: "200ms" },
        slow: { value: "240ms" },
        slower: { value: "380ms" },
      },

      easings: {
        out: { value: "cubic-bezier(0.22, 1, 0.36, 1)" },
      },

      colors: {
        brand: {
          50: { value: "#eef6ff" },
          100: { value: "#d9eaff" },
          200: { value: "#b8d8ff" },
          300: { value: "#8fc0ff" },
          400: { value: "#5fa1ff" },
          500: { value: "#2f80ed" },
          600: { value: "#2569c9" },
          700: { value: "#1e529e" },
          800: { value: "#1c447f" },
          900: { value: "#1d3b6b" },
        },
        accent: {
          50: { value: "#f0fdf9" },
          100: { value: "#ccf7e8" },
          200: { value: "#95ecd0" },
          300: { value: "#5ddcb6" },
          400: { value: "#32c89f" },
          500: { value: "#1eb28a" },
          600: { value: "#178f6f" },
          700: { value: "#13745c" },
          800: { value: "#145c4a" },
          900: { value: "#124b3d" },
        },
        neutral: {
          50: { value: "#f8fafc" },
          100: { value: "#f1f5f9" },
          200: { value: "#e2e8f0" },
          300: { value: "#cbd5e1" },
          400: { value: "#94a3b8" },
          500: { value: "#64748b" },
          600: { value: "#475569" },
          700: { value: "#334155" },
          800: { value: "#1e293b" },
          900: { value: "#0f172a" },
        },
      },
    },

    semanticTokens: {
      colors: {
        // ---- Surfaces ----
        surface: {
          canvas: { value: { base: "#f3f7fc", _dark: "#0d0d10" } },
          // NB: must not be named `base` — that collides with Chakra v3's reserved
          // `base` condition key and silently emits no CSS variable (transparent).
          panel: { value: { base: "#ffffff", _dark: "#16161b" } },
          elevated: { value: { base: "#ffffff", _dark: "#1d1d23" } },
          sunken: { value: { base: "#f0f4f8", _dark: "#0a0a0d" } },
          hover: { value: { base: "#f1f5f9", _dark: "rgba(255, 255, 255, 0.07)" } },
          topbar: {
            value: { base: "rgba(255, 255, 255, 0.86)", _dark: "rgba(13, 13, 16, 0.82)" },
          },
          accentSubtle: {
            value: { base: "#f0fdf9", _dark: "rgba(50, 200, 159, 0.14)" },
          },
          overlay: {
            value: { base: "rgba(15, 23, 42, 0.45)", _dark: "rgba(0, 0, 0, 0.6)" },
          },
        },
        // ---- Content (text) ----
        content: {
          primary: { value: { base: "#1f2937", _dark: "#f1f0f3" } },
          secondary: { value: { base: "#4b5563", _dark: "#a8a6b1" } },
          muted: { value: { base: "#94a3b8", _dark: "#83828d" } },
          brand: { value: { base: "#2569c9", _dark: "#8fc0ff" } },
          accent: { value: { base: "#178f6f", _dark: "#5ddcb6" } },
        },
        // ---- Lines (borders) ----
        line: {
          subtle: {
            value: { base: "rgba(15, 23, 42, 0.07)", _dark: "rgba(255, 255, 255, 0.06)" },
          },
          default: {
            value: { base: "rgba(15, 23, 42, 0.12)", _dark: "rgba(255, 255, 255, 0.11)" },
          },
          strong: {
            value: { base: "rgba(15, 23, 42, 0.20)", _dark: "rgba(255, 255, 255, 0.20)" },
          },
          brand: { value: { base: "#b8d8ff", _dark: "#2f80ed" } },
        },
        // ---- Feedback (error only is used in the UI) ----
        feedback: {
          errorFg: { value: { base: "#dc2626", _dark: "#f87171" } },
          errorBg: { value: { base: "#fef2f2", _dark: "rgba(239, 68, 68, 0.16)" } },
        },
      },

      shadows: {
        card: {
          value: {
            base: "0px 1px 2px rgba(15, 23, 42, 0.06), 0px 4px 12px -2px rgba(15, 23, 42, 0.08)",
            _dark: "0px 1px 0 rgba(0, 0, 0, 0.20)",
          },
        },
        cardHover: {
          value: {
            base: "0px 4px 8px rgba(15, 23, 42, 0.06), 0px 12px 28px -4px rgba(15, 23, 42, 0.12)",
            _dark: "0px 0 0 1px rgba(255, 255, 255, 0.04), 0px 8px 24px -8px rgba(0, 0, 0, 0.55)",
          },
        },
        panel: {
          value: {
            base: "0px 8px 24px -4px rgba(15, 23, 42, 0.14), 0px 2px 6px rgba(15, 23, 42, 0.06)",
            _dark: "0px 12px 32px -8px rgba(0, 0, 0, 0.55), 0px 2px 6px rgba(0, 0, 0, 0.35)",
          },
        },
        ctaBrand: {
          value: {
            base: "0 1px 2px rgba(47, 128, 237, 0.25), 0 8px 24px -8px rgba(47, 128, 237, 0.45)",
            _dark: "0 1px 2px rgba(47, 128, 237, 0.30), 0 8px 24px -8px rgba(47, 128, 237, 0.55)",
          },
        },
      },
    },

    keyframes: {
      vtFade: {
        from: { opacity: "0", transform: "scale(0.985)" },
        to: { opacity: "1", transform: "scale(1)" },
      },
      vtRise: {
        from: { opacity: "0", transform: "translateY(6px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
