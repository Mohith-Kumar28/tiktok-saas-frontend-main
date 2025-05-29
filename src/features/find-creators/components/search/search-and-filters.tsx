"use client"

import { useState } from "react"
import { parseAsString, useQueryStates } from "nuqs"
import { ChevronDown } from "lucide-react"

import type { TFilterValues, TSearchState } from "./types"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { filterSections, matchInOptions } from "./data"
import { Filters } from "./filters"
import { Search } from "./search"

const SearchAndFilters = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // URL state with nuqs
  const [searchUrlState, setSearchUrlState] = useQueryStates({
    query: parseAsString.withDefault(""),
    matchIn: parseAsString.withDefault("all"),
  })

  // Create parsers for each filter
  const filterParsers = Object.fromEntries(
    filterSections.flatMap((section) =>
      section.filters.map((filter) => [filter.name, parseAsString])
    )
  )

  const [filtersUrlState, setFiltersUrlState] = useQueryStates(filterParsers)

  // Local state for form values
  const [searchState, setSearchState] = useState<TSearchState>(searchUrlState)
  const [filtersState, setFiltersState] = useState<TFilterValues>(
    filtersUrlState as TFilterValues
  )

  const handleSearch = (query: string, matchIn: string) => {
    // Update local state
    const newSearchState = { query, matchIn }
    setSearchState(newSearchState)

    // Update URL state for both search and filters
    setSearchUrlState(newSearchState)

    // Convert filter values to match URL state structure
    const filterUrlValues = Object.entries(filtersState).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, string>
    )

    setFiltersUrlState(filterUrlValues)

    // You can add additional logic here like triggering a search API call
  }

  const handleFilterChange = (key: string, value: string) => {
    // Only update local state
    setFiltersState((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Card className="relative w-full">
      <CardContent>
        <div className="flex w-full gap-4">
          <Search
            onSearch={handleSearch}
            initialState={searchState}
            matchInOptions={matchInOptions}
          />
          <Button
            variant="secondary"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            {isFiltersOpen ? "Hide Filters" : "Show Filters"}
            <ChevronDown
              className={cn(
                "transition-transform duration-200",
                isFiltersOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        <div
          className={cn(
            "grid transition-all duration-200",
            isFiltersOpen ? "grid-rows-[1fr] py-8" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-scroll">
            <Filters
              onFilterChange={handleFilterChange}
              values={filtersState}
              filterSections={filterSections}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SearchAndFilters
