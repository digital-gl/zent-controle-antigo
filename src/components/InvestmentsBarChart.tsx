import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from "@/contexts/FinancialContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { format, eachMonthOfInterval, startOfYear, endOfYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TrendingUp } from "lucide-react";

interface InvestmentsBarChartProps {
  investments: Investment[];
  selectedDate: Date;
}

export function InvestmentsBarChart({ investments, selectedDate }: InvestmentsBarChartProps) {
  const currentYear = selectedDate.getFullYear();

  const getChartData = () => {
    const yearStart = startOfYear(selectedDate);
    const yearEnd = endOfYear(selectedDate);
    
    const months = eachMonthOfInterval({
      start: yearStart,
      end: yearEnd
    });

    return months.map(month => {
      const monthKey = format(month, 'yyyy-MM');
      
      const monthInvestments = investments.filter(i => 
        i.date.startsWith(monthKey)
      );

      const totalInvested = monthInvestments.reduce((sum, i) => sum + i.amount, 0);

      return {
        month: format(month, 'MMM', { locale: ptBR }),
        investimentos: totalInvested,
      };
    });
  };

  const chartData = getChartData();
  const totalYearInvestments = investments
    .filter(i => new Date(i.date).getFullYear() === currentYear)
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 neon-text">
          <BarChart className="h-5 w-5 text-primary" />
          Investimentos Mensais - {currentYear}
        </CardTitle>
        <p className="text-sm text-muted-foregroup">
          Total do ano: R$ {totalYearInvestments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(200 80% 50%)" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="hsl(280 100% 70%)" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [
                `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                'Investimentos'
              ]}
            />
            <Legend />
            <Bar 
              dataKey="investimentos" 
              fill="url(#investmentGradient)" 
              name="Investimentos"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}