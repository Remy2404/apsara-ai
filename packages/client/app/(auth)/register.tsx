import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleRegister = () => {
    // In a real app, we would register the user here
    router.push('/(auth)/verify');
  };
  
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
          
          <View className="mb-4">
            <Text className="text-gray-400 mb-2">Full Name</Text>
            <TextInput
              className="bg-secondary-800 h-12 px-4 rounded-lg text-white"
              placeholder="Enter your name"
              placeholderTextColor="#71717a"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-400 mb-2">Email</Text>
            <TextInput
              className="bg-secondary-800 h-12 px-4 rounded-lg text-white"
              placeholder="example@email.com"
              placeholderTextColor="#71717a"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          
          <View className="mb-6">
            <Text className="text-gray-400 mb-2">Password</Text>
            <View className="flex-row bg-secondary-800 h-12 rounded-lg overflow-hidden">
              <TextInput
                className="flex-1 px-4 text-white"
                placeholder="Create a password"
                placeholderTextColor="#71717a"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                className="px-4 items-center justify-center"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#71717a" 
                />
              </TouchableOpacity>
            </View>
            <Text className="text-xs text-gray-500 mt-2">
              Password must be at least 8 characters with letters, numbers, and symbols.
            </Text>
          </View>
          
          <TouchableOpacity 
            className="bg-primary-600 py-4 rounded-full mb-4"
            onPress={handleRegister}
          >
            <Text className="text-white font-semibold text-center">Sign Up</Text>
          </TouchableOpacity>
          
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