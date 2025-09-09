"use client"

import * as React from "react"
import { Download, Trash2 } from "lucide-react"

import type { Table } from "@tanstack/react-table"
import type { Cluster } from "../_lib/types"

import { exportTableToCSV } from "@/lib/export"

import { toast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from "@/components/ui/table/main-data-table/data-table-action-bar"

type Action = "export" | "delete"

interface ClustersTableActionBarProps {
  table: Table<Cluster>
}

export function ClustersTableActionBar({ table }: ClustersTableActionBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows
  const [isPending, startTransition] = React.useTransition()
  const [currentAction, setCurrentAction] = React.useState<Action | null>(null)

  const getIsActionPending = React.useCallback(
    (action: Action) => isPending && currentAction === action,
    [isPending, currentAction]
  )

  const onClusterExport = React.useCallback(() => {
    setCurrentAction("export")
    startTransition(() => {
      const clusterData = rows.map((row) => row.original)
      exportTableToCSV(
        clusterData,
        `clusters-${new Date().toISOString().split("T")[0]}`,
        [
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "type", label: "Type" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Created At" },
        ]
      )
      toast({
        title: "Export successful",
        description: `Exported ${clusterData.length} clusters to CSV`,
      })
    })
  }, [rows])

  const onClusterDelete = React.useCallback(() => {
    setCurrentAction("delete")
    startTransition(async () => {
      const clusterIds = rows.map((row) => row.original.id)

      // Here you would typically call your delete mutation
      console.log("Deleting clusters:", clusterIds)

      toast({
        title: "Clusters deleted",
        description: `Deleted ${clusterIds.length} clusters`,
      })

      // Reset selection
      table.toggleAllRowsSelected(false)
    })
  }, [rows, table])

  return (
    <DataTableActionBar table={table} visible={rows.length > 0}>
      <DataTableActionBarSelection table={table} />
      <Separator
        orientation="vertical"
        className="hidden data-[orientation=vertical]:h-5 sm:block"
      />
      <div className="flex items-center gap-1.5">
        <DataTableActionBarAction
          size="icon"
          tooltip="Export clusters"
          isPending={getIsActionPending("export")}
          onClick={onClusterExport}
        >
          <Download />
        </DataTableActionBarAction>
        <DataTableActionBarAction
          size="icon"
          tooltip="Delete clusters"
          isPending={getIsActionPending("delete")}
          onClick={onClusterDelete}
        >
          <Trash2 />
        </DataTableActionBarAction>
      </div>
    </DataTableActionBar>
  )
}
