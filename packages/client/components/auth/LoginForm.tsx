import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '../../contexts/AuthContext';

interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
}

export default function LoginForm({ onSuccess, onForgotPassword }: LoginFormProps) {
  const router = useRouter();
  const { signIn } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      if (onSuccess) {
        onSuccess();
      } else {
        // Default navigation if no success handler provided
        router.replace('/(main)/home');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View>
      {error && (
        <View className="bg-red-800/30 px-4 py-3 rounded-lg mb-4">
          <Text className="text-red-400 text-sm">{error}</Text>
        </View>
      )}
      
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
          editable={!isLoading}
        />
      </View>
      
      <View className="mb-6">
        <Text className="text-gray-400 mb-2">Password</Text>
        <View className="flex-row bg-secondary-800 h-12 rounded-lg overflow-hidden">
          <TextInput
            className="flex-1 px-4 text-white"
            placeholder="Enter your password"
            placeholderTextColor="#71717a"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
          <TouchableOpacity 
            className="px-4 items-center justify-center"
            onPress={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#71717a" 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        className="self-end mb-6"
        onPress={onForgotPassword || (() => router.push('/(auth)/forgot-password'))}
        disabled={isLoading}
      >
        <Text className="text-primary-500 text-sm">Forgot Password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className={`py-4 rounded-full mb-4 ${isLoading ? 'bg-primary-800' : 'bg-primary-600'}`}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text className="text-white font-semibold text-center">
          {isLoading ? 'Logging in...' : 'Sign In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}