"use client"

import type { HTMLAttributes } from "react"
import { forwardRef, useImperativeHandle } from "react"

import { cn } from "@/lib/utils"

export interface Columns2IconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface Columns2IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
}

/**
 * Static split-view glyph (Lucide `columns-2`) — no animated variant exists
 * upstream, so it mirrors the animated icons' handle API as a no-op. Used by
 * the "Dividir" view tab.
 */
const Columns2Icon = forwardRef<Columns2IconHandle, Columns2IconProps>(
  ({ className, size = 24, ...props }, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: () => {},
      stopAnimation: () => {},
    }))

    return (
      <div className={cn(className)} {...props}>
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M12 3v18" />
        </svg>
      </div>
    )
  },
)

Columns2Icon.displayName = "Columns2Icon"

export { Columns2Icon }
