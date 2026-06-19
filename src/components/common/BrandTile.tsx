import { Box } from "@chakra-ui/react"

import { CodeIcon } from "@/components/icons"
import { GRADIENT_BRAND } from "@/theme/motion"

interface BrandTileProps {
  size?: number
  glyphSize?: number
  radius?: string
}

/** The gradient brand tile with the `</>` glyph (sidebar + fullscreen header). */
export function BrandTile({ size = 34, glyphSize = 18, radius = "10px" }: BrandTileProps) {
  return (
    <Box
      flex="none"
      w={`${size}px`}
      h={`${size}px`}
      borderRadius={radius}
      bgImage={GRADIENT_BRAND}
      display="grid"
      placeItems="center"
      color="white"
      boxShadow="0 4px 12px -2px color-mix(in srgb, #2f80ed 50%, transparent)"
    >
      <CodeIcon size={glyphSize} strokeWidth={2.4} />
    </Box>
  )
}
