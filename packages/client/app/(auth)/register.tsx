import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    // In a real app, you would validate inputs and make an API call
    if (!name || !email || !password) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/verify');
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
          
          {/* Header */}
          <View className="flex-row items-center px-4 pt-4">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="p-2"
              hitSlop={8}
            >
              <Ionicons name="arrow-back" size={24} color="#f9fafb" />
            </TouchableOpacity>
          </View>
          
          {/* Logo and Header */}
          <View className="items-center justify-center pt-8 pb-8">
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
            <Text className="text-3xl font-bold text-white mb-2">Create Account</Text>
            <Text className="text-gray-400 text-center max-w-xs">
              Join Apsara AI and experience the power of artificial intelligence
            </Text>
          </View>
          
          {/* Registration Form */}
          <View className="px-6 pt-6">
            <Input
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              autoCapitalize="words"
              leftIcon={<Ionicons name="person-outline" size={20} color="#71717a" />}
              className="mb-4"
            />
            
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
              placeholder="Create a password"
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
              className="mb-6"
            />
            
            <Button
              title="Create Account"
              onPress={handleRegister}
              isLoading={isLoading}
              size="lg"
              className="mb-6"
            />
            
            {/* Terms and Conditions */}
            <Text className="text-center text-gray-400 text-sm mb-6">
              By signing up, you agree to our{' '}
              <Text className="text-primary" onPress={() => router.push('/settings/terms')}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text className="text-primary" onPress={() => router.push('/settings/privacy')}>
                Privacy Policy
              </Text>
            </Text>
            
            {/* Social Registration Options */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-0.5 bg-gray-700" />
              <Text className="mx-4 text-gray-400">Or sign up with</Text>
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
          
          {/* Login Link */}
          <View className="flex-row justify-center mt-8 mb-6">
            <Text className="text-gray-400">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text className="text-primary ml-1">Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}