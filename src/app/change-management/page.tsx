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
import { changeLog } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ChangeManagementPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Change Management"
        description="Track and manage all changes to the Bill of Materials with a complete audit trail."
      />
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>BOM Audit Trail</CardTitle>
                    <CardDescription>A log of all modifications made to components and BOMs.</CardDescription>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Filter by component, user..." className="pl-10" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Change ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Component/BOM ID</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {changeLog.map((log) => (
                    <TableRow key={log.id}>
                        <TableCell className="font-mono">{log.id}</TableCell>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="font-mono">{log.componentId}</TableCell>
                        <TableCell>{log.version}</TableCell>
                        <TableCell>{log.description}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
