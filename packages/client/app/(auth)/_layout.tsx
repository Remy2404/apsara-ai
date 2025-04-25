import React from 'react';
import { View, StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AuthLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View className="flex-1 bg-secondary-900">
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}