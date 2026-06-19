import { marked } from "marked"

/**
 * GitHub-flavoured reading stylesheet for rendered Markdown — light, centred
 * column, dark code blocks, brand-bordered blockquotes. Transcribed from the
 * design handoff.
 */
const MD_CSS = [
  ":root{color-scheme:light}*{box-sizing:border-box}",
  'body{margin:0;background:#fff;color:#1f2937;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:1.65}',
  ".md{max-width:760px;margin:0 auto;padding:48px 40px 80px}",
  ".md h1,.md h2,.md h3,.md h4{line-height:1.25;font-weight:800;letter-spacing:-.02em;margin:1.6em 0 .6em}",
  ".md h1{font-size:2em;border-bottom:1px solid #e5e7eb;padding-bottom:.3em;margin-top:0}",
  ".md h2{font-size:1.5em;border-bottom:1px solid #eef0f2;padding-bottom:.25em}",
  ".md h3{font-size:1.2em}.md p,.md ul,.md ol{margin:0 0 1em}.md li{margin:.25em 0}",
  ".md a{color:#2563eb;text-decoration:none}.md a:hover{text-decoration:underline}",
  ".md code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88em;background:#f1f5f9;padding:.15em .4em;border-radius:5px}",
  ".md pre{background:#0f172a;color:#e2e8f0;padding:16px 18px;border-radius:12px;overflow:auto;font-size:.85em;line-height:1.6}",
  ".md pre code{background:none;padding:0;color:inherit}",
  ".md blockquote{margin:1em 0;padding:.4em 1.1em;border-left:4px solid #2f80ed;background:#f3f7fc;color:#475569;border-radius:0 8px 8px 0}",
  ".md table{border-collapse:collapse;width:100%;margin:1em 0;font-size:.92em}",
  ".md th,.md td{border:1px solid #e5e7eb;padding:8px 12px;text-align:left}.md th{background:#f8fafc;font-weight:700}",
  ".md img{max-width:100%;border-radius:10px}.md hr{border:none;border-top:1px solid #e5e7eb;margin:2em 0}",
].join("")

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

/** Convert Markdown to a full, self-contained HTML document for the iframe. */
export function markdownToDocument(markdown: string): string {
  let body: string | null = null
  try {
    // marked is synchronous by default; the cast pins the sync overload.
    body = marked.parse(markdown, { async: false }) as string
  } catch {
    body = null
  }

  if (body == null) {
    body = `<pre style="white-space:pre-wrap;word-break:break-word">${escapeHtml(markdown)}</pre>`
  }

  return (
    `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<style>${MD_CSS}</style></head>` +
    `<body><article class="md">${body}</article></body></html>`
  )
}
