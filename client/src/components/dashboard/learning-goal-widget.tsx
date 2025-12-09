import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";

export function LearningGoalWidget() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          학습 목표 추적
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-medium">이번 주 AI 비교 분석하기</span>
            <span className="text-muted-foreground">3/5회</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-medium">오답 노트 작성하기</span>
            <span className="text-muted-foreground">1/3회</span>
          </div>
          <Progress value={33} className="h-2" />
        </div>

        <div className="p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground mt-2">
          💡 <strong>Tip:</strong> 다양한 모델의 답변을 비교하면 비판적 사고력이 향상됩니다.
        </div>
      </CardContent>
    </Card>
  );
}
