import { useCallback } from "react"
import { useTheme } from "next-themes"

/** Light/dark colour mode backed by next-themes (persisted as `vitrine:theme`). */
export function useThemeMode() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const toggle = useCallback(
    () => setTheme(isDark ? "light" : "dark"),
    [isDark, setTheme],
  )

  return { isDark, toggle }
}
