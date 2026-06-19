"use client"

import type { HTMLAttributes } from "react"
import { forwardRef, useImperativeHandle } from "react"

import { cn } from "@/lib/utils"

export interface CodeIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface CodeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
  strokeWidth?: number
}

/**
 * Static `</>` glyph (Lucide `code`) — no animated variant exists upstream,
 * so it mirrors the animated icons' handle API as a no-op for a uniform
 * call site. Used by the brand mark and the "Código" view tab.
 */
const CodeIcon = forwardRef<CodeIconHandle, CodeIconProps>(
  ({ className, size = 24, strokeWidth = 2, ...props }, ref) => {
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
          strokeWidth={strokeWidth}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>
    )
  },
)

CodeIcon.displayName = "CodeIcon"

export { CodeIcon }
