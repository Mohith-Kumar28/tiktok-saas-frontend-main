"use client"

import * as React from "react"

import type { DataTableRowAction } from "@/components/ui/table/types/data-table"
import type {
  getClusterAvgEngagementRateRange,
  getClusterCreatedAtRange,
  getClusterCreatorCountRange,
  getClusterStatusCounts,
  getClusterTotalReachRange,
  getClusterTypeCounts,
  getClusters,
} from "../_lib/queries"
import type { Cluster } from "../_lib/types"

import { useDataTable } from "@/components/ui/table/hooks/use-data-table"
import { DataTable } from "@/components/ui/table/main-data-table/data-table"
import { DataTableToolbar } from "@/components/ui/table/main-data-table/data-table-toolbar"
import { Shell } from "@/components/shell"
import { ClustersTableActionBar } from "./clusters-table-action-bar"
import { getClustersTableColumns } from "./clusters-table-columns"

interface ClustersTableProps {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getClusters>>,
      Awaited<ReturnType<typeof getClusterStatusCounts>>,
      Awaited<ReturnType<typeof getClusterTypeCounts>>,
      Awaited<ReturnType<typeof getClusterCreatorCountRange>>,
      Awaited<ReturnType<typeof getClusterTotalReachRange>>,
      Awaited<ReturnType<typeof getClusterAvgEngagementRateRange>>,
      Awaited<ReturnType<typeof getClusterCreatedAtRange>>,
    ]
  >
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export function ClustersTable({
  promises,
  searchParams: _searchParams,
}: ClustersTableProps) {
  const [
    { data, pageCount },
    statusCounts,
    typeCounts,
    creatorCountRange,
    totalReachRange,
    avgEngagementRateRange,
    createdAtRange,
  ] = React.use(promises)

  const [_rowAction, setRowAction] =
    React.useState<DataTableRowAction<Cluster> | null>(null)

  const columns = React.useMemo(
    () =>
      getClustersTableColumns({
        _statusCounts: statusCounts,
        typeCounts,
        creatorCountRange,
        totalReachRange,
        avgEngagementRateRange,
        _createdAtRange: createdAtRange,
        setRowAction,
      }),
    [
      typeCounts,
      statusCounts,
      creatorCountRange,
      totalReachRange,
      avgEngagementRateRange,
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
    <Shell className="gap-2">
      <DataTable
        table={table}
        actionBar={<ClustersTableActionBar table={table} />}
      >
        <DataTableToolbar table={table}></DataTableToolbar>
      </DataTable>
    </Shell>
  )
}
