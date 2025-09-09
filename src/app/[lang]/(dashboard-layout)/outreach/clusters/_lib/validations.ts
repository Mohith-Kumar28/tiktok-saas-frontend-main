import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server"
import * as z from "zod"

import type { Cluster, ClusterStatus, ClusterType } from "./types"

import {
  getFiltersStateParser,
  getSortingStateParser,
} from "@/components/ui/table/lib/parsers"

const clusterTypes: ClusterType[] = [
  "influencers",
  "micro-influencers",
  "nano-influencers",
  "celebrities",
  "brands",
  "custom",
]

const clusterStatuses: ClusterStatus[] = [
  "active",
  "inactive",
  "draft",
  "archived",
]

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Cluster>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  name: parseAsString.withDefault(""),
  type: parseAsArrayOf(
    z.enum(clusterTypes as [ClusterType, ...ClusterType[]])
  ).withDefault([]),
  status: parseAsArrayOf(
    z.enum(clusterStatuses as [ClusterStatus, ...ClusterStatus[]])
  ).withDefault([]),
  creatorCount: parseAsArrayOf(z.coerce.number()).withDefault([]),
  totalReach: parseAsArrayOf(z.coerce.number()).withDefault([]),
  avgEngagementRate: parseAsArrayOf(z.coerce.number()).withDefault([]),
  tags: parseAsArrayOf(z.string()).withDefault([]),
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
  isBlocklist: parseAsBoolean.withDefault(false),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
})

export const createClusterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(clusterTypes as [ClusterType, ...ClusterType[]]),
  status: z.enum(clusterStatuses as [ClusterStatus, ...ClusterStatus[]]),
  tags: z.array(z.string()).default([]),
  isBlocklist: z.boolean().default(false),
})

export const updateClusterSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  type: z.enum(clusterTypes as [ClusterType, ...ClusterType[]]).optional(),
  status: z
    .enum(clusterStatuses as [ClusterStatus, ...ClusterStatus[]])
    .optional(),
  tags: z.array(z.string()).optional(),
  isBlocklist: z.boolean().optional(),
})

export type GetClustersSchema = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>
export type CreateClusterSchema = z.infer<typeof createClusterSchema>
export type UpdateClusterSchema = z.infer<typeof updateClusterSchema>

// Export the enums for use in other components
export { clusterTypes, clusterStatuses }
