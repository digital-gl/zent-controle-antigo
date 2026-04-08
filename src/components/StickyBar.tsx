import { useState, useEffect } from 'react';

const StickyBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] sticky-bar-enter flex items-center justify-between px-5 md:px-10"
      style={{
        height: '64px',
        background: 'linear-gradient(135deg, #000005 0%, #000D30 50%, #000005 100%)',
        borderTop: '1px solid rgba(212, 168, 67, 0.5)',
      }}
    >
      <p className="gold-text text-sm sm:text-base font-medium hidden sm:block">
        Diagnóstico da Porta Neural · R$ 49
      </p>
      <a href="#oferta" className="cta-button text-xs sm:text-sm py-2.5 px-5 mx-auto sm:mx-0">
        QUERO ACESSAR AGORA
      </a>
    </div>
  );
};

export default StickyBar;
