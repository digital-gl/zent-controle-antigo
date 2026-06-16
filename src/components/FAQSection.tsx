import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    q: "Como funciona o contrato?",
    a: "O contrato tem duração de 24 meses, é renovável ao final do prazo e permite reaportes a qualquer momento durante a vigência.",
  },
  {
    q: "Como recebo meu rendimento?",
    a: "A rentabilidade é creditada mensalmente conforme acordado em contrato. Você acompanha tudo de forma transparente.",
  },
  {
    q: "Qual o investimento mínimo?",
    a: "Aceitamos investimentos a partir de R$ 1.000. Quanto maior o aporte, maior a taxa de rentabilidade mensal.",
  },
  {
    q: "Como funciona o programa de indicação?",
    a: "Você recebe 10% sobre o primeiro aporte do seu indicado e +1% ao mês sobre o volume total de todos os seus indicados ativos, sem limite.",
  },
  {
    q: "A empresa é registrada?",
    a: "Sim. CNPJ 66.800.082/0001-67, W. Luis Venancio Gonzaga LTDA, Nome Fantasia The W Consultoria e Tecnologia, Sociedade Empresária Limitada, ativa desde maio de 2026.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="bg-dark-radial py-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl gold-text text-center mb-12"
        >
          Perguntas Frequentes
        </motion.h2>

        <Accordion type="single" collapsible className="space-y-3">
          {faq.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <AccordionItem
                value={`item-${i}`}
                className="liquid-glass rounded-xl px-5 border-none"
              >
                <AccordionTrigger className="text-left text-[#F0F4F8] hover:text-[#F5D87A] font-display text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#A8B8C8] text-sm leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
