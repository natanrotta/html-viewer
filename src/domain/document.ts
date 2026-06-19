/**
 * Domain — the Vitrine document entity and its pure rules.
 * No framework or storage concerns live here.
 */

export type EditorMode = "html" | "markdown"

export interface VitrineDocument {
  id: string
  title: string
  html: string
  titleManual: boolean
  mode: EditorMode
  updatedAt: number
}

/** Fallback title when none can be derived. */
export const UNTITLED = "Sem título"

/** Recents are capped to keep localStorage small and the list scannable. */
export const MAX_DOCUMENTS = 40

/** Stable, time-based id for a freshly created document. */
export function createDocumentId(now: number): string {
  return `d${now}`
}

/**
 * Best-effort title from the source: the `<title>` tag, then the first
 * `<h1>`, capped at 60 chars. Falls back to {@link UNTITLED}.
 */
export function deriveTitle(code: string): string {
  const title = code.match(/<title[^>]*>([^<]*)<\/title>/i)
  if (title && title[1].trim()) return title[1].trim().slice(0, 60)

  const heading = code.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (heading) {
    const text = heading[1].replace(/<[^>]+>/g, "").trim()
    if (text) return text.slice(0, 60)
  }

  return UNTITLED
}

/**
 * Insert or update a document in the recents list.
 * Existing documents keep their position; new ones are prepended. The list is
 * then capped to {@link MAX_DOCUMENTS}.
 */
export function upsertDocument(
  docs: VitrineDocument[],
  doc: VitrineDocument,
  max = MAX_DOCUMENTS,
): VitrineDocument[] {
  const exists = docs.some((d) => d.id === doc.id)
  const next = exists
    ? docs.map((d) => (d.id === doc.id ? doc : d))
    : [doc, ...docs]
  return next.slice(0, max)
}
