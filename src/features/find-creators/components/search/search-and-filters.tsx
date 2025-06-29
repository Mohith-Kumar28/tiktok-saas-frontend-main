"use client"

import { useState } from "react"
import { parseAsJson, parseAsString, useQueryState, useQueryStates } from "nuqs"

import type { TFilterValues, TSearchState } from "./types"
import { filterValuesSchema } from "./types"

import { filterSections, matchInOptions } from "../../data/data"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DynamicIcon } from "@/components/dynamic-icon"
import { AppliedFilters } from "./applied-filters"
import { FiltersSheet } from "./filters-sheet"
import { Search } from "./search"

const SearchAndFilters = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true)

  // URL state with nuqs
  const [searchUrlState, setSearchUrlState] = useQueryStates({
    query: parseAsString.withDefault(""),
    matchIn: parseAsString.withDefault("creators"),
  })

  const [filtersUrlState, setFiltersUrlState] = useQueryState(
    "filters",
    parseAsJson(filterValuesSchema.parse).withDefault({})
  )

  // Local state for form values
  const [searchState, setSearchState] = useState<TSearchState>(searchUrlState)

  const handleSearch = (query: string, matchIn: string) => {
    // Update local state
    const newSearchState = { query, matchIn }
    setSearchState(newSearchState)

    // Update URL state for both search and filters
    setSearchUrlState(newSearchState)

    // You can add additional logic here like triggering a search API call
  }

  const handleFilterSave = (filterValues: TFilterValues) => {
    // Convert filter values to match URL state structure
    const filterUrlValues = Object.entries(filterValues).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, string>
    )

    setFiltersUrlState(filterUrlValues)
  }

  const handleFilterChange = (key: string, value: string | null) => {
    // Update applied filters immediately when called from AppliedFilters
    const currentFilters = filtersUrlState as TFilterValues
    const updatedFilters = {
      ...currentFilters,
      [key]: value,
    }

    // Remove empty values
    const cleanedFilters = Object.entries(updatedFilters).reduce(
      (acc, [k, v]) => {
        if (v) {
          acc[k] = v
        }
        return acc
      },
      {} as Record<string, string>
    )

    setFiltersUrlState(cleanedFilters)
  }

  const handleFilterReset = () => {
    setFiltersUrlState(null)
  }

  return (
    <Card className="relative w-full ">
      <CardContent>
        <div className="flex w-full gap-4">
          <Search
            onSearch={handleSearch}
            initialState={searchState}
            matchInOptions={matchInOptions}
          />
          <Button
            variant="default"
            className="px-2 rounded-full py-[2px] h-auto font-semibold text-[12px] absolute left-1/2 translate-y-1/2 bottom-0 -translate-x-1/2 "
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            {/* {isFiltersOpen ? "Hide Applied Filters" : "Show Applied Filters"} */}
            <DynamicIcon
              name="ChevronDown"
              size="sm"
              className={cn(
                "transition-transform duration-200",
                isFiltersOpen && "rotate-180"
              )}
            />
          </Button>

          <FiltersSheet
            onFilterSave={handleFilterSave}
            onFilterReset={handleFilterReset}
            filterSections={filterSections}
            appliedFilters={filtersUrlState as TFilterValues}
          />
        </div>

        <div
          className={cn(
            "grid transition-all duration-200",
            isFiltersOpen ? "" : "hidden "
          )}
        >
          {Object.values(filtersUrlState).some((v) => v != null) ? (
            <AppliedFilters
              onFilterChange={handleFilterChange}
              appliedFilters={filtersUrlState}
              allFilters={filterSections}
            />
          ) : (
            <div className="h-20 flex items-center justify-center text-xs ">
              No filters applied
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default SearchAndFilters
