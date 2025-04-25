import React from 'react';
import { Stack } from 'expo-router';
import { ChatContextProvider } from '../../contexts/ChatContext';

export default function ChatLayout() {
  return (
    <ChatContextProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Conversations',
            headerLargeTitle: true,
          }} 
        />
        <Stack.Screen 
          name="[id]" 
          options={{ 
            title: '',
            headerBackTitle: 'Back',
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: 'Chat Settings',
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="search" 
          options={{ 
            title: 'Search Messages',
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="voice-input" 
          options={{ 
            title: 'Voice Message',
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="file-upload" 
          options={{ 
            title: 'Share File',
            presentation: 'modal',
          }} 
        />
      </Stack>
    </ChatContextProvider>
  );
}