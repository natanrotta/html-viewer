/**
 * Relative, human-friendly timestamps in pt-BR:
 * "agora" · "N min" · "HH:mm" (today) · "dd mmm" (older).
 */
export function formatRelativeTime(ts: number, now: number = Date.now()): string {
  if (!ts) return ""

  const date = new Date(ts)
  const reference = new Date(now)
  const diffSeconds = (now - ts) / 1000

  if (diffSeconds < 60) return "agora"
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} min`

  if (date.toDateString() === reference.toDateString()) {
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
}
