import PageHeader from "@/components/page-header";
import { ConversionForm } from "./conversion-form";
import { Card, CardContent } from "@/components/ui/card";

export default function BomConversionPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="eBOM to mBOM Conversion"
        description="Automatically convert engineering BOMs to manufacturing BOMs using AI."
      />
      <Card>
        <CardContent className="pt-6">
            <ConversionForm />
        </CardContent>
      </Card>
    </div>
  );
}
