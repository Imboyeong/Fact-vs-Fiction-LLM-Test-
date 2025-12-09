import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import { MODEL_INFO, ModelId } from "@/lib/comparison-data";

interface ModelRecommenderProps {
  question: string;
}

export function ModelRecommender({ question }: ModelRecommenderProps) {
  // Simple mock logic for recommendation
  let recommendedId: ModelId = "gpt-4o";
  let reason = "Overall best reasoning for general questions.";

  if (question.toLowerCase().includes("data") || question.toLowerCase().includes("list")) {
    recommendedId = "gemini-pro";
    reason = "Best for processing data and lists.";
  } else if (question.toLowerCase().includes("essay") || question.toLowerCase().includes("write")) {
    recommendedId = "claude-3-opus";
    reason = "Superior creative writing and nuance.";
  }

  const model = MODEL_INFO[recommendedId];

  return (
    <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
      <Card className="bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-muted-foreground">Recommended Model:</span>
              <span className="font-bold text-foreground">{model.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{reason}</p>
          </div>

          <div className="hidden sm:flex gap-2">
             {model.bestFor.map(tag => (
               <Badge key={tag} variant="secondary" className="text-[10px] h-5">
                 {tag}
               </Badge>
             ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
