import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Define theme types
type ThemePreference = 'light' | 'dark' | 'system';
type ActiveTheme = 'light' | 'dark';

// Define context type
interface ThemeContextType {
  theme: ThemePreference;
  activeTheme: ActiveTheme;
  setTheme: (theme: ThemePreference) => Promise<void>;
  toggleTheme: () => void;
  isSystemTheme: boolean;
}

// Create context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define theme storage key
const THEME_PREFERENCE_KEY = 'apsara_theme_preference';

// Provider component
export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemePreference>('system');
  const [activeTheme, setActiveTheme] = useState<ActiveTheme>(systemColorScheme || 'light');
  
  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await SecureStore.getItemAsync(THEME_PREFERENCE_KEY);
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeState(savedTheme as ThemePreference);
        }
      } catch (e) {
        console.error('Failed to load theme preference:', e);
      }
    };
    
    loadThemePreference();
  }, []);
  
  // Update active theme whenever theme or system preference changes
  useEffect(() => {
    if (theme === 'system') {
      setActiveTheme(systemColorScheme || 'light');
    } else {
      setActiveTheme(theme);
    }
  }, [theme, systemColorScheme]);
  
  // Set theme with persistence
  const setTheme = useCallback(async (newTheme: ThemePreference) => {
    try {
      await SecureStore.setItemAsync(THEME_PREFERENCE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  }, []);
  
  // Toggle between light and dark (keeping system as is)
  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    }
    // If system, keep it as system
  }, [theme, setTheme]);
  
  // Context value
  const value = {
    theme,
    activeTheme,
    setTheme,
    toggleTheme,
    isSystemTheme: theme === 'system'
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}