import React from 'react';
import { Stack } from 'expo-router';
import { AIContextProvider } from '../../contexts/AIContext';

export default function AILayout() {
  return (
    <AIContextProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Apsara AI',
            headerLargeTitle: true,
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: 'AI Settings',
            presentation: 'card',
          }} 
        />
        <Stack.Screen 
          name="prompts" 
          options={{ 
            title: 'Prompt Library',
            presentation: 'card',
          }} 
        />
      </Stack>
    </AIContextProvider>
  );
}