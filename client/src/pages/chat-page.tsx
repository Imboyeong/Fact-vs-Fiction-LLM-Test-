import { useState, useRef, useEffect } from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { MessageBubble } from "@/components/chat/message-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, Sparkles, LayoutDashboard, LineChart } from "lucide-react";
import { INITIAL_GREETING, simulateAIResponse, type Message } from "@/lib/mock-data";
import { simulateComparison, type ComparisonResult } from "@/lib/comparison-data";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ComparisonCard } from "@/components/comparison/comparison-card";
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard";
import { ModelRecommender } from "@/components/recommendation/model-recommender";
import { StudentLevel } from "@/lib/student-levels";
import { AchievementDashboard } from "@/components/dashboard/achievement-dashboard";

export default function ChatPage() {
  const [mode, setMode] = useState<"chat" | "compare" | "dashboard">("chat");
  const [level, setLevel] = useState<StudentLevel>("high");
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const [lastQuestion, setLastQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState("gpt-4o");
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, comparisonResults, isLoading]);

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);
    
    if (mode === "chat") {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const responseText = await simulateAIResponse(content, level);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: responseText,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Failed to get response", error);
      }
    } else {
      // Comparison Mode logic
      setLastQuestion(content);
      setComparisonResults([]); // Clear previous
      try {
        const results = await simulateComparison(content);
        setComparisonResults(results);
      } catch (error) {
        console.error("Failed to get comparison", error);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar - Desktop */}
      <ChatSidebar currentLevel={level} onLevelChange={setLevel} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        
        {/* Header */}
        <header className="h-14 border-b flex items-center justify-between px-4 bg-background/50 backdrop-blur-sm sticky top-0 z-10 gap-4">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[260px]">
                <ChatSidebar currentLevel={level} onLevelChange={setLevel} />
              </SheetContent>
            </Sheet>
            <span className="font-heading font-bold hidden sm:inline">AI 튜터</span>
          </div>

          <div className="flex-1 flex justify-center">
            <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">채팅</TabsTrigger>
                <TabsTrigger value="compare">비교 모드</TabsTrigger>
                <TabsTrigger value="dashboard" className="hidden sm:inline-flex">성취도</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {mode === "chat" && (
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-[180px] h-9 border-none bg-muted/50 hover:bg-muted/80 focus:ring-0">
                  <SelectValue placeholder="모델 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro 1.5</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3.5 Sonnet</SelectItem>
                </SelectContent>
              </Select>
            )}
             <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMode("dashboard")}>
               <LineChart className="h-5 w-5" />
             </Button>
             <Button variant="ghost" size="sm" className="hidden md:flex text-muted-foreground hover:text-primary">
               <Sparkles className="mr-2 h-4 w-4" />
               업그레이드
             </Button>
          </div>
        </header>

        {/* Content Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-muted/10">
          <div className="max-w-5xl mx-auto pb-4 h-full">
            
            {/* Always show achievement dashboard in dashboard mode OR small summary in chat mode if needed (skipping for clean UI) */}
            {mode === "dashboard" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold">나의 학습 현황</h2>
                <AchievementDashboard level={level} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Placeholder for detailed charts */}
                  <div className="h-[300px] bg-card rounded-xl border p-6 flex flex-col items-center justify-center text-muted-foreground">
                    <LineChart className="h-10 w-10 mb-4 opacity-20" />
                    <p>과목별 성취도 그래프가 여기에 표시됩니다.</p>
                  </div>
                   <div className="h-[300px] bg-card rounded-xl border p-6 flex flex-col items-center justify-center text-muted-foreground">
                    <LayoutDashboard className="h-10 w-10 mb-4 opacity-20" />
                    <p>오답 노트 및 약점 분석이 여기에 표시됩니다.</p>
                  </div>
                </div>
              </div>
            )}
            
            {mode === "chat" && (
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex w-full gap-3 p-4">
                     <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center animate-pulse">
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                     </div>
                     <div className="space-y-2 pt-2">
                        <div className="h-2 w-24 bg-muted rounded animate-pulse" />
                        <div className="h-2 w-16 bg-muted rounded animate-pulse" />
                     </div>
                  </div>
                )}
              </div>
            )} 
            
            {mode === "compare" && (
              <div className="space-y-8 min-h-full flex flex-col justify-center">
                {!lastQuestion && !isLoading ? (
                  <div className="text-center text-muted-foreground py-20">
                    <LayoutDashboard className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-medium">모델 비교 준비 완료</h3>
                    <p className="text-sm">질문을 입력하면 GPT-4o, Gemini, Claude가 동시에 답변하고 성능을 비교합니다.</p>
                  </div>
                ) : (
                  <>
                     {lastQuestion && (
                       <div className="text-center mb-8">
                         <h2 className="text-xl font-heading font-semibold text-foreground">"{lastQuestion}"</h2>
                         <ModelRecommender question={lastQuestion} />
                       </div>
                     )}

                     {isLoading ? (
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         {[1, 2, 3].map((i) => (
                           <div key={i} className="h-[300px] rounded-xl border bg-card p-4 space-y-4">
                             <div className="flex items-center gap-3">
                               <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                               <div className="space-y-2">
                                 <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                                 <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                               </div>
                             </div>
                             <div className="space-y-2 pt-4">
                               <div className="h-4 w-full bg-muted animate-pulse rounded" />
                               <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                               <div className="h-4 w-4/6 bg-muted animate-pulse rounded" />
                             </div>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         {comparisonResults.map((result) => (
                           <ComparisonCard key={result.modelId} result={result} />
                         ))}
                       </div>
                     )}

                     {!isLoading && comparisonResults.length > 0 && (
                       <AnalyticsDashboard results={comparisonResults} />
                     )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Area - Hide in Dashboard mode */}
        {mode !== "dashboard" && (
          <div className="p-4 bg-background/80 backdrop-blur-sm border-t md:border-t-0 md:bg-transparent">
            <ChatInput 
              onSend={handleSendMessage} 
              isLoading={isLoading} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
