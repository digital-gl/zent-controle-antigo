import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MonthSelectorProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function MonthSelector({ currentDate, onDateChange }: MonthSelectorProps) {
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2 neon-border rounded-lg p-2 bg-card">
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePreviousMonth}
        className="p-1 h-6 w-6 sm:h-8 sm:w-8 text-foreground hover:bg-primary/20"
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
      
      <div className="flex flex-col items-center px-2 sm:px-4">
        <span className="text-sm sm:text-lg font-bold text-primary neon-text">
          {format(currentDate, 'MMM', { locale: ptBR })}
        </span>
        <span className="text-xs sm:text-sm text-muted-foreground">
          {format(currentDate, 'yyyy')}
        </span>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleNextMonth}
        className="p-1 h-6 w-6 sm:h-8 sm:w-8 text-foreground hover:bg-primary/20"
      >
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </div>
  );
}