"use client"

import type { ReactNode } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { system } from "@/theme/system"

interface ProviderProps {
  children: ReactNode
}

/**
 * Wires the Cuidda Chakra system and the colour-mode provider.
 * Theme is persisted under `vitrine:theme` and mirrored to both the `class`
 * (read by Chakra's `_dark` condition) and `data-theme` attributes.
 */
export function Provider({ children }: ProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider
        attribute={["class", "data-theme"]}
        defaultTheme="light"
        enableSystem={false}
        storageKey="vitrine:theme"
        themes={["light", "dark"]}
      >
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
