"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import type { ChartConfig } from "@/components/ui/chart"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  targetInvitesSent: {
    label: "Target Invites Sent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface TargetInvitesSentChartProps {
  data: Array<{
    month: string
    value: number
  }>
}

export function TargetInvitesSentChart({ data }: TargetInvitesSentChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="value"
          type="natural"
          fill="var(--color-targetInvitesSent)"
          fillOpacity={0.4}
          stroke="var(--color-targetInvitesSent)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}