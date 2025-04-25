import '../global.css';
import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { AuthContextProvider } from '../contexts/AuthContext';
import { ProfileContextProvider } from '../contexts/ProfileContext';
import { ChatContextProvider } from '../contexts/ChatContext';
import { AIContextProvider } from '../contexts/AIContext';
import SplashScreen from '../components/auth/SplashScreen';
import * as SplashScreenModule from 'expo-splash-screen';

// Prevent auto-hiding the splash screen
SplashScreenModule.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        await Font.loadAsync({
          'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
        });
        
        // Simulate some loading time if needed (remove in production)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        
        // Hide the native splash screen
        await SplashScreenModule.hideAsync();
      }
    }

    prepare();
  }, []);

  // Handle navigation and splash screen separately from app readiness
  useEffect(() => {
    if (appIsReady && !showSplash) {
      // Navigation is now safe since the component is rendered with a Slot
      router.replace('/(onboarding)/welcome');
    }
  }, [appIsReady, showSplash, router]);

  // Handle hiding splash screen separately
  useEffect(() => {
    if (appIsReady) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [appIsReady]);

  if (!appIsReady || showSplash) {
    return <SplashScreen />;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <AuthContextProvider>
          <ThemeContextProvider>
            <ProfileContextProvider>
              <ChatContextProvider>
                <AIContextProvider>
                  <Slot />
                </AIContextProvider>
              </ChatContextProvider>
            </ProfileContextProvider>
          </ThemeContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}