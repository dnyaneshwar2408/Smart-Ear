'use server';

/**
 * @fileOverview Identifies missing components in an mBOM.
 *
 * - identifyMissingComponents - A function that identifies missing components in an mBOM.
 * - IdentifyMissingComponentsInput - The input type for the identifyMissingComponents function.
 * - IdentifyMissingComponentsOutput - The return type for the identifyMissingComponents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyMissingComponentsInputSchema = z.object({
  ebom: z.string().describe('The engineering bill of materials.'),
  mbom: z.string().describe('The manufacturing bill of materials.'),
  cadDrawing: z.string().describe('The CAD drawing as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
});
export type IdentifyMissingComponentsInput = z.infer<typeof IdentifyMissingComponentsInputSchema>;

const IdentifyMissingComponentsOutputSchema = z.object({
  missingComponents: z
    .array(z.string())
    .describe('A list of components missing from the mBOM.'),
  incompleteInformation: z
    .array(z.string())
    .describe('A list of information that is incomplete in the mBOM.'),
});
export type IdentifyMissingComponentsOutput = z.infer<typeof IdentifyMissingComponentsOutputSchema>;

export async function identifyMissingComponents(
  input: IdentifyMissingComponentsInput
): Promise<IdentifyMissingComponentsOutput> {
  return identifyMissingComponentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyMissingComponentsPrompt',
  input: {schema: IdentifyMissingComponentsInputSchema},
  output: {schema: IdentifyMissingComponentsOutputSchema},
  prompt: `You are a manufacturing engineer. You will receive an engineering bill of materials (eBOM), a manufacturing bill of materials (mBOM), and a CAD drawing. Your task is to identify any missing components in the mBOM compared to the eBOM and CAD drawing, as well as any incomplete information in the mBOM. Return a list of missing components and a list of incomplete information.

eBOM:
{{ebom}}

mBOM:
{{mbom}}

CAD Drawing: {{media url=cadDrawing}}

Missing Components:
{{missingComponents}}

Incomplete Information:
{{incompleteInformation}}`,
});

const identifyMissingComponentsFlow = ai.defineFlow(
  {
    name: 'identifyMissingComponentsFlow',
    inputSchema: IdentifyMissingComponentsInputSchema,
    outputSchema: IdentifyMissingComponentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
