import * as React from "react"

interface ClustersTableShellProps {
  children: React.ReactNode
}

export function ClustersTableShell({ children }: ClustersTableShellProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clusters</h1>
          <p className="text-muted-foreground">
            Manage your creator clusters and audience segments
          </p>
        </div>
      </div>
      {children}
    </div>
  )
}
