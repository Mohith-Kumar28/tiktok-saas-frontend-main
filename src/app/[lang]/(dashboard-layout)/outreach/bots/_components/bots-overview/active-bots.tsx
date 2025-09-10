import type { BotMetricType } from "../../_lib/types"

import {
  DashboardCardActionsDropdown,
  DashboardOverviewCardV3,
} from "@/features/dashboards/_components/dashboard-card/dashboard-card"
import { ActiveBotsChart } from "./active-bots-chart"

export function ActiveBots({ data }: { data: BotMetricType }) {
  return (
    <DashboardOverviewCardV3
      data={{
        value: data.averageValue,
        percentageChange: data.percentageChange,
      }}
      title="Active Bots"
      action={<DashboardCardActionsDropdown />}
      chart={<ActiveBotsChart data={data.perMonth} />}
    />
  )
}
