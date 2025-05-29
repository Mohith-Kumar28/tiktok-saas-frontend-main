import FindCreatorsViewPage from "@/features/find-creators/find-creators-view-page"

import type { SearchParams } from "nuqs"

export const metadata = {
  title: "Dashboard : Find Creators",
}

export default function page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  return <FindCreatorsViewPage searchParams={searchParams} />
}
