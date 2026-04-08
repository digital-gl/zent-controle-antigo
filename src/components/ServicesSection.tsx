import { BookOpen, TrendingUp, BarChart3, Wallet, Smartphone } from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Mentoria ao Vivo",
    description: "Aulas ao vivo com operações reais no mercado Forex. Aprenda Smart Money Concepts diretamente com Washington Venâncio.",
  },
  {
    icon: TrendingUp,
    title: "Investimento com 5% ao Mês",
    description: "Rendimento mensal garantido a partir de R$ 300,00. Sua porta de entrada para o mercado financeiro global.",
  },
  {
    icon: BarChart3,
    title: "Cadeia de Crescimento",
    description: "Estratégia completa: Cofre → Tesouro → FIIs → Fundos → Aporte Mensal. Construa patrimônio de forma inteligente.",
  },
  {
    icon: Wallet,
    title: "Sociedade de Investimento",
    description: "Torne-se sócio-investidor e obtenha retornos superiores ao mercado tradicional, com acompanhamento profissional.",
  },
  {
    icon: Smartphone,
    title: "App de Resultados Diários",
    description: "Acompanhe seus rendimentos e resultados diariamente pelo nosso aplicativo exclusivo. Transparência total.",
  },
];

export const ServicesSection = () => (
  <section id="servicos" className="py-20 sm:py-28 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold gradient-gold-text mb-4">Nossos Serviços</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Soluções completas para quem quer aprender a operar e investir no mercado Forex
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="gold-border-frame p-6 bg-card hover:bg-secondary/50 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <service.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
