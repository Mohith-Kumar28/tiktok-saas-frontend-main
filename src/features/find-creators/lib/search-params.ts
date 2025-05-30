import { createSearchParamsCache, createSerializer } from "nuqs/server"

import { tableSearchParamsSchema } from "../schemas/search-params"

export const searchParamsCache = createSearchParamsCache(
  tableSearchParamsSchema
)
export const serialize = createSerializer(tableSearchParamsSchema)
