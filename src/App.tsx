import { useEffect, useRef, useState } from "react"
import { Box } from "@chakra-ui/react"

import { FullscreenOverlay } from "@/components/fullscreen/FullscreenOverlay"
import { Sidebar } from "@/components/sidebar/Sidebar"
import { MainArea } from "@/components/workspace/MainArea"
import { cycleView } from "@/domain/view"
import { useDocuments } from "@/hooks/useDocuments"
import { useFullscreen } from "@/hooks/useFullscreen"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts"
import { useSidebar } from "@/hooks/useSidebar"
import { useThemeMode } from "@/hooks/useThemeMode"
import { useViewMode } from "@/hooks/useViewMode"
import { ACCENT_APP, ease } from "@/theme/motion"

/** Two soft radial washes (accent top-right, brand top-left) over the canvas. */
const CANVAS_GLOW =
  `radial-gradient(1200px 600px at 110% -10%, color-mix(in srgb, ${ACCENT_APP} 7%, transparent), transparent 60%), ` +
  `radial-gradient(1000px 500px at -10% -10%, color-mix(in srgb, #2f80ed 7%, transparent), transparent 55%)`

/**
 * Composition root. On desktop the sidebar is a collapsible grid column; on
 * mobile (< md) it becomes an off-canvas drawer over a single-column layout,
 * and "split" view collapses to a single pane.
 */
export default function App() {
  const documents = useDocuments()
  const { view, setView } = useViewMode()
  const sidebar = useSidebar()
  const fullscreen = useFullscreen()
  const theme = useThemeMode()
  const isMobile = useIsMobile()

  const [justSaved, setJustSaved] = useState(false)
  const savedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleSave = () => {
    documents.saveNow()
    setJustSaved(true)
    clearTimeout(savedTimer.current)
    savedTimer.current = setTimeout(() => setJustSaved(false), 1400)
  }

  useEffect(() => () => clearTimeout(savedTimer.current), [])

  // No room for side-by-side editing on small screens.
  useEffect(() => {
    if (isMobile && view === "split") setView("preview")
  }, [isMobile, view, setView])

  const openDocument = (id: string) => {
    documents.selectDocument(id)
    setView("preview")
    if (isMobile) sidebar.close()
  }

  const createDocument = () => {
    documents.newDocument()
    setView("code")
    if (isMobile) sidebar.close()
  }

  useKeyboardShortcuts({
    toggleSidebar: sidebar.toggle,
    save: handleSave,
    newDocument: createDocument,
    toggleTheme: theme.toggle,
    prevView: () => setView(cycleView(view, -1)),
    nextView: () => setView(cycleView(view, 1)),
    toggleFullscreen: fullscreen.toggle,
  })

  return (
    <Box
      display="grid"
      h="100vh"
      w="100%"
      gridTemplateColumns={{
        base: "minmax(0, 1fr)",
        md: sidebar.open ? "284px minmax(0, 1fr)" : "0px minmax(0, 1fr)",
      }}
      gridTemplateRows="100vh"
      overflow="hidden"
      fontFamily="sans"
      color="content.primary"
      bgColor="surface.canvas"
      bgImage={CANVAS_GLOW}
      transition={ease("grid-template-columns, background-color", "slow")}
    >
      <Sidebar
        open={sidebar.open}
        docs={documents.docs}
        currentId={documents.currentId}
        isDark={theme.isDark}
        justSaved={justSaved}
        onNewDocument={createDocument}
        onSelectDocument={openDocument}
        onDeleteDocument={documents.deleteDocument}
        onClearAll={documents.clearAll}
        onToggleTheme={theme.toggle}
      />

      {/* Mobile drawer backdrop */}
      <Box
        display={{ base: sidebar.open ? "block" : "none", md: "none" }}
        position="fixed"
        inset="0"
        zIndex="40"
        bg="surface.overlay"
        onClick={sidebar.close}
        aria-hidden="true"
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
