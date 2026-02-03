"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ITripChartData {
  trip: string;
  travelers: number;
}

const chartConfig = {
  travelers: {
    label: "Travelers",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TripStatchart({ chartData }: { chartData: ITripChartData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Popularity</CardTitle>
        <CardDescription>Total travelers per trip</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[100px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical" // <--- KEY CHANGE: Sets layout to horizontal bars
            margin={{
              left: 0, // Adjust this if labels are still getting cut off
            }}
          >
            <CartesianGrid horizontal={false} />

            {/* YAxis becomes the Category (Names) */}
            <YAxis
              dataKey="trip"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              width={150} // <--- KEY CHANGE: Reserve more width for long text
              // Optional: Truncate if still too long
              tickFormatter={(value) =>
                value.length > 30 ? `${value.slice(0, 30)}...` : value
              }
            />

            {/* XAxis becomes the Number */}
            <XAxis dataKey="travelers" type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="travelers"
              fill="var(--color-travelers)"
              radius={5}
              barSize={32}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
