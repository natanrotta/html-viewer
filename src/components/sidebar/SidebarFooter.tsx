"use client"

import { chakra, Flex, Text } from "@chakra-ui/react"

import { MoonIcon, SunIcon, useIconHover, type AnimatedIcon } from "@/components/icons"
import { ease } from "@/theme/motion"

interface SidebarFooterProps {
  isDark: boolean
  onToggleTheme: () => void
}

/** "Salvo automaticamente" hint + light/dark toggle. */
export function SidebarFooter({ isDark, onToggleTheme }: SidebarFooterProps) {
  const { ref, hoverProps } = useIconHover()
  const ThemeIcon: AnimatedIcon = isDark ? SunIcon : MoonIcon

  return (
    <Flex
      align="center"
      justify="space-between"
      p="12px 16px"
      borderTop="1px solid"
      borderColor="line.subtle"
    >
      <Text fontSize="11px" fontWeight="600" color="content.muted">
        Salvo automaticamente
      </Text>

      <chakra.button
        type="button"
        aria-label="Alternar tema"
        onClick={onToggleTheme}
        {...hoverProps}
        flex="none"
        display="grid"
        placeItems="center"
        boxSize="34px"
        border="1px solid"
        borderColor="line.subtle"
        bg="surface.sunken"
        color="content.secondary"
        borderRadius="9px"
        cursor="pointer"
        transition={ease("color, border-color, transform", "base")}
        _hover={{
          borderColor: "line.brand",
          color: "content.brand",
          transform: "translateY(-1px)",
        }}
      >
        <ThemeIcon ref={ref} size={17} />
      </chakra.button>
    </Flex>
  )
}
