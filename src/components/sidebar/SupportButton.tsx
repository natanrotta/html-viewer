"use client"

import { Box, chakra, CloseButton, Dialog, Flex, Portal, Text } from "@chakra-ui/react"

import { CoffeeIcon, useIconHover } from "@/components/icons"
import { ease } from "@/theme/motion"

const BMC_URL = "https://www.buymeacoffee.com/natanrotta"
const BMC_BUTTON_IMG =
  "https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=natanrotta&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
const COFFEE_GRADIENT = "linear-gradient(135deg, #ffe14d, #e0a500)"
const COFFEE_TINT = "color-mix(in srgb, #e0a500 45%, transparent)"

interface Reason {
  emoji: string
  title: string
  desc: string
}

const REASONS: Reason[] = [
  { emoji: "✨", title: "Novas features", desc: "Mais formatos, atalhos e melhorias contínuas." },
  { emoji: "🌐", title: "Domínio e hospedagem", desc: "Manter o site no ar, rápido e acessível." },
  { emoji: "🛠️", title: "Manutenção e ajuda", desc: "Correções, suporte e tempo dedicado ao projeto." },
]

/** Sidebar support trigger + modal explaining why donations help, with the
 *  official Buy Me a Coffee button. */
export function SupportButton() {
  const { ref, hoverProps } = useIconHover()

  return (
    <Dialog.Root placement="center" size={{ base: "xs", sm: "sm" }} motionPreset="slide-in-bottom">
      <Box px="12px" pb="10px">
        <Dialog.Trigger asChild>
          <chakra.button
            type="button"
            aria-label="Apoiar o site"
            {...hoverProps}
            w="100%"
            display="flex"
            alignItems="center"
            gap="9px"
            px="12px"
            py="9px"
            border="1px solid"
            borderColor="line.subtle"
            bg="surface.sunken"
            color="content.secondary"
            borderRadius="10px"
            cursor="pointer"
            transition={ease("color, border-color, background, transform", "base")}
            _hover={{ borderColor: COFFEE_TINT, color: "content.primary", transform: "translateY(-1px)" }}
          >
            <CoffeeIcon ref={ref} size={16} />
            <Text fontSize="12.5px" fontWeight="700">
              Apoiar o site
            </Text>
            <Box flex="1" />
            <Box as="span" fontSize="14px" lineHeight="1">
              ☕
            </Box>
          </chakra.button>
        </Dialog.Trigger>
      </Box>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="surface.elevated"
            color="content.primary"
            borderWidth="1px"
            borderColor="line.subtle"
            borderRadius="18px"
            boxShadow="lg"
          >
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Header display="block" px="22px" pt="22px" pb="6px">
              <Flex align="center" gap="12px">
                <Box
                  flex="none"
                  w="42px"
                  h="42px"
                  borderRadius="12px"
                  bgImage={COFFEE_GRADIENT}
                  display="grid"
                  placeItems="center"
                  color="#1f2937"
                  boxShadow="0 4px 12px -2px color-mix(in srgb, #e0a500 55%, transparent)"
                >
                  <CoffeeIcon size={22} />
                </Box>
                <Box>
                  <Dialog.Title
                    fontWeight="800"
                    fontSize="18px"
                    letterSpacing="-0.01em"
                    color="content.primary"
                  >
                    Apoie o HTML Viewer
                  </Dialog.Title>
                  <Text fontSize="12.5px" fontWeight="600" color="content.muted">
                    Mantenha o projeto vivo ☕
                  </Text>
                </Box>
              </Flex>
            </Dialog.Header>

            <Dialog.Body px="22px" pb="22px">
              <Text fontSize="13.5px" color="content.secondary" lineHeight="1.6" mb="16px">
                O <b>HTML Viewer</b> é gratuito e sem anúncios. Se ele te ajuda no dia a dia, um
                cafézinho ajuda a manter o projeto no ar e em evolução.
              </Text>

              <Flex direction="column" gap="11px" mb="20px">
                {REASONS.map((reason) => (
                  <Flex key={reason.title} align="flex-start" gap="11px">
                    <Box
                      flex="none"
                      w="30px"
                      h="30px"
                      borderRadius="9px"
                      bg="surface.sunken"
                      display="grid"
                      placeItems="center"
                      fontSize="15px"
                    >
                      {reason.emoji}
                    </Box>
                    <Box>
                      <Text fontSize="13px" fontWeight="700" color="content.primary">
                        {reason.title}
                      </Text>
                      <Text fontSize="12px" color="content.muted" lineHeight="1.45">
                        {reason.desc}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>

              <Flex direction="column" align="center" gap="10px">
                <chakra.a
                  href={BMC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  display="inline-flex"
                  borderRadius="12px"
                  transition={ease("transform, box-shadow", "base")}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 24px -8px color-mix(in srgb, #e0a500 60%, transparent)",
                  }}
                >
                  <chakra.img
                    src={BMC_BUTTON_IMG}
                    alt="Buy me a coffee"
                    h="48px"
                    display="block"
                    borderRadius="12px"
                  />
                </chakra.a>

                <Dialog.ActionTrigger asChild>
                  <chakra.button
                    type="button"
                    border="none"
                    bg="transparent"
                    color="content.muted"
                    fontFamily="sans"
                    fontWeight="600"
                    fontSize="12.5px"
                    cursor="pointer"
                    px="8px"
                    py="4px"
                    borderRadius="7px"
                    transition={ease("color, background", "fast")}
                    _hover={{ color: "content.secondary", bg: "surface.hover" }}
                  >
                    Agora não
                  </chakra.button>
                </Dialog.ActionTrigger>
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
