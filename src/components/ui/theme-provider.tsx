import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'islamic-navy' | 'islamic-green' | 'islamic-gold' | 'modern-minimal' | 'warm-earth';

interface ThemeProviderContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { id: Theme; name: string; description: string; colors: string[] }[];
}

const themes = [
  {
    id: 'light' as Theme,
    name: 'Aydınlık',
    description: 'Klasik aydınlık tema',
    colors: ['#ffffff', '#f8fafc', '#e2e8f0', '#64748b']
  },
  {
    id: 'dark' as Theme,
    name: 'Karanlık',
    description: 'Modern karanlık tema',
    colors: ['#0f172a', '#1e293b', '#334155', '#64748b']
  },
  {
    id: 'islamic-navy' as Theme,
    name: 'İslami Lacivert',
    description: 'Geleneksel İslami renkler',
    colors: ['#1e3a8a', '#3b82f6', '#dbeafe', '#f0f9ff']
  },
  {
    id: 'islamic-green' as Theme,
    name: 'İslami Yeşil',
    description: 'Huzur veren yeşil tonları',
    colors: ['#064e3b', '#059669', '#d1fae5', '#ecfdf5']
  },
  {
    id: 'islamic-gold' as Theme,
    name: 'İslami Altın',
    description: 'Sıcak altın ve kahverengi',
    colors: ['#92400e', '#f59e0b', '#fef3c7', '#fffbeb']
  },
  {
    id: 'modern-minimal' as Theme,
    name: 'Modern Minimal',
    description: 'Sade ve şık tasarım',
    colors: ['#18181b', '#27272a', '#a1a1aa', '#f4f4f5']
  },
  {
    id: 'warm-earth' as Theme,
    name: 'Sıcak Toprak',
    description: 'Doğal toprak tonları',
    colors: ['#7c2d12', '#ea580c', '#fed7aa', '#fff7ed']
  }
];

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'islamic-green',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    themes.forEach(t => root.classList.remove(t.id));
    
    // Add current theme class
    root.classList.add(theme);
    
    // Set CSS custom properties for dynamic theming
    const themeConfig = themes.find(t => t.id === theme);
    if (themeConfig) {
      root.style.setProperty('--theme-primary', themeConfig.colors[0]);
      root.style.setProperty('--theme-secondary', themeConfig.colors[1]);
      root.style.setProperty('--theme-accent', themeConfig.colors[2]);
      root.style.setProperty('--theme-background', themeConfig.colors[3]);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    themes,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};