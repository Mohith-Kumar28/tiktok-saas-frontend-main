"use client"

import * as React from "react"

import type { DataTableRowAction } from "@/components/ui/table/types/data-table"
import type {
  getBotCreatedAtRange,
  getBotCreatorsReachedRange,
  getBotMessagesSentRange,
  getBotStatusCounts,
  getBotTargetInvitesSentRange,
  getBotTypeCounts,
  getBots,
} from "../_lib/queries"
import type { Bot } from "../_lib/types"

import { useDataTable } from "@/components/ui/table/hooks/use-data-table"
import { DataTable } from "@/components/ui/table/main-data-table/data-table"
import { DataTableToolbar } from "@/components/ui/table/main-data-table/data-table-toolbar"
import { BotsTableActionBar } from "./bots-table-action-bar"
import { getBotsTableColumns } from "./bots-table-columns"

interface BotsTableProps {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getBots>>,
      Awaited<ReturnType<typeof getBotStatusCounts>>,
      Awaited<ReturnType<typeof getBotTypeCounts>>,
      Awaited<ReturnType<typeof getBotCreatorsReachedRange>>,
      Awaited<ReturnType<typeof getBotMessagesSentRange>>,
      Awaited<ReturnType<typeof getBotTargetInvitesSentRange>>,
      Awaited<ReturnType<typeof getBotCreatedAtRange>>,
    ]
  >
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export function BotsTable({
  promises,
  searchParams: _searchParams,
}: BotsTableProps) {
  const [
    { data, pageCount },
    statusCounts,
    typeCounts,
    _creatorsReachedRange,
    messagesSentRange,
    targetInvitesSentRange,
    createdAtRange,
  ] = React.use(promises)

  const [_rowAction, setRowAction] =
    React.useState<DataTableRowAction<Bot> | null>(null)

  const columns = React.useMemo(
    () =>
      getBotsTableColumns({
        _statusCounts: statusCounts,
        typeCounts,
        // creatorsReachedRange,
        messagesSentRange,
        targetInvitesSentRange,
        _responseRateRange: { min: 0, max: 100 },
        _createdAtRange: createdAtRange,
        _setRowAction: setRowAction,
      }),
    [
      typeCounts,
      statusCounts,
      // creatorsReachedRange,
      messagesSentRange,
      targetInvitesSentRange,
      createdAtRange,
    ]
  )

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    enableAdvancedFilter: true,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  })

  return (
    <DataTable table={table} actionBar={<BotsTableActionBar table={table} />}>
      <DataTableToolbar table={table}></DataTableToolbar>
    </DataTable>
  )
}
