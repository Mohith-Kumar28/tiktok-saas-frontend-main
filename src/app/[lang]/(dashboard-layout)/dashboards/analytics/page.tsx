import AnalyticsPageView from "@/features/dashboard/analytics/analytics-page-view"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Analytics",
}

export default function AnalyticsPage() {
  return <AnalyticsPageView />
}
