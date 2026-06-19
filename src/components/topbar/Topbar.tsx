"use client"

import { Box, chakra, Flex } from "@chakra-ui/react"

import { SquareIconButton } from "@/components/common/SquareIconButton"
import { FileTextIcon, Maximize2Icon, PanelLeftOpenIcon } from "@/components/icons"
import type { ViewMode } from "@/domain/view"
import { DocumentTitleInput } from "./DocumentTitleInput"
import { ViewSegmentedControl } from "./ViewSegmentedControl"

interface TopbarProps {
  title: string
  onTitleChange: (value: string) => void
  view: ViewMode
  onViewChange: (view: ViewMode) => void
  onToggleSidebar: () => void
  onToggleFullscreen: () => void
}

/** Glass top bar: panel toggle · document title · view control · fullscreen. */
export function Topbar({
  title,
  onTitleChange,
  view,
  onViewChange,
  onToggleSidebar,
  onToggleFullscreen,
}: TopbarProps) {
  return (
    <chakra.header
      flex="none"
      h="60px"
      display="flex"
      alignItems="center"
      gap="12px"
      px="16px"
      bg="surface.topbar"
      borderBottom="1px solid"
      borderColor="line.subtle"
      backdropFilter="blur(12px)"
      zIndex="5"
    >
      <SquareIconButton
        icon={PanelLeftOpenIcon}
        ariaLabel="Painel lateral"
        title="Mostrar/ocultar painel"
        onClick={onToggleSidebar}
      />

      <Flex flex="1" minW="0" align="center" gap="8px">
        <Box flex="none" display="grid" placeItems="center" color="content.muted">
          <FileTextIcon size={16} />
        </Box>
        <DocumentTitleInput value={title} onChange={onTitleChange} />
      </Flex>

      <ViewSegmentedControl view={view} onChange={onViewChange} />

      <SquareIconButton
        icon={Maximize2Icon}
        ariaLabel="Tela cheia"
        title="Tela cheia"
        onClick={onToggleFullscreen}
        lift
      />
    </chakra.header>
  )
}
