import { Suspense } from "react"

import { BotsOverview } from "./_components/bots-overview"
import { BotsTableShell } from "./_components/bots-table-shell"

export default function BotsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bots</h1>
          <p className="text-muted-foreground">
            Manage your outreach bots and monitor their performance
          </p>
        </div>
      </div>

      <Suspense fallback={<div>Loading analytics...</div>}>
        <BotsOverview />
      </Suspense>

      <Suspense fallback={<div>Loading bots...</div>}>
        <BotsTableShell />
      </Suspense>
    </div>
  )
}
