import type { NavigationType } from "@/types/types"

export const navigationsData: NavigationType[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        href: "/dashboards/analytics",
        iconName: "ChartPie",
      },
    ],
  },
  {
    title: "Actions",
    items: [
      {
        title: "Outreach",
        iconName: "Users",
        items: [
          {
            title: "My Bots",
            href: "/outreach/bots",
          },
          {
            title: "Email Campaigns",
            href: "/outreach/email-campaigns",
          },
          {
            title: "My Lists",
            href: "/outreach/lists",
          },
          {
            title: "Find Creators",
            href: "/outreach/find-creators",
          },
        ],
      },
      {
        title: "Find Creators",
        href: "/outreach/find-creators",
        iconName: "Users",
      },
    ],
  },
]
