import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import * as Haptics from 'expo-haptics';
import { z } from 'zod';

interface RegisterFormProps {
  onLoginPress: () => void;
}

export const RegisterForm = ({ onLoginPress }: RegisterFormProps) => {
  const { theme, isDark } = useTheme();
  const { register } = useAuth();
  const router = useRouter();
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  
  const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
  
  const validateForm = () => {
    try {
      registerSchema.parse({ name, email, password, confirmPassword });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as string;
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };
  
  const handleRegister = async () => {
    if (!validateForm()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    
    try {
      setIsLoading(true);
      setErrors({});
      
      await register({ email, password, name });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Navigate to main app
      router.replace('/(main)/home');
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setErrors({
        general: error instanceof Error ? error.message : 'Registration failed. Please try again.'
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
      
      {/* Name Input */}
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
          Full Name
        </Text>
        <View 
          className={`flex-row items-center border rounded-lg p-3 bg-white dark:bg-gray-800 ${
            errors.name 
              ? 'border-red-500' 
              : 'border-gray-300 dark:border-gray-700'
          }`}
        >
          <Ionicons 
            name="person-outline" 
            size={18} 
            color={isDark ? theme.colors.textSecondary : '#6B7280'}
          />
          <TextInput
            className="flex-1 ml-2 text-text-light dark:text-text-dark"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
            autoCapitalize="words"
            autoComplete="name"
          />
        </View>
        {errors.name && (
          <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>
        )}
      </View>
      
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
      
      {/* Confirm Password Input */}
      <View className="mb-6">
        <Text className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
          Confirm Password
        </Text>
        <View 
          className={`flex-row items-center border rounded-lg p-3 bg-white dark:bg-gray-800 ${
            errors.confirmPassword 
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons 
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={18} 
              color={isDark ? theme.colors.textSecondary : '#6B7280'}
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text>
        )}
      </View>
      
      {/* Register Button */}
      <TouchableOpacity
        onPress={handleRegister}
        disabled={isLoading}
        className={`rounded-lg bg-primary py-3 items-center ${
          isLoading ? 'opacity-70' : ''
        }`}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white font-medium text-base">
            Create Account
          </Text>
        )}
      </TouchableOpacity>
      
      {/* Login Option */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600 dark:text-gray-400">
          Already have an account?
        </Text>
        <TouchableOpacity onPress={onLoginPress} className="ml-1">
          <Text className="text-primary dark:text-primary-light font-medium">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};