import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StudentLevel, STUDENT_LEVELS } from "@/lib/student-levels";
import { Trophy, Target, TrendingUp, BookOpen, Clock, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface AchievementDashboardProps {
  level: StudentLevel;
}

export function AchievementDashboard({ level }: AchievementDashboardProps) {
  const config = STUDENT_LEVELS[level];

  // Mock data based on level
  const stats = {
    studyTime: "12시간 30분",
    questionsSolved: 42,
    accuracy: 88,
    streak: 5,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Summary Stats */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" /> 이번 주 학습 시간
          </span>
          <span className="text-2xl font-bold">{stats.studyTime}</span>
          <Progress value={65} className="h-1.5" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col gap-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Target className="h-3 w-3" /> 문제 해결 수
          </span>
          <span className="text-2xl font-bold">{stats.questionsSolved}개</span>
          <div className="flex gap-1">
             {level === 'middle' && <Badge variant="secondary" className="text-[10px]">🔥 열정 가득!</Badge>}
             {level === 'high' && <Badge variant="secondary" className="text-[10px]">✍️ 실력 상승</Badge>}
             {level === 'university' && <Badge variant="secondary" className="text-[10px]">🎓 연구 진행</Badge>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col gap-2">
           <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Brain className="h-3 w-3" /> 평균 정확도
          </span>
          <span className="text-2xl font-bold text-green-600">{stats.accuracy}%</span>
          <span className="text-[10px] text-muted-foreground">지난주 대비 +2.4%</span>
        </CardContent>
      </Card>

      {/* Level Specific Card */}
      <Card className={cn("border-l-4", config.themeColor)}>
        <CardContent className="p-4 flex flex-col justify-between h-full">
           <div className="flex justify-between items-start">
             <div>
               <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                 현재 레벨
               </span>
               <h3 className="font-heading font-bold text-lg">{config.label}</h3>
             </div>
             <Trophy className={cn("h-8 w-8 opacity-20", config.themeColor.replace('bg-', 'text-'))} />
           </div>
           
           <div className="mt-2 space-y-1">
             <p className="text-[10px] text-muted-foreground">{config.description}</p>
             <div className="flex flex-wrap gap-1 mt-2">
               {config.features.slice(0, 2).map(f => (
                 <Badge key={f} variant="outline" className="text-[10px] bg-background/50">
                   {f}
                 </Badge>
               ))}
             </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
