import { useState } from "react"
import { Box, Flex } from "@chakra-ui/react"

import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { UNTITLED, type VitrineDocument } from "@/domain/document"
import { ease } from "@/theme/motion"
import { BrandMark } from "./BrandMark"
import { DocumentList } from "./DocumentList"
import { EmptyRecents } from "./EmptyRecents"
import { NewDocumentButton } from "./NewDocumentButton"
import { RecentsHeader } from "./RecentsHeader"
import { SidebarFooter } from "./SidebarFooter"
import { SupportButton } from "./SupportButton"

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

type Confirmation =
  | { kind: "delete"; id: string; title: string }
  | { kind: "clear"; count: number }

/**
 * Recents panel. The outer `<aside>` clips to the collapsing grid column while
 * the inner column keeps its fixed 284px width, so collapse animates cleanly.
 * Destructive actions route through a confirmation dialog.
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
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)

  const requestDelete = (id: string) => {
    const doc = docs.find((item) => item.id === id)
    setConfirmation({ kind: "delete", id, title: doc?.title || UNTITLED })
  }

  const requestClearAll = () => setConfirmation({ kind: "clear", count: docs.length })

  const confirmAction = () => {
    if (confirmation?.kind === "delete") onDeleteDocument(confirmation.id)
    else if (confirmation?.kind === "clear") onClearAll()
    setConfirmation(null)
  }

  const dialog =
    confirmation?.kind === "clear"
      ? {
          title: "Apagar todos os documentos?",
          description:
            confirmation.count === 1
              ? "O documento salvo será removido permanentemente. Esta ação não pode ser desfeita."
              : `Os ${confirmation.count} documentos salvos serão removidos permanentemente. Esta ação não pode ser desfeita.`,
          confirmLabel: "Apagar tudo",
        }
      : confirmation?.kind === "delete"
        ? {
            title: "Excluir documento?",
            description: (
              <>
                O documento <b>“{confirmation.title}”</b> será removido permanentemente.
              </>
            ),
            confirmLabel: "Excluir",
          }
        : { title: "", description: "", confirmLabel: "Excluir" }

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

        <RecentsHeader count={docs.length} hasDocs={hasDocs} onClear={requestClearAll} />

        <Box flex="1" overflowY="auto" p="2px 12px 12px">
          {hasDocs ? (
            <DocumentList
              docs={docs}
              currentId={currentId}
              onSelect={onSelectDocument}
              onDelete={requestDelete}
            />
          ) : (
            <EmptyRecents />
          )}
        </Box>

        <SupportButton />

        <SidebarFooter isDark={isDark} justSaved={justSaved} onToggleTheme={onToggleTheme} />
      </Flex>

      <ConfirmDialog
        open={!!confirmation}
        title={dialog.title}
        description={dialog.description}
        confirmLabel={dialog.confirmLabel}
        onConfirm={confirmAction}
        onCancel={() => setConfirmation(null)}
      />
    </Box>
  )
}
