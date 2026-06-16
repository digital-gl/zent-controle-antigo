import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  { q: "Como funciona o modelo de sócio investidor?", a: "Você formaliza um contrato de sociedade com a The W. Seu capital passa a ser operado pela nossa mesa junto ao capital da casa, seguindo a mesma estratégia." },
  { q: "Qual o aporte mínimo?", a: "O aporte mínimo é definido durante o onboarding, de acordo com o perfil do investidor e a vaga disponível." },
  { q: "Como recebo os resultados?", a: "Você acompanha tudo em um dashboard ao vivo e recebe relatórios mensais detalhados de performance e risco." },
  { q: "Existe garantia de rentabilidade?", a: "Nenhuma operação de mercado oferece garantia. O que entregamos é processo, gestão de risco e transparência total." },
  { q: "Posso resgatar o capital quando quiser?", a: "As regras de resgate são definidas em contrato, com janelas claras para aporte e retirada." },
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
          Perguntas frequentes.
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
