import { visitorsByCountryData } from "../_data/visitors-by-country"

import { DashboardCard } from "@/features/dashboards/_components/dashboard-card/dashboard-card"
import { VisitorsByCountryList } from "./visitors-by-country-list"

export function VisitorsByCountry() {
  return (
    <DashboardCard title="Visitors by Country">
      <VisitorsByCountryList data={visitorsByCountryData} />
    </DashboardCard>
  )
}
