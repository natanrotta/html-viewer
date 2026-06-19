"use client"

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

/**
 * A recents entry as two sibling buttons inside a presentational row: an
 * "open" button (file tile + title + time) and a separate delete button — no
 * nested interactives, so it stays accessible.
 */
export function DocumentRow({ doc, active, onSelect, onDelete }: DocumentRowProps) {
  const file = useIconHover()
  const remove = useIconHover()

  return (
    <Flex
      {...file.hoverProps}
      align="center"
      gap="2px"
      pr="6px"
      borderRadius="11px"
      animation="vtRise 200ms cubic-bezier(0.22, 1, 0.36, 1)"
      bg={active ? accentMix("11%") : "transparent"}
      border="1px solid"
      borderColor={active ? accentMix("38%") : "transparent"}
      transition={ease("background, transform, border-color", "base")}
      _hover={active ? undefined : { bg: "surface.hover", transform: "translateX(2px)" }}
    >
      <chakra.button
        type="button"
        onClick={() => onSelect(doc.id)}
        flex="1"
        minW="0"
        display="flex"
        alignItems="center"
        gap="11px"
        p="9px 6px 9px 10px"
        border="none"
        bg="transparent"
        cursor="pointer"
        textAlign="left"
        fontFamily="sans"
        borderRadius="10px"
        _focusVisible={{ outline: "2px solid", outlineColor: "line.brand", outlineOffset: "-2px" }}
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
      </chakra.button>

      <chakra.button
        type="button"
        aria-label="Excluir documento"
        onClick={() => onDelete(doc.id)}
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
