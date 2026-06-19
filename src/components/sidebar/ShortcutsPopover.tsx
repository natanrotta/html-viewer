"use client"

import { chakra, Flex, Kbd, Popover, Portal, Text } from "@chakra-ui/react"

import { KeyboardIcon, useIconHover } from "@/components/icons"
import { ALT_KEY, MOD_KEY, SHIFT_KEY } from "@/lib/platform"
import { ease } from "@/theme/motion"

interface Shortcut {
  label: string
  keys: string[]
}

const SHORTCUTS: Shortcut[] = [
  { label: "Abrir/fechar painel", keys: [MOD_KEY, "B"] },
  { label: "Novo documento", keys: [MOD_KEY, ALT_KEY, "N"] },
  { label: "Salvar documento", keys: [MOD_KEY, "S"] },
  { label: "Alternar visão", keys: [MOD_KEY, "←", "→"] },
  { label: "Tema claro/escuro", keys: [MOD_KEY, SHIFT_KEY, "L"] },
  { label: "Tela cheia", keys: [MOD_KEY, "F"] },
]

/** Footer button that opens a popover listing every keyboard shortcut. */
export function ShortcutsPopover() {
  const { ref, hoverProps } = useIconHover()

  return (
    <Popover.Root positioning={{ placement: "top-end" }} lazyMount unmountOnExit>
      <Popover.Trigger asChild>
        <chakra.button
          type="button"
          aria-label="Ver atalhos de teclado"
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
          _hover={{ borderColor: "line.brand", color: "content.brand", transform: "translateY(-1px)" }}
          _open={{ borderColor: "line.brand", color: "content.brand" }}
        >
          <KeyboardIcon ref={ref} size={16} />
        </chakra.button>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            width="252px"
            bg="surface.elevated"
            color="content.primary"
            borderWidth="1px"
            borderColor="line.subtle"
            borderRadius="14px"
            boxShadow="panel"
          >
            <Popover.Body p="14px">
              <Text
                fontSize="11px"
                fontWeight="700"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="content.muted"
                mb="11px"
              >
                Atalhos
              </Text>

              <Flex direction="column" gap="9px">
                {SHORTCUTS.map((shortcut) => (
                  <Flex key={shortcut.label} align="center" justify="space-between" gap="12px">
                    <Text fontSize="12.5px" color="content.secondary">
                      {shortcut.label}
                    </Text>
                    <Flex flex="none" align="center" gap="3px">
                      {shortcut.keys.map((key, index) => (
                        <Kbd key={index} fontSize="11px">
                          {key}
                        </Kbd>
                      ))}
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
