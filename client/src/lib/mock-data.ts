export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export const MOCK_SESSIONS = [
  {
    id: "1",
    title: "양자 물리학 기초 질문",
    date: "Today",
  },
  {
    id: "2",
    title: "선형대수학 시험 준비",
    date: "Yesterday",
  },
  {
    id: "3",
    title: "역사 에세이 개요 작성",
    date: "Previous 7 Days",
  },
];

export const INITIAL_GREETING: Message = {
  id: "init-1",
  role: "assistant",
  content: "안녕하세요! 저는 AI 학습 도우미입니다. 수학, 과학, 문학 등 어떤 과목이든 도와드릴 수 있어요. 오늘 공부할 내용은 무엇인가요?",
  timestamp: new Date(),
};

export async function simulateAIResponse(question: string): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const responses = [
    "'" + question + "'에 대한 흥미로운 질문이네요. 차근차근 설명해 드릴게요. \n\n먼저 관련된 기본 원리부터 살펴볼 필요가 있습니다...",
    "이 문제를 해결하기 위해 다음 공식을 적용해 볼 수 있습니다. \n\n1. 첫 번째로 변수를 확인하세요.\n2. 그 다음 방정식을 세워보세요.\n\n이해 되시나요?",
    "질문하신 내용을 요약하면 다음과 같습니다: " + question + ". \n\n이 분야에서 자주 다루는 주제인데요, 핵심 개념은 바로...",
    "물론 도와드릴 수 있죠! " + question + "에는 몇 가지 중요한 요소가 포함되어 있습니다. 하나씩 살펴봅시다.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
