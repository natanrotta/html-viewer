import { Box } from "@chakra-ui/react"

import { FullscreenOverlay } from "@/components/fullscreen/FullscreenOverlay"
import { Sidebar } from "@/components/sidebar/Sidebar"
import { MainArea } from "@/components/workspace/MainArea"
import { useDocuments } from "@/hooks/useDocuments"
import { useFullscreen } from "@/hooks/useFullscreen"
import { useSidebar } from "@/hooks/useSidebar"
import { useThemeMode } from "@/hooks/useThemeMode"
import { useViewMode } from "@/hooks/useViewMode"
import { ACCENT_APP, ease } from "@/theme/motion"

/** Two soft radial washes (accent top-right, brand top-left) over the canvas. */
const CANVAS_GLOW =
  `radial-gradient(1200px 600px at 110% -10%, color-mix(in srgb, ${ACCENT_APP} 7%, transparent), transparent 60%), ` +
  `radial-gradient(1000px 500px at -10% -10%, color-mix(in srgb, #2f80ed 7%, transparent), transparent 55%)`

/**
 * Composition root: wires the application hooks to the studio layout.
 * The root grid's first track collapses to animate the sidebar open/closed.
 */
export default function App() {
  const documents = useDocuments()
  const { view, setView } = useViewMode()
  const sidebar = useSidebar()
  const fullscreen = useFullscreen()
  const theme = useThemeMode()

  return (
    <Box
      display="grid"
      h="100vh"
      w="100%"
      gridTemplateColumns={sidebar.open ? "284px minmax(0, 1fr)" : "0px minmax(0, 1fr)"}
      gridTemplateRows="100vh"
      overflow="hidden"
      fontFamily="sans"
      color="content.primary"
      bgColor="surface.canvas"
      bgImage={CANVAS_GLOW}
      transition={ease("grid-template-columns, background-color", "slow")}
    >
      <Sidebar
        docs={documents.docs}
        currentId={documents.currentId}
        isDark={theme.isDark}
        onNewDocument={documents.newDocument}
        onSelectDocument={documents.selectDocument}
        onDeleteDocument={documents.deleteDocument}
        onClearAll={documents.clearAll}
        onToggleTheme={theme.toggle}
      />

      <MainArea
        title={documents.title}
        onTitleChange={documents.changeTitle}
        view={view}
        onViewChange={setView}
        code={documents.code}
        mode={documents.mode}
        rendered={documents.rendered}
        onCodeChange={documents.changeCode}
        onModeChange={documents.setMode}
        onToggleSidebar={sidebar.toggle}
        onToggleFullscreen={fullscreen.toggle}
      />

      {fullscreen.active && (
        <FullscreenOverlay
          title={documents.title}
          rendered={documents.rendered}
          onExit={fullscreen.exit}
        />
      )}
    </Box>
  )
}
