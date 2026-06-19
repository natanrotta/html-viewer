import { chakra } from "@chakra-ui/react"

import { Topbar } from "@/components/topbar/Topbar"
import type { EditorMode } from "@/domain/document"
import type { ViewMode } from "@/domain/view"
import { ContentArea } from "./ContentArea"

interface MainAreaProps {
  title: string
  onTitleChange: (value: string) => void
  view: ViewMode
  onViewChange: (view: ViewMode) => void
  code: string
  mode: EditorMode
  rendered: string
  onCodeChange: (value: string) => void
  onModeChange: (mode: EditorMode) => void
  onToggleSidebar: () => void
  onToggleFullscreen: () => void
}

/** The editing surface: top bar over the content area. */
export function MainArea(props: MainAreaProps) {
  return (
    <chakra.main flex="1" minW="0" display="flex" flexDirection="column">
      <Topbar
        title={props.title}
        onTitleChange={props.onTitleChange}
        view={props.view}
        onViewChange={props.onViewChange}
        onToggleSidebar={props.onToggleSidebar}
        onToggleFullscreen={props.onToggleFullscreen}
      />
      <ContentArea
        view={props.view}
        code={props.code}
        mode={props.mode}
        rendered={props.rendered}
        onCodeChange={props.onCodeChange}
        onModeChange={props.onModeChange}
      />
    </chakra.main>
  )
}
