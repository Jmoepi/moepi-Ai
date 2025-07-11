'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a TL;DR (Too Long; Didn't Read) summary
 * for a given project description using AI.
 *
 * @exports generateTLDR - An asynchronous function that takes a project description and returns a TLDR summary.
 * @exports GenerateTLDRInput - The input type for the generateTLDR function.
 * @exports GenerateTLDROutput - The output type for the generateTLDR function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow.
const GenerateTLDRInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The full description of the project to summarize.'),
});
export type GenerateTLDRInput = z.infer<typeof GenerateTLDRInputSchema>;

// Define the output schema for the flow.
const GenerateTLDROutputSchema = z.object({
  tldrSummary: z
    .string()
    .describe('A concise TL;DR summary of the project description.'),
});
export type GenerateTLDROutput = z.infer<typeof GenerateTLDROutputSchema>;

/**
 * Asynchronously generates a TLDR summary for a given project description.
 *
 * @param {GenerateTLDRInput} input - An object containing the project description.
 * @returns {Promise<GenerateTLDROutput>} - A promise that resolves to an object containing the TLDR summary.
 */
export async function generateTLDR(input: GenerateTLDRInput): Promise<GenerateTLDROutput> {
  return generateTLDRFlow(input);
}

// Define the prompt for generating the TLDR summary.
const generateTLDRPrompt = ai.definePrompt({
  name: 'generateTLDRPrompt',
  input: {schema: GenerateTLDRInputSchema},
  output: {schema: GenerateTLDROutputSchema},
  prompt: `You are an AI expert in creating concise "Too Long; Didn't Read" (TLDR) summaries.

  Given the following project description, generate a TLDR summary that captures the essence of the project in a short, easily understandable format.

  Project Description: {{{projectDescription}}}

  TLDR Summary:`, // Ensure the output is a single, concise paragraph.
});

// Define the Genkit flow for generating the TLDR summary.
const generateTLDRFlow = ai.defineFlow(
  {
    name: 'generateTLDRFlow',
    inputSchema: GenerateTLDRInputSchema,
    outputSchema: GenerateTLDROutputSchema,
  },
  async input => {
    const {output} = await generateTLDRPrompt(input);
    return output!;
  }
);
