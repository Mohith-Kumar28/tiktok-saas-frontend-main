import FindCreatorsViewPage from "@/features/find-creators/find-creators-view-page"

import type { TSearchParamsType } from "@/types/types"

import { searchParamsCache } from "@/features/find-creators/lib/search-params"

import NuqsParamsProvider from "@/providers/nuqs/nuqs-page-provider"

export const metadata = {
  title: "Dashboard : Find Creators",
}

export default async function page({
  searchParams,
}: {
  searchParams: TSearchParamsType
}) {
  return (
    <NuqsParamsProvider
      searchParams={searchParams}
      searchParamsCache={searchParamsCache}
    >
      <FindCreatorsViewPage />
    </NuqsParamsProvider>
  )
}
