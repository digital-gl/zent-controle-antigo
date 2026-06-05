import { useState } from 'react';
import { Brain } from 'lucide-react';
import './LuminousCard.css';

const LuminousCard = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={`luminous-card${active ? ' lumen-active' : ''}`}>
      <div className="lc-light-layer">
        <div className="lc-slit"></div>
        <div className="lc-lumen">
          <div className="lc-min"></div>
          <div className="lc-mid"></div>
          <div className="lc-hi"></div>
        </div>
        <div className="lc-darken">
          <div className="lc-sl"></div>
          <div className="lc-ll"></div>
          <div className="lc-slt"></div>
          <div className="lc-srt"></div>
        </div>
      </div>
      <div className="lc-content">
        <div className="lc-icon">
          <Brain 
            size="3.2rem" 
            className="text-[#D4A843]" 
            style={{ 
              filter: 'drop-shadow(0 0 10px rgba(212,168,67,0.5))'
            }} 
          />
        </div>
        <div className="lc-bottom">
          <h4>{active ? 'LUZ JOGADA.' : 'ILUMINE O SEU SUBCONSCIENTE!'}</h4>
          <p>
            {active ? (
              <span style={{ color: '#F5D87A', fontWeight: 600, textShadow: '0 0 10px rgba(212,168,67,0.5)' }}>
                A PORTA PODE SER ABERTA.
              </span>
            ) : (
              <span className="lc-blink-gold">CLIQUE PARA ILUMINAR.</span>
            )}
          </p>
          <div
            className={`lc-toggle${active ? ' active' : ''}`}
            onClick={() => setActive(!active)}
          >
            <div className="lc-handle"></div>
            <span>{active ? 'Desligar' : 'Iluminar'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuminousCard;
