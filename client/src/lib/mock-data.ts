import { StudentLevel } from "./student-levels";

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

export function getInitialGreeting(level: StudentLevel): Message {
  const greetingsByLevel: Record<StudentLevel, string> = {
    middle: `안녕하세요! 저는 LLM StudyHub입니다. 수학, 과학, 문학 등 어떤 과목이든 도와드릴 수 있어요. 😊

**공부하다 궁금한 점이 있으면 물어보세요!**

예를 들면 이런 질문이 있어요:
• 지구가 자전해서 낮과 밤이 생긴다는데, 왜 어떤 지역은 밤이 엄청 길거나 짧아져요?
• 물의 끓는점이 100도인데, 왜 산 위에서는 더 낮은 온도에서 끓나요?
• 소수는 왜 중요한가요? 실생활에서 어디에 쓰이나요?`,
    high: `안녕하세요! 저는 LLM StudyHub입니다. 수학, 과학, 문학 등 어떤 과목이든 도와드릴 수 있어요.

**공부하다 궁금한 점이 있으면 물어보세요!**

예를 들면 이런 질문이 있어요:
• 조건부확률이랑 베이즈 정리는 어떻게 시험 문제에서 구분해서 사용해야 하나요?
• 미분과 적분의 관계를 미적분학의 기본정리로 어떻게 설명하나요?
• 르샤틀리에 원리를 화학 평형 문제에서 어떻게 적용하나요?`,
    university: `안녕하세요! 저는 LLM StudyHub입니다. 수학, 과학, 문학 등 어떤 과목이든 도와드릴 수 있어요.

**공부하다 궁금한 점이 있으면 물어보세요!**

예를 들면 이런 질문이 있어요:
• 리포트에서 2차 출처를 인용할 때 참고문헌에는 어떻게 표기하는 게 맞나요?
• 회귀분석에서 다중공선성이 발생했을 때 어떤 방법으로 해결할 수 있나요?
• 논문 작성 시 연구의 한계점은 어느 섹션에서 어떻게 서술해야 하나요?`,
  };

  return {
    id: "init-1",
    role: "assistant",
    content: greetingsByLevel[level],
    timestamp: new Date(),
  };
}

export async function simulateAIResponse(question: string, level: StudentLevel = "high"): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const responsesByLevel: Record<StudentLevel, string[]> = {
    middle: [
      `'${question}'에 대해 궁금하군요! 아주 좋은 질문이에요! 👍\n\n쉽게 설명해 줄게요. \n\n1. 먼저 가장 중요한 건... \n2. 예를 들어서 생각해보면...\n\n이해되지 않는 부분이 있으면 언제든 다시 물어봐요! 화이팅! 🌱`,
      `와, 정말 재미있는 주제네요! '${question}'은 이렇게 생각하면 쉬워요.\n\n마치 블록을 쌓는 것처럼 하나씩 살펴볼까요?\n\n궁금한 점이 풀렸나요? 더 알고 싶은 게 있다면 말해주세요! 😊`,
    ],
    high: [
      `'${question}'에 대한 답변입니다. 시험에 자주 나오는 핵심 포인트 위주로 설명할게요.\n\n1. 핵심 개념 정의: ...\n2. 문제 풀이 적용: 이 개념은 주로 ~한 유형으로 출제됩니다.\n\n이 부분을 확실히 암기해두는 것이 좋습니다. 추가 예제가 필요하면 말씀해 주세요.`,
      `좋은 질문입니다. '${question}'의 원리를 단계별로 분석해 보겠습니다.\n\n논리적인 흐름은 다음과 같습니다.\n\n따라서 결론은 ~가 됩니다. 오답 노트에 정리해두면 좋겠네요.`,
    ],
    university: [
      `'${question}'에 대한 학술적 관점에서의 분석입니다.\n\n해당 주제는 ~이론에 기반하고 있으며, 최근 연구 동향에 따르면...\n\n참고할 만한 문헌으로는 ~가 있습니다. 더 깊은 논의를 위해 구체적인 파라미터를 설정해 주시면 상세히 답변 드리겠습니다.`,
      `질문하신 '${question}'의 메커니즘을 심층적으로 살펴보겠습니다.\n\n1. 이론적 배경:\n2. 실증적 적용:\n\n이러한 접근법은 ~한 한계점이 존재할 수 있음을 유의해야 합니다.`,
    ],
  };

  const responses = responsesByLevel[level];
  return responses[Math.floor(Math.random() * responses.length)];
}
