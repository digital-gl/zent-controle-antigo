import { Badge } from "@/components/ui/badge";
import { Crown, AlertTriangle } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
import { cn } from "@/lib/utils";

export function OperationsLimitBadge() {
  const { operationsCount, isPremium, isLimitReached } = usePremium();

  if (isPremium) {
    return (
      <Badge variant="secondary" className="neon-glow-success text-xs sm:text-sm">
        <Crown className="h-3 w-3 mr-1" />
        <span className="hidden sm:inline">Premium</span>
        <span className="sm:hidden">Pro</span>
      </Badge>
    );
  }

  if (isLimitReached) {
    return (
      <Badge variant="destructive" className="neon-glow text-xs sm:text-sm">
        <AlertTriangle className="h-3 w-3 mr-1" />
        <span className="hidden sm:inline">Limite Atingido (4/4)</span>
        <span className="sm:hidden">4/4</span>
      </Badge>
    );
  }

  return (
    <Badge 
      variant={operationsCount >= 3 ? "destructive" : "secondary"} 
      className={cn(
        "text-xs sm:text-sm",
        operationsCount >= 3 ? "neon-glow" : ""
      )}
    >
      <span className="hidden sm:inline">Operações: {operationsCount}/4</span>
      <span className="sm:hidden">{operationsCount}/4</span>
    </Badge>
  );
}