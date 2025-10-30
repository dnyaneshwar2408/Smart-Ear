import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ProcurementSuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 dark:bg-green-900 rounded-full p-3 w-fit">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="mt-4">Purchase Order Created</CardTitle>
          <CardDescription>
            Your request has been successfully submitted to the main warehouse.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">You can track the status of your procurement request in the Change Management log.</p>
            <div className="flex gap-4 justify-center">
                <Button asChild>
                    <Link href="/procurement">Create Another Order</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/">Return to Dashboard</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}