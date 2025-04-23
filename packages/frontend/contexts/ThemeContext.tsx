import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme } from '../themes/light';
import { darkTheme } from '../themes/dark';

export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: typeof lightTheme;
  themeType: ThemeType;
  setThemeType: (theme: ThemeType) => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeType: 'system',
  setThemeType: () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('system');

  // Get the effective theme based on system or user preference
  const getEffectiveThemeType = (): 'light' | 'dark' => {
    if (themeType === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return themeType;
  };

  const effectiveTheme = getEffectiveThemeType();
  const theme = effectiveTheme === 'dark' ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        setThemeType,
        isDark: effectiveTheme === 'dark'
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};