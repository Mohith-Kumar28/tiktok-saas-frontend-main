import { parseAsInteger, parseAsString } from "nuqs/server"

import NuqsParamsProvider from "@/providers/nuqs/nuqs-page-provider"

export const metadata = {
  title: "Dashboard : Find Creators",
}

export default function page() {
  const searchParams = {
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    name: parseAsString,
    gender: parseAsString,
    category: parseAsString,
    // advanced filter
    // filters: getFiltersStateParser().withDefault([]),
    // joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and')
  }

  return (
    <NuqsParamsProvider
      searchParams={Promise.resolve({})}
      searchParamsSchema={searchParams}
    >
      hi
      {/* <FindCreatorsViewPage /> */}
    </NuqsParamsProvider>
  )
}
