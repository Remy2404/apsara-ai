import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegisterScreen() {
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
            Create Account
          </Text>
          <Text className="text-gray-400 mb-8">
            Sign up to access all features of Apsara AI
          </Text>
          
          <RegisterForm />
          
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-800" />
            <Text className="text-gray-500 px-4">OR</Text>
            <View className="flex-1 h-px bg-gray-800" />
          </View>
          
          <View className="flex-row justify-center mb-8">
            <Text className="text-gray-400">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text className="text-primary-500">Sign In</Text>
            </TouchableOpacity>
          </View>
          
          <Text className="text-xs text-center text-gray-500 mb-6">
            By signing up, you agree to our{' '}
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