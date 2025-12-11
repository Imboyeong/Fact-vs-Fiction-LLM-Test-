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
    description: "전반적인 추론 능력과 창의적 글쓰기에 가장 뛰어납니다.",
    bestFor: ["창의적 글쓰기", "복합 추론", "코딩"],
  },
  "gemini-pro": {
    name: "Gemini 2.0 Flash",
    description: "방대한 데이터 처리와 분석에 탁월합니다.",
    bestFor: ["데이터 분석", "요약", "리서치"],
  },
  "claude-3-opus": {
    name: "Claude 4.5 Sonnet",
    description: "매우 논리정연하며 안전한 답변을 제공합니다.",
    bestFor: ["학술적 글쓰기", "섬세한 설명", "안전성"],
  },
};

export async function simulateComparison(question: string): Promise<ComparisonResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      modelId: "gpt-4o",
      response: "'" + question + "'에 대한 단계별 해결 방법입니다. \n\n1. 제약 조건을 분석하세요.\n2. 관련 정리를 적용하세요.\n\n결론: 답은 42입니다.",
      stats: { accuracy: 98, reliability: 95, speed: 1200, hallucinationRate: 2 },
      errorType: "none",
      hints: ["핵심 정리를 먼저 생각해보세요.", "변수를 다시 확인해보세요."],
    },
    {
      modelId: "gemini-pro",
      response: "'" + question + "'에 대해 데이터 기반으로 접근해 보겠습니다. \n\n유사한 패턴을 분석했을 때, 결과는 대략 42로 수렴합니다.",
      stats: { accuracy: 94, reliability: 92, speed: 800, hallucinationRate: 5 },
      errorType: "none",
      hints: ["데이터셋의 경향성을 보셨나요?", "입력 범위를 검증하세요."],
    },
    {
      modelId: "claude-3-opus",
      response: "'" + question + "'의 미묘한 차이를 살펴보겠습니다. \n\n문맥을 고려하는 것이 중요합니다. 학술적으로는 42가 통용되지만, 예외 상황을 주의해야 합니다.",
      stats: { accuracy: 96, reliability: 97, speed: 1500, hallucinationRate: 1 },
      errorType: "none",
      hints: ["규칙의 예외를 고려하세요.", "용어를 명확히 정의하세요."],
    },
  ];
}
