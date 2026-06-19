import { Box, Text } from "@chakra-ui/react"

/** Dashed placeholder shown when there are no saved documents. */
export function EmptyRecents() {
  return (
    <Box
      m="18px 6px"
      p="24px 16px"
      border="1.5px dashed"
      borderColor="line.default"
      borderRadius="14px"
      textAlign="center"
      color="content.muted"
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "inline-block", marginBottom: 8, opacity: 0.7 }}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
      <Text fontSize="12.5px" fontWeight="600" lineHeight="1.5">
        Seus documentos
        <br />
        aparecem aqui.
      </Text>
    </Box>
  )
}
