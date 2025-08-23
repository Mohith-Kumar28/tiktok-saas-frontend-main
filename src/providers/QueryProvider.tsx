// components/QueryProvider.tsx
"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Create QueryClient inside useState to ensure it's only created once
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, set staleTime > 0 to avoid refetching immediately on client
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
