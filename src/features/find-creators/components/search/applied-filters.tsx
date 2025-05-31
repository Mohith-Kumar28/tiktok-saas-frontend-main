"use client"

import React from "react"

import type { TFilterSection, TFilterValues } from "./types"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AppliedFiltersProps {
  onFilterChange: (
    key: keyof TFilterValues,
    value: string | null,
    isUrlState: boolean
  ) => void
  appliedFilters: Partial<TFilterValues>
  allFilters: TFilterSection[]
}

export const AppliedFilters = ({
  onFilterChange,
  appliedFilters,
  allFilters,
}: AppliedFiltersProps) => {
  // Get all applied filters with their labels
  const appliedFiltersWithData = allFilters.flatMap((section) =>
    section.filters
      .filter((filter) => appliedFilters[filter.name as keyof TFilterValues])
      .map((filter) => {
        const value = appliedFilters[filter.name as keyof TFilterValues]
        const option = filter.options.find((opt) => opt.value === value)
        return {
          name: filter.name,
          label: option?.label || value || "",
          displayName: filter.placeholder,
        }
      })
  )

  if (appliedFiltersWithData.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-2">
      {appliedFiltersWithData.map((filter) => (
        <Badge key={`${filter.name}-${filter.label}`} variant="secondary">
          {filter.displayName}:{filter.label}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            startIcon="X"
            iconSize="sm"
            className="h-5 w-5 -mr-1.5 hover:bg-transparent hover:text-destructive"
            onClick={() => {
              onFilterChange(filter.name as keyof TFilterValues, null, true)
            }}
          >
            <span className="sr-only">Remove {filter.displayName} filter</span>
          </Button>
        </Badge>
      ))}
    </div>
  )
}
