import type { BotsOverviewType } from "./types"

export const botsOverviewData: BotsOverviewType = {
  activeBots: {
    averageValue: 12,
    percentageChange: 0.15,
    perMonth: [
      { month: "January", value: 8 },
      { month: "February", value: 10 },
      { month: "March", value: 12 },
      { month: "April", value: 11 },
      { month: "May", value: 14 },
      { month: "June", value: 15 },
    ],
  },
  messagesDelivered: {
    averageValue: 2847,
    percentageChange: 0.23,
    perMonth: [
      { month: "January", value: 2100 },
      { month: "February", value: 2400 },
      { month: "March", value: 2800 },
      { month: "April", value: 2650 },
      { month: "May", value: 3200 },
      { month: "June", value: 3350 },
    ],
  },
  responseRate: {
    averageValue: 0.68,
    percentageChange: 0.12,
    perMonth: [
      { month: "January", value: 0.62 },
      { month: "February", value: 0.65 },
      { month: "March", value: 0.71 },
      { month: "April", value: 0.69 },
      { month: "May", value: 0.73 },
      { month: "June", value: 0.68 },
    ],
  },
  targetInvitesSent: {
    averageValue: 1714,
    percentageChange: 0.18,
    perMonth: [
      { month: "January", value: 1400 },
      { month: "February", value: 1550 },
      { month: "March", value: 1700 },
      { month: "April", value: 1650 },
      { month: "May", value: 1850 },
      { month: "June", value: 1900 },
    ],
  },
}
