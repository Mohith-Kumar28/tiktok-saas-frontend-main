import type { ChatType } from "../types"

export const chatsData: ChatType[] = [
  {
    id: "chat_1",
    lastMessage: {
      content: "Perfect! I'll start promoting these products immediately.",
      createdAt: new Date("2024-10-31T10:37:00Z"),
    },
    name: "TikTok Shop Admin Team",
    messages: [
      {
        id: "msg_24",
        senderId: "5",
        text: "Perfect! I'll start promoting these products immediately.",
        createdAt: new Date("2024-10-31T10:37:00Z"),
        status: "DELIVERED",
      },
      {
        id: "msg_23",
        senderId: "1",
        files: [
          {
            id: "file_1",
            name: "November_Product_Catalog.pdf",
            type: "application/pdf",
            size: 204800,
            url: "",
          },
        ],
        createdAt: new Date("2024-10-31T10:34:00Z"),
        status: "READ",
      },
      {
        id: "msg_22",
        senderId: "1",
        text: "Here's the updated product catalog with new commission rates.",
        files: [
          {
            id: "file_1",
            name: "product-catalog-november",
            type: "application/pdf",
            size: 204800,
            url: "",
          },
        ],
        createdAt: new Date("2024-10-31T10:33:00Z"),
        status: "READ",
      },
      {
        id: "msg_21",
        senderId: "5",
        text: "Great! Are there any seasonal promotions I should focus on?",
        createdAt: new Date("2024-10-31T10:10:00Z"),
        status: "READ",
      },
      {
        id: "msg_20",
        senderId: "1",
        text: "We've increased commission rates to 15% for electronics this month.",
        createdAt: new Date("2024-10-31T10:08:00Z"),
        status: "READ",
      },
      {
        id: "msg_19",
        senderId: "1",
        images: [
          {
            id: "img_1",
            name: "commission-structure-chart",
            type: "image/svg",
            size: 512000,
            url: "/images/illustrations/misc/whiteboard.svg",
          },
        ],
        createdAt: new Date("2024-10-31T10:07:00Z"),
        status: "READ",
      },
    ],
    users: [
      {
        id: "1",
        name: "Alex Chen - TikTok Admin",
        avatar: "/images/avatars/male-01.svg",
        status: "ONLINE",
      },
      {
        id: "5",
        name: "Maya Rodriguez - Creator",
        avatar: "/images/avatars/female-02.svg",
        status: "ONLINE",
      },
    ],
    typingUsers: [],
  },
  {
    id: "chat_2",
    lastMessage: {
      content: "Hello everyone!",
      createdAt: new Date("2024-10-31T10:03:00Z"),
    },
    name: "Creator Community",
    messages: [
      {
        id: "msg_12",
        senderId: "2",
        text: "Great! My conversion rates have been improving this week.",
        createdAt: new Date("2024-10-31T10:03:00Z"),
        status: "DELIVERED",
      },
      {
        id: "msg_11",
        senderId: "1",
        text: "How are your TikTok Shop campaigns performing?",
        createdAt: new Date("2024-10-31T10:02:00Z"),
        status: "READ",
      },
      {
        id: "msg_2",
        senderId: "1",
        text: "Welcome to the creator program!",
        createdAt: new Date("2024-10-31T10:01:00Z"),
        status: "READ",
      },
      {
        id: "msg_1",
        senderId: "2",
        text: "Excited to start promoting TikTok Shop products!",
        createdAt: new Date("2024-10-31T10:00:00Z"),
        status: "READ",
      },
    ],
    users: [
      {
        id: "1",
        name: "Alex Chen - TikTok Admin",
        avatar: "/images/avatars/male-01.svg",
        status: "ONLINE",
      },
      {
        id: "2",
        name: "Olivia Martinez - Creator",
        avatar: "/images/avatars/female-03.svg",
        status: "IDLE",
      },
    ],
    typingUsers: [],
    unreadCount: 1,
  },
  {
    id: "chat_3",
    lastMessage: {
      content: "Did you check the new product analytics?",
      createdAt: new Date("2024-10-31T10:08:00Z"),
    },
    name: "Olivia Martinez - Creator",
    avatar: "/images/avatars/female-03.svg",
    status: "IDLE",
    messages: [
      {
        id: "msg_14",
        senderId: "1",
        text: "Excellent! Keep focusing on those high-converting products.",
        createdAt: new Date("2024-10-31T10:08:00Z"),
        status: "READ",
      },
      {
        id: "msg_13",
        senderId: "2",
        text: "The metrics look great! My engagement is up 40%.",
        createdAt: new Date("2024-10-31T10:07:00Z"),
        status: "READ",
      },
      {
        id: "msg_4",
        senderId: "1",
        text: "Yes, the new dashboard is really helpful for tracking performance.",
        createdAt: new Date("2024-10-31T10:06:00Z"),
        status: "READ",
      },
      {
        id: "msg_3",
        senderId: "2",
        text: "Did you check the new product analytics?",
        createdAt: new Date("2024-10-31T10:05:00Z"),
        status: "READ",
      },
    ],
    users: [
      {
        id: "1",
        name: "Alex Chen - TikTok Admin",
        avatar: "/images/avatars/male-01.svg",
        status: "ONLINE",
      },
      {
        id: "2",
        name: "Olivia Martinez - Creator",
        avatar: "/images/avatars/female-03.svg",
        status: "IDLE",
      },
    ],
    typingUsers: [],
  },
  {
    id: "chat_4",
    lastMessage: {
      content: "Product training session at 3 PM tomorrow.",
      createdAt: new Date("2024-10-31T10:13:00Z"),
    },
    name: "Creator Training Team",
    messages: [
      {
        id: "msg_16",
        senderId: "4",
        text: "Perfect! I'll prepare the product materials.",
        createdAt: new Date("2024-10-31T10:13:00Z"),
        status: "READ",
      },
      {
        id: "msg_15",
        senderId: "3",
        text: "Can you share the new product lineup before the session?",
        createdAt: new Date("2024-10-31T10:12:00Z"),
        status: "READ",
      },
      {
        id: "msg_6",
        senderId: "4",
        text: "Excited to learn about the new commission structure!",
        createdAt: new Date("2024-10-31T10:11:00Z"),
        status: "READ",
      },
      {
        id: "msg_5",
        senderId: "3",
        text: "Product training session at 3 PM tomorrow.",
        createdAt: new Date("2024-10-31T10:10:00Z"),
        status: "READ",
      },
    ],
    users: [
      {
        id: "3",
        name: "Michael Brown - Training Lead",
        avatar: "/images/avatars/male-02.svg",
        status: "ONLINE",
      },
      {
        id: "4",
        name: "Emily Smith - Creator",
        avatar: "/images/avatars/female-01.svg",
        status: "DO NOT DISTURB",
      },
    ],
    typingUsers: [],
  },
  {
    id: "chat_5",
    lastMessage: {
      content: "Want to discuss the new affiliate program over lunch?",
      createdAt: new Date("2024-10-31T10:18:00Z"),
    },
    name: "Michael Johnson - Creator",
    avatar: "/images/avatars/male-02.svg",
    status: "ONLINE",
    messages: [
      {
        id: "msg_18",
        senderId: "3",
        text: "Perfect! I'm curious about the holiday season bonuses.",
        createdAt: new Date("2024-10-31T10:18:00Z"),
        status: "READ",
      },
      {
        id: "msg_17",
        senderId: "1",
        text: "How about 1 PM? We can review your performance metrics too.",
        createdAt: new Date("2024-10-31T10:17:00Z"),
        status: "READ",
      },
      {
        id: "msg_8",
        senderId: "3",
        text: "Absolutely! I'd love to learn more about optimization strategies.",
        createdAt: new Date("2024-10-31T10:16:00Z"),
        status: "READ",
      },
      {
        id: "msg_7",
        senderId: "1",
        text: "Want to discuss the new affiliate program over lunch?",
        createdAt: new Date("2024-10-31T10:15:00Z"),
        status: "READ",
      },
    ],
    users: [
      {
        id: "1",
        name: "Alex Chen - TikTok Admin",
        avatar: "/images/avatars/male-01.svg",
        status: "ONLINE",
      },
      {
        id: "3",
        name: "Michael Johnson - Creator",
        avatar: "/images/avatars/male-02.svg",
        status: "ONLINE",
      },
    ],
    typingUsers: [],
  },
]
