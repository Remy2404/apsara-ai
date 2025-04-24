import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    // In a real app, you would validate inputs and make an API call
    if (!email || !password) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBar style="light" />
          
          {/* Logo and Header */}
          <View className="items-center justify-center pt-12 pb-8">
            <LinearGradient
              colors={['rgba(16, 163, 127, 0.3)', 'rgba(16, 163, 127, 0)']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="w-24 h-24 items-center justify-center rounded-2xl mb-6"
            >
              <Image
                source={require('../../assets/images/logo.png')}
                className="w-16 h-16"
                resizeMode="contain"
              />
            </LinearGradient>
            <Text className="text-3xl font-bold text-white mb-2">Welcome Back</Text>
            <Text className="text-gray-400 text-center max-w-xs">
              Sign in to continue using Apsara AI, your intelligent assistant
            </Text>
          </View>
          
          {/* Login Form */}
          <View className="px-6 pt-6">
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Ionicons name="mail-outline" size={20} color="#71717a" />}
              className="mb-4"
            />
            
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#71717a" />}
              rightIcon={
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#71717a" 
                />
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
              className="mb-2"
            />
            
            <TouchableOpacity 
              onPress={() => router.push('/auth/forgot-password')}
              className="self-end mb-6"
            >
              <Text className="text-primary text-sm">Forgot Password?</Text>
            </TouchableOpacity>
            
            <Button
              title="Sign In"
              onPress={handleLogin}
              isLoading={isLoading}
              size="lg"
              className="mb-6"
            />
            
            {/* Social Login Options */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-0.5 bg-gray-700" />
              <Text className="mx-4 text-gray-400">Or continue with</Text>
              <View className="flex-1 h-0.5 bg-gray-700" />
            </View>
            
            <View className="flex-row justify-center space-x-6">
              <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-full bg-secondary-800 border border-gray-700">
                <Ionicons name="logo-google" size={22} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-full bg-secondary-800 border border-gray-700">
                <Ionicons name="logo-apple" size={22} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-full bg-secondary-800 border border-gray-700">
                <Ionicons name="logo-facebook" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-8 mb-6">
            <Text className="text-gray-400">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text className="text-primary ml-1">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}