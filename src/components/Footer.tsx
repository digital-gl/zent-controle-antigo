import { Instagram, Youtube, MessageCircle } from 'lucide-react';
import logoImg from '@/assets/logo-marsili.png';

const Footer = () => {
  return (
    <footer className="py-10 px-5 md:px-20 text-center" style={{ background: '#000005' }}>
      <div className="max-w-4xl mx-auto">
        <img src={logoImg} alt="Lucas Marsili" className="w-16 h-16 rounded-full mx-auto mb-6 object-cover" style={{ border: '2px solid #D4A843' }} />
        <div className="flex justify-center gap-4 mb-6">
          {[Instagram, Youtube, MessageCircle].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ border: '1px solid rgba(212, 168, 67, 0.4)', color: '#D4A843' }}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        <p className="text-[#607080] text-sm mb-1">Copy por Lucas Marsili</p>
        <p className="text-[#607080] text-sm mb-1">Lançado por BM Coproduções</p>
        <p className="text-[#607080] text-sm mb-4">Todos os Direitos reservados</p>
        <p className="text-[#607080]/60 text-xs max-w-xl mx-auto leading-relaxed">
          Aviso Legal: Este produto não substitui aconselhamento médico. Os resultados dependem da aplicação técnica do protocolo.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
