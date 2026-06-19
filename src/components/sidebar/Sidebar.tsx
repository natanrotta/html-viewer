import { Box, Flex } from "@chakra-ui/react"

import type { VitrineDocument } from "@/domain/document"
import { ease } from "@/theme/motion"
import { BrandMark } from "./BrandMark"
import { DocumentList } from "./DocumentList"
import { EmptyRecents } from "./EmptyRecents"
import { NewDocumentButton } from "./NewDocumentButton"
import { RecentsHeader } from "./RecentsHeader"
import { SidebarFooter } from "./SidebarFooter"

interface SidebarProps {
  docs: VitrineDocument[]
  currentId: string | null
  isDark: boolean
  justSaved: boolean
  onNewDocument: () => void
  onSelectDocument: (id: string) => void
  onDeleteDocument: (id: string) => void
  onClearAll: () => void
  onToggleTheme: () => void
}

/**
 * Recents panel. The outer `<aside>` clips to the collapsing grid column while
 * the inner column keeps its fixed 284px width, so collapse animates cleanly.
 */
export function Sidebar({
  docs,
  currentId,
  isDark,
  justSaved,
  onNewDocument,
  onSelectDocument,
  onDeleteDocument,
  onClearAll,
  onToggleTheme,
}: SidebarProps) {
  const hasDocs = docs.length > 0

  return (
    <Box as="aside" overflow="hidden" minW="0" h="100%">
      <Flex
        direction="column"
        w="284px"
        h="100%"
        bg="surface.base"
        borderRight="1px solid"
        borderColor="line.subtle"
        transition={ease("background, border-color", "slow")}
      >
        <Box p="20px 18px 16px">
          <BrandMark />
        </Box>

        <Box p="4px 14px 14px">
          <NewDocumentButton onClick={onNewDocument} />
        </Box>

        <RecentsHeader count={docs.length} hasDocs={hasDocs} onClear={onClearAll} />

        <Box flex="1" overflowY="auto" p="2px 12px 12px">
          {hasDocs ? (
            <DocumentList
              docs={docs}
              currentId={currentId}
              onSelect={onSelectDocument}
              onDelete={onDeleteDocument}
            />
          ) : (
            <EmptyRecents />
          )}
        </Box>

        <SidebarFooter isDark={isDark} justSaved={justSaved} onToggleTheme={onToggleTheme} />
      </Flex>
    </Box>
  )
}
