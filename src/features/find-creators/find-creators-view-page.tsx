import type { TSearchParamsType } from "@/types/types"

import { searchParamsCache } from "./lib/search-params"

import InfluencersList from "./components/influencers-list"
import SearchAndFilters from "./components/search/search-and-filters"

const FindCreatorsViewPage = async ({
  searchParams,
}: {
  searchParams: TSearchParamsType
}) => {
  searchParamsCache.parse(await searchParams)

  return (
    <div className="flex flex-col gap-4">
      <SearchAndFilters />
      <InfluencersList />
    </div>
  )
}

export default FindCreatorsViewPage
