import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Goal } from "@/contexts/FinancialContext";
import { Target } from "lucide-react";

interface GoalsProgressProps {
  goals: Goal[];
}

export function GoalsProgress({ goals }: GoalsProgressProps) {
  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 neon-text">
          <Target className="h-5 w-5 text-primary" />
          Progresso das Metas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">Nenhuma meta cadastrada</p>
        ) : (
          goals.map((goal) => {
            const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-foreground">{goal.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{goal.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">
                      {progress.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / 
                      R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <Progress 
                  value={Math.min(progress, 100)} 
                  className={`h-2 ${progress >= 100 ? 'bg-income/20' : 'bg-secondary'}`}
                />
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}