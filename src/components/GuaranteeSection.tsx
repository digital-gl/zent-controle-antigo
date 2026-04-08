import { Shield } from "lucide-react";

export const GuaranteeSection = () => (
  <section className="py-20 sm:py-28 bg-card">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-cyber/15 flex items-center justify-center mx-auto mb-8">
        <Shield className="w-10 h-10 text-cyber" />
      </div>
      <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight mb-6">
        LIBERDADE OU{" "}
        <span className="text-cyber">REEMBOLSO INTEGRAL.</span>
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
        Eu confio tanto na precisão técnica deste protocolo que o risco é 100% meu. 
        Se após acessar o diagnóstico você não obtiver a clareza prometida sobre os seus bloqueios, 
        basta enviar um e-mail. Devolveremos todo o seu investimento imediatamente, sem perguntas. 
        O único risco real é você continuar a pilotar a sua empresa no escuro.
      </p>
    </div>
  </section>
);
