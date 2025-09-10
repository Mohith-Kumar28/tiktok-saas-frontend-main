import type {
  Bot,
  BotAnalytics,
  BotCounts,
  BotTypeCounts,
  ConversionRateRange,
  CreatorsReachedRange,
  MessagesSentRange,
  ResponseRateRange,
  TargetInvitesSentRange,
} from "./types"

// Mock data for demonstration
const mockBots: Bot[] = [
  {
    id: "1",
    name: "TC 5% ads commission bot",
    description: "Target Collaboration Only",
    type: "target-collaboration",
    status: "running",
    messagesSent: 4389,
    targetInvitesSent: 3156,
    responseRate: 15.6,
    conversionRate: 8.2,
    creatorsReached: 156,
    remainingCreators: 20,
    sampleRequests: 45,
    tags: ["commission", "ads"],
    createdAt: new Date("2025-09-10"),
    updatedAt: new Date("2025-09-10"),
    createdBy: "user1",
    isActive: true,
  },
  {
    id: "2",
    name: "Riya - 05/09/2025",
    description: "Message + Target Collab Product Card",
    type: "product-card",
    status: "running",
    messagesSent: 1861,
    targetInvitesSent: 95,
    responseRate: 12.3,
    conversionRate: 6.8,
    creatorsReached: 93,
    remainingCreators: 30,
    sampleRequests: 28,
    tags: ["product", "collaboration"],
    createdAt: new Date("2025-09-8"),
    updatedAt: new Date("2025-09-8"),
    createdBy: "user2",
    isActive: true,
  },
  {
    id: "3",
    name: "riya 05/09/2025",
    description: "Message + Target Collab Product Card",
    type: "product-card",
    status: "running",
    messagesSent: 1834,
    targetInvitesSent: 179,
    responseRate: 18.4,
    conversionRate: 9.1,
    creatorsReached: 156,
    remainingCreators: 44,
    sampleRequests: 32,
    tags: ["product", "collaboration"],
    createdAt: new Date("2025-09-8"),
    updatedAt: new Date("2025-09-8"),
    createdBy: "user2",
    isActive: true,
  },
  {
    id: "4",
    name: "Soaib Glowy existing creator...",
    description: "Message Only",
    type: "message-only",
    status: "running",
    messagesSent: 2084,
    targetInvitesSent: 27,
    responseRate: 8.7,
    conversionRate: 4.2,
    creatorsReached: 0,
    remainingCreators: 15,
    sampleRequests: 12,
    tags: ["message", "existing"],
    createdAt: new Date("2025-09-7"),
    updatedAt: new Date("2025-09-7"),
    createdBy: "user3",
    isActive: true,
  },
]

export async function getBots(_searchParams: {
  [key: string]: string | string[] | undefined
}) {
  // In a real app, this would filter based on searchParams
  await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate API delay

  return {
    data: mockBots,
    pageCount: 1,
  }
}

export async function getBotStatusCounts(): Promise<BotCounts> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  return {
    total: mockBots.length,
    running: mockBots.filter((bot) => bot.status === "running").length,
    paused: mockBots.filter((bot) => bot.status === "paused").length,
    stopped: mockBots.filter((bot) => bot.status === "stopped").length,
    draft: mockBots.filter((bot) => bot.status === "draft").length,
    completed: mockBots.filter((bot) => bot.status === "completed").length,
  }
}

export async function getBotTypeCounts(): Promise<BotTypeCounts> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const autoResponder = mockBots.filter((bot) => bot.type === "auto-responder")
  const targetCollab = mockBots.filter(
    (bot) => bot.type === "target-collaboration"
  )
  const messageOnly = mockBots.filter((bot) => bot.type === "message-only")
  const productCard = mockBots.filter((bot) => bot.type === "product-card")
  const custom = mockBots.filter((bot) => bot.type === "custom")

  return {
    "auto-responder": autoResponder.length,
    "target-collaboration": targetCollab.length,
    "message-only": messageOnly.length,
    "product-card": productCard.length,
    custom: custom.length,
  }
}

export async function getBotMessagesSentRange(): Promise<MessagesSentRange> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const messagesSent = mockBots.map((bot) => bot.messagesSent)
  return {
    min: Math.min(...messagesSent),
    max: Math.max(...messagesSent),
  }
}

export async function getBotTargetInvitesSentRange(): Promise<TargetInvitesSentRange> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const targetInvitesSent = mockBots.map((bot) => bot.targetInvitesSent)
  return {
    min: Math.min(...targetInvitesSent),
    max: Math.max(...targetInvitesSent),
  }
}

export async function getBotResponseRateRange(): Promise<ResponseRateRange> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const responseRates = mockBots.map((bot) => bot.responseRate)
  return {
    min: Math.min(...responseRates),
    max: Math.max(...responseRates),
  }
}

export async function getBotConversionRateRange(): Promise<ConversionRateRange> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const conversionRates = mockBots.map((bot) => bot.conversionRate)
  return {
    min: Math.min(...conversionRates),
    max: Math.max(...conversionRates),
  }
}

export async function getBotCreatorsReachedRange(): Promise<CreatorsReachedRange> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const creatorsReached = mockBots.map((bot) => bot.creatorsReached)
  return {
    min: Math.min(...creatorsReached),
    max: Math.max(...creatorsReached),
  }
}

export async function getBotCreatedAtRange(): Promise<{
  min: number
  max: number
}> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const createdAtDates = mockBots.map((bot) => bot.createdAt.getTime())
  return {
    min: Math.min(...createdAtDates),
    max: Math.max(...createdAtDates),
  }
}

// Analytics data for charts
export async function getBotAnalytics(): Promise<BotAnalytics> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  return {
    totalBots: {
      value: mockBots.length,
      percentageChange: 12.5,
      perMonth: [
        { month: "Jan", value: 2 },
        { month: "Feb", value: 3 },
        { month: "Mar", value: 4 },
        { month: "Apr", value: 4 },
        { month: "May", value: 4 },
        { month: "Jun", value: 4 },
      ],
    },
    activeBotsRate: {
      value: 85.2,
      percentageChange: 8.3,
      perMonth: [
        { month: "Jan", value: 78 },
        { month: "Feb", value: 82 },
        { month: "Mar", value: 85 },
        { month: "Apr", value: 87 },
        { month: "May", value: 85 },
        { month: "Jun", value: 85 },
      ],
    },
    averageResponseRate: {
      value: 13.75,
      percentageChange: -2.1,
      perMonth: [
        { month: "Jan", value: 15.2 },
        { month: "Feb", value: 14.8 },
        { month: "Mar", value: 13.9 },
        { month: "Apr", value: 13.5 },
        { month: "May", value: 13.8 },
        { month: "Jun", value: 13.75 },
      ],
    },
    totalMessagesDelivered: {
      value: 10168,
      percentageChange: 24.7,
      perMonth: [
        { month: "Jan", value: 1200 },
        { month: "Feb", value: 1800 },
        { month: "Mar", value: 2100 },
        { month: "Apr", value: 2400 },
        { month: "May", value: 2668 },
        { month: "Jun", value: 10168 },
      ],
    },
  }
}
