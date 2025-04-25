

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function IntroScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-32 h-32 bg-primary-600 rounded-full items-center justify-center mb-8">
          <Ionicons name="sparkles" size={64} color="white" />
        </View>
        
        <Text className="text-3xl text-white font-bold text-center mb-4">
          Welcome to Apsara AI
        </Text>
        
        <Text className="text-gray-400 text-center mb-8 px-6">
          Your intelligent AI assistant that helps you get more done through natural conversations
        </Text>
        
        <View className="w-full">
          <TouchableOpacity 
            className="bg-primary-600 py-4 rounded-full mb-4"
            onPress={() => router.push('/(onboarding)/tutorial')}
          >
            <Text className="text-white font-semibold text-center">
              Get Started
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="py-4"
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-primary-500 font-medium text-center">
              I already have an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View className="pb-8 px-6">
        <View className="flex-row justify-center">
          <View className="h-1 w-8 bg-primary-600 rounded-full mx-1" />
          <View className="h-1 w-8 bg-gray-600 rounded-full mx-1" />
          <View className="h-1 w-8 bg-gray-600 rounded-full mx-1" />
        </View>
      </View>
    </SafeAreaView>
  );
}