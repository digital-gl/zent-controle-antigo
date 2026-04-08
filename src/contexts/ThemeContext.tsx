import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeVersion = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeVersion;
  setTheme: (t: ThemeVersion) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeVersion>('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const getSectionBg = (theme: ThemeVersion, index: number): string => {
  if (theme === 'light' && index % 2 === 1) {
    return 'white-section';
  }
  const alts = ['bg-dark-radial', 'bg-dark-alt1', 'bg-dark-alt2', 'bg-dark-alt3', 'bg-dark-linear'];
  return alts[index % alts.length];
};

export const getSectionTextColor = (theme: ThemeVersion, index: number): string => {
  if (theme === 'light' && index % 2 === 1) {
    return 'text-[#0A1628]';
  }
  return 'text-[#F0F4F8]';
};

export const getTitleClass = (theme: ThemeVersion, index: number): string => {
  if (theme === 'light' && index % 2 === 1) {
    return 'section-title';
  }
  return 'gold-text';
};
