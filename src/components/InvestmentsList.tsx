import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Investment } from "@/contexts/FinancialContext";
import { Trash2, TrendingUp, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFinancial } from "@/contexts/FinancialContext";
import { useToast } from "@/hooks/use-toast";

interface InvestmentsListProps {
  investments: Investment[];
}

export function InvestmentsList({ investments }: InvestmentsListProps) {
  const { deleteInvestment } = useFinancial();
  const { toast } = useToast();

  const handleDelete = async (investment: Investment) => {
    try {
      await deleteInvestment(investment.id);
    } catch (error) {
      console.error('Error deleting investment:', error);
    }
  };

  const typeLabels = {
    stocks: 'Ações',
    bonds: 'Títulos', 
    crypto: 'Cripto',
    real_estate: 'Imóveis',
    other: 'Outros'
  };

  const getInvestmentIcon = (investment: Investment) => {
    const firstLetter = investment.name.charAt(0).toUpperCase();
    const color = investment.color || '#3b82f6';
    
    return (
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
        style={{ backgroundColor: color }}
      >
        {firstLetter}
      </div>
    );
  };

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 neon-text">
          <TrendingUp className="h-5 w-5 text-primary" />
          Meus Investimentos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {investments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhum investimento encontrado. Comece adicionando seu primeiro investimento!
          </p>
        ) : (
          investments.map((investment) => (
            <div 
              key={investment.id} 
              className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card/80 transition-colors"
            >
              {getInvestmentIcon(investment)}
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{investment.name}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {typeLabels[investment.type]}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="capitalize">{investment.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(investment.date), 'dd/MM/yyyy', { locale: ptBR })}
                  </span>
                </div>
              </div>
              
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="font-bold text-primary text-lg">
                    R$ {investment.amount.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(investment)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}