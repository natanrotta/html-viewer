import { Box, Flex, Text } from "@chakra-ui/react"

const TRAFFIC_LIGHTS = ["#ff5f57", "#febc2e", "#28c840"]

/** Preview header: macOS traffic lights, label and a live badge. */
export function PreviewHeader() {
  return (
    <Flex
      flex="none"
      h="40px"
      align="center"
      gap="8px"
      px="16px"
      borderBottom="1px solid"
      borderColor="line.subtle"
      bg="surface.panel"
    >
      <Flex gap="6px">
        {TRAFFIC_LIGHTS.map((color) => (
          <Box key={color} w="11px" h="11px" borderRadius="full" bg={color} />
        ))}
      </Flex>

      <Text
        fontSize="11px"
        fontWeight="700"
        letterSpacing="0.12em"
        textTransform="uppercase"
        color="content.muted"
        ml="4px"
      >
        Visualização
      </Text>

      <Box flex="1" />

      <Flex
        align="center"
        gap="5px"
        fontSize="11px"
        fontWeight="700"
        color="content.accent"
        bg="surface.accentSubtle"
        px="9px"
        py="3px"
        borderRadius="full"
      >
        <Box w="6px" h="6px" borderRadius="full" bg="accent.500" />
        ao vivo
      </Flex>
    </Flex>
  )
}
