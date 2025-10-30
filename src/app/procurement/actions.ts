"use server";

import { z } from "zod";
import { redirect } from 'next/navigation'
import { changeLog } from "@/lib/data";

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

export async function createPurchaseOrder(prevState: PurchaseOrderState, formData: FormData) {
    const validatedFields = purchaseOrderSchema.safeParse({
        component: formData.get('component'),
        quantity: formData.get('quantity'),
        destination: formData.get('destination'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed. Please check the fields.",
        };
    }
    
    // Here you would typically perform the database operation,
    // call an external API, etc. For this demo, we'll add it to our mock data.
    console.log("Creating purchase order:", validatedFields.data);

    const newLogEntry = {
        id: `CHG-${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        user: 'Admin User',
        componentId: validatedFields.data.component,
        version: 'N/A',
        description: `Purchase order created for ${validatedFields.data.quantity} units for ${validatedFields.data.destination}.`
    };

    // Add to the beginning of the log
    changeLog.unshift(newLogEntry);

    // For this example, we'll just redirect to a success page.
    redirect('/procurement/success');
}
