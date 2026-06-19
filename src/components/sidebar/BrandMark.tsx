import { Box, Flex, Text } from "@chakra-ui/react"

import { BrandTile } from "@/components/common/BrandTile"

/** Brand tile + wordmark shown at the top of the sidebar. */
export function BrandMark() {
  return (
    <Flex align="center" gap="11px">
      <BrandTile />
      <Box lineHeight="1.05">
        <Text
          fontWeight="800"
          fontSize="17px"
          letterSpacing="-0.02em"
          color="content.primary"
        >
          HTML Viewer
        </Text>
        <Text fontSize="11px" fontWeight="600" color="content.muted">
          HTML &amp; Markdown
        </Text>
      </Box>
    </Flex>
  )
}
