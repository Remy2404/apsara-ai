import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  
  const handleResetPassword = () => {
    // In a real app, we would send a reset email here
    setEmailSent(true);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6 pt-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-6"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View className="mb-8">
            <Text className="text-2xl text-white font-bold mb-2">
              Reset Password
            </Text>
            <Text className="text-gray-400">
              {emailSent 
                ? "We've sent password reset instructions to your email." 
                : "Enter your email address and we'll send you instructions to reset your password."}
            </Text>
          </View>
          
          {!emailSent ? (
            <>
              <View className="mb-6">
                <Text className="text-gray-400 mb-2">Email Address</Text>
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
              
              <TouchableOpacity 
                className="bg-primary-600 py-4 rounded-full mb-4"
                onPress={handleResetPassword}
                disabled={!email.trim()}
              >
                <Text className="text-white font-semibold text-center">
                  Send Reset Link
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View className="items-center">
              <View className="w-20 h-20 rounded-full bg-primary-600/20 items-center justify-center mb-6">
                <Ionicons name="mail" size={36} color="#10a37f" />
              </View>
              
              <TouchableOpacity 
                className="bg-primary-600 py-4 rounded-full w-full mb-4"
                onPress={() => router.push('/(auth)/login')}
              >
                <Text className="text-white font-semibold text-center">
                  Back to Login
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => setEmailSent(false)}>
                <Text className="text-primary-500">Send Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}