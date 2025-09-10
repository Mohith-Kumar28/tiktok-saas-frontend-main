"use client"

import * as React from "react"
import {
  Bot,
  Calendar,
  CheckCircle,
  Clock,
  Hash,
  MessageSquare,
  MoreHorizontal,
  Pause,
  Play,
  Square,
  Text,
  Users,
  Zap,
} from "lucide-react"

import type { DataTableRowAction } from "@/components/ui/table/types/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import type {
  BotStatus,
  Bot as BotType,
  BotType as BotTypeEnum,
} from "../_lib/types"

import { formatDate, formatNumberToCompact } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/ui/table/main-data-table/data-table-column-header"

interface GetBotsTableColumnsProps {
  _statusCounts: Record<BotStatus, number>
  typeCounts: Record<BotTypeEnum, number>
  messagesSentRange: { min: number; max: number }
  targetInvitesSentRange: { min: number; max: number }
  _responseRateRange: { min: number; max: number }
  _createdAtRange: { min: number; max: number }
  _setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<BotType> | null>
  >
}

function getStatusIcon(status: BotStatus) {
  const statusIcons = {
    running: Play,
    paused: Pause,
    stopped: Square,
    draft: Clock,
    completed: CheckCircle,
  }

  return statusIcons[status]
}

function getTypeIcon(type: BotTypeEnum) {
  const typeIcons = {
    "auto-responder": Bot,
    "target-collaboration": Users,
    "message-only": MessageSquare,
    "product-card": Zap,
    custom: Hash,
  }

  return typeIcons[type]
}

function getStatusColor(status: BotStatus) {
  const statusColors = {
    running: "bg-green-100 text-green-800 border-green-200",
    paused: "bg-yellow-100 text-yellow-800 border-yellow-200",
    stopped: "bg-red-100 text-red-800 border-red-200",
    draft: "bg-gray-100 text-gray-800 border-gray-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
  }

  return statusColors[status]
}

export function getBotsTableColumns({
  _statusCounts,
  typeCounts,
  messagesSentRange,
  targetInvitesSentRange,
  _responseRateRange,
  _createdAtRange,
  _setRowAction,
}: GetBotsTableColumnsProps): ColumnDef<BotType>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bot Name" />
      ),
      cell: ({ row }) => {
        const name = row.getValue("name") as string
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {name}
            </span>
          </div>
        )
      },
      meta: {
        label: "Bot Name",
        placeholder: "Search bot name...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Message Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("type") as BotTypeEnum
        const description = row.original.description
        const Icon = getTypeIcon(type)

        return (
          <div className="flex flex-col">
            <div className="flex items-center">
              <Icon className="mr-2 size-4 text-muted-foreground" />
              <Badge variant="outline" className="capitalize">
                {type.replace("-", " ")}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {description}
            </span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
      meta: {
        label: "Type",
        variant: "multiSelect",
        options: typeCounts
          ? Object.entries(typeCounts).map(([type, count]) => ({
              label: type.replace("-", " "),
              value: type,
              count,
              icon: getTypeIcon(type as BotTypeEnum),
            }))
          : [],
        icon: Bot,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "creatorsReached",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Creators Reached" />
      ),
      cell: ({ row }) => {
        const creatorsReached = row.getValue("creatorsReached") as number
        return (
          <div className="flex w-[6.25rem] items-center">
            <Users className="mr-2 size-4 text-muted-foreground" />
            <span>{formatNumberToCompact(creatorsReached)}</span>
          </div>
        )
      },
      enableColumnFilter: false,
    },
    {
      accessorKey: "messagesSent",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Messages Sent" />
      ),
      cell: ({ row }) => {
        const messagesSent = row.getValue("messagesSent") as number
        return (
          <div className="flex w-[6.25rem] items-center">
            <MessageSquare className="mr-2 size-4 text-muted-foreground" />
            <span>{formatNumberToCompact(messagesSent)}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        const rowValue = row.getValue(id) as number
        const [min, max] = value as [number, number]
        return rowValue >= min && rowValue <= max
      },
      meta: {
        label: "Messages Sent",
        variant: "range",
        range: [messagesSentRange.min, messagesSentRange.max],
        icon: MessageSquare,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "targetInvitesSent",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Replies / Accepted" />
      ),
      cell: ({ row }) => {
        const targetInvitesSent = row.getValue("targetInvitesSent") as number
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{formatNumberToCompact(targetInvitesSent)}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        const rowValue = row.getValue(id) as number
        const [min, max] = value as [number, number]
        return rowValue >= min && rowValue <= max
      },
      meta: {
        label: "Target Invites Sent",
        variant: "range",
        range: [targetInvitesSentRange.min, targetInvitesSentRange.max],
        icon: Users,
      },
      enableColumnFilter: true,
    },
    // {
    //   accessorKey: "sampleRequests",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Sample Requests" />
    //   ),
    //   cell: ({ row }) => {
    //     const sampleRequests = row.original.sampleRequests
    //     return (
    //       <div className="flex w-[6.25rem] items-center">
    //         <span>{sampleRequests}</span>
    //       </div>
    //     )
    //   },
    //   enableColumnFilter: false,
    // },
    {
      accessorKey: "remainingCreators",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Remaining Creators" />
      ),
      cell: ({ row }) => {
        const remainingCreators = row.original.remainingCreators
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{remainingCreators}</span>
          </div>
        )
      },
      enableColumnFilter: false,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bot Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as BotStatus
        const Icon = getStatusIcon(status)

        return (
          <div className="flex w-[6.25rem] items-center">
            <Icon className="mr-2 size-4 text-muted-foreground" />
            <Badge
              variant="outline"
              className={`capitalize ${getStatusColor(status)}`}
            >
              {status}
            </Badge>
          </div>
        )
      },
      enableColumnFilter: false,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created Date" />
      ),
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as Date
        return (
          <div className="flex w-[6.25rem] items-center">
            <Calendar className="mr-2 size-4 text-muted-foreground" />
            <span>{formatDate(createdAt)}</span>
          </div>
        )
      },
      enableColumnFilter: false,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const _bot = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <MoreHorizontal className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onSelect={() => {
                  // Handle edit action
                  console.log("Edit bot:", row.original)
                }}
              >
                Edit
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  // Handle view action
                  console.log("View bot:", row.original)
                }}
              >
                View
                <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  // Handle delete action
                  console.log("Delete bot:", row.original)
                }}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
  ]
}
