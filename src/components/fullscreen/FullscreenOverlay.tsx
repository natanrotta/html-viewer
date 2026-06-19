"use client"

import { Box, chakra, Flex, Text } from "@chakra-ui/react"

import { BrandTile } from "@/components/common/BrandTile"
import { MinimizeIcon, useIconHover } from "@/components/icons"
import { PreviewFrame } from "@/components/preview/PreviewFrame"
import { UNTITLED } from "@/domain/document"
import { ease } from "@/theme/motion"

interface FullscreenOverlayProps {
  title: string
  rendered: string
  onExit: () => void
}

/** Full-window preview overlay, dismissable with the "Recolher" button or Esc. */
export function FullscreenOverlay({ title, rendered, onExit }: FullscreenOverlayProps) {
  const { ref, hoverProps } = useIconHover()
  const hasCode = Boolean(rendered && rendered.trim())

  return (
    <Flex
      position="fixed"
      inset="0"
      zIndex="50"
      direction="column"
      bg="surface.canvas"
      animation="vtFade 240ms cubic-bezier(0.22, 1, 0.36, 1)"
    >
      <Flex
        flex="none"
        h="52px"
        align="center"
        gap="12px"
        px="18px"
        bg="surface.topbar"
        borderBottom="1px solid"
        borderColor="line.subtle"
        backdropFilter="blur(12px)"
      >
        <BrandTile size={26} glyphSize={14} radius="8px" />
        <Text fontWeight="800" fontSize="14.5px" letterSpacing="-0.01em" color="content.primary">
          {title || UNTITLED}
        </Text>
        <Text fontSize="12px" fontWeight="600" color="content.muted">
          — tela cheia
        </Text>

        <Box flex="1" />

        <Text fontSize="12px" fontWeight="600" color="content.muted" mr="4px">
          Esc para sair
        </Text>
        <chakra.button
          type="button"
          aria-label="Sair da tela cheia"
          onClick={onExit}
          {...hoverProps}
          h="36px"
          px="14px"
          display="inline-flex"
          alignItems="center"
          gap="7px"
          border="1px solid"
          borderColor="line.default"
          bg="surface.base"
          color="content.secondary"
          borderRadius="10px"
          cursor="pointer"
          fontFamily="sans"
          fontWeight="700"
          fontSize="13px"
          transition={ease("color, border-color", "base")}
          _hover={{ borderColor: "line.brand", color: "content.brand" }}
        >
          <MinimizeIcon ref={ref} size={16} />
          Recolher
        </chakra.button>
      </Flex>

      <Box flex="1" position="relative" bg="surface.sunken">
        {hasCode && <PreviewFrame srcDoc={rendered} title="preview-fullscreen" />}
      </Box>
    </Flex>
  )
}
