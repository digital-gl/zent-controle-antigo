import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from "@/contexts/FinancialContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

interface InvestmentsPieChartProps {
  investments: Investment[];
}

export function InvestmentsPieChart({ investments }: InvestmentsPieChartProps) {
  const investmentsByType = investments.reduce((acc, investment) => {
    const type = investment.type;
    acc[type] = (acc[type] || 0) + investment.amount;
    return acc;
  }, {} as Record<string, number>);

  const typeLabels = {
    stocks: 'Ações',
    bonds: 'Títulos',
    crypto: 'Criptomoedas', 
    real_estate: 'Imóveis',
    other: 'Outros'
  };

  // Define the function BEFORE using it
  const getInvestmentColor = (type: string) => {
    const investmentsOfType = investments.filter(i => i.type === type);
    if (investmentsOfType.length > 0 && investmentsOfType[0].color) {
      return investmentsOfType[0].color;
    }
    
    const defaultColors = {
      stocks: '#3b82f6',
      bonds: '#10b981',
      crypto: '#f59e0b',
      real_estate: '#8b5cf6',
      other: '#6b7280'
    };
    
    return defaultColors[type as keyof typeof defaultColors] || '#3b82f6';
  };

  const chartData = Object.entries(investmentsByType).map(([type, value]) => ({
    name: typeLabels[type as keyof typeof typeLabels] || type,
    value,
    type,
    color: getInvestmentColor(type),
    percentage: investments.length > 0 ? ((value / investments.reduce((sum, i) => sum + i.amount, 0)) * 100).toFixed(1) : 0
  }));

  const totalInvestments = investments.reduce((sum, i) => sum + i.amount, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-primary">
            R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-muted-foreground text-sm">
            {data.payload.percentage}% do total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 neon-text">
          <TrendingUp className="h-5 w-5 text-primary" />
          Distribuição de Investimentos
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Total: R$ {totalInvestments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </CardHeader>
      <CardContent>
        {investments.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <p>Nenhum investimento encontrado</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="hsl(var(--border))"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}