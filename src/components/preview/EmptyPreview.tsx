import { Flex, Text } from "@chakra-ui/react"

import { EyeIcon } from "@/components/icons"

/** Shown in the preview pane when there is nothing to render yet. */
export function EmptyPreview() {
  return (
    <Flex
      position="absolute"
      inset="0"
      direction="column"
      align="center"
      justify="center"
      gap="14px"
      p="24px"
      textAlign="center"
      color="content.muted"
    >
      <Flex
        align="center"
        justify="center"
        w="58px"
        h="58px"
        borderRadius="16px"
        bg="surface.base"
        border="1px solid"
        borderColor="line.subtle"
        boxShadow="card"
        color="content.brand"
      >
        <EyeIcon size={26} />
      </Flex>
      <Text fontSize="14px" fontWeight="700" color="content.secondary">
        Nada para visualizar ainda
      </Text>
      <Text fontSize="13px" maxW="260px" lineHeight="1.55">
        Cole seu HTML no editor e a renderização aparece aqui em tempo real.
      </Text>
    </Flex>
  )
}
