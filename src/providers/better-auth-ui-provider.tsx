"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"

import type { ReactNode } from "react"

import { authClient } from "@/lib/auth-client"

export function BetterAuthUIProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh()
      }}
      Link={Link}
    >
      {children}
    </AuthUIProvider>
  )
}
