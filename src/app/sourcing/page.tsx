import PageHeader from "@/components/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sourcingData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getBadgeVariant = (status: string) => {
  switch (status) {
    case 'In Stock':
      return 'default';
    case 'Partial Stock':
      return 'secondary';
    case 'Out of Stock':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function SourcingPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Smart Sourcing Engine"
        description="Prioritize sourcing components from internal inventory before initiating external orders."
      />

      <Card>
        <CardHeader>
            <CardTitle>Component Sourcing Plan</CardTitle>
            <CardDescription>Based on upcoming production for BOM-001 (50 units).</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Component ID</TableHead>
                <TableHead>Component Name</TableHead>
                <TableHead className="text-center">Required</TableHead>
                <TableHead className="text-center">Internal Stock</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sourcingData.map((item) => (
                <TableRow key={item.componentId}>
                    <TableCell className="font-mono">{item.componentId}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-center">{item.required}</TableCell>
                    <TableCell className="text-center">{item.internalStock}</TableCell>
                    <TableCell className="text-center">
                    <Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        {item.status === 'In Stock' && <Button variant="ghost" size="sm">Allocate Stock</Button>}
                        {item.status === 'Partial Stock' && <Button asChild variant="outline" size="sm"><Link href="/procurement">Source Externally</Link></Button>}
                        {item.status === 'Out of Stock' && <Button asChild variant="default" size="sm"><Link href="/procurement">Create Purchase Order</Link></Button>}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
