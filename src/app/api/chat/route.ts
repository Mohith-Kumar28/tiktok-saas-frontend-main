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

import { openai } from "@ai-sdk/openai"
import {
  convertToModelMessages,
  experimental_createMCPClient,
  smoothStream,
  stepCountIs,
  streamText,
  tool,
} from "ai"
import { z } from "zod"

import type { InferUITools, ToolSet, UIDataTypes, UIMessage } from "ai"

import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"

// You can also connect to StreamableHTTP MCP servers
const httpTransport = new StreamableHTTPClientTransport(
  new URL("https://mcp.context7.com/mcp")
)
const httpClient = await experimental_createMCPClient({
  transport: httpTransport,
})

// Initialize an MCP client to connect to a `stdio` MCP server:
const transport = new StdioClientTransport({
  // command: "node",
  // args: [
  //   "/Users/mohithkumar/Developer/personal/tiktok/tiktok-api-mcp/generated-mcp-server/build/index.js",
  // ],
  command: "npx",
  args: ["-y", "apidog-mcp-server@latest", "--site-id=758126"],
})

const stdioClient = await experimental_createMCPClient({
  transport,
})

const context7_tools = await httpClient.tools()
const tiktok_tools = await stdioClient.tools()

const tools = {
  ...context7_tools,
  ...tiktok_tools,
  web_search: openai.tools.webSearch(),
  getWeather: tool({
    description: "Get the weather for a location",
    inputSchema: z.object({
      city: z.string().describe("The city to get the weather for"),
      unit: z
        .enum(["C", "F"])
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
} satisfies ToolSet

export type ChatTools = InferUITools<typeof tools>

export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>

export async function POST(req: Request) {
  const { messages }: { messages: ChatMessage[] } = await req.json()

  const result = streamText({
    model: openai("gpt-5-nano"),
    providerOptions: {
      openai: {
        reasoningEffort: "low",
        reasoningSummary: "auto",
      },
    },
    system: "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(20),
    experimental_transform: smoothStream(),
    tools,
  })

  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendFinish: true,
    sendReasoning: true,
    sendStart: true,
  })
}
