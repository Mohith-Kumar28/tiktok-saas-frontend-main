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
    <>
      <SearchAndFilters />
      <InfluencersList />
    </>
  )
}

export default FindCreatorsViewPage
