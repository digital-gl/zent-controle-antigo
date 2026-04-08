import { GraduationCap, Globe, Briefcase, Award } from "lucide-react";

const credentials = [
  { icon: GraduationCap, text: "Mestre pela USP com vivência e especialização em Londres." },
  { icon: Globe, text: "Hipnoterapeuta Clínico associado à HYA (The International Hypnosis Association – EUA)." },
  { icon: Award, text: "Practitioner em PNL, focado no desmonte de bloqueios subconscientes profundos." },
  { icon: Briefcase, text: "Empresário e advogado — compreende a pressão real de quem gere patrimônios e vidas." },
];

export const AuthoritySection = () => (
  <section id="autoridade" className="py-24 sm:py-32 bg-card relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Photo placeholder */}
        <div className="relative order-2 lg:order-1">
          <div className="glass-strong rounded-glass aspect-[3/4] max-w-md mx-auto flex items-center justify-center overflow-hidden">
            <div className="text-center p-8">
              <div className="w-32 h-32 rounded-full bg-cyber/20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-5xl font-bold text-cyber">LM</span>
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">Lucas Marsili</p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            O AUDITOR DA{" "}
            <span className="text-cyber">SUA MENTE.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10">
            Lucas Marsili. Especialista em Engenharia Comportamental.
          </p>

          <div className="space-y-5">
            {credentials.map((cred) => (
              <div key={cred.text} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyber/15 flex items-center justify-center shrink-0 mt-0.5">
                  <cred.icon className="w-5 h-5 text-cyber" />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{cred.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
