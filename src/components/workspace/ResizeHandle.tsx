"use client"

import type { KeyboardEvent, MouseEvent } from "react"
import { Box } from "@chakra-ui/react"

import { ease } from "@/theme/motion"

const MIN = 18
const MAX = 82

interface ResizeHandleProps {
  ratio: number
  active: boolean
  onDragStart: (event: MouseEvent) => void
  onReset: () => void
  onNudge: (delta: number) => void
}

/**
 * Draggable divider between editor and preview: an 11px hit gutter with a
 * centred 1px line and a grab grip. Drag to resize, double-click (or Home) to
 * reset to 50/50, arrow keys to nudge. Exposed as an ARIA separator.
 */
export function ResizeHandle({ ratio, active, onDragStart, onReset, onNudge }: ResizeHandleProps) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      onNudge(-2)
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      onNudge(2)
    } else if (event.key === "Home") {
      event.preventDefault()
      onReset()
    }
  }

  return (
    <Box
      className="group"
      role="separator"
      aria-orientation="vertical"
      aria-label="Redimensionar painéis"
      aria-valuenow={Math.round(ratio)}
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      tabIndex={0}
      title="Arraste para redimensionar · duplo-clique iguala"
      onMouseDown={onDragStart}
      onDoubleClick={onReset}
      onKeyDown={onKeyDown}
      flex="none"
      w="11px"
      position="relative"
      display={{ base: "none", md: "grid" }}
      placeItems="center"
      cursor="col-resize"
      css={{ touchAction: "none" }}
      _focusVisible={{ outline: "none" }}
    >
      {/* Centred 1px divider line */}
      <Box
        position="absolute"
        insetBlock="0"
        left="50%"
        w="1px"
        transform="translateX(-50%)"
        bg={active ? "line.brand" : "line.default"}
        transition={ease("background", "fast")}
        _groupHover={{ bg: "line.brand" }}
      />
      {/* Grab affordance */}
      <Box
        position="relative"
        w="6px"
        h="38px"
        borderRadius="full"
        bg={active ? "brand.500" : "line.strong"}
        boxShadow={active ? "card" : "none"}
        opacity={active ? 1 : 0.5}
        pointerEvents="none"
        transition={ease("opacity, background", "fast")}
        _groupHover={{ opacity: 1, bg: "brand.500" }}
      />
    </Box>
  )
}
