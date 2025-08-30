import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Subscription } from "@/contexts/FinancialContext";
import { Repeat, Circle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ActiveSubscriptionsProps {
  subscriptions: Subscription[];
  selectedDate: Date;
}

export function ActiveSubscriptions({ subscriptions, selectedDate }: ActiveSubscriptionsProps) {
  const monthKey = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}`;
  
  const activeSubscriptions = subscriptions.filter(s => {
    if (!s.isActive) return false;
    
    // Filter by selected month - check if nextPayment is in the selected month
    const paymentDate = new Date(s.nextPayment);
    const paymentMonthKey = `${paymentDate.getFullYear()}-${(paymentDate.getMonth() + 1).toString().padStart(2, '0')}`;
    
    return paymentMonthKey === monthKey;
  });
  const totalMonthly = activeSubscriptions.reduce((sum, s) => sum + s.amount, 0);

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 neon-text">
          <Repeat className="h-5 w-5 text-primary" />
          Assinaturas Ativas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeSubscriptions.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Nenhuma assinatura ativa</p>
        ) : (
          <>
            {activeSubscriptions.map((subscription) => (
              <div key={subscription.id} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: subscription.color || '#3b82f6' }}
                >
                  {subscription.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{subscription.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {subscription.category} • {subscription.frequency === 'monthly' ? 'Todo dia' : 'Todo ano'} {format(new Date(subscription.nextPayment), 'dd', { locale: ptBR })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-expense">
                    R$ {subscription.amount.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Total Monthly Summary */}
            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Total Mensal:</span>
                <span className="font-bold text-expense">
                  R$ {totalMonthly.toLocaleString('pt-BR', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}