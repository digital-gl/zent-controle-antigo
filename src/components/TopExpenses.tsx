import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/contexts/FinancialContext";
import { PieChart } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TopExpensesProps {
  transactions: Transaction[];
  selectedDate: Date;
}

export function TopExpenses({ transactions, selectedDate }: TopExpensesProps) {
  const monthKey = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}`;
  
  const monthExpenses = transactions.filter(t => 
    t.type === 'expense' && t.date.startsWith(monthKey)
  );

  const totalExpenses = monthExpenses.reduce((sum, t) => sum + t.amount, 0);

  const expensesByCategory = monthExpenses.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  const categoryColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
  ];

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 neon-text">
          <PieChart className="h-5 w-5 text-primary" />
          Principais Gastos - {format(selectedDate, 'MMMM', { locale: ptBR })}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedCategories.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Nenhum gasto neste mês</p>
        ) : (
          sortedCategories.map(([category, amount], index) => {
            const percentage = totalExpenses > 0 ? ((amount / totalExpenses) * 100) : 0;
            return (
              <div key={category} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors[index] }}
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground capitalize">{category}</p>
                  <p className="text-sm text-muted-foreground">
                    {percentage.toFixed(1)}% do total
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-expense">
                    R$ {amount.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}