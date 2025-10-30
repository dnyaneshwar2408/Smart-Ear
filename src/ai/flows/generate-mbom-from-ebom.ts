'use server';
/**
 * @fileOverview Converts an engineering BOM (eBOM) to a manufacturing BOM (mBOM), enriching it with assembly details.
 *
 * - generateMBOMFromEBOM - A function that generates an mBOM from an eBOM.
 * - GenerateMBOMFromEBOMInput - The input type for the generateMBOMFromEBOM function.
 * - GenerateMBOMFromEBOMOutput - The return type for the generateMBOMFromEBOM function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMBOMFromEBOMInputSchema = z.object({
  ebomDataUri: z
    .string()
    .describe(
      "The eBOM file (text or CAD) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateMBOMFromEBOMInput = z.infer<typeof GenerateMBOMFromEBOMInputSchema>;

const GenerateMBOMFromEBOMOutputSchema = z.object({
  mbom: z.string().describe('The generated mBOM with assembly details.'),
});
export type GenerateMBOMFromEBOMOutput = z.infer<typeof GenerateMBOMFromEBOMOutputSchema>;

export async function generateMBOMFromEBOM(input: GenerateMBOMFromEBOMInput): Promise<GenerateMBOMFromEBOMOutput> {
  return generateMBOMFromEBOMFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMBOMFromEBOMPrompt',
  input: {schema: GenerateMBOMFromEBOMInputSchema},
  output: {schema: GenerateMBOMFromEBOMOutputSchema},
  prompt: `You are a manufacturing engineer tasked with converting an engineering BOM (eBOM) into a manufacturing BOM (mBOM).

  The eBOM is provided as a file. You should identify any missing information required for manufacturing, such as assembly details, and add them to the mBOM.

eBOM File: {{media url=ebomDataUri}}

  Generate the mBOM with all necessary details for manufacturing.
  `,
});

const generateMBOMFromEBOMFlow = ai.defineFlow(
  {
    name: 'generateMBOMFromEBOMFlow',
    inputSchema: GenerateMBOMFromEBOMInputSchema,
    outputSchema: GenerateMBOMFromEBOMOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
