import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';

export default function SettingsLayout() {
  const { activeTheme } = useTheme();
  
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: activeTheme === 'dark' ? '#121212' : '#ffffff',
          },
          headerTintColor: activeTheme === 'dark' ? '#ffffff' : '#000000',
          headerBackVisible: false,
        }}
      />
    </>
  );
}