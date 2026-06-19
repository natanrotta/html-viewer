"use client"

import { Box, Flex } from "@chakra-ui/react"

import { EditorPane } from "@/components/editor/EditorPane"
import { PreviewPane } from "@/components/preview/PreviewPane"
import type { EditorMode } from "@/domain/document"
import type { ViewMode } from "@/domain/view"
import { useSplitPane } from "@/hooks/useSplitPane"
import { ease } from "@/theme/motion"
import { ResizeHandle } from "./ResizeHandle"

interface ContentAreaProps {
  view: ViewMode
  code: string
  mode: EditorMode
  rendered: string
  onCodeChange: (value: string) => void
  onModeChange: (mode: EditorMode) => void
}

/** Lays out editor / resizable divider / preview according to the view mode. */
export function ContentArea({
  view,
  code,
  mode,
  rendered,
  onCodeChange,
  onModeChange,
}: ContentAreaProps) {
  const split = useSplitPane()
  const showEditor = view !== "preview"
  const showPreview = view !== "code"
  const isSplit = view === "split"

  return (
    <Flex
      ref={split.containerRef}
      flex="1"
      minH="0"
      position="relative"
      bg="surface.canvas"
      transition={ease("background", "slow")}
    >
      {showEditor && (
        <Box
          minW="0"
          display="flex"
          flexDirection="column"
          style={{ flex: isSplit ? `0 0 ${split.ratio}%` : "1 1 0%" }}
        >
          <EditorPane
            code={code}
            mode={mode}
            onCodeChange={onCodeChange}
            onModeChange={onModeChange}
          />
        </Box>
      )}

      {isSplit && (
        <ResizeHandle
          ratio={split.ratio}
          active={split.dragging}
          onDragStart={split.startDrag}
          onReset={split.reset}
          onNudge={split.nudge}
        />
      )}

      {showPreview && (
        <Box minW="0" flex="1 1 0%" display="flex" flexDirection="column">
          <PreviewPane rendered={rendered} />
        </Box>
      )}

      {/* During a drag, an overlay above the iframe keeps mouse events flowing
          to the window listener (iframes otherwise swallow them). */}
      {split.dragging && (
        <Box position="fixed" inset="0" zIndex="40" cursor="col-resize" css={{ userSelect: "none" }} />
      )}
    </Flex>
  )
}
