import PageHeader from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BomTree } from "./bom-tree";
import { bomTree } from "@/lib/data";

export default function BomVisualizationPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="BOM Visualization"
        description="Explore and validate the Bill of Materials in a hierarchical tree structure."
      />

      <Card>
        <CardHeader>
          <CardTitle>Interactive BOM Tree</CardTitle>
          <CardDescription>Click on items to expand or collapse sub-assemblies. Use the search bar to filter components.</CardDescription>
        </CardHeader>
        <CardContent>
            <BomTree data={bomTree} />
        </CardContent>
      </Card>
    </div>
  );
}
