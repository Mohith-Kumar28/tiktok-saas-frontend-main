import React, { useMemo, useState } from "react"
import { useForm } from "react-hook-form"

import type { TFilterSection, TFilterValues } from "./types"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DynamicIcon } from "@/components/dynamic-icon"
import { Filters } from "./filters"

interface FiltersProps {
  onFilterSave: (filterValues: TFilterValues) => void
  onFilterReset: () => void
  filterSections: TFilterSection[]
  appliedFilters: TFilterValues
}

export function FiltersSheet({
  onFilterSave,
  onFilterReset,
  filterSections,
  appliedFilters,
}: FiltersProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<TFilterValues>({
    defaultValues: appliedFilters,
  })

  // Reset form when appliedFilters change (e.g., when filters are applied or reset)
  React.useEffect(() => {
    form.reset(appliedFilters)
  }, [appliedFilters, form])

  // Watch form values
  const watchedValues = form.watch()

  // Calculate if there are unsaved changes
  const hasUnsavedChanges = useMemo(() => {
    // Convert both objects to strings for efficient comparison
    const appliedFiltersString = JSON.stringify(appliedFilters)
    const formValuesString = JSON.stringify(watchedValues)

    return appliedFiltersString !== formValuesString
  }, [appliedFilters, watchedValues])

  const handleSaveAndClose = () => {
    const formValues = form.getValues()
    onFilterSave(formValues)
    setOpen(false)
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    // Don't reset on close - keep unsaved changes to show the alert
  }

  const handleResetClick = () => {
    onFilterReset()
    form.reset({})
  }

  const handleFilterChange = (key: string, value: string) => {
    form.setValue(key as keyof TFilterValues, value, { shouldValidate: true })
  }

  return (
    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <div className="relative">
          <Button
            variant="secondary"
            startIcon="Filter"
            className={cn(
              "transition-colors",
              hasUnsavedChanges && "border-2 border-primary border-solid"
            )}
          >
            Filters
          </Button>
          {hasUnsavedChanges && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute -top-2 -right-2 bg-primary rounded-full p-1 cursor-help">
                    <DynamicIcon name="Info" size="sm" className="text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>You have unsaved filter changes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Filters are applied to the search results. You can clear all filters
            by clicking the &quot;Clear all&quot; button.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <ScrollArea className="px-4 h-[calc(100dvh-7rem)]">
            <Filters
              onFilterChange={handleFilterChange}
              values={form.watch()}
              filterSections={filterSections}
            />
          </ScrollArea>
        </Form>

        <SheetFooter>
          <Button
            type="submit"
            onClick={handleSaveAndClose}
            disabled={!hasUnsavedChanges}
          >
            Save changes
          </Button>

          <Button variant="outline" onClick={handleResetClick}>
            Reset
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
