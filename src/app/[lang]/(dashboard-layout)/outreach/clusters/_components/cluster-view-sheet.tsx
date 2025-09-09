"use client"

import * as React from "react"
import { CalendarIcon, TagIcon } from "lucide-react"

import type { Cluster } from "../_lib/types"

import { formatDate } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface ClusterViewSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  cluster: Cluster | null
}

export function ClusterViewSheet({ cluster, ...props }: ClusterViewSheetProps) {
  if (!cluster) return null

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{cluster.name}</SheetTitle>
          <SheetDescription>
            View cluster details and information.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm text-muted-foreground">
              {cluster.description || "No description provided"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Type</h4>
              <Badge variant="secondary" className="w-fit">
                {cluster.type}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Status</h4>
              <Badge
                variant={cluster.status === "active" ? "default" : "secondary"}
                className="w-fit"
              >
                {cluster.status}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Tags</h4>
            {cluster.tags && cluster.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {cluster.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <TagIcon className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No tags</p>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Blocklist Status</h4>
            <Badge
              variant={cluster.isBlocklist ? "destructive" : "secondary"}
              className="w-fit"
            >
              {cluster.isBlocklist ? "Blocklisted" : "Not Blocklisted"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Created</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(cluster.createdAt)}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Updated</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(cluster.updatedAt)}
              </div>
            </div>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
