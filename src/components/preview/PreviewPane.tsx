import { Box, chakra } from "@chakra-ui/react"

import { EmptyPreview } from "./EmptyPreview"
import { PreviewFrame } from "./PreviewFrame"
import { PreviewHeader } from "./PreviewHeader"

interface PreviewPaneProps {
  rendered: string
}

/** Preview column: header + live iframe (or the empty state). */
export function PreviewPane({ rendered }: PreviewPaneProps) {
  const hasCode = Boolean(rendered && rendered.trim())

  return (
    <chakra.section flex="1 1 0" minW="0" display="flex" flexDirection="column">
      <PreviewHeader />
      <Box flex="1" position="relative" bg="surface.sunken">
        {hasCode ? <PreviewFrame srcDoc={rendered} /> : <EmptyPreview />}
      </Box>
    </chakra.section>
  )
}
