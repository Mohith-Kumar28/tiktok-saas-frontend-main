import type { Cluster } from "./types"

export const clusterSeeds: Cluster[] = [
  {
    id: "cluster-1",
    name: "Tech Influencers",
    description:
      "Top technology reviewers and tech enthusiasts with high engagement rates",
    type: "influencers",
    status: "active",
    creatorCount: 245,
    totalReach: 12500000,
    avgEngagementRate: 4.2,
    tags: ["technology", "reviews", "gadgets", "AI"],
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-12-20T14:22:00Z"),
    createdBy: "john.doe@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-2",
    name: "Fashion Micro-Influencers",
    description:
      "Emerging fashion creators with authentic style and growing audiences",
    type: "micro-influencers",
    status: "active",
    creatorCount: 892,
    totalReach: 8900000,
    avgEngagementRate: 6.8,
    tags: ["fashion", "style", "outfit", "trends"],
    createdAt: new Date("2024-02-03T09:15:00Z"),
    updatedAt: new Date("2024-12-19T16:45:00Z"),
    createdBy: "sarah.wilson@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-3",
    name: "Gaming Streamers",
    description: "Popular gaming content creators and live streamers",
    type: "influencers",
    status: "active",
    creatorCount: 156,
    totalReach: 18700000,
    avgEngagementRate: 5.9,
    tags: ["gaming", "streaming", "esports", "entertainment"],
    createdAt: new Date("2024-01-28T11:20:00Z"),
    updatedAt: new Date("2024-12-18T13:10:00Z"),
    createdBy: "mike.chen@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-4",
    name: "Fitness Nano-Influencers",
    description:
      "Local fitness trainers and wellness advocates with dedicated communities",
    type: "nano-influencers",
    status: "active",
    creatorCount: 1247,
    totalReach: 3200000,
    avgEngagementRate: 8.1,
    tags: ["fitness", "wellness", "health", "workout"],
    createdAt: new Date("2024-03-10T08:45:00Z"),
    updatedAt: new Date("2024-12-17T12:30:00Z"),
    createdBy: "emma.rodriguez@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-5",
    name: "Celebrity Endorsers",
    description: "A-list celebrities for premium brand partnerships",
    type: "celebrities",
    status: "active",
    creatorCount: 23,
    totalReach: 45600000,
    avgEngagementRate: 2.1,
    tags: ["celebrity", "premium", "luxury", "entertainment"],
    createdAt: new Date("2024-01-05T15:00:00Z"),
    updatedAt: new Date("2024-12-16T10:15:00Z"),
    createdBy: "alex.thompson@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-6",
    name: "Food & Cooking Creators",
    description: "Culinary experts, food bloggers, and cooking enthusiasts",
    type: "micro-influencers",
    status: "active",
    creatorCount: 634,
    totalReach: 7800000,
    avgEngagementRate: 7.3,
    tags: ["food", "cooking", "recipes", "culinary"],
    createdAt: new Date("2024-02-20T12:10:00Z"),
    updatedAt: new Date("2024-12-15T09:25:00Z"),
    createdBy: "lisa.park@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-7",
    name: "Travel Bloggers",
    description: "Adventure seekers and travel content creators",
    type: "influencers",
    status: "inactive",
    creatorCount: 189,
    totalReach: 9200000,
    avgEngagementRate: 4.7,
    tags: ["travel", "adventure", "destinations", "lifestyle"],
    createdAt: new Date("2024-01-12T14:30:00Z"),
    updatedAt: new Date("2024-11-20T16:40:00Z"),
    createdBy: "david.kim@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-8",
    name: "Beauty & Skincare Experts",
    description: "Makeup artists, skincare specialists, and beauty reviewers",
    type: "micro-influencers",
    status: "active",
    creatorCount: 756,
    totalReach: 11300000,
    avgEngagementRate: 6.4,
    tags: ["beauty", "skincare", "makeup", "cosmetics"],
    createdAt: new Date("2024-02-14T10:20:00Z"),
    updatedAt: new Date("2024-12-14T11:50:00Z"),
    createdBy: "rachel.green@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-9",
    name: "Problematic Creators",
    description: "Creators with controversial content or brand safety issues",
    type: "custom",
    status: "archived",
    creatorCount: 67,
    totalReach: 2100000,
    avgEngagementRate: 3.2,
    tags: ["controversial", "brand-safety", "blocked"],
    createdAt: new Date("2024-03-01T09:00:00Z"),
    updatedAt: new Date("2024-10-15T14:20:00Z"),
    createdBy: "admin@company.com",
    isBlocklist: true,
  },
  {
    id: "cluster-10",
    name: "Automotive Enthusiasts",
    description:
      "Car reviewers, automotive journalists, and racing content creators",
    type: "influencers",
    status: "draft",
    creatorCount: 98,
    totalReach: 5600000,
    avgEngagementRate: 5.1,
    tags: ["automotive", "cars", "racing", "reviews"],
    createdAt: new Date("2024-12-01T13:15:00Z"),
    updatedAt: new Date("2024-12-13T15:30:00Z"),
    createdBy: "tom.anderson@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-11",
    name: "Pet & Animal Lovers",
    description:
      "Pet owners, animal welfare advocates, and veterinary professionals",
    type: "nano-influencers",
    status: "active",
    creatorCount: 1456,
    totalReach: 4200000,
    avgEngagementRate: 9.2,
    tags: ["pets", "animals", "veterinary", "cute"],
    createdAt: new Date("2024-02-28T11:40:00Z"),
    updatedAt: new Date("2024-12-12T10:05:00Z"),
    createdBy: "jennifer.lee@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-12",
    name: "Brand Partners",
    description: "Official brand accounts and corporate social media profiles",
    type: "brands",
    status: "active",
    creatorCount: 45,
    totalReach: 28900000,
    avgEngagementRate: 1.8,
    tags: ["brands", "corporate", "official", "partnerships"],
    createdAt: new Date("2024-01-20T16:25:00Z"),
    updatedAt: new Date("2024-12-11T14:15:00Z"),
    createdBy: "partnerships@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-13",
    name: "Educational Content Creators",
    description: "Teachers, professors, and educational content specialists",
    type: "micro-influencers",
    status: "active",
    creatorCount: 423,
    totalReach: 6700000,
    avgEngagementRate: 5.8,
    tags: ["education", "learning", "teaching", "academic"],
    createdAt: new Date("2024-03-05T08:30:00Z"),
    updatedAt: new Date("2024-12-10T12:45:00Z"),
    createdBy: "education.team@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-14",
    name: "Music Artists & DJs",
    description: "Musicians, DJs, and music content creators",
    type: "influencers",
    status: "active",
    creatorCount: 312,
    totalReach: 15800000,
    avgEngagementRate: 4.9,
    tags: ["music", "artists", "DJ", "entertainment"],
    createdAt: new Date("2024-01-30T17:10:00Z"),
    updatedAt: new Date("2024-12-09T13:20:00Z"),
    createdBy: "music.team@company.com",
    isBlocklist: false,
  },
  {
    id: "cluster-15",
    name: "Parenting & Family",
    description:
      "Parent bloggers, family lifestyle creators, and child development experts",
    type: "micro-influencers",
    status: "active",
    creatorCount: 567,
    totalReach: 8100000,
    avgEngagementRate: 6.7,
    tags: ["parenting", "family", "kids", "lifestyle"],
    createdAt: new Date("2024-02-25T09:50:00Z"),
    updatedAt: new Date("2024-12-08T11:35:00Z"),
    createdBy: "family.content@company.com",
    isBlocklist: false,
  },
]

// Helper functions for generating counts and ranges
export function getClusterStatusCounts() {
  const counts = {
    active: 0,
    inactive: 0,
    draft: 0,
    archived: 0,
  }

  clusterSeeds.forEach((cluster) => {
    counts[cluster.status]++
  })

  return counts
}

export function getClusterTypeCounts() {
  const counts = {
    influencers: 0,
    "micro-influencers": 0,
    "nano-influencers": 0,
    celebrities: 0,
    brands: 0,
    custom: 0,
  }

  clusterSeeds.forEach((cluster) => {
    counts[cluster.type]++
  })

  return counts
}

export function getCreatorCountRange() {
  const counts = clusterSeeds.map((cluster) => cluster.creatorCount)
  return {
    min: Math.min(...counts),
    max: Math.max(...counts),
  }
}

export function getTotalReachRange() {
  const reaches = clusterSeeds.map((cluster) => cluster.totalReach)
  return {
    min: Math.min(...reaches),
    max: Math.max(...reaches),
  }
}

export function getEngagementRateRange() {
  const rates = clusterSeeds.map((cluster) => cluster.avgEngagementRate)
  return {
    min: Math.min(...rates),
    max: Math.max(...rates),
  }
}
