import FindCreatorsViewPage from "@/features/find-creators/find-creators-view-page"

import type { TSearchParamsType } from "@/types/types"

export const metadata = {
  title: "Dashboard : Find Creators",
}

export default async function Page({
  searchParams,
}: {
  searchParams: TSearchParamsType
}) {
  return <FindCreatorsViewPage searchParams={searchParams} />
}
