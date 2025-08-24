import {
  magicLinkClient,
  multiSessionClient,
  passkeyClient,
  usernameClient,
} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: "http://localhost:8000", // The base URL of your auth server
  plugins: [
    passkeyClient(),
    magicLinkClient(),
    multiSessionClient(),
    usernameClient(),
  ],
})
