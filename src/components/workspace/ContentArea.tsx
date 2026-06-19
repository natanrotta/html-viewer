import { Box, Flex } from "@chakra-ui/react"

import { EditorPane } from "@/components/editor/EditorPane"
import { PreviewPane } from "@/components/preview/PreviewPane"
import type { EditorMode } from "@/domain/document"
import type { ViewMode } from "@/domain/view"
import { ease } from "@/theme/motion"

interface ContentAreaProps {
  view: ViewMode
  code: string
  mode: EditorMode
  rendered: string
  onCodeChange: (value: string) => void
  onModeChange: (mode: EditorMode) => void
}

/** Lays out editor / divider / preview according to the active view mode. */
export function ContentArea({
  view,
  code,
  mode,
  rendered,
  onCodeChange,
  onModeChange,
}: ContentAreaProps) {
  const showEditor = view !== "preview"
  const showPreview = view !== "code"
  const showDivider = view === "split"

  return (
    <Flex flex="1" minH="0" bg="surface.canvas" transition={ease("background", "slow")}>
      {showEditor && (
        <EditorPane
          code={code}
          mode={mode}
          onCodeChange={onCodeChange}
          onModeChange={onModeChange}
        />
      )}
      {showDivider && <Box flex="none" w="1px" bg="line.default" />}
      {showPreview && <PreviewPane rendered={rendered} />}
    </Flex>
  )
}
