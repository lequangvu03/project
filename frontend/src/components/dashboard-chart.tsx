'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart'
import { ChartData } from '~/definitions/types'

export const description = 'A multiple line chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export default function DashboardChart({ chartData }: { chartData: ChartData[] }) {
  return (
    <div className='rounded-2xl bg-[var(--secondary-color)] p-4'>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey='desktop' type='monotone' stroke='var(--color-desktop)' strokeWidth={2} dot={false} />
            <Line dataKey='mobile' type='monotone' stroke='var(--color-mobile)' strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </div>
  )
}
