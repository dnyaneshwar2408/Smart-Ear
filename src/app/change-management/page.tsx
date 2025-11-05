import { getChangeLog } from "@/lib/changeLogStore";

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

export const dynamic = "force-dynamic"; // ✅ ensures revalidatePath works

export default async function ChangeManagementPage() {
  // Fetch latest data (simulating DB query)
  const logs = await getChangeLog();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Change Management"
        description="Track and manage all changes to the Bill of Materials with a complete audit trail."
      />

      <Card>
        <CardHeader>
          <CardTitle>BOM Audit Trail</CardTitle>
          <CardDescription>
            A log of all modifications made to components and BOMs.
          </CardDescription>
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
              {logs.map((log) => (
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
