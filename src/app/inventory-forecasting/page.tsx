import PageHeader from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { forecastData } from "@/lib/data";

const chartConfig = {
    footprint: {
      label: "Footprint (sq. ft)",
      color: "hsl(var(--chart-1))",
    },
};

export default function InventoryForecastingPage() {
    return (
        <div className="flex flex-col gap-8">
            <PageHeader
                title="Dynamic Inventory Forecasting"
                description="Forecast warehouse footprint requirements based on predicted BOM component needs."
            />

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Forecasting Parameters</CardTitle>
                            <CardDescription>Adjust parameters to generate a new forecast.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bomId">BOM ID / Product Line</Label>
                                <Input id="bomId" placeholder="e.g., PROD-SKATE-V2" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="productionVolume">Projected Production Volume</Label>
                                <Input id="productionVolume" type="number" placeholder="e.g., 10000" />
                            </div>
                            <div className="space-y-2">
                                <Label>Forecast Period</Label>
                                <Calendar mode="range" numberOfMonths={1} className="p-0" />
                            </div>
                            <Button className="w-full">Generate Forecast</Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Peak Footprint</CardTitle>
                            <CardDescription>Maximum required space in the next 12 months.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">450 sq. ft.</p>
                            <p className="text-sm text-muted-foreground">Expected in December 2024</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Warehouse Footprint Forecast (Next 12 Months)</CardTitle>
                            <CardDescription>Projected storage space required for components.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[400px] w-full">
                                <ResponsiveContainer>
                                    <LineChart data={forecastData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="footprint" stroke="var(--color-footprint)" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
