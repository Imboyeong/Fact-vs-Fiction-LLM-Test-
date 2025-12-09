import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle2, FileText, Calculator, Code, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LEARNING_PATHS = {
  essay: {
    title: "논술 및 에세이 작성",
    icon: <FileText className="h-5 w-5" />,
    steps: [
      {
        step: 1,
        title: "아이디어 브레인스토밍",
        model: "gpt-4o",
        desc: "GPT-4o와 대화하며 주제에 대한 다양한 관점을 넓히세요.",
      },
      {
        step: 2,
        title: "개요 및 구조 잡기",
        model: "claude-3-opus",
        desc: "Claude에게 논리적 흐름과 문단 구성을 요청하여 뼈대를 잡으세요.",
      },
      {
        step: 3,
        title: "자료 조사 및 팩트 체크",
        model: "gemini-pro",
        desc: "Gemini를 사용하여 최신 통계와 정확한 사실 관계를 확인하세요.",
      },
      {
        step: 4,
        title: "교정 및 윤문",
        model: "claude-3-opus",
        desc: "작성된 글의 톤앤매너를 다듬고 문법적 오류를 수정하세요.",
      },
    ]
  },
  math: {
    title: "수학 문제 풀이",
    icon: <Calculator className="h-5 w-5" />,
    steps: [
      {
        step: 1,
        title: "문제 이해 및 개념 파악",
        model: "gpt-4o",
        desc: "문제의 핵심 개념이 무엇인지 물어보고 원리를 이해하세요.",
      },
      {
        step: 2,
        title: "유사 문제 풀이",
        model: "gemini-pro",
        desc: "비슷한 유형의 다른 문제들을 요청하여 패턴을 익히세요.",
      },
      {
        step: 3,
        title: "단계별 풀이 검증",
        model: "claude-3-opus",
        desc: "직접 푼 과정을 입력하고 논리적 비약이 없는지 피드백을 받으세요.",
      },
    ]
  },
  coding: {
    title: "프로그래밍 과제",
    icon: <Code className="h-5 w-5" />,
    steps: [
      {
        step: 1,
        title: "알고리즘 설계",
        model: "claude-3-opus",
        desc: "코드를 짜기 전, 슈도코드(Pseudocode)로 로직을 먼저 설계하세요.",
      },
      {
        step: 2,
        title: "코드 구현",
        model: "gpt-4o",
        desc: "설계한 로직을 바탕으로 기본 코드를 구현하세요.",
      },
      {
        step: 3,
        title: "디버깅 및 최적화",
        model: "gemini-pro",
        desc: "에러 로그를 분석하고 코드 성능을 개선할 방법을 찾으세요.",
      },
    ]
  }
};

export function LearningPathPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-heading font-bold">과제 기반 학습 경로</h1>
        <p className="text-muted-foreground">
          과제 유형에 따라 여러 AI 모델을 조합하여 최상의 결과를 얻는 방법을 안내합니다.
        </p>
      </div>

      <Tabs defaultValue="essay" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1">
          {Object.entries(LEARNING_PATHS).map(([key, path]) => (
            <TabsTrigger key={key} value={key} className="py-3 gap-2">
              {path.icon}
              {path.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(LEARNING_PATHS).map(([key, path]) => (
          <TabsContent key={key} value={key} className="mt-8">
            <div className="relative">
              {/* Vertical Line for Timeline */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-muted-foreground/20 hidden md:block" />

              <div className="space-y-6">
                {path.steps.map((step, index) => (
                  <div key={index} className="relative flex flex-col md:flex-row gap-6 group">
                    {/* Step Number Bubble */}
                    <div className="hidden md:flex flex-none z-10">
                      <div className="h-12 w-12 rounded-full bg-background border-2 border-primary text-primary font-bold flex items-center justify-center text-lg shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {step.step}
                      </div>
                    </div>

                    {/* Content Card */}
                    <Card className="flex-1 transition-all duration-300 hover:shadow-md border-l-4 border-l-primary/50">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <Badge variant="outline" className="font-mono">
                            Recommended: {step.model}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                        <Button variant="link" className="px-0 mt-2 h-auto text-primary font-medium">
                          이 단계 시작하기 <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Success Badge at the end */}
              <div className="flex items-center gap-4 mt-8 md:pl-[60px]">
                <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">과제 완성!</h3>
                  <p className="text-sm text-muted-foreground">이 프로세스를 따르면 완성도 높은 결과물을 얻을 수 있습니다.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
