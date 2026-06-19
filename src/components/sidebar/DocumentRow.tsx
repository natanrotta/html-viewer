"use client"

import type { KeyboardEvent, MouseEvent } from "react"
import { Box, chakra, Flex, Text } from "@chakra-ui/react"

import { DeleteIcon, FileTextIcon, useIconHover } from "@/components/icons"
import { UNTITLED, type VitrineDocument } from "@/domain/document"
import { formatRelativeTime } from "@/domain/time"
import { ACCENT_APP, accentMix, ease } from "@/theme/motion"

interface DocumentRowProps {
  doc: VitrineDocument
  active: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

/** A single recents entry — file tile, title, relative time, delete action. */
export function DocumentRow({ doc, active, onSelect, onDelete }: DocumentRowProps) {
  const file = useIconHover()
  const remove = useIconHover()

  const select = () => onSelect(doc.id)
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      select()
    }
  }
  const deleteRow = (event: MouseEvent) => {
    event.stopPropagation()
    onDelete(doc.id)
  }

  return (
    <Flex
      role="button"
      tabIndex={0}
      onClick={select}
      onKeyDown={onKeyDown}
      {...file.hoverProps}
      align="center"
      gap="11px"
      p="9px 10px"
      borderRadius="11px"
      cursor="pointer"
      animation="vtRise 200ms cubic-bezier(0.22, 1, 0.36, 1)"
      bg={active ? accentMix("11%") : "transparent"}
      border="1px solid"
      borderColor={active ? accentMix("38%") : "transparent"}
      transition={ease("background, transform, border-color", "base")}
      _hover={active ? undefined : { bg: "surface.hover", transform: "translateX(2px)" }}
      _focusVisible={{ outline: "2px solid", outlineColor: "line.brand", outlineOffset: "1px" }}
    >
      <Box
        flex="none"
        w="30px"
        h="30px"
        display="grid"
        placeItems="center"
        borderRadius="8px"
        bg={active ? ACCENT_APP : "surface.sunken"}
        color={active ? "white" : "content.muted"}
        transition={ease("background, color", "base")}
      >
        <FileTextIcon ref={file.ref} size={15} />
      </Box>

      <Box flex="1" minW="0">
        <Text
          fontSize="13.5px"
          fontWeight="700"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          color="content.primary"
        >
          {doc.title || UNTITLED}
        </Text>
        <Text fontSize="11px" fontWeight="600" color="content.muted" mt="1px">
          {formatRelativeTime(doc.updatedAt)}
        </Text>
      </Box>

      <chakra.button
        type="button"
        aria-label="Excluir"
        onClick={deleteRow}
        {...remove.hoverProps}
        flex="none"
        w="26px"
        h="26px"
        display="grid"
        placeItems="center"
        border="none"
        bg="transparent"
        color="content.muted"
        borderRadius="7px"
        cursor="pointer"
        opacity="0.55"
        transition={ease("opacity, background, color", "fast")}
        _hover={{ opacity: 1, bg: "feedback.errorBg", color: "feedback.errorFg" }}
      >
        <DeleteIcon ref={remove.ref} size={14} />
      </chakra.button>
    </Flex>
  )
}
