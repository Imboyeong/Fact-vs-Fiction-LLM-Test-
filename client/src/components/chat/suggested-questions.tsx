import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { SuggestedQuestion } from "@/lib/suggested-questions";
import { cn } from "@/lib/utils";

interface SuggestedQuestionsProps {
    questions: SuggestedQuestion[];
    onQuestionClick: (question: SuggestedQuestion) => void;
    className?: string;
}

export function SuggestedQuestions({
    questions,
    onQuestionClick,
    className
}: SuggestedQuestionsProps) {
    if (questions.length === 0) return null;

    return (
        <Card className={cn("p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20", className)}>
            <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">추천 질문</h3>
            </div>
            <div className="space-y-3">
                {questions.map((q) => (
                    <Button
                        key={q.id}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-3 px-4 bg-background/50 hover:bg-background/80 border-muted-foreground/20 hover:border-primary/50 transition-all hover:shadow-md"
                        onClick={() => onQuestionClick(q)}
                    >
                        <span className="text-sm line-clamp-2">{q.question}</span>
                    </Button>
                ))}
            </div>
        </Card>
    );
}
