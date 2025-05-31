"use client"

import React from "react"
import { X } from "lucide-react"

import type { TFilterSection, TFilterValues } from "./types"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AppliedFiltersProps {
  onFilterChange: (key: keyof TFilterValues, value: string) => void
  values: Partial<TFilterValues>
  filterSections: TFilterSection[]
}

export const AppliedFilters = ({
  onFilterChange,
  values,
  filterSections,
}: AppliedFiltersProps) => {
  // Get all applied filters with their labels
  const appliedFilters = filterSections.flatMap((section) =>
    section.filters
      .filter((filter) => values[filter.name as keyof TFilterValues])
      .map((filter) => {
        const value = values[filter.name as keyof TFilterValues]
        const option = filter.options.find((opt) => opt.value === value)
        return {
          name: filter.name,
          label: option?.label || value || "",
          displayName: filter.placeholder,
        }
      })
  )

  if (appliedFilters.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-2">
      {appliedFilters.map((filter) => (
        <Badge
          key={`${filter.name}-${filter.label}`}
          variant="outline"
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-md border-border/50 bg-muted/50 hover:bg-muted/70 transition-colors"
        >
          <span className="font-medium text-foreground/80">
            {filter.displayName}:
          </span>
          <span className="font-normal">{filter.label}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-5 w-5 -mr-1.5 hover:bg-transparent hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              onFilterChange(filter.name as keyof TFilterValues, "")
            }}
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Remove {filter.displayName} filter</span>
          </Button>
        </Badge>
      ))}
    </div>
  )
}
