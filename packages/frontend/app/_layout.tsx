import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../themes/ThemeProvider';
import { AuthProvider } from '../contexts/AuthContext';
import { ChatProvider } from '../contexts/ChatContext';
import { AIProvider } from '../contexts/AIContext';
import '../global.css';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <AIProvider>
            <SafeAreaProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: 'transparent' },
                  animation: 'fade',
                }} 
              />
            </SafeAreaProvider>
          </AIProvider>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}