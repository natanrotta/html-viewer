import { useState } from "react"
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { ColorModeButton } from "@/components/ui/color-mode"

const features = [
  {
    title: "React 19",
    description: "Biblioteca para construção de interfaces com componentes.",
  },
  {
    title: "TypeScript",
    description: "Tipagem estática para um código mais seguro e previsível.",
  },
  {
    title: "Vite",
    description: "Build tool com dev server rápido e Hot Module Replacement.",
  },
  {
    title: "Chakra UI v3",
    description: "Componentes acessíveis com suporte a tema claro e escuro.",
  },
]

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box minH="100vh" bg="bg.subtle">
      <Container maxW="4xl" py={{ base: 8, md: 16 }}>
        <Flex justify="space-between" align="center" mb={10}>
          <Badge colorPalette="teal" size="lg">
            html-viewer
          </Badge>
          <ColorModeButton />
        </Flex>

        <Stack gap={4} mb={12}>
          <Heading size={{ base: "2xl", md: "4xl" }} lineHeight="1.1">
            React + Chakra UI + TypeScript
          </Heading>
          <Text fontSize="lg" color="fg.muted" maxW="2xl">
            Estrutura inicial pronta para rodar. Edite{" "}
            <Text as="code" color="teal.500">
              src/App.tsx
            </Text>{" "}
            e a página atualiza automaticamente.
          </Text>
        </Stack>

        <Card.Root mb={12}>
          <Card.Body>
            <HStack justify="space-between" wrap="wrap" gap={4}>
              <Stack gap={1}>
                <Card.Title>Contador interativo</Card.Title>
                <Card.Description>
                  Demonstra estado do React funcionando com componentes Chakra.
                </Card.Description>
              </Stack>
              <HStack>
                <Button
                  variant="outline"
                  onClick={() => setCount((c) => c - 1)}
                >
                  -
                </Button>
                <Text fontSize="2xl" fontWeight="bold" minW="12" textAlign="center">
                  {count}
                </Text>
                <Button colorPalette="teal" onClick={() => setCount((c) => c + 1)}>
                  +
                </Button>
              </HStack>
            </HStack>
          </Card.Body>
        </Card.Root>

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
          {features.map((feature) => (
            <Card.Root key={feature.title} variant="subtle">
              <Card.Body>
                <Card.Title mb={1}>{feature.title}</Card.Title>
                <Card.Description>{feature.description}</Card.Description>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default App
