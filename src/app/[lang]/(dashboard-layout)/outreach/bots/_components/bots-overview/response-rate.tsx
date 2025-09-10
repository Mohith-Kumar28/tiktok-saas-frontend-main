import type { BotMetricType } from "../../_lib/types"

import {
  DashboardCardActionsDropdown,
  DashboardOverviewCardV3,
} from "@/features/dashboards/_components/dashboard-card/dashboard-card"
import { ResponseRateChart } from "./response-rate-chart"

export function ResponseRate({ data }: { data: BotMetricType }) {
  return (
    <DashboardOverviewCardV3
      data={{
        value: data.averageValue,
        percentageChange: data.percentageChange,
      }}
      title="Response Rate"
      action={<DashboardCardActionsDropdown />}
      chart={<ResponseRateChart data={data.perMonth} />}
    />
  )
}