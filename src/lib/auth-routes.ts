import { routeMap } from "@/configs/auth-routes"

const getBasePath = (route: string): string => {
  // First, check if the exact route exists in the routeMap
  if (routeMap.has(route)) {
    return route
  }

  // If not, try to find the longest matching prefix
  const routeKeys = Array.from(routeMap.keys())
  const matchingRoutes = routeKeys.filter((key) => route.startsWith(key))

  if (matchingRoutes.length > 0) {
    // Return the longest matching route
    return matchingRoutes.reduce((longest, current) =>
      current.length > longest.length ? current : longest
    )
  }

  // Fallback: extract base path using slash logic for unmapped routes
  const secondSlash = route.indexOf("/", 1)
  return secondSlash === -1 ? route : route.substring(0, secondSlash)
}

function isRouteType(route: string, type: string) {
  const basePath = getBasePath(route)
  const routeInfo = routeMap.get(basePath)

  // Check if route exists and matches the desired type
  if (routeInfo && routeInfo.type === type) {
    // Return false if route matches any exception, otherwise true.
    if (routeInfo.exceptions) {
      return !routeInfo.exceptions.some((exception) =>
        route.startsWith(exception)
      )
    }
    return true
  }

  // If no matching route, return false
  return false
}

export function isPublicRoute(route: string) {
  return isRouteType(route, "public")
}

export function isGuestRoute(route: string) {
  return isRouteType(route, "guest")
}
