import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Package, CreditCard, Repeat, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Price {
  id: string;
  currency: string;
  unit_amount: number | null;
  recurring: any;
  type: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  prices: Price[];
}

interface ProductsResponse {
  products: Product[];
  summary: {
    total_products: number;
    total_prices: number;
    recurring_products: number;
    one_time_products: number;
  };
}

export function StripeProductsAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('list-stripe-products');
      
      if (error) throw error;
      
      setProducts(data);
      toast({
        title: "Produtos carregados!",
        description: `Encontrados ${data.summary.total_products} produtos no Stripe.`,
      });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos do Stripe.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount: number | null, currency: string) => {
    if (!amount) return "Grátis";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getRecurringText = (recurring: any) => {
    if (!recurring) return null;
    return `/${recurring.interval === 'month' ? 'mês' : recurring.interval === 'year' ? 'ano' : recurring.interval}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Analisador de Produtos Stripe
          </CardTitle>
          <CardDescription>
            Identifique automaticamente seus produtos e preços do Stripe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={fetchProducts} 
            disabled={loading}
            className="neon-button"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Carregando produtos...
              </>
            ) : (
              <>
                <Package className="h-4 w-4 mr-2" />
                Carregar Produtos do Stripe
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {products && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Resumo dos Produtos</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{products.summary.total_products}</div>
                <div className="text-sm text-muted-foreground">Total de Produtos</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{products.summary.total_prices}</div>
                <div className="text-sm text-muted-foreground">Preços</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <Repeat className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{products.summary.recurring_products}</div>
                <div className="text-sm text-muted-foreground">Assinaturas</div>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{products.summary.one_time_products}</div>
                <div className="text-sm text-muted-foreground">Pagamento Único</div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Produtos Encontrados</h3>
            {products.products.map((product) => (
              <Card key={product.id} className="neon-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {product.name}
                    </CardTitle>
                    <Badge variant={product.active ? "default" : "secondary"}>
                      {product.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  {product.description && (
                    <CardDescription>{product.description}</CardDescription>
                  )}
                  <div className="text-xs text-muted-foreground font-mono">
                    ID: {product.id}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium">Preços:</h4>
                    {product.prices.map((price) => (
                      <div 
                        key={price.id} 
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          {price.type === 'recurring' ? (
                            <Repeat className="h-4 w-4 text-green-500" />
                          ) : (
                            <CreditCard className="h-4 w-4 text-blue-500" />
                          )}
                          <div>
                            <div className="font-medium">
                              {formatPrice(price.unit_amount, price.currency)}
                              {price.recurring && getRecurringText(price.recurring)}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">
                              ID: {price.id}
                            </div>
                          </div>
                        </div>
                        <Badge variant={price.type === 'recurring' ? "default" : "secondary"}>
                          {price.type === 'recurring' ? 'Assinatura' : 'Pagamento Único'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}