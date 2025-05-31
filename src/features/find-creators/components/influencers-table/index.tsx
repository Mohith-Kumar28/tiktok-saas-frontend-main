"use client"

import { parseAsInteger, useQueryState } from "nuqs"

import type { ColumnDef } from "@tanstack/react-table"

import { useDataTable } from "@/components/ui/table/hooks/use-data-table"
import { DataTable } from "@/components/ui/table/main-data-table/data-table"

interface InfluencersTableParams<TData, TValue> {
  data: TData[]
  totalItems: number
  columns: ColumnDef<TData, TValue>[]
}
export function InfluencersTable<TData, TValue>({
  data,
  totalItems,
  columns,
}: InfluencersTableParams<TData, TValue>) {
  const [pageSize] = useQueryState("perPage", parseAsInteger.withDefault(10))

  const pageCount = Math.ceil(totalItems / pageSize)

  const { table } = useDataTable({
    data, // influencers data
    columns, // influencers columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500,
  })

  return (
    <DataTable table={table}>
      {/* <DataTableViewOptions table={table} /> */}
    </DataTable>
  )
}
