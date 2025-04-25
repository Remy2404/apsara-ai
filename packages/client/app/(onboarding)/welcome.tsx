import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#f0d4ff', '#d5deff', '#ffcce6']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.9, y: 0.9 }}
      className="flex-1"
    >
      <StatusBar style="dark" />
      
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl font-bold text-center mb-16 mt-8">
          Welcome to{'\n'}Apsara AI 👋
        </Text>
      </View>
      
      <View className="px-6 pb-10">
        <TouchableOpacity 
          className="bg-indigo-500 rounded-full py-4 mb-4"
          onPress={() => router.push('/(auth)/login')}
        >
          <Text className="text-white text-center font-semibold text-base">
            Log in
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-white rounded-full py-4 mb-6"
          onPress={() => router.push('/(auth)/register')}
        >
          <Text className="text-black text-center font-semibold text-base">
            Sign up
          </Text>
        </TouchableOpacity>
        
        <View className="flex-row items-center justify-center mb-6">
          <Text className="text-gray-700 text-sm">or continue with</Text>
        </View>
        
        <View className="flex-row justify-center space-x-4">
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center">
            <Image 
              source={require('../../assets/images/google-logo.png')}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center">
            <Image 
              source={require('../../assets/images/github-logo.png')}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center">
            <Image 
              source={require('../../assets/images/facebook-logo.png')}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}