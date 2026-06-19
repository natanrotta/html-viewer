"use client"

import { chakra } from "@chakra-ui/react"

import { ease } from "@/theme/motion"

interface DocumentTitleInputProps {
  value: string
  onChange: (value: string) => void
}

/** Inline, borderless document title field (auto-derived unless edited). */
export function DocumentTitleInput({ value, onChange }: DocumentTitleInputProps) {
  return (
    <chakra.input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Sem título"
      spellCheck={false}
      minW="0"
      maxW="340px"
      flex="0 1 auto"
      border="none"
      outline="none"
      bg="transparent"
      fontFamily="sans"
      fontWeight="800"
      fontSize="15px"
      letterSpacing="-0.01em"
      color="content.primary"
      p="6px 8px"
      borderRadius="8px"
      transition={ease("background", "fast")}
      _focus={{ bg: "surface.sunken" }}
      _placeholder={{ color: "content.muted" }}
    />
  )
}
