import { useBreakpointValue } from "@chakra-ui/react"

/** True below the `md` breakpoint (≈ < 768px). Resolves on the client. */
export function useIsMobile(): boolean {
  return useBreakpointValue({ base: true, md: false }, { ssr: false }) ?? false
}
