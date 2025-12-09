import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Brain, Zap, ShieldCheck, Search } from "lucide-react";
import { MODEL_INFO, ModelId } from "@/lib/comparison-data";
import { cn } from "@/lib/utils";

export function RecommendationPage() {
  const [query, setQuery] = useState("");
  const [recommendation, setRecommendation] = useState<ModelId | null>(null);

  const handleAnalyze = () => {
    if (!query.trim()) return;
    
    // Simple mock logic
    if (query.includes("데이터") || query.includes("분석")) setRecommendation("gemini-pro");
    else if (query.includes("에세이") || query.includes("글쓰기")) setRecommendation("claude-3-opus");
    else setRecommendation("gpt-4o");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-heading font-bold">AI 모델 추천 시스템</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          질문을 입력하시면 AI가 내용을 분석하여 가장 적합한 모델을 추천해 드립니다.
          <br />각 모델의 강점을 비교하고 최적의 선택을 도와드립니다.
        </p>
      </div>

      <div className="flex gap-2 max-w-xl mx-auto">
        <Input 
          placeholder="해결하고 싶은 문제나 질문을 입력하세요..." 
          className="h-12 text-lg shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
        />
        <Button size="lg" className="h-12 px-8" onClick={handleAnalyze}>
          <Search className="mr-2 h-4 w-4" />
          분석하기
        </Button>
      </div>

      {recommendation && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {Object.entries(MODEL_INFO).map(([id, info]) => {
            const isRecommended = id === recommendation;
            return (
              <Card 
                key={id} 
                className={cn(
                  "relative transition-all duration-300 overflow-hidden",
                  isRecommended 
                    ? "border-2 border-primary shadow-xl scale-105 z-10 bg-primary/5" 
                    : "border opacity-70 hover:opacity-100 hover:scale-[1.02]"
                )}
              >
                {isRecommended && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
                )}
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className={cn("p-2 rounded-lg", isRecommended ? "bg-primary text-primary-foreground" : "bg-muted")}>
                      {id === "gpt-4o" && <Brain className="h-6 w-6" />}
                      {id === "gemini-pro" && <Zap className="h-6 w-6" />}
                      {id === "claude-3-opus" && <ShieldCheck className="h-6 w-6" />}
                    </div>
                    {isRecommended && (
                      <Badge className="bg-primary hover:bg-primary">최고의 선택</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{info.name}</CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">주요 강점</span>
                    <div className="flex flex-wrap gap-1">
                      {info.bestFor.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {isRecommended && (
                    <div className="pt-4 border-t mt-4">
                      <p className="text-sm font-medium text-primary flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        추천 이유
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        입력하신 질문은 <strong>{info.bestFor[0]}</strong> 능력이 중요합니다. 
                        {info.name}는 이 분야에서 가장 높은 정확도를 보입니다.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
