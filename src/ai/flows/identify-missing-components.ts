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
  prompt: `You are a manufacturing engineer. You will receive an engineering bill of materials (eBOM) and a manufacturing bill of materials (mBOM). Your task is to identify any missing components in the mBOM compared to the eBOM, as well as any incomplete information in the mBOM.

Your response MUST be a valid JSON object with two keys: "missingComponents" (an array of strings) and "incompleteInformation" (an array of strings).

eBOM: 
{{ebom}}

mBOM:
{{mbom}}
`,
});

const identifyMissingComponentsFlow = ai.defineFlow(
  {
    name: 'identifyMissingComponentsFlow',
    inputSchema: IdentifyMissingComponentsInputSchema,
    outputSchema: IdentifyMissingComponentsOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    // The ollama plugin returns a complex object. We need to extract the text content.
    // Based on the error logs, the text is in message.content[0].text.
    const rawText = (llmResponse as any).message.content[0].text;
    // The ollama plugin is smart and auto-parses JSON responses.
    // The text content we need is already a JavaScript object.
    const parsedResponse = (llmResponse as any).message.content[0].text;

    try {
      // The model might wrap the JSON in markdown, so we extract it.
      const jsonText = rawText.match(/```json\n([\s\S]*?)\n```/)?.[1] ?? rawText;
      const parsed = JSON.parse(jsonText);
      return IdentifyMissingComponentsOutputSchema.parse(parsed);
      // We just need to validate the object against our schema.
      return IdentifyMissingComponentsOutputSchema.parse(parsedResponse);
    } catch (e) {
      console.error("Failed to parse LLM response as JSON:", rawText);
      console.error("LLM response did not match schema:", parsedResponse, e);
      // Return a default error state if parsing fails
      return { missingComponents: ["Failed to parse AI response."], incompleteInformation: [] };
    }
  }
);
