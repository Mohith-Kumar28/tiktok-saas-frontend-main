import { Suspense } from "react"

import { DataTableSkeleton } from "@/components/ui/table/main-data-table/data-table-skeleton"
import {
  getBotCreatedAtRange,
  getBotCreatorsReachedRange,
  getBotMessagesSentRange,
  getBotStatusCounts,
  getBotTargetInvitesSentRange,
  getBotTypeCounts,
  getBots,
} from "../_lib/queries"
import { BotsTable } from "./bots-table"

export function BotsTableShell() {
  return (
    <Suspense
      fallback={
        <DataTableSkeleton
          columnCount={8}
          filterCount={2}
          cellWidths={[
            "10rem",
            "20rem",
            "12rem",
            "12rem",
            "8rem",
            "8rem",
            "8rem",
            "8rem",
          ]}
          shrinkZero
        />
      }
    >
      <BotsTable
        promises={Promise.all([
          getBots({}),
          getBotStatusCounts(),
          getBotTypeCounts(),
          getBotCreatorsReachedRange(),
          getBotMessagesSentRange(),
          getBotTargetInvitesSentRange(),
          getBotCreatedAtRange(),
        ])}
        searchParams={{}}
      />
    </Suspense>
  )
}
