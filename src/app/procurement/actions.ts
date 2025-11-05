"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // ✅ Correct import
import { addChangeLogEntry } from "@/lib/changeLogStore";
// ✅ Import from store

const purchaseOrderSchema = z.object({
  component: z.string().min(1, "Component is required."),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  destination: z.string().min(1, "Destination is required."),
});

export type PurchaseOrderState = {
  message?: string;
  errors?: {
    component?: string[];
    quantity?: string[];
    destination?: string[];
  };
};

export async function createPurchaseOrder(
  prevState: PurchaseOrderState,
  formData: FormData
) {
  const validatedFields = purchaseOrderSchema.safeParse({
    component: formData.get("component"),
    quantity: formData.get("quantity"),
    destination: formData.get("destination"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
    };
  }

  const data = validatedFields.data;

  const newLogEntry = {
    id: `CHG-${(Math.random() * 1000).toFixed(0).padStart(3, "0")}`,
    date: new Date().toISOString().split("T")[0],
    user: "Admin User",
    componentId: data.component,
    version: "N/A",
    description: `Purchase order created for ${data.quantity} units for ${data.destination}.`,
  };

  // ✅ Add to mock DB
await addChangeLogEntry(newLogEntry);
revalidatePath("/change-management");
redirect("/procurement/success");


  // ✅ Revalidate the Change Management page
  revalidatePath("/change-management");

  // Redirect to a success page (optional)
  redirect("/procurement/success");
}
