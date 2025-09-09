import React from "react"

import { FeatureFlagsProvider } from "@/providers/feature-flags-provider"
import { ClustersTable } from "./_components/clusters-table"
import { ClustersTableShell } from "./_components/clusters-table-shell"
import { Shell } from "@/components/shell"
import {
  getClusterAvgEngagementRateRange,
  getClusterCreatedAtRange,
  getClusterCreatorCountRange,
  getClusterStatusCounts,
  getClusterTotalReachRange,
  getClusterTypeCounts,
  getClusters,
} from "./_lib/queries"

interface SearchParams {
  [key: string]: string | string[] | undefined
}

interface ClustersPageProps {
  searchParams: Promise<SearchParams>
}

export default async function ClustersPage({
  searchParams,
}: ClustersPageProps) {
  const searchParamsData = await searchParams

  const promises = Promise.all([
    getClusters(searchParamsData),
    getClusterStatusCounts(),
    getClusterTypeCounts(),
    getClusterCreatorCountRange(),
    getClusterTotalReachRange(),
    getClusterAvgEngagementRateRange(),
    getClusterCreatedAtRange(),
  ])

  return (
    <FeatureFlagsProvider>
      <Shell>
        <ClustersTableShell>
          <ClustersTable promises={promises} searchParams={searchParamsData} />
        </ClustersTableShell>
      </Shell>
    </FeatureFlagsProvider>
  )
}
