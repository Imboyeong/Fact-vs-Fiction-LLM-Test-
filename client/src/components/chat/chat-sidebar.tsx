import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MOCK_SESSIONS } from "@/lib/mock-data";
import { Plus, MessageSquare, MoreHorizontal, Settings, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatSidebar() {
  return (
    <div className="flex h-full w-[260px] flex-col border-r bg-sidebar text-sidebar-foreground hidden md:flex">
      <div className="p-4">
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-heading font-bold text-lg">AI Tutor</span>
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

           <div className="px-2 py-1">
            <h3 className="mb-2 text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">지난 7일</h3>
            <div className="space-y-1">
              {MOCK_SESSIONS.filter(s => s.date === "Previous 7 Days").map((session) => (
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
        </div>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center overflow-hidden">
             <span className="text-xs font-bold">JD</span>
          </div>
          <div className="flex flex-col items-start text-xs">
            <span className="font-medium">홍길동</span>
            <span className="text-muted-foreground">학생 플랜</span>
          </div>
          <Settings className="ml-auto h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
