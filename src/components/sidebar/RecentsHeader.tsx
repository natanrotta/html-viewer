"use client"

import { chakra, Flex, Text } from "@chakra-ui/react"

import { DeleteIcon, useIconHover } from "@/components/icons"
import { ease } from "@/theme/motion"

interface RecentsHeaderProps {
  count: number
  hasDocs: boolean
  onClear: () => void
}

/** "RECENTES" eyebrow with a count pill and a destructive "limpar" action. */
export function RecentsHeader({ count, hasDocs, onClear }: RecentsHeaderProps) {
  const { ref, hoverProps } = useIconHover()

  return (
    <Flex align="center" justify="space-between" px="20px" pt="6px" pb="8px">
      <Text
        fontSize="12px"
        fontWeight="700"
        letterSpacing="0.14em"
        textTransform="uppercase"
        color="content.muted"
      >
        Recentes
      </Text>

      <Flex align="center" gap="7px">
        <Text
          fontSize="11px"
          fontWeight="700"
          color="content.muted"
          bg="surface.sunken"
          px="8px"
          py="2px"
          borderRadius="full"
        >
          {count}
        </Text>

        {hasDocs && (
          <chakra.button
            type="button"
            onClick={onClear}
            title="Apagar todos os documentos"
            {...hoverProps}
            display="inline-flex"
            alignItems="center"
            gap="4px"
            border="none"
            bg="transparent"
            color="content.muted"
            fontFamily="sans"
            fontWeight="700"
            fontSize="11px"
            cursor="pointer"
            px="4px"
            py="2px"
            borderRadius="6px"
            transition={ease("color", "fast")}
            _hover={{ color: "feedback.errorFg" }}
          >
            <DeleteIcon ref={ref} size={12} />
            limpar
          </chakra.button>
        )}
      </Flex>
    </Flex>
  )
}
