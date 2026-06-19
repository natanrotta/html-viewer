"use client"

import { chakra, Flex, Text } from "@chakra-ui/react"

import type { EditorMode } from "@/domain/document"
import { ease } from "@/theme/motion"

interface ModeTabProps {
  active: boolean
  label: string
  onClick: () => void
}

function ModeTab({ active, label, onClick }: ModeTabProps) {
  return (
    <chakra.button
      type="button"
      onClick={onClick}
      border="none"
      cursor="pointer"
      fontFamily="sans"
      fontWeight="700"
      fontSize="11px"
      letterSpacing="0.05em"
      textTransform="uppercase"
      px="11px"
      py="4px"
      borderRadius="6px"
      bg={active ? "surface.base" : "transparent"}
      color={active ? "content.brand" : "content.muted"}
      boxShadow={active ? "card" : "none"}
      transition={ease("background, color, box-shadow", "base")}
      _hover={active ? undefined : { color: "content.secondary" }}
    >
      {label}
    </chakra.button>
  )
}

interface EditorToolbarProps {
  mode: EditorMode
  onModeChange: (mode: EditorMode) => void
  lineCount: number
  charCount: number
}

/** Editor header: HTML/Markdown toggle on the left, counts on the right. */
export function EditorToolbar({ mode, onModeChange, lineCount, charCount }: EditorToolbarProps) {
  return (
    <Flex
      flex="none"
      h="40px"
      align="center"
      justify="space-between"
      pl="16px"
      pr="12px"
      borderBottom="1px solid"
      borderColor="line.subtle"
      bg="surface.base"
    >
      <Flex
        gap="2px"
        bg="surface.sunken"
        p="2px"
        borderRadius="8px"
        border="1px solid"
        borderColor="line.subtle"
      >
        <ModeTab active={mode === "html"} label="HTML" onClick={() => onModeChange("html")} />
        <ModeTab
          active={mode === "markdown"}
          label="Markdown"
          onClick={() => onModeChange("markdown")}
        />
      </Flex>

      <Text fontFamily="mono" fontSize="11px" fontWeight="600" color="content.muted">
        {lineCount} ln · {charCount} car
      </Text>
    </Flex>
  )
}
