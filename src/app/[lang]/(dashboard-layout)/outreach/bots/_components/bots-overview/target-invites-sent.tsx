import type { BotMetricType } from "../../_lib/types"

import {
  DashboardCardActionsDropdown,
  DashboardOverviewCardV3,
} from "@/features/dashboards/_components/dashboard-card/dashboard-card"
import { TargetInvitesSentChart } from "./target-invites-sent-chart"

export function TargetInvitesSent({ data }: { data: BotMetricType }) {
  return (
    <DashboardOverviewCardV3
      data={{
        value: data.averageValue,
        percentageChange: data.percentageChange,
      }}
      title="Target Invites Sent"
      action={<DashboardCardActionsDropdown />}
      chart={<TargetInvitesSentChart data={data.perMonth} />}
    />
  )
}
