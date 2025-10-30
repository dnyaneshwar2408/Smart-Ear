import PageHeader from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { bomsStatus, componentCosts, forecastData } from "@/lib/data";

const bomStatusChartConfig = {
  count: { label: "Count", color: "hsl(var(--chart-1))" },
};
const componentCostChartConfig = {
  cost: { label: "Cost", color: "hsl(var(--chart-2))" },
};
const sourcingChartConfig = {
  internal: { label: "Internal", color: "hsl(var(--chart-1))" },
  external: { label: "External", color: "hsl(var(--chart-2))" },
};

const sourcingData = [
  { name: 'Internal', value: 70, fill: 'var(--color-internal)' },
  { name: 'External', value: 30, fill: 'var(--color-external)' },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Reporting & Analytics"
        description="Generate reports on BOM usage, costs, and sourcing to identify areas for improvement."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>BOM Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={bomStatusChartConfig} className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={bomsStatus} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="status" tickLine={false} axisLine={false} />
                  <YAxis />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sourcing Mix</CardTitle>
            <CardDescription>Internal vs. External component sourcing.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={sourcingChartConfig} className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={sourcingData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} paddingAngle={5}>
                     {sourcingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Component Cost Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={componentCostChartConfig} className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={forecastData.map(d => ({...d, cost: d.footprint * 2.5}))} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="cost" stroke="var(--color-cost)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
                <CardTitle>Top 10 Highest Cost Components</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={componentCostChartConfig} className="h-72 w-full">
                    <ResponsiveContainer>
                        <BarChart data={[...componentCosts, {component: 'Motherboard-Z790', cost: 380}, {component: 'Case-MidTower', cost: 120}, {component: 'Cooler-AIO', cost: 180}]} accessibilityLayer>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="component" tickLine={false} axisLine={false} />
                            <YAxis />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Bar dataKey="cost" fill="var(--color-cost)" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
