"use client"

import ChatBotDemo from "@/components/ai-elements/ai-chatbot"
import { Shell } from "@/components/shell"

export default function AIChatPage() {
  return (
    <Shell className="h-[90vh]">
      <ChatBotDemo />
    </Shell>
  )
}
