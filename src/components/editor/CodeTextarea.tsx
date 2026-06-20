"use client"

import type { KeyboardEvent } from "react"
import { chakra } from "@chakra-ui/react"

import type { EditorMode } from "@/domain/document"

interface CodeTextareaProps {
  code: string
  mode: EditorMode
  onChange: (value: string) => void
}

/** Monospace editor. Tab inserts two spaces instead of moving focus. */
export function CodeTextarea({ code, mode, onChange }: CodeTextareaProps) {
  const placeholder =
    mode === "markdown" ? "Escreva seu Markdown aqui…" : "Cole ou escreva seu HTML aqui…"

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Tab") return
    event.preventDefault()

    const target = event.currentTarget
    const start = target.selectionStart
    const end = target.selectionEnd
    const next = `${code.slice(0, start)}  ${code.slice(end)}`

    onChange(next)
    requestAnimationFrame(() => {
      try {
        target.selectionStart = target.selectionEnd = start + 2
      } catch {
        /* selection no longer addressable — ignore */
      }
    })
  }

  return (
    <chakra.textarea
      value={code}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      spellCheck={false}
      wrap="off"
      flex="1"
      w="100%"
      border="none"
      outline="none"
      resize="none"
      p="18px 20px"
      bg="surface.panel"
      color="content.primary"
      fontFamily="mono"
      fontSize="13px"
      lineHeight="1.7"
      style={{ tabSize: 2 }}
      _placeholder={{ color: "content.muted" }}
    />
  )
}
