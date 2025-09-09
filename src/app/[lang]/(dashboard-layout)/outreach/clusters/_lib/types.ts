export interface Cluster {
  id: string
  name: string
  description: string
  type: ClusterType
  status: ClusterStatus
  creatorCount: number
  totalReach: number
  avgEngagementRate: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: string
  isBlocklist: boolean
}

export type ClusterType =
  | "influencers"
  | "micro-influencers"
  | "nano-influencers"
  | "celebrities"
  | "brands"
  | "custom"

export type ClusterStatus = "active" | "inactive" | "draft" | "archived"

export interface ClusterFilters {
  name?: string
  type: ClusterType[]
  status: ClusterStatus[]
  creatorCount: [number, number]
  totalReach: [number, number]
  avgEngagementRate: [number, number]
  tags: string[]
  createdAt: [number, number]
  isBlocklist?: boolean
}

export interface ClusterCounts {
  total: number
  active: number
  inactive: number
  draft: number
  archived: number
}

export interface ClusterTypeCounts {
  influencers: number
  "micro-influencers": number
  "nano-influencers": number
  celebrities: number
  brands: number
  custom: number
}

export interface CreatorCountRange {
  min: number
  max: number
}

export interface TotalReachRange {
  min: number
  max: number
}

export interface EngagementRateRange {
  min: number
  max: number
}
