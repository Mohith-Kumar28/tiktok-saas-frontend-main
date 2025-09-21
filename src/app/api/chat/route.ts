// // app/api/chat/route.ts (Next.js App Router)

// import { createUIMessageStream, createUIMessageStreamResponse } from "ai"

// import type { NextRequest } from "next/server"

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()

//     const backendRes = await fetch(
//       `${process.env.BACKEND_URL}/api/v1/chat/stream`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(req.headers.get("authorization") && {
//             Authorization: req.headers.get("authorization")!,
//           }),
//         },
//         body: JSON.stringify(body),
//       }
//     )

//     if (!backendRes.ok) {
//       const text = await backendRes.text()
//       return new Response(
//         JSON.stringify({
//           error: `Backend error: ${backendRes.status}`,
//           details: text,
//         }),
//         {
//           status: backendRes.status,
//           headers: { "Content-Type": "application/json" },
//         }
//       )
//     }

//     if (!backendRes.body) {
//       return new Response(
//         JSON.stringify({
//           error: "No response body from backend",
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       )
//     }

//     const stream = createUIMessageStream({
//       execute: async ({ writer }) => {
//         const reader = backendRes.body!.getReader()
//         const decoder = new TextDecoder()

//         // Optionally write "start" event
//         writer.write({
//           type: "start",
//           messageId: `msg-${Date.now()}`,
//         })

//         const textId = `text-${Date.now()}`
//         writer.write({
//           type: "text-start",
//           id: textId,
//         })

//         try {
//           while (true) {
//             const { done, value } = await reader.read()
//             if (done) break
//             const chunk = decoder.decode(value, { stream: true })
//             if (chunk) {
//               writer.write({
//                 type: "text-delta",
//                 id: textId,
//                 delta: chunk,
//               })
//             }
//           }
//         } finally {
//           reader.releaseLock()
//         }

//         writer.write({
//           type: "text-end",
//           id: textId,
//         })
//         writer.write({
//           type: "finish",
//         })
//       },
//     })

//     return createUIMessageStreamResponse({ stream })
//   } catch (error) {
//     console.error("Error in chat proxy:", error)
//     return new Response(
//       JSON.stringify({
//         error: "Failed to proxy chat request",
//         message: error instanceof Error ? error.message : "Unknown error",
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     )
//   }
// }

import { google } from "@ai-sdk/google"
import { convertToModelMessages, streamText, tool } from "ai"
import z from "zod"

import type { UIMessage } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const {
    messages,
    // model,
    // webSearch,
  }: {
    messages: UIMessage[]
    model: string
    webSearch: boolean
  } = await req.json()

  const result = streamText({
    model: google("gemini-2.5-pro"),
    messages: convertToModelMessages(messages),
    providerOptions: {
      google: {
        thinkingConfig: {
          // thinkingBudget: 8192,
          includeThoughts: true,
        },
      },
    },
    // system: `You are a helpful TikTok assistant that can help users with TikTok-related tasks.
    //     You can provide information about TikTok users, videos, trends, and analytics.
    //     Always be friendly, informative, and focused on TikTok-related queries.
    //     When using tools, explain what you're doing and provide clear, actionable insights. and keep the responses in visual format and gui, Like you can use tables, graphs, or something else to make it more visual`,
    tools: {
      // ...(webSearch && {
      // google_search: google.tools.googleSearch({}),
      // }),
      urlContext: google.tools.urlContext({}),

      getWeather: tool({
        description: "Get the weather for a location",
        inputSchema: z.object({
          city: z.string().describe("The city to get the weather for"),
          unit: z
            .enum(["C", "F"])
            .optional()
            .describe("The unit to display the temperature in"),
        }),
        execute: async ({ city, unit }) => {
          const weather = {
            value: 24,
            description: "Sunny",
          }

          return `It is currently ${weather.value}°${unit} and ${weather.description} in ${city}!`
        },
      }),
    },
  })

  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  })
}
