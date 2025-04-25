import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  // We'll implement this hook later, for now just mock the login function
  const { login } = useAuth ? useAuth() : { login: async () => true };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      // In a real app, this would call your auth service
      await login(email, password);
      // Navigate to home screen on success
      router.replace('/(main)/home');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        email: 'Invalid email or password' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {/* Email Input */}
      <View className="mb-4">
        <Text className="text-gray-400 mb-2">Email</Text>
        <View className="relative">
          <TextInput
            className={`bg-secondary-800 text-white px-4 py-3 rounded-lg ${errors.email ? 'border border-red-500' : ''}`}
            placeholder="Your email address"
            placeholderTextColor="#6b7280"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && (
            <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
          )}
        </View>
      </View>
      
      {/* Password Input */}
      <View className="mb-4">
        <Text className="text-gray-400 mb-2">Password</Text>
        <View className="relative">
          <TextInput
            className={`bg-secondary-800 text-white px-4 py-3 rounded-lg pr-10 ${errors.password ? 'border border-red-500' : ''}`}
            placeholder="Your password"
            placeholderTextColor="#6b7280"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#6b7280"
            />
          </TouchableOpacity>
          {errors.password && (
            <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
          )}
        </View>
      </View>
      
      {/* Forgot Password */}
      <TouchableOpacity 
        className="self-end mb-6" 
        onPress={() => router.push('/(auth)/forgot-password')}
      >
        <Text className="text-primary-500">Forgot password?</Text>
      </TouchableOpacity>
      
      {/* Login Button */}
      <TouchableOpacity
        className={`rounded-lg py-4 px-6 ${isLoading ? 'bg-primary-700' : 'bg-primary-600'}`}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold text-center">Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}