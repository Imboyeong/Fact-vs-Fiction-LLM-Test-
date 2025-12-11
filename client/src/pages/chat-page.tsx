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
import { Menu, Sparkles, LineChart, Map, Search } from "lucide-react";
import { getInitialGreeting, simulateAIResponse, type Message } from "@/lib/mock-data";
import { simulateComparison, type ComparisonResult } from "@/lib/comparison-data";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { StudentLevel } from "@/lib/student-levels";
import { ComparisonDashboardLayout } from "@/components/comparison/comparison-dashboard-layout";
import { RecommendationPage } from "@/components/recommendation/recommendation-page";
import { LearningPathPage } from "@/components/learning-path/learning-path-page";
import { ReferenceMaterials } from "@/components/chat/reference-materials";
import { SuggestedQuestions } from "@/components/chat/suggested-questions";
import { getSuggestedQuestions, type SuggestedQuestion } from "@/lib/suggested-questions";

export default function ChatPage() {
  const [mode, setMode] = useState<"chat" | "compare" | "recommend" | "path">("chat");
  const [level, setLevel] = useState<StudentLevel>("high");
  const [messages, setMessages] = useState<Message[]>([getInitialGreeting("high")]);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const [lastQuestion, setLastQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState("gpt-4o");
  const [initialInputValue, setInitialInputValue] = useState<string>("");
  const [compareInputValue, setCompareInputValue] = useState<string>("10+32의 결과는 무엇인가?");

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, comparisonResults, isLoading]);

  // Update greeting and input when level changes
  useEffect(() => {
    setMessages([getInitialGreeting(level)]);
    // Set first example question as initial input value
    const questions = getSuggestedQuestions(level);
    if (questions.length > 0) {
      setInitialInputValue(questions[0].question);
    }
  }, [level]);

  const handleSuggestedQuestionClick = async (question: SuggestedQuestion) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question.question,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add AI response with simulated delay
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: question.answer,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

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
            <span className="font-heading font-bold hidden sm:inline">LLM StudyHub</span>
          </div>

          <div className="flex-1 flex justify-center max-w-2xl">
            <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="chat" className="text-xs sm:text-sm">채팅</TabsTrigger>
                <TabsTrigger value="compare" className="text-xs sm:text-sm">비교</TabsTrigger>
                <TabsTrigger value="recommend" className="text-xs sm:text-sm">추천</TabsTrigger>
                <TabsTrigger value="path" className="text-xs sm:text-sm">학습경로</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tagline */}
          <div className="hidden lg:flex items-center flex-1 justify-end mr-4">
            <p className="text-sm text-muted-foreground font-medium">
              GPT·Gemini·Claude, 비교하고 바로 쓰는 학습 허브
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {mode === "chat" && (
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-[140px] h-9 border-none bg-muted/50 hover:bg-muted/80 focus:ring-0">
                  <SelectValue placeholder="모델 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gemini-pro">Gemini 2.0 Flash</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 4.5 Sonnet</SelectItem>
                </SelectContent>
              </Select>
            )}
            <Button variant="ghost" size="sm" className="hidden md:flex text-muted-foreground hover:text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              프로
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-muted/10">
          <div className="max-w-6xl mx-auto pb-4 h-full">

            {mode === "recommend" && <RecommendationPage />}

            {mode === "path" && <LearningPathPage />}

            {mode === "chat" && (
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((message) => (
                  <div key={message.id}>
                    <MessageBubble message={message} />
                    {/* Show reference materials after the last assistant message */}
                    {message.role === "assistant" && message === messages[messages.length - 1] && (
                      <ReferenceMaterials />
                    )}
                  </div>
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
              <ComparisonDashboardLayout
                question={lastQuestion}
                results={comparisonResults}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

        {/* Input Area - Hide in Recommendation & Path modes */}
        {(mode === "chat" || mode === "compare") && (
          <div className="p-4 bg-background/80 backdrop-blur-sm border-t md:border-t-0 md:bg-transparent">
            <ChatInput
              onSend={handleSendMessage}
              isLoading={isLoading}
              initialValue={
                mode === "compare"
                  ? (comparisonResults.length === 0 ? compareInputValue : "")
                  : (messages.length <= 1 ? initialInputValue : "")
              }
            />
          </div>
        )}

        {/* Copyright Footer */}
        <div className="border-t mt-auto">
          <div className="p-3 text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 LLM StudyHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
