import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
 
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../@/components/ui/chart"
 
const chartData = [
  { month: "January", regular: 20, early: 5, late: 0, leave: 6 },
  { month: "February", regular: 14, early: 5, late: 2, leave: 1 },
  { month: "March", regular: 10, early: 5, late: 7, leave: 9 },
  { month: "April", regular: 5, early: 14, late: 3, leave: 8 },
  { month: "May", regular: 18, early: 8, late: 0, leave: 5 },
  { month: "June", regular: 16, early: 10, late: 1, leave: 3 },
]
 
const chartConfig = {
  regular: {
    label: "Regular",
    color: "#4C6A92",
  },
  early: {
    label: "Early",
    color: "#FF6F61",
  },
  late: {
    label: "Late",
    color: "#A9D5C1",
  },
  leave: {
    label: "Leave",
    color: "#F9A826",
  }
} satisfies ChartConfig
 
export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="regular" fill="var(--color-regular)" radius={4} />
        <Bar dataKey="early" fill="var(--color-early)" radius={4} />
        <Bar dataKey="late" fill="var(--color-late)" radius={4} />
        <Bar dataKey="leave" fill="var(--color-leave)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}