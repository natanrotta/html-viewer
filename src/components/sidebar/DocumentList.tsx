import { Flex } from "@chakra-ui/react"

import type { VitrineDocument } from "@/domain/document"
import { DocumentRow } from "./DocumentRow"

interface DocumentListProps {
  docs: VitrineDocument[]
  currentId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

/** Scrollable list of recent documents. */
export function DocumentList({ docs, currentId, onSelect, onDelete }: DocumentListProps) {
  return (
    <Flex direction="column" gap="6px">
      {docs.map((doc) => (
        <DocumentRow
          key={doc.id}
          doc={doc}
          active={doc.id === currentId}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </Flex>
  )
}
