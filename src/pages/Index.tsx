import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useFinancial } from "@/contexts/FinancialContext";
import { 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  Target,
  CreditCard,
  PieChart
} from "lucide-react";

export default function Index() {
  const { user, loading, profile } = useAuth();
  const { getMonthlyIncome, getMonthlyExpenses, getMonthlyBalance, subscriptions } = useFinancial();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Carregando...</h2>
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">
          Bem-vindo ao ZENT{profile ? `, ${profile.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Seu centro de controle financeiro completo. Gerencie suas finanças, 
          investimentos e metas de forma inteligente.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Dashboard</CardTitle>
            <CardDescription>
              Visão geral das suas finanças
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">Acessar Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg">Receitas</CardTitle>
            <CardDescription>
              Gerencie suas fontes de renda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/receitas">Ver Receitas</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
              <Wallet className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-lg">Gastos</CardTitle>
            <CardDescription>
              Controle seus gastos mensais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/gastos">Ver Gastos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
              <PieChart className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Investimentos</CardTitle>
            <CardDescription>
              Acompanhe sua carteira
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/investimentos">Ver Investimentos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-lg">Metas</CardTitle>
            <CardDescription>
              Defina e acompanhe objetivos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/metas">Ver Metas</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-2">
              <CreditCard className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Assinaturas</CardTitle>
            <CardDescription>
              Gerencie gastos recorrentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/assinaturas">Ver Assinaturas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Resumo Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              R$ {(getMonthlyIncome(new Date())).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-muted-foreground">Receitas deste mês</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              R$ {(getMonthlyExpenses(new Date()) + subscriptions
                .filter(s => {
                  if (!s.isActive) return false;
                  const paymentDate = new Date(s.nextPayment);
                  const currentDate = new Date();
                  return paymentDate.getFullYear() === currentDate.getFullYear() && 
                         paymentDate.getMonth() === currentDate.getMonth();
                })
                .reduce((total, s) => total + s.amount, 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-muted-foreground">Gastos deste mês</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              R$ {getMonthlyBalance(new Date()).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-muted-foreground">Saldo atual</p>
          </div>
        </div>
      </div>
    </div>
  );
}