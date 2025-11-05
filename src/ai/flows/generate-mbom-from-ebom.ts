'use server';
/**
 * @fileOverview Converts an engineering BOM (eBOM) to a manufacturing BOM (mBOM), enriching it with assembly details.
 *
 * - generateMBOMFromEBOM - A function that generates an mBOM from an eBOM.
 * - GenerateMBOMFromEBOMInput - The input type for the generateMBOMFromEBOM function.
 * - GenerateMBOMFromEBOMOutput - The return type for the generateMBOMFromEBOM function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMBOMFromEBOMInputSchema = z.object({
  ebomText: z.string().describe('The text content of the eBOM file.'),
});
export type GenerateMBOMFromEBOMInput = z.infer<
  typeof GenerateMBOMFromEBOMInputSchema
>;

const GenerateMBOMFromEBOMOutputSchema = z.object({
  mbom: z.string().describe('The generated mBOM with assembly details.'),
});
export type GenerateMBOMFromEBOMOutput = z.infer<
  typeof GenerateMBOMFromEBOMOutputSchema
>;

export async function generateMBOMFromEBOM(
  input: GenerateMBOMFromEBOMInput
): Promise<GenerateMBOMFromEBOMOutput> {
  // Directly call the flow since we are in a server environment
  // and the 'use server' directive is at the top of the file.
  return await generateMBOMFromEBOMFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMBOMFromEBOMPrompt',
  input: { schema: GenerateMBOMFromEBOMInputSchema },
  prompt: `You are a manufacturing engineer tasked with converting an engineering BOM (eBOM) into a manufacturing BOM (mBOM).

  The eBOM is provided as a file. You should identify any missing information required for manufacturing, such as assembly details, and add them to the mBOM.

eBOM Content:
{{ebomText}}

  Generate the mBOM with all necessary details for manufacturing.
  `,
});

const generateMBOMFromEBOMFlow = ai.defineFlow(
  {
    name: 'generateMBOMFromEBOMFlow',
    inputSchema: GenerateMBOMFromEBOMInputSchema,
    outputSchema: GenerateMBOMFromEBOMOutputSchema,
  },
  async (input) => {
    // Call the prompt and get the raw response data object.
    const result = await prompt(input);

    // Extract the text string from the raw response structure.
    // We found this structure in your first error log.
    const mbomText = result.message.content[0].text;

    // Return the object matching the output schema.
    return { mbom: mbomText };
  }
);