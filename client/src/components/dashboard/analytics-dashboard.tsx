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
  Radar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComparisonResult, MODEL_INFO } from "@/lib/comparison-data";

interface AnalyticsDashboardProps {
  results: ComparisonResult[];
}

export function AnalyticsDashboard({ results }: AnalyticsDashboardProps) {
  const barData = results.map(r => ({
    name: MODEL_INFO[r.modelId].name,
    정확도: r.stats.accuracy,
    신뢰성: r.stats.reliability,
    환각위험: r.stats.hallucinationRate * 10, // Scale up for visibility
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">성능 비교 분석</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              />
              <Legend iconType="circle" fontSize={10} />
              <Bar dataKey="정확도" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="신뢰성" fill="#8884d8" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="환각위험" fill="#ff8042" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
         <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">모델별 강점 분석</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] w-full">
           <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={barData}>
              <PolarGrid opacity={0.3} />
              <PolarAngleAxis dataKey="name" fontSize={10} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={10} />
              <Radar name="정확도" dataKey="정확도" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              <Legend iconType="circle" fontSize={10} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
