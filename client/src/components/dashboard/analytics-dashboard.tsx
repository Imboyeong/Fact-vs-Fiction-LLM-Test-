import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComparisonResult, MODEL_INFO } from "@/lib/comparison-data";

interface AnalyticsDashboardProps {
  results: ComparisonResult[];
}

export function AnalyticsDashboard({ results }: AnalyticsDashboardProps) {
  const chartData = results.map(r => ({
    name: MODEL_INFO[r.modelId].name,
    정확도: r.stats.accuracy,
    신뢰성: r.stats.reliability,
    속도: r.stats.speed / 20, // Scale down for visibility alongside percentage
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">모델 성능 종합 비교</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              />
              <Legend iconType="circle" fontSize={10} />
              <Bar dataKey="정확도" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={30} />
              <Bar dataKey="신뢰성" fill="#8884d8" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
         <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">응답 속도 분석 (ms)</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] w-full">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={results.map(r => ({ name: MODEL_INFO[r.modelId].name, 응답시간: r.stats.speed }))} layout="vertical" margin={{ left: 0 }}>
               <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
               <XAxis type="number" fontSize={10} hide />
               <YAxis dataKey="name" type="category" width={100} fontSize={11} tickLine={false} axisLine={false} />
               <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
               <Bar dataKey="응답시간" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20}>
               </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
