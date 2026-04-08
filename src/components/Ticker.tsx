interface TickerProps {
  items: string[];
}

const Ticker = ({ items }: TickerProps) => {
  const separator = <span className="mx-4 text-xs" style={{ color: '#040D2E' }}>◆</span>;
  
  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="flex items-center shrink-0">
        <span className="text-xs sm:text-sm uppercase tracking-widest whitespace-nowrap font-medium" style={{ color: '#040D2E' }}>
          {item}
        </span>
        {separator}
      </span>
    ));

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #7A5520 0%, #D4A843 25%, #F5D87A 50%, #D4A843 75%, #A07830 100%)',
        boxShadow: '0 0 20px rgba(212, 168, 67, 0.4), inset 0 0 30px rgba(245, 216, 122, 0.15)',
      }}
    >
      <div
        className="w-full"
        style={{
          borderTop: '2px solid #040D2E',
          borderBottom: '2px solid #040D2E',
        }}
      >
        <div className="py-3.5 overflow-hidden">
          <div className="ticker-track">
            {renderItems()}
            {renderItems()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
