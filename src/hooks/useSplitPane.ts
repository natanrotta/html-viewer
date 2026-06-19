import type { MouseEvent as ReactMouseEvent } from "react"
import { useCallback, useRef, useState } from "react"

import { preferenceRepository } from "@/infrastructure/storage/preferenceRepository"

const MIN = 18
const MAX = 82
const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value))

/**
 * Drives the resizable split between editor and preview. Exposes the editor
 * width ratio (%), a container ref to measure against, and drag/keyboard/reset
 * handlers. The ratio is persisted (`vitrine:split`).
 */
export function useSplitPane() {
  const [ratio, setRatioState] = useState<number>(() => preferenceRepository.loadSplit(50))
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const ratioRef = useRef(ratio)

  const setRatio = useCallback((value: number) => {
    const next = clamp(value)
    ratioRef.current = next
    setRatioState(next)
  }, [])

  const startDrag = useCallback(
    (event: ReactMouseEvent) => {
      event.preventDefault()
      setDragging(true)
      document.body.style.userSelect = "none"
      document.body.style.cursor = "col-resize"

      const onMove = (move: globalThis.MouseEvent) => {
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.width === 0) return
        setRatio(((move.clientX - rect.left) / rect.width) * 100)
      }

      const onUp = () => {
        setDragging(false)
        document.body.style.userSelect = ""
        document.body.style.cursor = ""
        window.removeEventListener("mousemove", onMove)
        window.removeEventListener("mouseup", onUp)
        preferenceRepository.saveSplit(ratioRef.current)
      }

      window.addEventListener("mousemove", onMove)
      window.addEventListener("mouseup", onUp)
    },
    [setRatio],
  )

  const nudge = useCallback(
    (delta: number) => {
      setRatio(ratioRef.current + delta)
      preferenceRepository.saveSplit(ratioRef.current)
    },
    [setRatio],
  )

  const reset = useCallback(() => {
    setRatio(50)
    preferenceRepository.saveSplit(50)
  }, [setRatio])

  return { ratio, dragging, containerRef, startDrag, nudge, reset }
}
