"use client"

import type { Cluster } from "../_lib/types"

import { formatDate, formatNumberToCompact } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ClusterViewDialogProps {
  cluster: Cluster
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ClusterViewDialog({
  cluster,
  open,
  onOpenChange,
}: ClusterViewDialogProps) {
  const typeLabels = {
    influencers: "Influencers",
    "micro-influencers": "Micro-Influencers",
    "nano-influencers": "Nano-Influencers",
    celebrities: "Celebrities",
    brands: "Brands",
    custom: "Custom",
  }

  const statusConfig = {
    active: { label: "Active", variant: "default" as const },
    inactive: { label: "Inactive", variant: "secondary" as const },
    draft: { label: "Draft", variant: "outline" as const },
    archived: { label: "Archived", variant: "destructive" as const },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{cluster.name}</DialogTitle>
          <DialogDescription>
            View cluster details and statistics
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Type
              </h4>
              <Badge variant="secondary">
                {typeLabels[cluster.type as keyof typeof typeLabels] ||
                  cluster.type}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Status
              </h4>
              <Badge
                variant={
                  statusConfig[cluster.status as keyof typeof statusConfig]
                    ?.variant || "secondary"
                }
              >
                {statusConfig[cluster.status as keyof typeof statusConfig]
                  ?.label || cluster.status}
              </Badge>
            </div>
          </div>

          {cluster.description && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Description
              </h4>
              <p className="text-sm">{cluster.description}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Creators
              </h4>
              <p className="text-lg font-semibold">
                {formatNumberToCompact(cluster.creatorCount)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Total Reach
              </h4>
              <p className="text-lg font-semibold">
                {formatNumberToCompact(cluster.totalReach)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Avg. Engagement
              </h4>
              <p className="text-lg font-semibold">
                {cluster.avgEngagementRate.toFixed(1)}%
              </p>
            </div>
          </div>

          {cluster.tags && cluster.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {cluster.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {formatDate(cluster.createdAt)}
            </div>
            <div>
              <span className="font-medium">Updated:</span>{" "}
              {formatDate(cluster.updatedAt)}
            </div>
          </div>

          <div>
            <span className="font-medium text-sm">Blocklist Status:</span>
            <Badge
              variant={cluster.isBlocklist ? "destructive" : "secondary"}
              className="ml-2"
            >
              {cluster.isBlocklist ? "Blocked" : "Not Blocked"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
