"use client"

import { Box, chakra, Flex, Text } from "@chakra-ui/react"

import { MoonIcon, SunIcon, useIconHover, type AnimatedIcon } from "@/components/icons"
import { Tooltip } from "@/components/ui/tooltip"
import { MOD_KEY, SHIFT_KEY } from "@/lib/platform"
import { ease } from "@/theme/motion"
import { ShortcutsPopover } from "./ShortcutsPopover"

interface SidebarFooterProps {
  isDark: boolean
  justSaved: boolean
  onToggleTheme: () => void
}

/** Save status + shortcuts popover + light/dark toggle. */
export function SidebarFooter({ isDark, justSaved, onToggleTheme }: SidebarFooterProps) {
  const { ref, hoverProps } = useIconHover()
  const ThemeIcon: AnimatedIcon = isDark ? SunIcon : MoonIcon

  return (
    <Flex
      align="center"
      justify="space-between"
      gap="8px"
      p="12px 16px"
      borderTop="1px solid"
      borderColor="line.subtle"
    >
      <Text
        fontSize="11px"
        fontWeight="600"
        color={justSaved ? "content.accent" : "content.muted"}
        transition={ease("color", "base")}
      >
        {justSaved ? "Salvo ✓" : "Salvo automaticamente"}
      </Text>

      <Flex flex="none" align="center" gap="8px">
        <Box display={{ base: "none", md: "block" }}>
          <ShortcutsPopover />
        </Box>

        <Tooltip
          content={`${isDark ? "Tema claro" : "Tema escuro"} · ${MOD_KEY} ${SHIFT_KEY} L`}
          showArrow
        >
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
        </Tooltip>
      </Flex>
    </Flex>
  )
}
