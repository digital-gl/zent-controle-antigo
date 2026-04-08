import { useState, type FormEvent } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contato" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-gold-text mb-4">Chamada de Ação Final</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Dê o primeiro passo rumo à sua liberdade financeira. Entre em contato agora.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="gold-border-frame p-6 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-muted-foreground">Brasil e América</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-muted-foreground">+55 (11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-muted-foreground">contato@forexcomunidade.com</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="block gradient-gold text-primary-foreground text-center py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity gold-glow"
            >
              💬 Falar Direto no WhatsApp
            </a>
          </div>

          <form onSubmit={handleSubmit} className="gold-border-frame p-6 bg-card space-y-5">
            <h3 className="text-xl font-bold text-foreground">Envie sua Mensagem</h3>
            <input
              type="text"
              placeholder="Seu nome"
              required
              className="w-full bg-input border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              required
              className="w-full bg-input border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="tel"
              placeholder="Seu telefone"
              className="w-full bg-input border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              placeholder="Sua mensagem"
              rows={4}
              required
              className="w-full bg-input border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <button
              type="submit"
              className="w-full gradient-gold text-primary-foreground py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              {submitted ? "Mensagem Enviada! ✓" : (
                <>
                  Enviar Mensagem <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
