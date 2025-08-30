import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Crown, Check, Star, Loader2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StripeProductsAnalyzer } from "@/components/StripeProductsAnalyzer";

// IDs dos seus produtos no Stripe
const PRODUCT_PRICES = {
  monthly: "price_1S1rANKSfD3S0hiLUFkF4rqH", // Plano mensal R$ 14,90
  annual: "price_1S1rBTKSfD3S0hiLENgFA9Nr", // Plano anual R$ 149,90
  lifetime: "price_1RfUqkKSfD3S0hiL0MUiPEDP", // Plano vitalício R$ 247,00
};

export default function Premium() {
  const { user } = useAuth();
  const { subscribed, subscriptionTier, subscriptionEnd, loading, checkSubscription, createCheckout, openCustomerPortal } = useSubscription();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const { toast } = useToast();

  // Emails dos donos que têm acesso completo
  const ownerEmails = ["gabriellucas.s2209@gmail.com", "fabiohenrique.m67@gmail.com"];
  const isOwner = user?.email && ownerEmails.includes(user.email);

  // Verifica assinatura ao carregar a página
  useEffect(() => {
    if (user && !isOwner) {
      checkSubscription();
    }
  }, [user, isOwner]);

  const plans = [
    {
      id: "mensal",
      priceId: PRODUCT_PRICES.monthly,
      name: "ZENT MENSAL",
      price: "R$ 14,90",
      period: "/mês",
      description: "Organize seus gastos, acompanhe seus investimentos e assuma o controle total da sua vida financeira com uma ferramenta simples e poderosa.",
      popular: true,
      features: [
        "Dashboard intuitivo para enxergar toda sua vida financeira em tempo real",
        "Controle de receitas e despesas para saber exatamente para onde vai seu dinheiro",
        "Gerenciamento de assinaturas para evitar surpresas no fim do mês",
        "Carteira digital de investimentos para acompanhar sua evolução no mercado",
        "Definição de metas financeiras para nunca sair do caminho",
        "Área Premium exclusiva com recursos avançados",
        "Relatórios práticos para visualizar seu progresso e tomar decisões melhores"
      ]
    },
    {
      id: "anual",
      priceId: PRODUCT_PRICES.annual,
      name: "ZENT ANUAL",
      price: "R$ 149,90",
      period: "/ano",
      description: "Plano anual com 2 meses grátis e todos os recursos premium.",
      discount: "2 meses grátis",
      features: [
        "Dashboard intuitivo para enxergar toda sua vida financeira em tempo real",
        "Controle de receitas e despesas para saber exatamente para onde vai seu dinheiro",
        "Gerenciamento de assinaturas para evitar surpresas no fim do mês",
        "Carteira digital de investimentos para acompanhar sua evolução no mercado",
        "Definição de metas financeiras para nunca sair do caminho",
        "Área Premium exclusiva com recursos avançados",
        "Relatórios práticos para visualizar seu progresso e tomar decisões melhores",
        "2 meses grátis",
        "Acesso antecipado a novos recursos"
      ]
    },
    {
      id: "vitalicio",
      priceId: PRODUCT_PRICES.lifetime,
      name: "ZENT VITALÍCIO",
      price: "R$ 247,00",
      period: "/vitalício",
      description: "Pagamento único, acesso vitalício a todos os recursos premium.",
      paymentType: "Pagamento Único",
      features: [
        "Dashboard intuitivo para enxergar toda sua vida financeira em tempo real",
        "Controle de receitas e despesas para saber exatamente para onde vai seu dinheiro",
        "Gerenciamento de assinaturas para evitar surpresas no fim do mês",
        "Carteira digital de investimentos para acompanhar sua evolução no mercado",
        "Definição de metas financeiras para nunca sair do caminho",
        "Área Premium exclusiva com recursos avançados",
        "Relatórios práticos para visualizar seu progresso e tomar decisões melhores",
        "Acesso vitalício",
        "Todas as atualizações futuras",
        "Sem mensalidades",
        "Melhor custo-benefício"
      ]
    }
  ];

  const handleSubscribe = async (planId: string, priceId: string) => {
    if (isOwner) {
      return; // Donos não precisam assinar
    }
    
    setCheckoutLoading(planId);
    try {
      const checkoutUrl = await createCheckout(priceId);
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        toast({
          title: "Redirecionando...",
          description: "Você será redirecionado para o checkout do Stripe.",
        });
      }
    } catch (error) {
      console.error("Erro ao processar assinatura:", error);
      toast({
        title: "Erro",
        description: "Não foi possível processar a assinatura. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      await openCustomerPortal();
      toast({
        title: "Portal do Cliente",
        description: "Redirecionando para o portal de gerenciamento de assinaturas.",
      });
    } catch (error) {
      console.error("Erro ao abrir portal:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o portal de gerenciamento.",
        variant: "destructive",
      });
    }
  };

  if (isOwner) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-primary">Acesso Completo</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Você tem acesso completo a todos os recursos do ZENT como proprietário da plataforma.
          </p>
        </div>

        <Card className="max-w-md mx-auto neon-glow-success">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl">Proprietário</CardTitle>
            <CardDescription>Acesso total e irrestrito</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-success" />
                <span>Todos os recursos premium</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-success" />
                <span>Acesso administrativo</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-success" />
                <span>Suporte prioritário</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-success" />
                <span>Recursos futuros inclusos</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analisador para identificar os IDs dos preços */}
        <StripeProductsAnalyzer />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Subscription Status */}
      {subscribed && (
        <Card className="neon-glow-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-success" />
              Assinatura Ativa - {subscriptionTier}
            </CardTitle>
            <CardDescription>
              {subscriptionEnd && `Válida até: ${new Date(subscriptionEnd).toLocaleDateString('pt-BR')}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button 
                onClick={handleManageSubscription}
                variant="outline"
                className="neon-glow-accent"
              >
                <Settings className="h-4 w-4 mr-2" />
                Gerenciar Assinatura
              </Button>
              <Button 
                onClick={checkSubscription}
                disabled={loading}
                variant="ghost"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Atualizar Status
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Crown className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-primary">ZENT Premium</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Escolha o plano ideal para transformar sua gestão financeira. 
          Recursos avançados para um controle completo das suas finanças.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => {
          const isCurrentPlan = subscribed && (
            (plan.id === "mensal" && subscriptionTier?.toLowerCase().includes("basic")) ||
            (plan.id === "anual" && subscriptionTier?.toLowerCase().includes("premium")) ||
            (plan.id === "vitalicio" && subscriptionTier?.toLowerCase().includes("enterprise"))
          );

          return (
            <Card 
              key={plan.id} 
              className={`relative ${
                isCurrentPlan
                  ? "neon-glow-success ring-2 ring-success/50"
                  : plan.popular 
                    ? "neon-glow ring-2 ring-primary/50" 
                    : plan.id === "vitalicio" 
                      ? "neon-glow-success" 
                      : "neon-border"
              }`}
            >
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="default" className="neon-glow-success bg-success text-success-foreground">
                    Seu Plano Atual
                  </Badge>
                </div>
              )}

              {plan.popular && !isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="default" className="neon-button flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Mais Popular
                  </Badge>
                </div>
              )}

              {plan.paymentType && (
                <div className="absolute -top-3 right-4">
                  <Badge variant="secondary" className="neon-glow-success text-success-foreground">
                    {plan.paymentType}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.discount && (
                    <Badge variant="secondary" className="text-success">
                      {plan.discount}
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => handleSubscribe(plan.id, plan.priceId)}
                  disabled={checkoutLoading === plan.id || isCurrentPlan}
                  className={`w-full ${
                    isCurrentPlan
                      ? "neon-glow-success bg-success text-success-foreground"
                      : plan.popular || plan.id === "vitalicio"
                        ? "neon-button" 
                        : "neon-glow-accent"
                  }`}
                  size="lg"
                >
                  {checkoutLoading === plan.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : isCurrentPlan ? (
                    "Plano Atual"
                  ) : (
                    "Assinar Agora"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="text-center space-y-4 pt-8">
        <p className="text-sm text-muted-foreground">
          Todos os planos incluem suporte ao cliente e atualizações automáticas.
        </p>
        <p className="text-sm text-muted-foreground">
          Cancele a qualquer momento. Política de reembolso de 7 dias.
        </p>
      </div>
    </div>
  );
}