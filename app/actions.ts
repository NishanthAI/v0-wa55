"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function processPrompt(prompt: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompt,
      maxTokens: 500,
    })

    return text
  } catch (error) {
    console.error("Error processing prompt:", error)
    throw new Error("Failed to process your prompt")
  }
}
