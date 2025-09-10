"use client"

import * as React from "react"
import { Download, Trash2 } from "lucide-react"

import type { Table } from "@tanstack/react-table"
import type { Bot } from "../_lib/types"

import { exportTableToCSV } from "@/lib/export"

import { toast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from "@/components/ui/table/main-data-table/data-table-action-bar"

type Action = "export" | "delete"

interface BotsTableActionBarProps {
  table: Table<Bot>
}

export function BotsTableActionBar({ table }: BotsTableActionBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows
  const [isPending, startTransition] = React.useTransition()
  const [currentAction, setCurrentAction] = React.useState<Action | null>(null)

  const getIsActionPending = React.useCallback(
    (action: Action) => isPending && currentAction === action,
    [isPending, currentAction]
  )

  const onBotExport = React.useCallback(() => {
    setCurrentAction("export")
    startTransition(() => {
      const botData = rows.map((row) => row.original)
      exportTableToCSV(
        botData,
        `bots-${new Date().toISOString().split("T")[0]}`,
        [
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "type", label: "Type" },
          { key: "status", label: "Status" },
          { key: "creatorsReached", label: "Creators Reached" },
          { key: "messagesSent", label: "Messages Sent" },
          { key: "targetInvitesSent", label: "Target Invites Sent" },
          { key: "createdAt", label: "Created At" },
        ]
      )
      toast({
        title: "Export successful",
        description: `Exported ${botData.length} bots to CSV`,
      })
    })
  }, [rows])

  const onBotDelete = React.useCallback(() => {
    setCurrentAction("delete")
    startTransition(async () => {
      const botIds = rows.map((row) => row.original.id)

      // Here you would typically call your delete mutation
      console.log("Deleting bots:", botIds)

      toast({
        title: "Bots deleted",
        description: `Deleted ${botIds.length} bots`,
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
          tooltip="Export bots"
          isPending={getIsActionPending("export")}
          onClick={onBotExport}
        >
          <Download />
        </DataTableActionBarAction>
        <DataTableActionBarAction
          size="icon"
          tooltip="Delete bots"
          isPending={getIsActionPending("delete")}
          onClick={onBotDelete}
        >
          <Trash2 />
        </DataTableActionBarAction>
      </div>
    </DataTableActionBar>
  )
}
