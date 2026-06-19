/** Minimal className combiner (clsx-style) — joins the truthy class values. */
export function cn(
  ...inputs: Array<string | false | null | undefined>
): string {
  return inputs.filter(Boolean).join(" ")
}
