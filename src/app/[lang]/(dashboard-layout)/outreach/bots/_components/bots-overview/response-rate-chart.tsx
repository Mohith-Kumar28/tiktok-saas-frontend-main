"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import type { ChartConfig } from "@/components/ui/chart"
import type { BotMetricType } from "../../_lib/types"

import { useIsRtl } from "@/hooks/use-is-rtl"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  value: {
    label: "Response Rate",
  },
} satisfies ChartConfig

export function ResponseRateChart({
  data,
}: {
  data: BotMetricType["perMonth"]
}) {
  const isRtl = useIsRtl()

  return (
    <ChartContainer
      config={chartConfig}
      className="h-32 w-full rounded-b-md overflow-hidden"
    >
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 0,
          right: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          reversed={isRtl}
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          hide
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="value"
          type="natural"
          fill="hsl(var(--chart-3))"
          fillOpacity={0.4}
          stroke="hsl(var(--chart-3))"
        />
      </AreaChart>
    </ChartContainer>
  )
}