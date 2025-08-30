import { useState } from 'react';
import { Plus, TrendingDown, Search, Filter, Trash2 } from 'lucide-react';
import { formatDateForDisplay } from '@/utils/dateSystem';

import { TransactionForm } from '@/components/TransactionForm';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFinancial } from '@/contexts/FinancialContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { MonthSelector } from '@/components/MonthSelector';

export default function Gastos() {
  const { transactions, deleteTransaction, getTotalExpenses, getMonthlyExpenses, selectedDate, setSelectedDate } = useFinancial();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todas');

  // Filtrar transações pelo mês selecionado
  const getMonthKey = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const currentMonthKey = getMonthKey(selectedDate);
  const monthlyExpenseTransactions = transactions.filter(t => 
    t.type === 'expense' && t.date.startsWith(currentMonthKey)
  );

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalExpenses = getTotalExpenses();
  const monthlyExpenses = getMonthlyExpenses();

  // Get unique categories from monthly transactions
  const categories = [...new Set(monthlyExpenseTransactions.map(t => t.category))];

  // Filter transactions based on search and category (only monthly)
  const filteredTransactions = monthlyExpenseTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'todas' || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string, description: string) => {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground neon-text">Gastos</h1>
            <p className="text-sm sm:text-base text-muted-foreground neon-text-accent">Controle e monitore todas as suas despesas</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <MonthSelector currentDate={selectedDate} onDateChange={setSelectedDate} />
            <TransactionForm defaultType="expense" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          title="Total de Gastos"
          value={`R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingDown}
          variant="expense"
        />
        <StatCard
          title="Gastos do Mês"
          value={`R$ ${monthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingDown}
          variant="expense"
        />
        <StatCard
          title="Total de Transações (Mês)"
          value={monthlyExpenseTransactions.length.toString()}
          icon={TrendingDown}
          variant="default"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-expense/10 text-expense shrink-0">
                      <TrendingDown className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium truncate">{transaction.description}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                        <span className="truncate">{transaction.category}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{formatDateForDisplay(transaction.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                    <div className="text-left sm:text-right">
                      <p className="font-medium text-expense">
                        -R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(transaction.id, transaction.description)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <TrendingDown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum gasto encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || categoryFilter !== 'todas' 
                    ? 'Tente ajustar os filtros de busca.'
                    : 'Adicione seu primeiro gasto para começar a controlar suas despesas.'
                  }
                </p>
                {!searchTerm && categoryFilter === 'todas' && (
                  <TransactionForm defaultType="expense" />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}