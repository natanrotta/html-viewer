"use client"

import { chakra } from "@chakra-ui/react"

import { PlusIcon, useIconHover } from "@/components/icons"
import { Tooltip } from "@/components/ui/tooltip"
import { ALT_KEY, MOD_KEY } from "@/lib/platform"
import { ease } from "@/theme/motion"

interface NewDocumentButtonProps {
  onClick: () => void
}

/** Full-width solid-brand CTA that clears the editor for a new document. */
export function NewDocumentButton({ onClick }: NewDocumentButtonProps) {
  const { ref, hoverProps } = useIconHover()

  return (
    <Tooltip content={`Novo documento · ${MOD_KEY} ${ALT_KEY} N`} showArrow>
      <chakra.button
        type="button"
        onClick={onClick}
        {...hoverProps}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="8px"
        w="100%"
        h="42px"
        borderRadius="sm"
        bg="brand.500"
        color="white"
        fontFamily="sans"
        fontWeight="700"
        fontSize="14px"
        cursor="pointer"
        boxShadow="ctaBrand"
        transition={ease("background, transform, box-shadow", "base")}
        _hover={{ bg: "brand.600", transform: "translateY(-1px)" }}
        _active={{ bg: "brand.700", transform: "translateY(0)" }}
      >
        <PlusIcon ref={ref} size={17} />
        Novo documento
      </chakra.button>
    </Tooltip>
  )
}
