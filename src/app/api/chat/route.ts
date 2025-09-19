import { createUIMessageStream, createUIMessageStreamResponse } from "ai"

import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Create a UI Message Stream that transforms the NestJS text stream
    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        try {
          // Forward the request to your NestJS backend
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/chat/stream`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Forward any authorization headers if needed
                ...(req.headers.get("authorization") && {
                  Authorization: req.headers.get("authorization")!,
                }),
              },
              body: JSON.stringify(body),
            }
          )

          if (!response.ok) {
            throw new Error(`Backend responded with ${response.status}`)
          }

          if (!response.body) {
            throw new Error("No response body")
          }

          const reader = response.body.getReader()
          const decoder = new TextDecoder()

          // Write the start message
          writer.write({
            type: "start",
            messageId: `msg-${Date.now()}`,
          })

          // Write text start
          const textId = `text-${Date.now()}`
          writer.write({
            type: "text-start",
            id: textId,
          })

          try {
            while (true) {
              const { done, value } = await reader.read()

              if (done) break

              const chunk = decoder.decode(value, { stream: true })

              // Write text delta for each chunk
              if (chunk) {
                writer.write({
                  type: "text-delta",
                  id: textId,
                  delta: chunk,
                })
              }
            }
          } finally {
            reader.releaseLock()
          }

          // Write text end
          writer.write({
            type: "text-end",
            id: textId,
          })

          // Write finish
          writer.write({
            type: "finish",
          })
        } catch (error) {
          console.error("Error in stream processing:", error)
          writer.write({
            type: "error",
            errorText: error instanceof Error ? error.message : "Unknown error",
          })
        }
      },
    })

    return createUIMessageStreamResponse({ stream })
  } catch (error) {
    console.error("Error in chat proxy:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to proxy chat request",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
