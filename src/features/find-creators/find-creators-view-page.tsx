import { createSearchParamsCache } from "nuqs/server"

import { tableSearchParamsSchema } from "./schemas/search-params"

import InfluencersList from "./components/influencers-list"
import SearchAndFilters from "./components/search/search-and-filters"

// Create the cache at the module level
export const searchParamsCache = createSearchParamsCache(
  tableSearchParamsSchema
)

const FindCreatorsViewPage = async ({}: {}) => {
  return (
    <>
      <SearchAndFilters />
      <InfluencersList />
    </>
  )
}

export default FindCreatorsViewPage
