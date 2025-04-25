import { useState, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

// Define theme storage key
const THEME_PREFERENCE_KEY = 'apsara_theme_preference';

export function useTheme() {
  // Get the theme context
  const context = useContext(ThemeContext);

  // If the context exists, use it
  if (context) {
    return context;
  }

  // Fallback implementation if used outside ThemeContext
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('system');
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(systemColorScheme || 'light');

  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await SecureStore.getItemAsync(THEME_PREFERENCE_KEY);
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeState(savedTheme as 'light' | 'dark' | 'system');
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
  const setTheme = useCallback(async (newTheme: 'light' | 'dark' | 'system') => {
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

  return {
    theme,           // Current theme preference ('light', 'dark', or 'system')
    activeTheme,     // Actual active theme ('light' or 'dark')
    setTheme,        // Function to change theme
    toggleTheme,     // Function to toggle between light/dark
    isSystemTheme: theme === 'system'
  };
}