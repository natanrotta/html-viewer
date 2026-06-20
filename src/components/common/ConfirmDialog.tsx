"use client"

import type { ReactNode } from "react"
import { chakra, Dialog, Portal, Text } from "@chakra-ui/react"

import { ease } from "@/theme/motion"

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

/** Reusable destructive-confirmation dialog (Chakra alertdialog). */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root
      role="alertdialog"
      open={open}
      onOpenChange={(event) => {
        if (!event.open) onCancel()
      }}
      placement="center"
      size="xs"
      motionPreset="scale"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="surface.elevated"
            color="content.primary"
            borderWidth="1px"
            borderColor="line.subtle"
            borderRadius="16px"
            boxShadow="lg"
          >
            <Dialog.Header px="20px" pt="20px" pb="6px" display="block">
              <Dialog.Title fontWeight="800" fontSize="16px" letterSpacing="-0.01em">
                {title}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body px="20px" pb="6px">
              <Text fontSize="13.5px" color="content.secondary" lineHeight="1.55">
                {description}
              </Text>
            </Dialog.Body>

            <Dialog.Footer px="20px" pt="14px" pb="18px" gap="8px">
              <chakra.button
                type="button"
                onClick={onCancel}
                h="38px"
                px="16px"
                border="1px solid"
                borderColor="line.default"
                bg="surface.panel"
                color="content.secondary"
                borderRadius="sm"
                fontFamily="sans"
                fontWeight="700"
                fontSize="13.5px"
                cursor="pointer"
                transition={ease("color, border-color", "base")}
                _hover={{ borderColor: "line.brand", color: "content.brand" }}
              >
                {cancelLabel}
              </chakra.button>

              <chakra.button
                type="button"
                onClick={onConfirm}
                h="38px"
                px="16px"
                border="1px solid transparent"
                bg="#dc2626"
                color="white"
                borderRadius="sm"
                fontFamily="sans"
                fontWeight="700"
                fontSize="13.5px"
                cursor="pointer"
                boxShadow="0 1px 2px rgba(220, 38, 38, 0.25), 0 8px 24px -8px rgba(220, 38, 38, 0.45)"
                transition={ease("background, transform", "base")}
                _hover={{ bg: "#b91c1c", transform: "translateY(-1px)" }}
                _active={{ bg: "#991b1b", transform: "translateY(0)" }}
              >
                {confirmLabel}
              </chakra.button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
