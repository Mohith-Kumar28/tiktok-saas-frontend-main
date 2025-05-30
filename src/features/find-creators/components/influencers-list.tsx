import type { Influencer } from "../constants/mock-api"

import { fakeInfluencers } from "../constants/mock-api"
import { searchParamsCache } from "../lib/search-params"

import { InfluencersTable } from "./influencers-table"
import { columns } from "./influencers-table/columns"

type InfluencersListPage = {}

export default async function InfluencersList({}: InfluencersListPage) {
  const page = searchParamsCache.get("page")
  const search = searchParamsCache.get("name")
  const pageLimit = searchParamsCache.get("perPage")
  const categories = searchParamsCache.get("category")

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories }),
  }

  const data = await fakeInfluencers.getInfluencers(filters)
  const totalInfluencers = data.total_influencers
  const influencers: Influencer[] = data.influencers

  return (
    <InfluencersTable
      data={influencers}
      totalItems={totalInfluencers}
      columns={columns}
    />
  )
}
