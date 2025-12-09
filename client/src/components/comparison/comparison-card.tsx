import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, Zap, Brain } from "lucide-react";
import { ComparisonResult, MODEL_INFO } from "@/lib/comparison-data";
import { cn } from "@/lib/utils";

interface ComparisonCardProps {
  result: ComparisonResult;
}

export function ComparisonCard({ result }: ComparisonCardProps) {
  const info = MODEL_INFO[result.modelId];
  
  return (
    <Card className="h-full flex flex-col overflow-hidden border-t-4" style={{ borderTopColor: getModelColor(result.modelId) }}>
      <CardHeader className="pb-3 bg-muted/30">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {info.name}
              {result.errorType === "none" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
            </CardTitle>
            <CardDescription className="text-xs mt-1 line-clamp-1">{info.description}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-background">
            {result.stats.speed}ms
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex-1 min-h-[120px] text-sm leading-relaxed whitespace-pre-wrap">
          {result.response}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Accuracy</span>
              <span>{result.stats.accuracy}%</span>
            </div>
            <Progress value={result.stats.accuracy} className="h-1.5" indicatorClassName={getScoreColor(result.stats.accuracy)} />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Reliability</span>
              <span>{result.stats.reliability}%</span>
            </div>
            <Progress value={result.stats.reliability} className="h-1.5" indicatorClassName="bg-blue-500" />
          </div>
        </div>

        {/* Hallucination / Error Indicator */}
        {result.stats.hallucinationRate > 3 && (
          <div className="rounded-md bg-orange-500/10 p-3 flex items-start gap-2 text-xs text-orange-700 dark:text-orange-400">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-1">Potential Hallucination Risk</span>
              Hallucination rate detected at {result.stats.hallucinationRate}%. Verify facts carefully.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getModelColor(id: string) {
  switch (id) {
    case 'gpt-4o': return '#10a37f'; // OpenAI Green
    case 'gemini-pro': return '#4285f4'; // Google Blue
    case 'claude-3-opus': return '#d97757'; // Anthropic Orange
    default: return '#888888';
  }
}

function getScoreColor(score: number) {
  if (score >= 90) return 'bg-green-500';
  if (score >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
}
