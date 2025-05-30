export default async function NuqsParamsProvider({
  children,
  searchParams,
  searchParamsCache,
}: {
  children: React.ReactNode
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  searchParamsCache: any
}) {
  const searchParamsParsed = await searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParamsParsed)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return <>{children}</>
}
