import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { FinancialProvider } from "@/contexts/FinancialContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PremiumProvider } from "@/contexts/PremiumContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { UpgradeModal } from "@/components/UpgradeModal";
import { OperationsLimitBadge } from "@/components/OperationsLimitBadge";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Receitas from "./pages/Receitas";
import Gastos from "./pages/Gastos";
import Assinaturas from "./pages/Assinaturas";
import Investimentos from "./pages/Investimentos";
import Metas from "./pages/Metas";
import Premium from "./pages/Premium";

import Configuracoes from "./pages/Configuracoes";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <PremiumProvider>
            <FinancialProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/*" element={<AppLayout />} />
              </Routes>
            </BrowserRouter>
            </FinancialProvider>
          </PremiumProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const AppLayout = () => (
  <SidebarProvider>
    <UpgradeModal />
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 border-b neon-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <SidebarTrigger className="neon-glow" />
              <div className="ml-2 sm:ml-4">
                <span className="text-lg sm:text-xl font-bold neon-text">ZENT</span>
              </div>
            </div>
            <div className="flex sm:hidden">
              <OperationsLimitBadge />
            </div>
            <div className="hidden sm:flex">
              <OperationsLimitBadge />
            </div>
          </div>
        </header>
        <div className="flex-1 bg-gradient-to-br from-background via-card to-secondary/20">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/receitas" element={<Receitas />} />
            <Route path="/gastos" element={<Gastos />} />
            <Route path="/assinaturas" element={<Assinaturas />} />
            <Route path="/investimentos" element={<Investimentos />} />
            <Route path="/metas" element={<Metas />} />
            <Route path="/premium" element={<Premium />} />
            
            <Route path="/configuracoes" element={<Configuracoes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  </SidebarProvider>
);

export default App;
