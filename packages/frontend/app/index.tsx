import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../hooks/useTheme';

export default function Index() {
  const { theme } = useTheme();
  
  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark items-center justify-center p-6">
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-primary dark:text-primary-light mb-2">
          Apsara AI
        </Text>
        <Text className="text-lg text-text-light dark:text-text-dark text-center">
          Your intelligent AI assistant, ready to help
        </Text>
      </View>
      
      <View className="w-full max-w-md gap-4">
        <Link href="/(auth)/login" asChild>
          <Pressable className="bg-primary py-4 rounded-lg w-full items-center">
            <Text className="text-white font-bold text-lg">Login</Text>
          </Pressable>
        </Link>
        
        <Link href="/(auth)/register" asChild>
          <Pressable className="bg-transparent border border-primary py-4 rounded-lg w-full items-center">
            <Text className="text-primary dark:text-primary-light font-bold text-lg">Register</Text>
          </Pressable>
        </Link>
        
        <Link href="/(onboarding)/intro" asChild>
          <Pressable className="mt-4 py-2 rounded-lg w-full items-center">
            <Text className="text-text-light dark:text-text-dark underline">Take a tour</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}