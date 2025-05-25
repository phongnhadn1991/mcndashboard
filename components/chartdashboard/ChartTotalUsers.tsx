"use client"
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "admins", Users: 275, fill: "hsl(var(--chart-5)" },
    { browser: "editors", Users: 200, fill: "hsl(var(--chart-2)" },
    { browser: "users", Users: 287, fill: "hsl(var(--chart-3)" },
]
const chartConfig = {
    Users: {
        label: "Users",
    },
    admins: {
        label: "Admins",
        color: "hsl(var(--chart-5)",
    },
    editors: {
        label: "Editors",
        color: "hsl(var(--chart-2)",
    },
    users: {
        label: "Users",
        color: "hsl(var(--chart-3)",
    }
} satisfies ChartConfig
export function ChartTotalUsers() {
    const totalUsers = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.Users, 0)
    }, [])
    return (
        <Card className="bg-primary-foreground flex flex-col h-full border-0">
            <CardHeader className="items-center pb-0">
                <CardTitle>Total Users</CardTitle>
                <CardDescription>January - December 2025</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="Users"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={2}
                            label
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalUsers.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Users
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                        <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total Users for the last 12 months
                </div>
            </CardFooter>
        </Card>
    )
}