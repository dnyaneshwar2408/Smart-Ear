import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-3xl font-bold mb-4">✅ Purchase Order Created</h1>
      <p className="mb-8 text-muted-foreground">
        Your purchase order was successfully submitted and logged.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/change-management">View Change Management</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/procurement">Create Another Order</Link>
        </Button>
      </div>
    </div>
  );
}
