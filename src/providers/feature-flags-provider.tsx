"use client"

import * as React from "react"

interface FeatureFlags {
  // Data table features
  enableAdvancedFiltering: boolean
  enableAdvancedSorting: boolean
  enableBulkOperations: boolean
  enableDataExport: boolean

  // UI features
  enableKeyboardShortcuts: boolean
  enableAccessibilityEnhancements: boolean

  // Filter options
  filterVariant: "advancedFilters" | "filterMenu"

  // Performance features
  enableVirtualization: boolean
  enableLazyLoading: boolean
}

const defaultFeatureFlags: FeatureFlags = {
  // Data table features
  enableAdvancedFiltering: true,
  enableAdvancedSorting: true,
  enableBulkOperations: true,
  enableDataExport: true,

  // UI features
  enableKeyboardShortcuts: true,
  enableAccessibilityEnhancements: true,

  // Filter options
  filterVariant: "filterMenu",

  // Performance features
  enableVirtualization: false,
  enableLazyLoading: false,
}

const FeatureFlagsContext =
  React.createContext<FeatureFlags>(defaultFeatureFlags)

interface FeatureFlagsProviderProps {
  children: React.ReactNode
  flags?: Partial<FeatureFlags>
}

export function FeatureFlagsProvider({
  children,
  flags = {},
}: FeatureFlagsProviderProps) {
  const featureFlags = React.useMemo(
    () => ({ ...defaultFeatureFlags, ...flags }),
    [flags]
  )

  return (
    <FeatureFlagsContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export function useFeatureFlags(): FeatureFlags {
  const context = React.useContext(FeatureFlagsContext)
  if (!context) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagsProvider"
    )
  }
  return context
}

// Convenience hooks for specific features
export function useDataTableFeatures() {
  const flags = useFeatureFlags()
  return {
    enableAdvancedFiltering: flags.enableAdvancedFiltering,
    enableAdvancedSorting: flags.enableAdvancedSorting,
    enableBulkOperations: flags.enableBulkOperations,
    enableDataExport: flags.enableDataExport,
    filterVariant: flags.filterVariant,
  }
}

export function useUIFeatures() {
  const flags = useFeatureFlags()
  return {
    enableKeyboardShortcuts: flags.enableKeyboardShortcuts,
    enableAccessibilityEnhancements: flags.enableAccessibilityEnhancements,
  }
}

export function usePerformanceFeatures() {
  const flags = useFeatureFlags()
  return {
    enableVirtualization: flags.enableVirtualization,
    enableLazyLoading: flags.enableLazyLoading,
  }
}