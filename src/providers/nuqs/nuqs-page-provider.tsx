import type { ParserMap, SearchParams } from "nuqs/server"

import { createSearchParamsHelpers } from "@/lib/search-params"

export default async function NuqsParamsProvider({
  children,
  searchParams,
  searchParamsSchema,
}: {
  children: React.ReactNode
  searchParams: Promise<SearchParams>
  searchParamsSchema: ParserMap
}) {
  const { searchParamsCache } = createSearchParamsHelpers(searchParamsSchema)

  searchParamsCache.parse(await searchParams)

  return <>{children}</>
}
