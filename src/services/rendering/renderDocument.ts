import type { EditorMode } from "@/domain/document"
import { markdownToDocument } from "./markdown"

/**
 * Produce the `srcDoc` string for the preview iframe.
 * HTML is passed through verbatim; Markdown is converted to a styled document.
 * Empty / whitespace-only input renders nothing.
 */
export function renderDocument(code: string, mode: EditorMode): string {
  if (!code || !code.trim()) return ""
  return mode === "markdown" ? markdownToDocument(code) : code
}
