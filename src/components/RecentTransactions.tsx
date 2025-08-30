import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/contexts/FinancialContext";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { formatDateForDisplay } from "@/utils/dateSystem";

interface RecentTransactionsProps {
  transactions: Transaction[];
  selectedDate: Date;
}

export function RecentTransactions({ transactions, selectedDate }: RecentTransactionsProps) {
  const monthKey = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}`;
  
  const monthTransactions = transactions
    .filter(t => t.date.startsWith(monthKey))
    .slice(0, 5)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getTransactionIcon = (type: 'income' | 'expense') => {
    return type === 'income' ? ArrowUpRight : ArrowDownRight;
  };

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 neon-text">
          <TrendingUp className="h-5 w-5 text-primary" />
          Transações - {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {monthTransactions.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Nenhuma transação neste mês</p>
        ) : (
          monthTransactions.map((transaction) => {
            const Icon = getTransactionIcon(transaction.type);
            return (
              <div key={transaction.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg shrink-0",
                    transaction.type === 'income' 
                      ? "bg-income/10 text-income"
                      : "bg-expense/10 text-expense"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{transaction.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-muted-foreground">
                      <span className="capitalize truncate">{transaction.category}</span>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded w-fit">
                        {transaction.type === 'income' ? 'Receita' : 'Gasto'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right sm:shrink-0">
                  <p className={cn(
                    "font-bold",
                    transaction.type === 'income' ? "text-income" : "text-expense"
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateForDisplay(transaction.date)}
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