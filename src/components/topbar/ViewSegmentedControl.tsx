"use client"

import { chakra, Flex } from "@chakra-ui/react"

import {
  CodeIcon,
  Columns2Icon,
  EyeIcon,
  useIconHover,
  type AnimatedIcon,
} from "@/components/icons"
import type { ViewMode } from "@/domain/view"
import { ease } from "@/theme/motion"

interface Tab {
  value: ViewMode
  label: string
  icon: AnimatedIcon
}

const TABS: Tab[] = [
  { value: "code", label: "Código", icon: CodeIcon },
  { value: "split", label: "Dividir", icon: Columns2Icon },
  { value: "preview", label: "Visualizar", icon: EyeIcon },
]

interface SegmentedTabProps {
  active: boolean
  label: string
  icon: AnimatedIcon
  onClick: () => void
}

function SegmentedTab({ active, label, icon: Icon, onClick }: SegmentedTabProps) {
  const { ref, hoverProps } = useIconHover()

  return (
    <chakra.button
      type="button"
      onClick={onClick}
      title={label}
      {...hoverProps}
      display="inline-flex"
      alignItems="center"
      gap="6px"
      h="30px"
      px="11px"
      border="none"
      borderRadius="7px"
      cursor="pointer"
      fontFamily="sans"
      bg={active ? "surface.base" : "transparent"}
      color={active ? "content.primary" : "content.muted"}
      boxShadow={active ? "card" : "none"}
      transition={ease("background, color, box-shadow", "base")}
      _hover={active ? undefined : { color: "content.secondary" }}
    >
      <Icon ref={ref} size={14} />
      <chakra.span fontSize="12.5px" fontWeight="700">
        {label}
      </chakra.span>
    </chakra.button>
  )
}

interface ViewSegmentedControlProps {
  view: ViewMode
  onChange: (view: ViewMode) => void
}

/** Segmented control switching between code · split · preview layouts. */
export function ViewSegmentedControl({ view, onChange }: ViewSegmentedControlProps) {
  return (
    <Flex
      align="center"
      gap="2px"
      bg="surface.sunken"
      p="3px"
      borderRadius="10px"
      border="1px solid"
      borderColor="line.subtle"
    >
      {TABS.map((tab) => (
        <SegmentedTab
          key={tab.value}
          active={view === tab.value}
          label={tab.label}
          icon={tab.icon}
          onClick={() => onChange(tab.value)}
        />
      ))}
    </Flex>
  )
}
