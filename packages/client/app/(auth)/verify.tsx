import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';

export default function VerifyScreen() {
  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);
  const router = useRouter();

  useEffect(() => {
    // Focus the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Countdown timer
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      // Handle paste of full code
      const characters = text.split('');
      const updatedCode = [...code];
      
      characters.forEach((char, charIndex) => {
        if (index + charIndex < updatedCode.length) {
          updatedCode[index + charIndex] = char;
        }
      });
      
      setCode(updatedCode);
      
      // Focus last input
      const lastInput = inputRefs.current[updatedCode.length - 1];
      if (lastInput) {
        lastInput.focus();
      }
    } else {
      // Handle single digit input
      const updatedCode = [...code];
      updatedCode[index] = text;
      setCode(updatedCode);
      
      // Auto-focus next input
      const nextInput = inputRefs.current[index + 1];
      if (text !== '' && index < code.length - 1 && nextInput) {
        nextInput.focus();
      }
    }
  };
  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace') {
      const prevInput = inputRefs.current[index - 1];
      if (code[index] === '' && index > 0 && prevInput) {
        prevInput.focus();
      }
    }
  };
  const handleVerify = async () => {
    const enteredCode = code.join('');
    if (enteredCode.length !== 4) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/');
    }, 1500);
  };

  const resendCode = () => {
    setTimeLeft(60);
    // Simulate API call to resend code
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
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
        
        {/* Content */}
        <View className="flex-1 px-6 justify-center">
          <Text className="text-3xl font-bold text-white mb-4">Verify Email</Text>
          
          <Text className="text-gray-400 text-base mb-8">
            We've sent a verification code to your email address. Please enter the 4-digit code below.
          </Text>
          
          {/* OTP Input */}
          <View className="flex-row justify-between mb-8">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => inputRefs.current[index] = el}
                value={digit}
                onChangeText={text => handleCodeChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                maxLength={1}
                keyboardType="number-pad"
                className="w-16 h-16 bg-secondary-800 border border-gray-700 rounded-lg text-white text-center text-2xl"
                selectionColor="#10a37f"
              />
            ))}
          </View>
          
          <Button
            title="Verify"
            onPress={handleVerify}
            isLoading={isLoading}
            size="lg"
            className="mb-8"
          />
          
          {/* Resend Code */}
          <View className="items-center">
            <Text className="text-gray-400 mb-2">
              Didn't receive a code?
            </Text>
            
            {timeLeft > 0 ? (
              <Text className="text-gray-500">
                Resend code in {timeLeft}s
              </Text>
            ) : (
              <TouchableOpacity onPress={resendCode}>
                <Text className="text-primary font-medium">
                  Resend Code
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}