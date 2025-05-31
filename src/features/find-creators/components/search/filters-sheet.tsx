import React, { useState } from "react"

import type { TFilterSection, TFilterValues } from "./types"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DynamicIcon } from "@/components/dynamic-icon"
import { Filters } from "./filters"

interface FiltersProps {
  handleFilterSave?: () => void
  handleFilterChange?: (key: string, value: string) => void
  filtersState: TFilterValues
  filterSections: TFilterSection[]
  handleFilterReset?: () => void
}

export function FiltersSheet({
  handleFilterSave,
  handleFilterChange,
  filtersState,
  filterSections,
  handleFilterReset,
}: FiltersProps) {
  const [open, setOpen] = useState(false)

  const handleSaveAndClose = () => {
    if (handleFilterSave) handleFilterSave()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <DynamicIcon name="Filter" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Filters are applied to the search results. You can clear all filters
            by clicking the &quot;Clear all&quot; button.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="px-4 h-[calc(100dvh-7rem)]">
          <Filters
            onFilterChange={handleFilterChange}
            values={filtersState}
            filterSections={filterSections}
          />
        </ScrollArea>

        <SheetFooter>
          <Button type="submit" onClick={handleSaveAndClose}>
            Save changes
          </Button>

          <Button variant="outline" onClick={handleFilterReset}>
            Reset
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
