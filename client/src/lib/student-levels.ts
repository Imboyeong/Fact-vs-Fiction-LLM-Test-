export type StudentLevel = "middle" | "high" | "university";

export interface LevelConfig {
  id: StudentLevel;
  label: string;
  description: string;
  tone: string;
  features: string[];
  themeColor: string;
}

export const STUDENT_LEVELS: Record<StudentLevel, LevelConfig> = {
  middle: {
    id: "middle",
    label: "중학생",
    description: "기초 개념 이해와 흥미 유발 중심",
    tone: "친근하고 격려하는 말투, 쉬운 용어 사용",
    features: ["기초 개념 퀴즈", "학습 게임", "칭찬 배지"],
    themeColor: "bg-orange-500",
  },
  high: {
    id: "high",
    label: "고등학생",
    description: "내신 및 수능 대비, 심화 문제 풀이",
    tone: "논리적이고 체계적인 설명, 시험 포인트 강조",
    features: ["오답 노트", "유사 문제 추천", "시간 관리 타이머"],
    themeColor: "bg-blue-600",
  },
  university: {
    id: "university",
    label: "대학생",
    description: "전공 심화, 논문 분석, 연구 지원",
    tone: "전문적이고 학술적인 어조, 참고 문헌 인용",
    features: ["논문 요약", "코드 리뷰", "데이터 분석 도구"],
    themeColor: "bg-slate-800",
  },
};
