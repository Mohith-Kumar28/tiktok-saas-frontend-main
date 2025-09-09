"use client"

import * as React from "react"
import {
  Calendar,
  // CheckCircle,
  // Circle,
  // Clock,
  Hash,
  MoreHorizontal,
  Text,
  Users,
  Zap,
} from "lucide-react"

import type { DataTableRowAction } from "@/components/ui/table/types/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import type { Cluster, ClusterStatus, ClusterType } from "../_lib/types"

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

interface GetClustersTableColumnsProps {
  _statusCounts: Record<ClusterStatus, number>
  typeCounts: Record<ClusterType, number>
  creatorCountRange: { min: number; max: number }
  totalReachRange: { min: number; max: number }
  avgEngagementRateRange: { min: number; max: number }
  _createdAtRange: { min: Date; max: Date }
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<Cluster> | null>
  >
}

// function getStatusIcon(status: ClusterStatus) {
//   const statusIcons = {
//     active: CheckCircle,
//     inactive: Circle,
//     draft: Clock,
//     archived: Circle,
//   }

//   return statusIcons[status]
// }

function getTypeIcon(type: ClusterType) {
  const typeIcons = {
    influencers: Users,
    "micro-influencers": Users,
    "nano-influencers": Users,
    celebrities: Users,
    brands: Zap,
    custom: Hash,
  }

  return typeIcons[type]
}

export function getClustersTableColumns({
  _statusCounts,
  typeCounts,
  creatorCountRange,
  totalReachRange,
  avgEngagementRateRange,
  _createdAtRange,
  setRowAction,
}: GetClustersTableColumnsProps): ColumnDef<Cluster>[] {
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
        <DataTableColumnHeader column={column} title="Name" />
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
        label: "Title",
        placeholder: "Search Name...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("type") as ClusterType
        const Icon = getTypeIcon(type)

        return (
          <div className="flex w-[6.25rem] items-center">
            <Icon className="mr-2 size-4 text-muted-foreground" />
            <Badge variant="outline" className="capitalize">
              {type}
            </Badge>
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
              label: type,
              value: type,
              count,
              icon: getTypeIcon(type as ClusterType),
            }))
          : [],
        icon: Users,
      },
      enableColumnFilter: true,
    },
    // {
    //   accessorKey: "status",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Status" />
    //   ),
    //   cell: ({ row }) => {
    //     const status = row.getValue("status") as ClusterStatus
    //     const Icon = getStatusIcon(status)

    //     return (
    //       <div className="flex w-[6.25rem] items-center">
    //         <Icon className="mr-2 size-4 text-muted-foreground" />
    //         <Badge variant="outline" className="capitalize">
    //           {status}
    //         </Badge>
    //       </div>
    //     )
    //   },
    //   enableColumnFilter: false,
    // },
    {
      accessorKey: "creatorCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Creators" />
      ),
      cell: ({ row }) => {
        const creatorCount = row.getValue("creatorCount") as number
        return (
          <div className="flex w-[6.25rem] items-center">
            <Users className="mr-2 size-4 text-muted-foreground" />
            <span>{formatNumberToCompact(creatorCount)}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        const rowValue = row.getValue(id) as number
        const [min, max] = value as [number, number]
        return rowValue >= min && rowValue <= max
      },
      meta: {
        label: "Creators",
        variant: "range",
        range: [creatorCountRange.min, creatorCountRange.max],
        unit: "creators",
        icon: Users,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "totalReach",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Reach" />
      ),
      cell: ({ row }) => {
        const totalReach = row.getValue("totalReach") as number
        return (
          <div className="flex w-[6.25rem] items-center">
            <Zap className="mr-2 size-4 text-muted-foreground" />
            <span>{formatNumberToCompact(totalReach)}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        const rowValue = row.getValue(id) as number
        const [min, max] = value as [number, number]
        return rowValue >= min && rowValue <= max
      },
      meta: {
        label: "Total Reach",
        variant: "range",
        range: [totalReachRange.min, totalReachRange.max],
        unit: "reach",
        icon: Zap,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "avgEngagementRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Avg Engagement" />
      ),
      cell: ({ row }) => {
        const avgEngagementRate = row.getValue("avgEngagementRate") as number
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{(avgEngagementRate * 100).toFixed(2)}%</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        const rowValue = row.getValue(id) as number
        const [min, max] = value as [number, number]
        return rowValue >= min && rowValue <= max
      },
      meta: {
        label: "Avg Engagement",
        variant: "range",
        range: [avgEngagementRateRange.min, avgEngagementRateRange.max],
        unit: "%",
        icon: Zap,
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "tags",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tags" />
      ),
      cell: ({ row }) => {
        const tags = row.getValue("tags") as string[]
        if (!tags?.length) {
          return <span className="text-muted-foreground">No tags</span>
        }

        const visibleTags = tags.slice(0, 2)
        const remainingCount = tags.length - visibleTags.length

        return (
          <div className="flex items-center gap-2">
            {visibleTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {tag}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <span className="text-xs text-muted-foreground">
                +{remainingCount} more
              </span>
            )}
          </div>
        )
      },
      enableColumnFilter: false,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
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
      filterFn: (row, id, value) => {
        const rowValue = new Date(row.getValue(id) as Date)
        const [start, end] = value as [Date, Date]
        return rowValue >= start && rowValue <= end
      },
      meta: {
        label: "Created At",
        variant: "dateRange",
        icon: Calendar,
      },
      enableColumnFilter: true,
    },

    {
      id: "actions",
      cell: function Cell({ row }) {
        const [_isUpdatePending, _startUpdateTransition] = React.useTransition()
        const [_showDeleteDialog, _setShowDeleteDialog] = React.useState(false)

        return (
          <>
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
                  onSelect={() => setRowAction({ row, variant: "update" })}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => _setShowDeleteDialog(true)}
                  disabled={_isUpdatePending}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
      size: 40,
    },
  ]
}
