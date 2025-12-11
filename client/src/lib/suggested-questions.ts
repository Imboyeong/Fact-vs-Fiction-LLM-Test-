import { StudentLevel } from "./student-levels";

export interface SuggestedQuestion {
    id: string;
    question: string;
    answer: string;
    level: StudentLevel;
}

export const SUGGESTED_QUESTIONS: Record<StudentLevel, SuggestedQuestion[]> = {
    middle: [
        {
            id: "middle-1",
            level: "middle",
            question: "지구가 자전해서 낮과 밤이 생긴다는데, 왜 어떤 지역은 밤이 엄청 길거나 짧아져요?",
            answer: "지구는 23.5° 기울어진 채로 태양을 공전하기 때문에, 위도에 따라 낮과 밤 길이가 달라집니다.\n특히 극지방은 백야·극야가 생기고, 우리가 사는 중위도는 변화가 적습니다."
        }
    ],
    high: [
        {
            id: "high-1",
            level: "high",
            question: "조건부확률이랑 베이즈 정리는 어떻게 시험 문제에서 구분해서 사용해야 하나요?",
            answer: "조건부확률은 P(A|B) 형태로 주어진 조건 그대로 계산하는 문제이고,\n베이즈 정리는 P(B|A)를 구해야 할 때 역으로 변환하는 문제에서 사용합니다."
        }
    ],
    university: [
        {
            id: "university-1",
            level: "university",
            question: "리포트에서 2차 출처를 인용할 때 참고문헌에는 어떻게 표기하는 게 맞나요?",
            answer: "학술 스타일에서는 원 논문을 직접 읽지 않았으면 본문에는\n\"Smith(2010, as cited in Kim, 2020)\"\n이렇게 쓰고, 참고문헌에는 Kim(2020)만 기재합니다."
        }
    ]
};

export function getSuggestedQuestions(level: StudentLevel): SuggestedQuestion[] {
    return SUGGESTED_QUESTIONS[level] || [];
}
