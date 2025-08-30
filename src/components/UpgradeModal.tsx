import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePremium } from "@/contexts/PremiumContext";

export function UpgradeModal() {
  const navigate = useNavigate();
  const { showUpgradeModal, setShowUpgradeModal } = usePremium();

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    navigate("/premium");
  };

  const handleClose = () => {
    setShowUpgradeModal(false);
  };

  return (
    <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
      <DialogContent className="sm:max-w-md neon-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-primary" />
              <DialogTitle className="text-xl">Limite Atingido!</DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-left space-y-4 pt-4">
            <p>
              Você atingiu o limite de <strong>4 operações gratuitas</strong> no ZENT.
            </p>
            <p>
              Para continuar adicionando transações, assinaturas, investimentos e metas, 
              faça o upgrade para o <strong>ZENT Premium</strong>.
            </p>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 pt-4">
          <Button 
            onClick={handleUpgrade}
            className="neon-button w-full"
            size="lg"
          >
            <Crown className="h-4 w-4 mr-2" />
            Fazer Upgrade para Premium
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="w-full"
          >
            Continuar Navegando (Sem Adicionar)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}