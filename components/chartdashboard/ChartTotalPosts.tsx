"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { type ChartConfig } from "@/components/ui/chart"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "January", posts: 186 },
    { month: "February", posts: 305 },
    { month: "March", posts: 237 },
    { month: "April", posts: 73 },
    { month: "May", posts: 209 },
    { month: "June", posts: 214 },
    { month: "July", posts: 178 },
    { month: "August", posts: 321 },
    { month: "September", posts: 265 },
    { month: "October", posts: 142 },
    { month: "November", posts: 198 },
    { month: "December", posts: 289 },
];
const chartConfig = {
    posts: {
        label: "Posts",
        color: "#2563eb",
        theme: {
            light: "#269aff",
            dark: "hsl(var(--chart-2))",
        },
    },
}
const ChartTotalPosts = () => {
    return (
        <Card className='bg-primary-foreground h-full border-0'>
            <CardHeader>
                <CardTitle>Total Posts</CardTitle>
                <CardDescription>January - December 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[320px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="posts" fill="var(--color-posts)" radius={8}>
                            <LabelList
                                position="top"
                                offset={10}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                        <ChartLegend content={<ChartLegendContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-between flex-row items-center gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total posts for the last 12 months
                </div>
            </CardFooter>
        </Card >
    );
}

export default ChartTotalPosts;
