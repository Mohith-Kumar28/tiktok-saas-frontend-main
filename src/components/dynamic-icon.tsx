// Refer to Lucide documentation for more details https://lucide.dev/guide/packages/lucide-react
import { icons } from "lucide-react"

import type { DynamicIconNameType } from "@/types/types"
import type { LucideProps } from "lucide-react"

import { cn } from "@/lib/utils"

type IconSize = "xs" | "sm" | "base" | "lg" | "md"

interface DynamicIconProps extends LucideProps {
  name: DynamicIconNameType
  size?: IconSize
}

const sizeClasses: Record<IconSize, string> = {
  xs: "size-2",
  sm: "size-3",
  base: "size-4",
  md: "size-5",
  lg: "size-6",
}

// Component to render a dynamic Lucide icon based on its name.
export function DynamicIcon({
  name,
  size = "base",
  ...props
}: DynamicIconProps) {
  const LucideIcon = icons[name] // Dynamically retrieve the icon by name.

  // Return null if the icon name is invalid.
  if (!LucideIcon) return null

  return (
    <LucideIcon {...props} className={cn(sizeClasses[size], props.className)} />
  )
}
