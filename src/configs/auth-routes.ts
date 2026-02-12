import type { RouteType } from "@/types/types"

export const routeMap = new Map<string, RouteType>([
  ["/auth/sign-in", { type: "guest" }],
  ["/auth/sign-up", { type: "guest" }],
  ["/sign-in", { type: "guest" }],
  ["/register", { type: "guest" }],
  ["/forgot-password", { type: "guest" }],
  ["/verify-email", { type: "guest" }],
  ["/new-password", { type: "guest" }],
  // TEMPORARILY CHANGED: Making root path redirect to dashboard
  // ["/", { type: "public" }],
  ["/", { type: "guest" }],
  ["/docs", { type: "public" }],
])
