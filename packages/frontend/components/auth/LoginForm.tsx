import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import * as Haptics from 'expo-haptics';
import { z } from 'zod';

interface LoginFormProps {
  onForgotPassword: () => void;
  onRegisterPress: () => void;
}

export const LoginForm = ({
  onForgotPassword,
  onRegisterPress,
}: LoginFormProps) => {
  const { theme, isDark } = useTheme();
  const { login } = useAuth();
  const router = useRouter();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  
  const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });
  
  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (typeof err.path[0] === 'string') {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    
    try {
      setIsLoading(true);
      setErrors({});
      
      await login({ email, password });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Navigate to main app
      router.replace('/(main)/home');
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to login. Please check your credentials.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View className="w-full">
      {/* General error message */}
      {errors.general && (
        <View className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mb-4">
          <Text className="text-red-700 dark:text-red-400">{errors.general}</Text>
        </View>
      )}
      
      {/* Email Input */}
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
          Email Address
        </Text>
        <View 
          className={`flex-row items-center border rounded-lg p-3 bg-white dark:bg-gray-800 ${
            errors.email 
              ? 'border-red-500' 
              : 'border-gray-300 dark:border-gray-700'
          }`}
        >
          <Ionicons 
            name="mail-outline" 
            size={18} 
            color={isDark ? theme.colors.textSecondary : '#6B7280'}
          />
          <TextInput
            className="flex-1 ml-2 text-text-light dark:text-text-dark"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
          />
        </View>
        {errors.email && (
          <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
        )}
      </View>
      
      {/* Password Input */}
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
          Password
        </Text>
        <View 
          className={`flex-row items-center border rounded-lg p-3 bg-white dark:bg-gray-800 ${
            errors.password 
              ? 'border-red-500' 
              : 'border-gray-300 dark:border-gray-700'
          }`}
        >
          <Ionicons 
            name="lock-closed-outline" 
            size={18} 
            color={isDark ? theme.colors.textSecondary : '#6B7280'}
          />
          <TextInput
            className="flex-1 ml-2 text-text-light dark:text-text-dark"
            value={password}
            onChangeText={setPassword}
            placeholder="Min. 8 characters"
            placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={18} 
              color={isDark ? theme.colors.textSecondary : '#6B7280'}
            />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
        )}
      </View>
      
      {/* Forgot Password */}
      <TouchableOpacity 
        onPress={onForgotPassword}
        className="self-end mb-6"
      >
        <Text className="text-primary dark:text-primary-light">
          Forgot password?
        </Text>
      </TouchableOpacity>
      
      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={isLoading}
        className={`rounded-lg bg-primary py-3 items-center ${
          isLoading ? 'opacity-70' : ''
        }`}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white font-medium text-base">
            Login
          </Text>
        )}
      </TouchableOpacity>
      
      {/* Register Option */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600 dark:text-gray-400">
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={onRegisterPress} className="ml-1">
          <Text className="text-primary dark:text-primary-light font-medium">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};