import { createSearchParamsCache, createSerializer } from "nuqs/server"

import type { ParserMap } from "nuqs/server"

// Accepts a searchParams definition and returns cache & serializer
export function createSearchParamsHelpers(searchParams: ParserMap) {
  return {
    searchParamsCache: createSearchParamsCache(searchParams),
    serialize: createSerializer(searchParams),
  }
}
