import { ComparisonResult } from "@/lib/comparison-data";
import { ComparisonCard } from "@/components/comparison/comparison-card";
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard";
import { ErrorTrackingView } from "@/components/comparison/error-tracking-view";
import { ModelRecommender } from "@/components/recommendation/model-recommender";
import { LearningGoalWidget } from "@/components/dashboard/learning-goal-widget";
import { LayoutDashboard } from "lucide-react";

interface ComparisonDashboardLayoutProps {
  question: string;
  results: ComparisonResult[];
  isLoading: boolean;
}

export function ComparisonDashboardLayout({ question, results, isLoading }: ComparisonDashboardLayoutProps) {
  if (!question && !isLoading) {
    return (
      <div className="text-center text-muted-foreground py-20">
        <LayoutDashboard className="h-12 w-12 mx-auto mb-4 opacity-20" />
        <h3 className="text-lg font-medium">실시간 비교 대시보드</h3>
        <p className="text-sm">질문을 입력하면 3가지 모델의 응답과 성능 지표를 한눈에 볼 수 있습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* 1. Header & Recommender Section */}
      {question && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-heading font-semibold text-foreground px-1">"{question}"</h2>
            <ModelRecommender question={question} />
          </div>
          <div className="hidden lg:block">
            <LearningGoalWidget />
          </div>
        </div>
      )}

      {/* 2. Response Cards Grid */}
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
          {results.map((result) => (
            <ComparisonCard key={result.modelId} result={result} />
          ))}
        </div>
      )}

      {/* 3. Analytics Section (Charts + Errors) */}
      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnalyticsDashboard results={results} />
          </div>
          <div className="lg:col-span-1">
             <ErrorTrackingView results={results} />
          </div>
        </div>
      )}
      
      {/* Mobile-only Goal Widget */}
      <div className="lg:hidden">
        <LearningGoalWidget />
      </div>
    </div>
  );
}
