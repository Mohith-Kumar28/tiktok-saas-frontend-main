import type { DirectionType, LocaleType } from "@/types/types"
import type { Session } from "next-auth"
import type { ReactNode } from "react"

import { SettingsProvider } from "@/contexts/settings-context"
import { SidebarProvider } from "@/components/ui/sidebar"
import QueryProvider from "./QueryProvider"
import { BetterAuthUIProvider } from "./better-auth-ui-provider"
import { DirectionProvider } from "./direction-provider"
import { ModeProvider } from "./mode-provider"
import { NextAuthProvider } from "./next-auth-provider"
import { NuqsProvider } from "./nuqs/nuqs-main-provider"
import { ThemeProvider } from "./theme-provider"

export function Providers({
  session,
  locale,
  direction,
  children,
}: Readonly<{
  session: Session | null
  locale: LocaleType
  direction: DirectionType
  children: ReactNode
}>) {
  return (
    <SettingsProvider locale={locale}>
      <ModeProvider>
        <ThemeProvider>
          <NuqsProvider>
            <DirectionProvider direction={direction}>
              <NextAuthProvider session={session}>
                <QueryProvider>
                  <BetterAuthUIProvider>
                    <SidebarProvider>{children}</SidebarProvider>
                  </BetterAuthUIProvider>
                </QueryProvider>
              </NextAuthProvider>
            </DirectionProvider>
          </NuqsProvider>
        </ThemeProvider>
      </ModeProvider>
    </SettingsProvider>
  )
}
