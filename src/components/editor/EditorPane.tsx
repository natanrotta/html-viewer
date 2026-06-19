import { chakra } from "@chakra-ui/react"

import type { EditorMode } from "@/domain/document"
import { CodeTextarea } from "./CodeTextarea"
import { EditorToolbar } from "./EditorToolbar"

interface EditorPaneProps {
  code: string
  mode: EditorMode
  onCodeChange: (value: string) => void
  onModeChange: (mode: EditorMode) => void
}

/** Editor column: toolbar + code textarea. */
export function EditorPane({ code, mode, onCodeChange, onModeChange }: EditorPaneProps) {
  const lineCount = code ? code.split("\n").length : 0
  const charCount = code ? code.length : 0

  return (
    <chakra.section
      flex="1 1 0"
      minW="0"
      display="flex"
      flexDirection="column"
      bg="surface.base"
    >
      <EditorToolbar
        mode={mode}
        onModeChange={onModeChange}
        lineCount={lineCount}
        charCount={charCount}
      />
      <CodeTextarea code={code} mode={mode} onChange={onCodeChange} />
    </chakra.section>
  )
}
