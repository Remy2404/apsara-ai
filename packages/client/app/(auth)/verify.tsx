import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VerifyScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = useRef<(TextInput | null)[]>([]);
  const [timer, setTimer] = useState(60);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timer]);
  
  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 4) {
      // Verify code logic would go here
      router.replace('/(main)/home');
    }
  };
  
  const handleResend = () => {
    // Resend verification code logic would go here
    setTimer(60);
  };
  
  const handleChangeText = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      
      // Auto-focus to next input
      if (text && index < 3 && refs.current[index + 1]) {
        refs.current[index + 1]?.focus();
      }
    }
  };
  
  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0 && refs.current[index - 1]) {
      refs.current[index - 1]?.focus();
    }
  };
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View className="px-6 py-8 flex-1">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-6"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <Text className="text-2xl text-white font-bold mb-2">
            Verify Your Email
          </Text>
          <Text className="text-gray-400 mb-8">
            We've sent a 4-digit code to your email address. Please enter it below.
          </Text>
          
          <View className="flex-row justify-between mb-8">
            {[0, 1, 2, 3].map((index) => (
              <TextInput
                key={index}
                ref={(el: TextInput | null) => refs.current[index] = el}                className="bg-secondary-800 h-16 w-16 rounded-lg text-white text-center text-2xl"
                keyboardType="number-pad"
                maxLength={1}
                value={otp[index]}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>
          
          <TouchableOpacity 
            className="bg-primary-600 py-4 rounded-full mb-6"
            onPress={handleVerify}
          >
            <Text className="text-white font-semibold text-center">Verify</Text>
          </TouchableOpacity>
          
          <View className="flex-row justify-center">
            <Text className="text-gray-400">Didn't receive code? </Text>
            {timer > 0 ? (
              <Text className="text-gray-500">Resend in {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text className="text-primary-500">Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}