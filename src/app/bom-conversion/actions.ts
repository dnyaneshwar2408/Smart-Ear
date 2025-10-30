"use server";

import { generateMBOMFromEBOM, GenerateMBOMFromEBOMInput } from "@/ai/flows/generate-mbom-from-ebom";
import { identifyMissingComponents, IdentifyMissingComponentsInput } from "@/ai/flows/identify-missing-components";
import { z } from "zod";

const ebomSchema = z.object({
  ebomDataUri: z.string(),
});

const componentIdSchema = z.object({
    ebom: z.string(),
    mbom: z.string(),
});

export async function performEBOMConversion(input: GenerateMBOMFromEBOMInput) {
  const validatedInput = ebomSchema.safeParse(input);
  if (!validatedInput.success) {
    throw new Error("Invalid input for eBOM conversion.");
  }

  try {
    const result = await generateMBOMFromEBOM(validatedInput.data);
    return result;
  } catch (error) {
    console.error("Error in generateMBOMFromEBOM flow:", error);
    throw new Error("Failed to generate mBOM from eBOM.");
  }
}

export async function performComponentIdentification(input: IdentifyMissingComponentsInput) {
    const validatedInput = componentIdSchema.safeParse(input);
    if (!validatedInput.success) {
        throw new Error("Invalid input for component identification.");
    }

    try {
        const result = await identifyMissingComponents(validatedInput.data);
        return result;
    } catch (error) {
        console.error("Error in identifyMissingComponents flow:", error);
        throw new Error("Failed to identify missing components.");
    }
}
