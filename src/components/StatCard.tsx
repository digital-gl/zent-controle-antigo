import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'income' | 'expense' | 'balance';
}

export function StatCard({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const getCardStyles = () => {
    switch (variant) {
      case 'income':
        return 'border-income/20 bg-gradient-to-br from-income/5 to-income/10';
      case 'expense':
        return 'border-expense/20 bg-gradient-to-br from-expense/5 to-expense/10';
      case 'balance':
        return 'border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10';
      default:
        return 'border-border bg-card';
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'income':
        return 'text-income bg-income/10';
      case 'expense':
        return 'text-expense bg-expense/10';
      case 'balance':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getValueStyles = () => {
    switch (variant) {
      case 'income':
        return 'text-income';
      case 'expense':
        return 'text-expense';
      case 'balance':
        return 'text-foreground';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card className={cn('transition-all duration-300 hover:shadow-xl neon-border', getCardStyles())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground neon-text-accent">
          {title}
        </CardTitle>
        <div className={cn('p-3 rounded-lg neon-glow', getIconStyles())}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn('text-3xl font-bold mb-1', getValueStyles())}>
          {value}
        </div>
        {trend && (
          <p className={cn(
            'text-xs flex items-center gap-1',
            trend.isPositive ? 'neon-text-success' : 'text-expense'
          )}>
            <span className={trend.isPositive ? '↗' : '↘'}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-muted-foreground">vs mês anterior</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}