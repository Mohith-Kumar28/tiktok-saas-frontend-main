import type { RouteType } from "@/types/types"

export const routeMap = new Map<string, RouteType>([
  ["/auth", { type: "guest" }],
  ["/auth", { type: "guest" }],
  ["/sign-in", { type: "guest" }],
  ["/register", { type: "guest" }],
  ["/forgot-password", { type: "guest" }],
  ["/verify-email", { type: "guest" }],
  ["/new-password", { type: "guest" }],
  ["/", { type: "public" }],
  ["/docs", { type: "public" }],
])
