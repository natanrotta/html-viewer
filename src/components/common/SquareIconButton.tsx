"use client"

import type { ReactNode } from "react"
import { chakra } from "@chakra-ui/react"

import { useIconHover, type AnimatedIcon } from "@/components/icons"
import { Tooltip } from "@/components/ui/tooltip"
import { ease } from "@/theme/motion"

interface SquareIconButtonProps {
  icon: AnimatedIcon
  ariaLabel: string
  onClick?: () => void
  title?: string
  tooltip?: ReactNode
  /** Button dimension (square), e.g. "38px". */
  buttonSize?: string
  iconSize?: number
  /** Radius token or raw value. */
  radius?: string
  /** Lift + shadow on hover (used by prominent controls). */
  lift?: boolean
  /** Resting surface — bordered panels vs. sunken fields. */
  variant?: "bordered" | "sunken"
}

/**
 * Square, bordered icon button with a brand-coloured hover state and an
 * animated Lucide glyph that plays while the whole button is hovered.
 * Optionally wrapped in a tooltip.
 */
export function SquareIconButton({
  icon: Icon,
  ariaLabel,
  onClick,
  title,
  tooltip,
  buttonSize = "38px",
  iconSize = 17,
  radius = "md",
  lift = false,
  variant = "bordered",
}: SquareIconButtonProps) {
  const { ref, hoverProps } = useIconHover()

  const button = (
    <chakra.button
      type="button"
      aria-label={ariaLabel}
      title={tooltip ? undefined : title}
      onClick={onClick}
      {...hoverProps}
      flex="none"
      display="grid"
      placeItems="center"
      boxSize={buttonSize}
      bg={variant === "sunken" ? "surface.sunken" : "surface.panel"}
      color="content.secondary"
      border="1px solid"
      borderColor={variant === "sunken" ? "line.subtle" : "line.default"}
      borderRadius={radius}
      cursor="pointer"
      transition={ease("color, border-color, transform, box-shadow", "base")}
      _hover={{
        borderColor: "line.brand",
        color: "content.brand",
        ...(lift ? { transform: "translateY(-1px)", boxShadow: "card" } : {}),
      }}
    >
      <Icon ref={ref} size={iconSize} />
    </chakra.button>
  )

  if (!tooltip) return button

  return (
    <Tooltip content={tooltip} showArrow>
      {button}
    </Tooltip>
  )
}
