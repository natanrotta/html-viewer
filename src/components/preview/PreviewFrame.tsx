import { chakra } from "@chakra-ui/react"

interface PreviewFrameProps {
  srcDoc: string
  title?: string
}

/**
 * Sandboxed render surface. The document runs isolated from the app; scripts
 * are allowed so pasted HTML behaves like a real page.
 */
export function PreviewFrame({ srcDoc, title = "preview" }: PreviewFrameProps) {
  return (
    <chakra.iframe
      srcDoc={srcDoc}
      title={title}
      sandbox="allow-scripts allow-forms allow-modals allow-popups allow-same-origin allow-pointer-lock"
      position="absolute"
      inset="0"
      w="100%"
      h="100%"
      border="none"
      bg="white"
    />
  )
}
