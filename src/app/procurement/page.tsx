import PageHeader from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProcurementMap } from "./map";
import { PurchaseOrderForm } from "./purchase-order-form";

export default function ProcurementPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Create Purchase Order"
        description="Request components from the main warehouse for delivery to a manufacturing station."
      />

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Warehouse & Stations</CardTitle>
            <CardDescription>Select a destination station for the components.</CardDescription>
          </CardHeader>
          <CardContent>
            <PurchaseOrderForm />
          </CardContent>
        </Card>
        
        <div className="lg:sticky lg:top-24">
            <ProcurementMap />
        </div>

      </div>
    </div>
  );
}