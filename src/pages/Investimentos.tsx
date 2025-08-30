import { TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { InvestmentForm } from '@/components/InvestmentForm';
import { InvestmentsPieChart } from '@/components/InvestmentsPieChart';
import { InvestmentsBarChart } from '@/components/InvestmentsBarChart';
import { InvestmentsList } from '@/components/InvestmentsList';
import { StatCard } from '@/components/StatCard';
import { MonthSelector } from '@/components/MonthSelector';
import { useFinancial } from '@/contexts/FinancialContext';

export default function Investimentos() {
  const { 
    investments,
    selectedDate,
    setSelectedDate,
    getTotalInvestments,
    getMonthlyInvestments
  } = useFinancial();

  // Filtrar investimentos pelo mês selecionado
  const getMonthKey = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const currentMonthKey = getMonthKey(selectedDate);
  const monthlyInvestments = investments.filter(i => i.date.startsWith(currentMonthKey));

  const totalInvestments = getTotalInvestments();
  const monthlyInvestmentsValue = getMonthlyInvestments();
  const currentYear = selectedDate.getFullYear();
  
  const yearlyInvestments = investments
    .filter(i => new Date(i.date).getFullYear() === currentYear)
    .reduce((sum, i) => sum + i.amount, 0);

  const activeInvestments = monthlyInvestments.length;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground neon-text">Investimentos</h1>
            <p className="text-sm sm:text-base text-muted-foreground neon-text-accent">Gerencie sua carteira de investimentos</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <MonthSelector 
              currentDate={selectedDate} 
              onDateChange={setSelectedDate}
            />
            <InvestmentForm />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Investido"
          value={`R$ ${totalInvestments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingUp}
          variant="income"
        />
        <StatCard
          title={`Investido - ${format(selectedDate, 'MMMM', { locale: ptBR })}`}
          value={`R$ ${monthlyInvestmentsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={BarChart3}
          variant="balance"
        />
        <StatCard
          title={`Total ${currentYear}`}
          value={`R$ ${yearlyInvestments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={PieChart}
          variant="default"
        />
        <StatCard
          title="Investimentos Ativos (Mês)"
          value={activeInvestments.toString()}
          icon={TrendingUp}
          variant="balance"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <InvestmentsPieChart investments={investments} />
        <InvestmentsBarChart investments={investments} selectedDate={selectedDate} />
      </div>

      {/* Investments List */}
      <InvestmentsList investments={monthlyInvestments} />
    </div>
  );
}