import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#121212', '#1E1E1E', '#121212']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        {/* Header with logo */}
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-24 h-24 bg-primary-600/20 rounded-full items-center justify-center mb-8">
            <Ionicons name="chatbubble" size={48} color="#10a37f" />
          </View>
          
          <Text className="text-3xl font-bold text-white text-center mb-3">
            Welcome to Apsara AI
          </Text>
          
          <Text className="text-gray-400 text-center mb-8">
            Your intelligent assistant for conversations, tasks, and creative ideas
          </Text>
          
          {/* Replace missing image with a larger icon */}
          <View className="w-64 h-64 items-center justify-center mb-8">
            <Ionicons name="chatbubbles-outline" size={128} color="#10a37f" />
          </View>
        </View>
        
        {/* Bottom buttons section */}
        <View className="px-6 pb-8">
          <TouchableOpacity 
            className="bg-primary-600 rounded-full py-4 mb-4"
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-white text-center font-semibold text-base">
              Sign In
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-gray-800 border border-gray-600 rounded-full py-4 mb-8"
            onPress={() => router.push('/(auth)/register')}
          >
            <Text className="text-white text-center font-semibold text-base">
              Create Account
            </Text>
          </TouchableOpacity>
          
          <View className="flex-row justify-center">
            <View className="h-1 w-8 bg-primary-600 rounded-full mx-1" />
            <View className="h-1 w-8 bg-gray-600 rounded-full mx-1" />
            <View className="h-1 w-8 bg-gray-600 rounded-full mx-1" />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}