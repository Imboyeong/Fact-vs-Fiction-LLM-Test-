import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { ComparisonResult, MODEL_INFO } from "@/lib/comparison-data";

interface ErrorTrackingViewProps {
  results: ComparisonResult[];
}

export function ErrorTrackingView({ results }: ErrorTrackingViewProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          실시간 오류 및 할루시네이션 추적
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">모델</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>오류 유형</TableHead>
              <TableHead className="text-right">환각 위험도</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.modelId}>
                <TableCell className="font-medium">{MODEL_INFO[result.modelId].name}</TableCell>
                <TableCell>
                  {result.stats.hallucinationRate > 3 ? (
                    <Badge variant="destructive" className="bg-orange-500/15 text-orange-600 hover:bg-orange-500/25 border-orange-200">
                      주의 필요
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      정상
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {result.stats.hallucinationRate > 3 ? "정보 불일치 가능성 감지됨" : "특이사항 없음"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${result.stats.hallucinationRate > 3 ? 'bg-orange-500' : 'bg-green-500'}`} 
                        style={{ width: `${result.stats.hallucinationRate * 10}%` }}
                      />
                    </div>
                    <span className="text-xs w-8">{result.stats.hallucinationRate}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
