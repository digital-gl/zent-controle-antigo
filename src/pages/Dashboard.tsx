import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Calendar,
  Target,
  Repeat
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { format, eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { StatCard } from '@/components/StatCard';
import { MonthSelector } from '@/components/MonthSelector';
import { TransactionForm } from '@/components/TransactionForm';
import { RecentTransactions } from '@/components/RecentTransactions';
import { TopExpenses } from '@/components/TopExpenses';
import { ActiveSubscriptions } from '@/components/ActiveSubscriptions';
import { GoalsProgress } from '@/components/GoalsProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinancial } from '@/contexts/FinancialContext';

export default function Dashboard() {
  const { 
    transactions, 
    subscriptions,
    goals,
    selectedDate,
    setSelectedDate,
    getMonthlyIncome, 
    getMonthlyExpenses, 
    getMonthlyBalance,
    getYearlyIncome,
    getYearlyExpenses,
    getBalance 
  } = useFinancial();

  const currentYear = selectedDate.getFullYear();
  const monthlyIncome = getMonthlyIncome();
  
  // Calculate monthly expenses including active subscriptions for the selected month
  const baseMonthlyExpenses = getMonthlyExpenses();
  const monthKey = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}`;
  const monthlySubscriptions = subscriptions
    .filter(s => {
      if (!s.isActive) return false;
      const paymentDate = new Date(s.nextPayment);
      const paymentMonthKey = `${paymentDate.getFullYear()}-${(paymentDate.getMonth() + 1).toString().padStart(2, '0')}`;
      return paymentMonthKey === monthKey;
    })
    .reduce((total, s) => total + s.amount, 0);
  const monthlyExpenses = baseMonthlyExpenses + monthlySubscriptions;
  
  const monthlyBalance = monthlyIncome - monthlyExpenses;
  const yearlyIncome = getYearlyIncome();
  
  // Calculate yearly expenses including all active subscriptions for the year
  const baseYearlyExpenses = getYearlyExpenses();
  const yearlySubscriptions = subscriptions
    .filter(s => {
      if (!s.isActive) return false;
      const paymentDate = new Date(s.nextPayment);
      return paymentDate.getFullYear() === currentYear;
    })
    .reduce((total, s) => total + (s.frequency === 'yearly' ? s.amount : s.amount * 12), 0);
  const yearlyExpenses = baseYearlyExpenses + yearlySubscriptions;
  
  // Calculate total recurring (active subscriptions monthly amount)
  const totalRecurring = subscriptions
    .filter(s => s.isActive)
    .reduce((total, s) => total + s.amount, 0);

  // Generate chart data for the entire year
  const getChartData = () => {
    const yearStart = startOfYear(selectedDate);
    const yearEnd = endOfYear(selectedDate);
    
    const months = eachMonthOfInterval({
      start: yearStart,
      end: yearEnd
    });

    return months.map(month => {
      const monthKey = format(month, 'yyyy-MM');
      
      const monthTransactions = transactions.filter(t => 
        t.date.startsWith(monthKey)
      );

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const baseExpenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      // Add subscriptions for this month
      const monthSubscriptions = subscriptions
        .filter(s => {
          if (!s.isActive) return false;
          const paymentDate = new Date(s.nextPayment);
          const paymentMonthKey = `${paymentDate.getFullYear()}-${(paymentDate.getMonth() + 1).toString().padStart(2, '0')}`;
          return paymentMonthKey === monthKey;
        })
        .reduce((sum, s) => sum + s.amount, 0);

      const expenses = baseExpenses + monthSubscriptions;

      return {
        month: format(month, 'MMM', { locale: ptBR }),
        receitas: income,
        gastos: expenses,
      };
    });
  };

  const chartData = getChartData();

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground neon-text">Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground neon-text-accent">Visão geral das suas finanças pessoais</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <MonthSelector 
              currentDate={selectedDate} 
              onDateChange={setSelectedDate}
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none">
                <TransactionForm defaultType="income" />
              </div>
              <div className="flex-1 sm:flex-none">
                <TransactionForm defaultType="expense" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <Card className="neon-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 neon-text">
            <BarChart className="h-5 w-5 text-primary" />
            Receitas vs Gastos - {currentYear}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart 
              data={chartData}
              onClick={(data) => {
                if (data && data.activeLabel) {
                  const monthIndex = chartData.findIndex(item => item.month === data.activeLabel);
                  if (monthIndex !== -1) {
                    const newDate = new Date(selectedDate.getFullYear(), monthIndex, 1);
                    setSelectedDate(newDate);
                  }
                }
              }}
            >
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(120 80% 45%)" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="hsl(140 80% 50%)" stopOpacity={0.7}/>
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0 80% 55%)" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="hsl(20 80% 60%)" stopOpacity={0.7}/>
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
                cursor={{ fill: 'hsl(220 50% 20%)', fillOpacity: 0.3 }}
              />
              <Legend />
              <Bar 
                dataKey="receitas" 
                fill="url(#incomeGradient)" 
                name="Receitas"
                radius={[4, 4, 0, 0]}
                style={{ cursor: 'pointer' }}
              />
              <Bar 
                dataKey="gastos" 
                fill="url(#expenseGradient)" 
                name="Gastos"
                radius={[4, 4, 0, 0]}
                style={{ cursor: 'pointer' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          title={`Receitas - ${format(selectedDate, 'MMMM', { locale: ptBR })}`}
          value={`R$ ${monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingUp}
          variant="income"
        />
        <StatCard
          title={`Gastos - ${format(selectedDate, 'MMMM', { locale: ptBR })}`}
          value={`R$ ${monthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingDown}
          variant="expense"
        />
        <StatCard
          title={`Saldo - ${format(selectedDate, 'MMMM', { locale: ptBR })}`}
          value={`R$ ${monthlyBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={Wallet}
          variant="balance"
        />
      </div>

      {/* Annual Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          title="Total Anual"
          value={`R$ ${yearlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingUp}
          variant="income"
        />
        <StatCard
          title="Total Anual"
          value={`R$ ${yearlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingDown}
          variant="expense"
        />
        <StatCard
          title="Total Recorrente"
          value={`R$ ${totalRecurring.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={Repeat}
          variant="balance"
        />
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <RecentTransactions transactions={transactions} selectedDate={selectedDate} />
        <TopExpenses transactions={transactions} selectedDate={selectedDate} />
        <ActiveSubscriptions subscriptions={subscriptions} selectedDate={selectedDate} />
        <GoalsProgress goals={goals} />
      </div>
    </div>
  );
}