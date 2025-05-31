"use client"

import React from "react"

import type { TFilterSection, TFilterValues, TOption } from "./types"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
    <Accordion type="single" collapsible className="space-y-2">
      {filterSections.map((section) => (
        <AccordionItem key={section.title} value={section.title}>
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-4">
              {section.filters.map((filter) => (
                <FilterSelect
                  key={filter.name}
                  name={filter.name}
                  options={filter.options}
                  placeholder={filter.placeholder}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
