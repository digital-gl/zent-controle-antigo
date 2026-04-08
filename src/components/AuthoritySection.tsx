import { GraduationCap, Globe, Award, Briefcase } from "lucide-react";

const credentials = [
  { icon: GraduationCap, label: "Rigor Acadêmico", text: "Mestre pela USP com vivência e especialização em Londres." },
  { icon: Globe, label: "Certificação Global", text: "Hipnoterapeuta Clínico associado à HYA (The International Hypnosis Association – EUA)." },
  { icon: Award, label: "Expertise Técnica", text: "Practitioner em PNL, focado no desmonte de bloqueios subconscientes profundos." },
  { icon: Briefcase, label: "Visão de Campo", text: "Como empresário e advogado, Lucas compreende a pressão real e biológica de quem gere patrimônios e vidas." },
];

export const AuthoritySection = () => (
  <section id="autoridade" className="py-20 sm:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Photo placeholder */}
        <div className="order-2 lg:order-1">
          <div className="bg-brutal-sage border-brutal rounded-xl shadow-brutal-xl p-12 flex flex-col items-center justify-center aspect-square max-w-md mx-auto">
            <div className="w-32 h-32 bg-brutal-charcoal rounded-xl border-brutal flex items-center justify-center mb-6">
              <span className="text-4xl font-extrabold text-brutal-yellow font-heading">LM</span>
            </div>
            <p className="text-sm font-bold text-brutal-charcoal uppercase tracking-[0.2em]">Lucas Marsili</p>
            <p className="text-xs text-brutal-charcoal/60 mt-1">Engenharia Comportamental</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brutal-charcoal tracking-tighter mb-4 font-heading">
            O AUDITOR DA{" "}
            <span className="bg-brutal-yellow px-2">SUA MENTE.</span>
          </h2>
          <p className="text-lg text-brutal-charcoal/70 mb-10">
            Lucas Marsili. Especialista em Engenharia Comportamental.
          </p>

          <div className="space-y-4">
            {credentials.map((cred) => (
              <div key={cred.label} className="flex items-start gap-4 bg-muted border-brutal rounded-xl p-5 shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
                <div className="w-10 h-10 bg-brutal-yellow rounded-lg border-brutal flex items-center justify-center shrink-0">
                  <cred.icon className="w-5 h-5 text-brutal-charcoal" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-brutal-charcoal font-heading">{cred.label}</p>
                  <p className="text-sm text-brutal-charcoal/70 leading-relaxed mt-1">{cred.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
