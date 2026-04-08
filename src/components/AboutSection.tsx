import { Award, Globe, Users, BarChart3 } from "lucide-react";
import washingtonImg from "@/assets/washington-profile.jpg";

const stats = [
  { icon: Users, value: "500+", label: "Alunos Formados" },
  { icon: BarChart3, value: "5%", label: "Rendimento Mensal" },
  { icon: Globe, value: "Brasil e América", label: "Atuação Global" },
  { icon: Award, value: "7+", label: "Anos de Experiência" },
];

export const AboutSection = () => (
  <section id="sobre" className="py-20 sm:py-28 bg-card">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative">
          <div className="gold-border-frame p-2">
            <img
              src={washingtonImg}
              alt="Washington Venâncio"
              className="w-full rounded-lg"
              loading="lazy"
              width={512}
              height={512}
            />
          </div>
          <div className="absolute -bottom-4 -right-4 gradient-gold text-primary-foreground px-6 py-3 rounded-full font-bold text-sm shadow-lg">
            Mentor & Trader
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="gradient-gold-text">Sobre Nós</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A <strong className="text-gold">Forex Comunidade de Traders</strong> é liderada por{" "}
            <strong className="text-foreground">Washington Venâncio</strong>, trader profissional com mais
            de 7 anos de experiência no mercado Forex. Nossa missão é democratizar o acesso à educação
            financeira de qualidade e criar oportunidades reais de renda passiva.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Oferecemos mentoria ao vivo com operações reais, utilizando estratégias de Smart Money Concepts.
            Atuamos no Brasil e em toda a América, conectando investidores a um ecossistema comprovado de
            crescimento patrimonial. Acompanhe resultados diários pelo nosso app exclusivo.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="gold-border-frame p-4 text-center">
                <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-2xl font-bold gradient-gold-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
