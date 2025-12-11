import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MOCK_SESSIONS } from "@/lib/mock-data";
import { Plus, MessageSquare, MoreHorizontal, Settings, GraduationCap, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { StudentLevel, STUDENT_LEVELS } from "@/lib/student-levels";

interface ChatSidebarProps {
  currentLevel: StudentLevel;
  onLevelChange: (level: StudentLevel) => void;
}

export function ChatSidebar({ currentLevel, onLevelChange }: ChatSidebarProps) {
  const levelConfig = STUDENT_LEVELS[currentLevel];

  return (
    <div className="flex h-full w-[260px] flex-col border-r bg-sidebar text-sidebar-foreground hidden md:flex">
      <div className="p-4">
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center text-white transition-colors", levelConfig.themeColor)}>
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-heading font-bold text-lg">LLM StudyHub</span>
        </div>

        <Button className="w-full justify-start gap-2 shadow-sm" size="lg">
          <Plus className="h-4 w-4" />
          새로운 채팅
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4">
          <div className="px-2 py-1">
            <h3 className="mb-2 text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">오늘</h3>
            <div className="space-y-1">
              {MOCK_SESSIONS.filter(s => s.date === "Today").map((session) => (
                <Button
                  key={session.id}
                  variant="ghost"
                  className="w-full justify-start text-sm font-normal h-9 px-2 text-muted-foreground hover:text-foreground truncate"
                >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <span className="truncate">{session.title}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="px-2 py-1">
            <h3 className="mb-2 text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">어제</h3>
            <div className="space-y-1">
              {MOCK_SESSIONS.filter(s => s.date === "Yesterday").map((session) => (
                <Button
                  key={session.id}
                  variant="ghost"
                  className="w-full justify-start text-sm font-normal h-9 px-2 text-muted-foreground hover:text-foreground truncate"
                >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <span className="truncate">{session.title}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Info Card - moved to scroll area */}
          <div className="px-2 py-1 mt-4">
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-2 mb-2">
                <div className="h-5 w-5 rounded-full bg-yellow-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-700 text-xs">ℹ</span>
                </div>
                <h4 className="text-xs font-semibold text-yellow-900">컨셉 데모</h4>
              </div>
              <p className="text-[10px] text-yellow-800 leading-relaxed">
                본 페이지는 LLM 모델 비교 실험에서 얻은 인사이트를 바탕으로,
                학생들이 목적에 맞는 모델을 쉽게 선택하고 활용할 수 있도록 돕는 웹 애플리케이션의 컨셉 데모입니다.
                <br /><br />
                자동 모델 추천과 실시간 성능 비교 기능을 통해
                각 모델의 특성을 직관적으로 이해할 수 있으며,
                학습 목표에 가장 적합한 모델을 빠르게 선택할 수 있도록 설계된 테스트용 화면입니다.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t mt-auto space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between px-3 h-12">
              <div className="flex items-center gap-2 text-left">
                <div className={cn("h-6 w-6 rounded-full flex items-center justify-center text-[10px] text-white", levelConfig.themeColor)}>
                  {levelConfig.label[0]}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-semibold">{levelConfig.label} 모드</span>
                  <span className="text-[10px] text-muted-foreground">학습 수준 설정</span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[220px]" align="start">
            <DropdownMenuLabel>학습 단계 선택</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.values(STUDENT_LEVELS).map((level) => (
              <DropdownMenuItem
                key={level.id}
                onClick={() => onLevelChange(level.id)}
                className="flex flex-col items-start gap-1 py-2 cursor-pointer"
              >
                <div className="flex items-center gap-2 font-medium">
                  <span className={cn("h-2 w-2 rounded-full", level.themeColor)} />
                  {level.label}
                </div>
                <span className="text-[10px] text-muted-foreground">{level.description}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" className="w-full justify-start gap-2 h-10">
          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <span className="text-xs font-bold">JD</span>
          </div>
          <div className="flex flex-col items-start text-xs leading-none gap-0.5">
            <span className="font-medium">홍길동</span>
            <span className="text-muted-foreground">내 정보</span>
          </div>
          <Settings className="ml-auto h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
