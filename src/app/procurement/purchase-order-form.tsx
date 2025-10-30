"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createPurchaseOrder, PurchaseOrderState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { componentCosts } from "@/lib/data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState: PurchaseOrderState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Submit Purchase Request
    </Button>
  );
}

export function PurchaseOrderForm() {
  const [state, formAction] = useFormState(createPurchaseOrder, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.errors) {
        toast({
            variant: "destructive",
            title: "Error Creating Order",
            description: state.message,
        })
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
      {state.message && state.errors && (
         <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Request Failed</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="component">Component</Label>
        <Select name="component">
          <SelectTrigger>
            <SelectValue placeholder="Select a component" />
          </SelectTrigger>
          <SelectContent>
            {componentCosts.map((c) => (
              <SelectItem key={c.component} value={c.component}>{c.component}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.errors?.component && <p className="text-sm text-destructive">{state.errors.component[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" name="quantity" type="number" placeholder="e.g., 100" />
        {state.errors?.quantity && <p className="text-sm text-destructive">{state.errors.quantity[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <Select name="destination">
          <SelectTrigger>
            <SelectValue placeholder="Select a destination station" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="station-a">Station A</SelectItem>
            <SelectItem value="station-b">Station B</SelectItem>
            <SelectItem value="station-c">Station C</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.destination && <p className="text-sm text-destructive">{state.errors.destination[0]}</p>}
      </div>

      <SubmitButton />
    </form>
  );
}