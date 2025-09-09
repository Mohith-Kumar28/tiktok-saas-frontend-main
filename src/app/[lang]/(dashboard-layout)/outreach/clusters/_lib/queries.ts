import { unstable_noStore as noStore } from "next/cache"

import type { Cluster } from "./types"

import { clusterSeeds } from "./seeds"
import { searchParamsCache } from "./validations"

type SearchParams = Record<string, string | string[] | undefined>

export async function getClusters(searchParams: SearchParams) {
  noStore()

  const {
    page,
    perPage,
    sort,
    name,
    type,
    status,
    creatorCount,
    totalReach,
    avgEngagementRate,
    joinOperator,
  } = searchParamsCache.parse(searchParams)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Start with all clusters
  let filteredClusters = [...clusterSeeds]

  // Apply name filter
  if (name) {
    filteredClusters = filteredClusters.filter(
      (cluster) =>
        cluster.name.toLowerCase().includes(name.toLowerCase()) ||
        cluster.description.toLowerCase().includes(name.toLowerCase()) ||
        cluster.tags.some((tag) =>
          tag.toLowerCase().includes(name.toLowerCase())
        )
    )
  }

  // Apply type filter
  if (type?.length) {
    filteredClusters = filteredClusters.filter((cluster) =>
      type.includes(cluster.type)
    )
  }

  // Apply status filter
  if (status?.length) {
    filteredClusters = filteredClusters.filter((cluster) =>
      status.includes(cluster.status)
    )
  }

  // Apply creator count filter
  if (creatorCount?.length === 2) {
    const [min, max] = creatorCount
    filteredClusters = filteredClusters.filter((cluster) => {
      if (joinOperator === "and") {
        return cluster.creatorCount >= min && cluster.creatorCount <= max
      }
      return cluster.creatorCount >= min || cluster.creatorCount <= max
    })
  }

  // Apply total reach filter
  if (totalReach?.length === 2) {
    const [min, max] = totalReach
    filteredClusters = filteredClusters.filter((cluster) => {
      if (joinOperator === "and") {
        return cluster.totalReach >= min && cluster.totalReach <= max
      }
      return cluster.totalReach >= min || cluster.totalReach <= max
    })
  }

  // Apply engagement rate filter
  if (avgEngagementRate?.length === 2) {
    const [min, max] = avgEngagementRate
    filteredClusters = filteredClusters.filter((cluster) => {
      if (joinOperator === "and") {
        return (
          cluster.avgEngagementRate >= min && cluster.avgEngagementRate <= max
        )
      }
      return (
        cluster.avgEngagementRate >= min || cluster.avgEngagementRate <= max
      )
    })
  }

  // Apply sorting
  if (sort?.length) {
    filteredClusters.sort((a, b) => {
      for (const { id, desc } of sort) {
        let aValue: any
        let bValue: any

        switch (id) {
          case "name":
            aValue = a.name.toLowerCase()
            bValue = b.name.toLowerCase()
            break
          case "type":
            aValue = a.type
            bValue = b.type
            break
          case "status":
            aValue = a.status
            bValue = b.status
            break
          case "creatorCount":
            aValue = a.creatorCount
            bValue = b.creatorCount
            break
          case "totalReach":
            aValue = a.totalReach
            bValue = b.totalReach
            break
          case "avgEngagementRate":
            aValue = a.avgEngagementRate
            bValue = b.avgEngagementRate
            break
          case "createdAt":
            aValue = a.createdAt.getTime()
            bValue = b.createdAt.getTime()
            break
          case "updatedAt":
            aValue = a.updatedAt.getTime()
            bValue = b.updatedAt.getTime()
            break
          default:
            continue
        }

        if (aValue < bValue) {
          return desc ? 1 : -1
        }
        if (aValue > bValue) {
          return desc ? -1 : 1
        }
      }
      return 0
    })
  }

  // Calculate pagination
  const totalClusters = filteredClusters.length
  const pageCount = Math.ceil(totalClusters / perPage)
  const offset = (page - 1) * perPage
  const paginatedClusters = filteredClusters.slice(offset, offset + perPage)

  return {
    data: paginatedClusters,
    pageCount,
    totalCount: totalClusters,
  }
}

export async function getCluster(id: string): Promise<Cluster | null> {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  const cluster = clusterSeeds.find((cluster) => cluster.id === id)
  return cluster || null
}

export async function getClusterStatusCounts() {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  // Count clusters by status
  const statusCounts = clusterSeeds.reduce(
    (acc, cluster) => {
      acc[cluster.status] = (acc[cluster.status] || 0) + 1
      return acc
    },
    {
      active: 0,
      inactive: 0,
      draft: 0,
      archived: 0,
    }
  )

  return statusCounts
}

export async function getClusterTypeCounts() {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  // Count clusters by type
  const typeCounts = clusterSeeds.reduce(
    (acc, cluster) => {
      acc[cluster.type] = (acc[cluster.type] || 0) + 1
      return acc
    },
    {
      influencers: 0,
      "micro-influencers": 0,
      "nano-influencers": 0,
      celebrities: 0,
      brands: 0,
      custom: 0,
    }
  )

  return typeCounts
}

export async function getClusterCreatorCountRange() {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  const creatorCounts = clusterSeeds.map((cluster) => cluster.creatorCount)
  return {
    min: Math.min(...creatorCounts),
    max: Math.max(...creatorCounts),
  }
}

export async function getClusterTotalReachRange() {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  const totalReaches = clusterSeeds.map((cluster) => cluster.totalReach)
  return {
    min: Math.min(...totalReaches),
    max: Math.max(...totalReaches),
  }
}

export async function getClusterAvgEngagementRateRange() {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  const engagementRates = clusterSeeds.map(
    (cluster) => cluster.avgEngagementRate
  )
  return {
    min: Math.min(...engagementRates),
    max: Math.max(...engagementRates),
  }
}

export async function getClusterCreatedAtRange() {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  const createdAtDates = clusterSeeds.map((cluster) => cluster.createdAt)
  return {
    min: new Date(Math.min(...createdAtDates.map((date) => date.getTime()))),
    max: new Date(Math.max(...createdAtDates.map((date) => date.getTime()))),
  }
}

export async function getClusterFilterOptions() {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  // Get unique values for filters
  const types = Array.from(new Set(clusterSeeds.map((cluster) => cluster.type)))
  const statuses = Array.from(
    new Set(clusterSeeds.map((cluster) => cluster.status))
  )
  const tags = Array.from(
    new Set(clusterSeeds.flatMap((cluster) => cluster.tags))
  )

  // Calculate ranges
  const creatorCounts = clusterSeeds.map((cluster) => cluster.creatorCount)
  const totalReaches = clusterSeeds.map((cluster) => cluster.totalReach)
  const engagementRates = clusterSeeds.map(
    (cluster) => cluster.avgEngagementRate
  )

  return {
    types,
    statuses,
    tags,
    creatorCountRange: {
      min: Math.min(...creatorCounts),
      max: Math.max(...creatorCounts),
    },
    totalReachRange: {
      min: Math.min(...totalReaches),
      max: Math.max(...totalReaches),
    },
    engagementRateRange: {
      min: Math.min(...engagementRates),
      max: Math.max(...engagementRates),
    },
  }
}

// CRUD Operations
export async function createCluster(
  data: Omit<Cluster, "id" | "createdAt" | "updatedAt">
): Promise<Cluster> {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const newCluster: Cluster = {
    ...data,
    id: `cluster-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // In a real app, this would save to database
  clusterSeeds.push(newCluster)

  return newCluster
}

export async function updateCluster(
  id: string,
  data: Partial<Omit<Cluster, "id" | "createdAt">>
): Promise<Cluster | null> {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const clusterIndex = clusterSeeds.findIndex((cluster) => cluster.id === id)
  if (clusterIndex === -1) {
    return null
  }

  const updatedCluster: Cluster = {
    ...clusterSeeds[clusterIndex],
    ...data,
    updatedAt: new Date(),
  }

  // In a real app, this would update in database
  clusterSeeds[clusterIndex] = updatedCluster

  return updatedCluster
}

export async function deleteCluster(id: string): Promise<boolean> {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const clusterIndex = clusterSeeds.findIndex((cluster) => cluster.id === id)
  if (clusterIndex === -1) {
    return false
  }

  // In a real app, this would delete from database
  clusterSeeds.splice(clusterIndex, 1)

  return true
}

export async function deleteClusters(ids: string[]): Promise<number> {
  noStore()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  let deletedCount = 0

  for (const id of ids) {
    const clusterIndex = clusterSeeds.findIndex((cluster) => cluster.id === id)
    if (clusterIndex !== -1) {
      clusterSeeds.splice(clusterIndex, 1)
      deletedCount++
    }
  }

  return deletedCount
}