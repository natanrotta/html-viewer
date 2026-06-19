"use client"

import { Box, chakra, Flex } from "@chakra-ui/react"

import { SquareIconButton } from "@/components/common/SquareIconButton"
import { FileTextIcon, Maximize2Icon, PanelLeftOpenIcon } from "@/components/icons"
import type { ViewMode } from "@/domain/view"
import { MOD_KEY } from "@/lib/platform"
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

/** Compact glass top bar: panel toggle · title · view control · fullscreen. */
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
      h="50px"
      display="flex"
      alignItems="center"
      gap="10px"
      px="14px"
      bg="surface.topbar"
      borderBottom="1px solid"
      borderColor="line.subtle"
      backdropFilter="blur(12px)"
      zIndex="5"
    >
      <SquareIconButton
        icon={PanelLeftOpenIcon}
        ariaLabel="Painel lateral"
        tooltip={`Painel lateral · ${MOD_KEY} B`}
        onClick={onToggleSidebar}
        buttonSize="34px"
        iconSize={16}
      />

      <Flex flex="1" minW="0" align="center" gap="7px">
        <Box flex="none" display="grid" placeItems="center" color="content.muted">
          <FileTextIcon size={15} />
        </Box>
        <DocumentTitleInput value={title} onChange={onTitleChange} />
      </Flex>

      <ViewSegmentedControl view={view} onChange={onViewChange} />

      <SquareIconButton
        icon={Maximize2Icon}
        ariaLabel="Tela cheia"
        tooltip={`Tela cheia · ${MOD_KEY} F`}
        onClick={onToggleFullscreen}
        buttonSize="34px"
        iconSize={16}
        lift
      />
    </chakra.header>
  )
}
