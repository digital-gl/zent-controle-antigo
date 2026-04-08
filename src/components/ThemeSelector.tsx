import { useTheme, ThemeVersion } from '@/contexts/ThemeContext';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const options: { value: ThemeVersion; label: string }[] = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'fullblue', label: 'Full Blue' },
  ];

  return (
    <div className="fixed top-4 right-4 z-[10000] flex gap-1 rounded-lg p-1" style={{ background: 'rgba(2, 11, 24, 0.8)', backdropFilter: 'blur(8px)' }}>
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => setTheme(o.value)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            theme === o.value
              ? 'gold-text font-bold'
              : 'text-[#A8B8C8] hover:text-[#F0F4F8]'
          }`}
          style={theme === o.value ? { background: 'rgba(212, 168, 67, 0.15)' } : {}}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
