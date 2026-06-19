/**
 * Icon registry — animated Lucide glyphs from lucide-animated.com
 * (pqoqubbw/icons, Motion-powered, play on hover via {@link useIconHover}).
 * `CodeIcon` and `Columns2Icon` have no animated upstream variant and are
 * static, but expose the same handle API so call sites stay uniform.
 */
import type { ComponentType, RefAttributes } from "react"
import type { IconHandle } from "./useIconHover"

export { useIconHover, type IconHandle } from "./useIconHover"

/** Any icon usable at a call site: accepts a `size` and forwards a handle ref. */
export type AnimatedIcon = ComponentType<{ size?: number } & RefAttributes<IconHandle>>

export { SunIcon } from "./sun"
export { MoonIcon } from "./moon"
export { PlusIcon } from "./plus"
export { EyeIcon } from "./eye"
export { PanelLeftOpenIcon } from "./panel-left-open"
export { Maximize2Icon } from "./maximize-2"
export { MinimizeIcon } from "./minimize"
export { DeleteIcon } from "./delete"
export { FileTextIcon } from "./file-text"
export { KeyboardIcon } from "./keyboard"
export { CoffeeIcon } from "./coffee"
export { CodeIcon } from "./code"
export { Columns2Icon } from "./columns-2"
