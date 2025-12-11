import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, ExternalLink, Lightbulb } from "lucide-react";

export interface ReferenceMaterial {
  id: string;
  type: "article" | "video" | "book";
  title: string;
  source: string;
  url: string;
}

const MOCK_REFERENCES: ReferenceMaterial[] = [
  {
    id: "1",
    type: "article",
    title: "미분과 적분의 기본 개념 이해",
    source: "수학의 정석 블로그",
    url: "https://ko.wikipedia.org/wiki/%EB%AF%B8%EC%A0%81%EB%B6%84%ED%95%99",
  },
  {
    id: "2",
    type: "video",
    title: "10분만에 끝내는 미적분 기초",
    source: "Youtube - 수학1타",
    url: "https://youtu.be/7vcHY2a4154?si=Luz15dPlQct-yLat",
  },
  {
    id: "3",
    type: "book",
    title: "개념원리 수학 II",
    source: "교과서 42p - 55p",
    url: "#",
  },
];

export function ReferenceMaterials() {
  return (
    <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <Card className="bg-muted/30 border-dashed">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            추천 학습 자료 및 참고 문헌
          </CardTitle>
          <CardDescription className="text-xs">
            이 문제와 관련된 심화 학습 자료입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {MOCK_REFERENCES.map((ref) => (
            <a
              key={ref.id}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-background rounded-lg border hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  {ref.type === "article" && <FileText className="h-4 w-4" />}
                  {ref.type === "video" && <Video className="h-4 w-4" />}
                  {ref.type === "book" && <BookOpen className="h-4 w-4" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{ref.title}</span>
                  <span className="text-[10px] text-muted-foreground">{ref.source}</span>
                </div>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
