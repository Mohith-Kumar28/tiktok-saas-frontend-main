"use client"

import Image from "next/image"
import { Text } from "lucide-react"

import type { Column, ColumnDef } from "@tanstack/react-table"
import type { Influencer } from "../../constants/mock-api"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/table/main-data-table/data-table-column-header"
import { CellAction } from "./cell-action"
import { CATEGORY_OPTIONS } from "./options"

export const columns: ColumnDef<Influencer>[] = [
  {
    accessorKey: "photo_url",
    header: "IMAGE",
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square h-12 w-12">
          <Image
            src={row.getValue("photo_url")}
            alt={row.getValue("name")}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }: { column: Column<Influencer, unknown> }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.getValue("name")}</span>
        <span className="text-muted-foreground text-sm">
          @{row.original.username}
        </span>
      </div>
    ),
    meta: {
      label: "Name",
      placeholder: "Search Influencer...",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "category",
    accessorKey: "category",
    header: ({ column }: { column: Column<Influencer, unknown> }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue<string>("category")
      return (
        <Badge variant="outline" className="capitalize">
          {category}
        </Badge>
      )
    },
    enableColumnFilter: true,
    meta: {
      label: "categories",
      variant: "multiSelect",
      options: CATEGORY_OPTIONS,
    },
  },
  {
    accessorKey: "followers_count",
    header: "FOLLOWERS",
    cell: ({ row }) => {
      const count = row.getValue<number>("followers_count")
      return <span>{count.toLocaleString()}</span>
    },
  },
  {
    accessorKey: "engagement_rate",
    header: "ENGAGEMENT",
    cell: ({ row }) => {
      const rate = row.getValue<number>("engagement_rate")
      return <span>{rate}%</span>
    },
  },
  {
    accessorKey: "price_per_post",
    header: "PRICE/POST",
    cell: ({ row }) => {
      const price = row.getValue<number>("price_per_post")
      return <span>${price}</span>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
