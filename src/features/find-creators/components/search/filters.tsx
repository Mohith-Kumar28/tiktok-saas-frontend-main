"use client"

import React from "react"

import type { TFilterSection, TFilterValues, TOption } from "./types"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FiltersProps {
  onFilterChange?: (key: string, value: string) => void
  values: TFilterValues
  filterSections: TFilterSection[]
}

export const Filters = ({
  onFilterChange,
  values,
  filterSections,
}: FiltersProps) => {
  const FilterSelect = ({
    name,
    options,
    placeholder,
  }: {
    name: string
    options: TOption[]
    placeholder: string
  }) => (
    <Select
      value={values[name as keyof TFilterValues] || undefined}
      onValueChange={(value) => onFilterChange?.(name, value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  return (
    <div className="space-y-6">
      {filterSections.map((section) => (
        <div
          key={section.title}
          className="grid grid-cols-[200px_1fr] items-center gap-6"
        >
          <h3 className="text-muted-foreground text-sm font-medium">
            {section.title}
          </h3>
          <div className={`grid grid-cols-${section.columns} gap-4`}>
            {section.filters.map((filter) => (
              <FilterSelect
                key={filter.name}
                name={filter.name}
                options={filter.options}
                placeholder={filter.placeholder}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
