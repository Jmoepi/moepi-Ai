"use server";

import { aiChatAssistant } from "@/ai/flows/ai-chat-assistant";

export async function getAiChatResponse(
  query: string,
  portfolioDescription: string,
  projectDescriptions: string
): Promise<string> {
  try {
    const result = await aiChatAssistant({
      query,
      portfolioDescription,
      projectDescriptions,
    });
    return result.response;
  } catch (error) {
    console.error("Error in AI chat assistant:", error);
    return "Sorry, I encountered an error and can't respond right now.";
  }
}
