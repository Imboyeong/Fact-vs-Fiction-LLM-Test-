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
import { Menu, Sparkles, LayoutDashboard, MessageSquare } from "lucide-react";
import { INITIAL_GREETING, simulateAIResponse, type Message } from "@/lib/mock-data";
import { simulateComparison, type ComparisonResult } from "@/lib/comparison-data";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ComparisonCard } from "@/components/comparison/comparison-card";
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard";
import { ModelRecommender } from "@/components/recommendation/model-recommender";

export default function ChatPage() {
  const [mode, setMode] = useState<"chat" | "compare">("chat");
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
        const responseText = await simulateAIResponse(content);
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
      <ChatSidebar />

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
                <ChatSidebar />
              </SheetContent>
            </Sheet>
            <span className="font-heading font-bold hidden sm:inline">AI Tutor</span>
          </div>

          <div className="flex-1 flex justify-center">
            <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="compare">Compare</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {mode === "chat" && (
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-[180px] h-9 border-none bg-muted/50 hover:bg-muted/80 focus:ring-0">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o (Smartest)</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro 1.5</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3.5 Sonnet</SelectItem>
                </SelectContent>
              </Select>
            )}
             <Button variant="ghost" size="sm" className="hidden md:flex text-muted-foreground hover:text-primary">
               <Sparkles className="mr-2 h-4 w-4" />
               Upgrade
             </Button>
          </div>
        </header>

        {/* Content Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-muted/10">
          <div className="max-w-5xl mx-auto pb-4 h-full">
            
            {mode === "chat" ? (
              // CHAT MODE
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
            ) : (
              // COMPARISON MODE
              <div className="space-y-8 min-h-full flex flex-col justify-center">
                {!lastQuestion && !isLoading ? (
                  <div className="text-center text-muted-foreground py-20">
                    <LayoutDashboard className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-medium">Ready to Compare Models</h3>
                    <p className="text-sm">Ask a question to see how GPT-4o, Gemini, and Claude respond side-by-side.</p>
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

        {/* Input Area */}
        <div className="p-4 bg-background/80 backdrop-blur-sm border-t md:border-t-0 md:bg-transparent">
          <ChatInput 
            onSend={handleSendMessage} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
}
