export interface Bot {
  id: string
  name: string
  description: string
  type: BotType
  status: BotStatus
  messagesSent: number
  targetInvitesSent: number
  responseRate: number
  conversionRate: number
  creatorsReached: number
  remainingCreators: number
  sampleRequests: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: string
  isActive: boolean
}

export type BotType =
  | "auto-responder"
  | "target-collaboration"
  | "message-only"
  | "product-card"
  | "custom"

export type BotStatus = "running" | "paused" | "stopped" | "draft" | "completed"

export interface BotFilters {
  name?: string
  type: BotType[]
  status: BotStatus[]
  messagesSent: [number, number]
  targetInvitesSent: [number, number]
  responseRate: [number, number]
  conversionRate: [number, number]
  creatorsReached: [number, number]
  tags: string[]
  createdAt: [number, number]
  isActive?: boolean
}

export interface BotCounts {
  total: number
  running: number
  paused: number
  stopped: number
  draft: number
  completed: number
}

export interface BotTypeCounts {
  "auto-responder": number
  "target-collaboration": number
  "message-only": number
  "product-card": number
  custom: number
}

export interface MessagesSentRange {
  min: number
  max: number
}

export interface TargetInvitesSentRange {
  min: number
  max: number
}

export interface ResponseRateRange {
  min: number
  max: number
}

export interface ConversionRateRange {
  min: number
  max: number
}

export interface CreatorsReachedRange {
  min: number
  max: number
}

export interface BotMetricType {
  averageValue: number
  percentageChange: number
  perMonth: Array<{ month: string; value: number; fill?: string }>
}

export interface BotsOverviewType {
  activeBots: BotMetricType
  messagesDelivered: BotMetricType
  responseRate: BotMetricType
  targetInvitesSent: BotMetricType
}

// Analytics types for charts
export interface BotAnalytics {
  totalBots: {
    value: number
    percentageChange: number
    perMonth: Array<{ month: string; value: number }>
  }
  activeBotsRate: {
    value: number
    percentageChange: number
    perMonth: Array<{ month: string; value: number }>
  }
  averageResponseRate: {
    value: number
    percentageChange: number
    perMonth: Array<{ month: string; value: number }>
  }
  totalMessagesDelivered: {
    value: number
    percentageChange: number
    perMonth: Array<{ month: string; value: number }>
  }
}