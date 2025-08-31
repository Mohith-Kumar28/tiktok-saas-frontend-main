"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  ShoppingBag,
  Unlink,
} from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  tikTokControllerDisconnectShopMutation,
  tikTokControllerGetAuthStatusOptions,
  tikTokControllerGetShopInfoOptions,
  tikTokControllerHandleCallbackOptions,
  tikTokControllerInitiateAuthOptions,
  tikTokControllerRefreshTokenMutation,
} from "@/api/gen/@tanstack/react-query.gen"

export default function LinkedServicesPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  // Handle OAuth callback when returning from TikTok authorization
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get("code")
      const state = urlParams.get("state")
      const shop_id = urlParams.get("shop_id")
      const shop_region = urlParams.get("shop_region")

      if (code) {
        try {
          const callbackData = await queryClient.fetchQuery(
            tikTokControllerHandleCallbackOptions({
              body: {
                code,
                ...(state && { state }),
                ...(shop_id && { shop_id }),
                ...(shop_region && { shop_region }),
              },
            })
          )

          // Clear URL parameters after successful callback
          //   window.history.replaceState(
          //     {},
          //     document.title,
          //     window.location.pathname
          //   )

          // Invalidate queries to refresh the UI
          await queryClient.invalidateQueries({
            queryKey: ["tikTokControllerGetAuthStatus"],
          })
          await queryClient.invalidateQueries({
            queryKey: ["tikTokControllerGetShopInfo"],
          })

          toast({
            title: "TikTok Shop Connected!",
            description: `Successfully connected to ${callbackData.shopName || "TikTok Shop"}.`,
          })
        } catch (error) {
          console.error("Failed to handle OAuth callback:", error)
          toast({
            title: "Connection Failed",
            description:
              "Failed to complete TikTok Shop authorization. Please try again.",
            variant: "destructive",
          })
          // Clear URL parameters even on error
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          )
        }
      }
    }

    handleOAuthCallback()
  }, [queryClient, toast])

  // Get authorization status
  const { data: authStatus, isLoading: isLoadingAuthStatus } = useQuery(
    tikTokControllerGetAuthStatusOptions()
  )

  // Get shop info if connected
  const { data: shopInfo, isLoading: isLoadingShopInfo } = useQuery({
    ...tikTokControllerGetShopInfoOptions(),
    enabled: authStatus?.isConnected === true,
  })

  // Disconnect shop mutation
  const disconnectMutation = useMutation({
    ...tikTokControllerDisconnectShopMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tikTokControllerGetAuthStatus"],
      })
      queryClient.invalidateQueries({
        queryKey: ["tikTokControllerGetShopInfo"],
      })
      toast({
        title: "Shop Disconnected",
        description: "Your TikTok Shop has been successfully disconnected.",
      })
    },
    onError: (error) => {
      console.error("Failed to disconnect TikTok Shop:", error)
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect TikTok Shop. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Refresh token mutation
  const refreshTokenMutation = useMutation({
    ...tikTokControllerRefreshTokenMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tikTokControllerGetShopInfo"],
      })
      toast({
        title: "Token Refreshed",
        description: "Your TikTok Shop access token has been refreshed.",
      })
    },
    onError: (error) => {
      console.error("Failed to refresh token:", error)
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh access token. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleConnectTikTokShop = async () => {
    setIsConnecting(true)
    try {
      const data = await queryClient.fetchQuery(
        tikTokControllerInitiateAuthOptions()
      )

      // Open in a new tab
      // window.open(data.authUrl)
      router.push(data.authUrl)
    } catch (error) {
      console.error("Failed to initiate TikTok authorization:", error)
      toast({
        title: "Authorization Failed",
        description:
          "Failed to start TikTok Shop authorization. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnectShop = async () => {
    if (
      window.confirm(
        "Are you sure you want to disconnect your TikTok Shop? This will remove access to your shop data."
      )
    ) {
      await disconnectMutation.mutateAsync({})
    }
  }

  const handleRefreshToken = async () => {
    await refreshTokenMutation.mutateAsync({})
  }

  const isLoading = isLoadingAuthStatus || isLoadingShopInfo
  const isConnected = authStatus?.isConnected === true

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Linked Services</h1>
        <p className="text-muted-foreground">
          Connect and manage your external service integrations
        </p>
      </div>

      <div className="grid gap-4">
        {/* TikTok Shop Integration Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  TikTok Shop
                  {isConnected && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {!isConnected && !isLoading && (
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardTitle>
                <CardDescription>
                  Connect your TikTok Shop to manage products, orders, and
                  analytics
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Loading connection status...
              </div>
            ) : isConnected && shopInfo ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-green-600">Connected</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    Last updated:{" "}
                    {new Date(shopInfo.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shop ID:</span>
                    <span className="font-mono">{shopInfo.shopId}</span>
                  </div>
                  {shopInfo.shopName && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shop Name:</span>
                      <span>{shopInfo.shopName}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="uppercase">{shopInfo.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={
                        shopInfo.isActive ? "text-green-600" : "text-red-600"
                      }
                    >
                      {shopInfo.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Connect your TikTok Shop to access your store data, manage
                products, and track orders directly from your dashboard.
              </div>
            )}
          </CardContent>

          <CardFooter className="flex gap-2">
            {isConnected ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleRefreshToken}
                  disabled={refreshTokenMutation.isPending}
                  startIcon={
                    refreshTokenMutation.isPending ? undefined : "RefreshCw"
                  }
                >
                  {refreshTokenMutation.isPending ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : null}
                  Refresh Token
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDisconnectShop}
                  disabled={disconnectMutation.isPending}
                >
                  {disconnectMutation.isPending ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Unlink className="h-4 w-4" />
                  )}
                  Disconnect
                </Button>
              </>
            ) : (
              <Button onClick={handleConnectTikTokShop} disabled={isConnecting}>
                {isConnecting ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}
                Connect TikTok Shop
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Placeholder for future integrations */}
        <Card className="opacity-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <ShoppingBag className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-muted-foreground">
                  More Integrations
                </CardTitle>
                <CardDescription>
                  Additional e-commerce platform integrations coming soon
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              We&apos;re working on integrations with Shopify, Amazon, and other
              popular e-commerce platforms. Stay tuned for updates!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
