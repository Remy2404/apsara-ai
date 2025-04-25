import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const router = useRouter();
  const { signUp } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleRegister = async () => {
    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      // Call signup function from AuthContext
      await signUp(email, name, password);
      
      if (onSuccess) {
        onSuccess();
      } else {
        // Default navigation if no success handler provided
        router.push('/(auth)/verify');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
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
        <Text className="text-gray-400 mb-2">Full Name</Text>
        <TextInput
          className="bg-secondary-800 h-12 px-4 rounded-lg text-white"
          placeholder="Enter your name"
          placeholderTextColor="#71717a"
          value={name}
          onChangeText={setName}
          editable={!isLoading}
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
          editable={!isLoading}
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
        <Text className="text-xs text-gray-500 mt-2">
          Password must be at least 8 characters with letters, numbers, and symbols.
        </Text>
      </View>
      
      <TouchableOpacity 
        className={`py-4 rounded-full mb-4 ${isLoading ? 'bg-primary-800' : 'bg-primary-600'}`}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text className="text-white font-semibold text-center">
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}