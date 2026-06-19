"use client"

import { chakra } from "@chakra-ui/react"

import { useIconHover, type AnimatedIcon } from "@/components/icons"
import { ease } from "@/theme/motion"

interface SquareIconButtonProps {
  icon: AnimatedIcon
  ariaLabel: string
  onClick?: () => void
  title?: string
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
 * Shared by the sidebar toggle, fullscreen toggle and theme toggle.
 */
export function SquareIconButton({
  icon: Icon,
  ariaLabel,
  onClick,
  title,
  buttonSize = "38px",
  iconSize = 17,
  radius = "md",
  lift = false,
  variant = "bordered",
}: SquareIconButtonProps) {
  const { ref, hoverProps } = useIconHover()

  return (
    <chakra.button
      type="button"
      aria-label={ariaLabel}
      title={title}
      onClick={onClick}
      {...hoverProps}
      flex="none"
      display="grid"
      placeItems="center"
      boxSize={buttonSize}
      bg={variant === "sunken" ? "surface.sunken" : "surface.base"}
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
}
