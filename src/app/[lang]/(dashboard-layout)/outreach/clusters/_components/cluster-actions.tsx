"use client"

import { useState } from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import type { Cluster } from "../_lib/types"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteCluster, updateCluster } from "../_lib/queries"
import { ClusterEditSheet } from "./cluster-edit-sheet"
import { ClusterViewSheet } from "./cluster-view-sheet"

interface ClusterActionsProps {
  cluster: Cluster
}

export function ClusterActions({ cluster }: ClusterActionsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this cluster?")) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteCluster(cluster.id)
      toast.success("Cluster deleted successfully")
    } catch (_error) {
      toast.error("Failed to delete cluster")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleBlocklist = async () => {
    setIsToggling(true)
    try {
      await updateCluster(cluster.id, {
        isBlocklist: !cluster.isBlocklist,
      })
      toast.success(
        `Cluster ${cluster.isBlocklist ? "removed from" : "added to"} blocklist`
      )
    } catch (_error) {
      toast.error("Failed to update cluster")
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setShowViewDialog(true)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleToggleBlocklist}
            disabled={isToggling}
          >
            {cluster.isBlocklist ? "Remove from blocklist" : "Add to blocklist"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-destructive focus:text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ClusterEditSheet
        cluster={cluster}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />

      <ClusterViewSheet
        cluster={cluster}
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      />
    </>
  )
}
