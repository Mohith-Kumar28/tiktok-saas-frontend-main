import type { BotMetricType } from "../../_lib/types"

import {
  DashboardCardActionsDropdown,
  DashboardOverviewCardV3,
} from "@/features/dashboards/_components/dashboard-card/dashboard-card"
import { MessagesDeliveredChart } from "./messages-delivered-chart"

export function MessagesDelivered({ data }: { data: BotMetricType }) {
  return (
    <DashboardOverviewCardV3
      data={{
        value: data.averageValue,
        percentageChange: data.percentageChange,
      }}
      title="Messages Delivered"
      action={<DashboardCardActionsDropdown />}
      chart={<MessagesDeliveredChart data={data.perMonth} />}
    />
  )
}
