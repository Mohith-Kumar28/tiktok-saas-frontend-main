import type { SearchParams } from "nuqs"

import { tableSearchParamsSchema } from "./schemas/search-params"

import NuqsParamsProvider from "@/providers/nuqs/nuqs-page-provider"
import InfluencersList from "./components/influencers-list"
import SearchAndFilters from "./components/search/search-and-filters"

const FindCreatorsViewPage = ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  return (
    <NuqsParamsProvider
      searchParams={searchParams}
      searchParamsSchema={tableSearchParamsSchema}
    >
      <SearchAndFilters />

      <InfluencersList />
    </NuqsParamsProvider>
  )
}

export default FindCreatorsViewPage
