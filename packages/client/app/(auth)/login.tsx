import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-6 mb-6"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <Text className="text-2xl text-white font-bold mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-400 mb-8">
            Sign in to continue using Apsara AI
          </Text>
          
          <LoginForm />
          
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-800" />
            <Text className="text-gray-500 px-4">OR</Text>
            <View className="flex-1 h-px bg-gray-800" />
          </View>
          
          <View className="flex-row justify-center mb-8">
            <Text className="text-gray-400">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text className="text-primary-500">Sign Up</Text>
            </TouchableOpacity>
          </View>
          
          <Text className="text-xs text-center text-gray-500 mb-6">
            By signing in, you agree to our{' '}
            <Text className="text-primary-500" onPress={() => router.push('/settings/terms')}>
              Terms of Service
            </Text>
            {' '}and{' '}
            <Text className="text-primary-500" onPress={() => router.push('/settings/privacy')}>
              Privacy Policy
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}