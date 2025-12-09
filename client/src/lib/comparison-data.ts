import { Message } from "./mock-data";

export type ModelId = "gpt-4o" | "gemini-pro" | "claude-3-opus";

export interface ModelStats {
  accuracy: number;
  reliability: number;
  speed: number; // in ms
  hallucinationRate: number;
}

export interface ComparisonResult {
  modelId: ModelId;
  response: string;
  stats: ModelStats;
  errorType?: "hallucination" | "factual_error" | "none";
  hints?: string[];
}

export const MODEL_INFO: Record<ModelId, { name: string; description: string; bestFor: string[] }> = {
  "gpt-4o": {
    name: "GPT-4o",
    description: "Best overall reasoning and creative writing.",
    bestFor: ["Creative Writing", "Complex Reasoning", "Coding"],
  },
  "gemini-pro": {
    name: "Gemini Pro 1.5",
    description: "Excellent at processing large contexts and data.",
    bestFor: ["Data Analysis", "Summarization", "Research"],
  },
  "claude-3-opus": {
    name: "Claude 3.5 Sonnet",
    description: "Highly articulate and safe responses.",
    bestFor: ["Academic Writing", "Nuanced Explanation", "Safety"],
  },
};

export async function simulateComparison(question: string): Promise<ComparisonResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      modelId: "gpt-4o",
      response: "Here is a step-by-step solution for '" + question + "'. \n\n1. Analyze the constraints.\n2. Apply the theorem.\n\nResult: The answer is 42.",
      stats: { accuracy: 98, reliability: 95, speed: 1200, hallucinationRate: 2 },
      errorType: "none",
      hints: ["Think about the core theorem first.", "Check your variables."],
    },
    {
      modelId: "gemini-pro",
      response: "For '" + question + "', consider this data-driven approach. \n\nBased on similar patterns, the outcome tends to be 42.",
      stats: { accuracy: 94, reliability: 92, speed: 800, hallucinationRate: 5 },
      errorType: "none",
      hints: ["Have you looked at the dataset trends?", "Verify the input range."],
    },
    {
      modelId: "claude-3-opus",
      response: "Let's explore the nuances of '" + question + "'. \n\nIt's important to consider the context. In most academic settings, 42 is accepted, but be careful of edge cases.",
      stats: { accuracy: 96, reliability: 97, speed: 1500, hallucinationRate: 1 },
      errorType: "none",
      hints: ["Consider the exceptions to the rule.", "Define your terms clearly."],
    },
  ];
}
