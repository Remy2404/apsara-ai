import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import * as Clipboard from 'expo-clipboard';

interface OTPInputProps {
  length: number;
  onCodeComplete: (code: string) => void;
  autoFocus?: boolean;
}

export const OTPInput = ({ length = 6, onCodeComplete, autoFocus = true }: OTPInputProps) => {
  const { theme, isDark } = useTheme();
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);
  
  useEffect(() => {
    // Check if the code is complete (all digits filled)
    const joinedCode = code.join('');
    if (joinedCode.length === length) {
      onCodeComplete(joinedCode);
    }
  }, [code, length, onCodeComplete]);
  
  const handleChange = (text: string, index: number) => {
    // Only allow digits
    if (!/^\d*$/.test(text)) return;
    
    const newCode = [...code];
    newCode[index] = text.substring(text.length - 1);
    setCode(newCode);
    
    // Move to next input if current input is filled
    if (text && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = async () => {
    try {
      const content = await Clipboard.getStringAsync();
      if (content && content.length >= length) {
        const otp = content.substring(0, length);
        const newCode = otp.split('');
        setCode(newCode);
        
        // Focus on the next empty input or the last input
        const nextEmptyIndex = otp.length < length ? otp.length : length - 1;
        if (inputRefs.current[nextEmptyIndex]) {
          inputRefs.current[nextEmptyIndex].focus();
        }
      }
    } catch (error) {
      console.error('Failed to paste OTP:', error);
    }
  };
  
  return (
    <View className="w-full">
      <View className="flex-row justify-between mb-4">
        {Array(length).fill(0).map((_, index) => (
          <View 
            key={index}
            className={`w-12 h-14 rounded-lg border-2 overflow-hidden flex items-center justify-center mx-1 ${
              isDark 
                ? 'bg-gray-800' 
                : 'bg-white'
            } ${
              code[index] 
                ? 'border-primary dark:border-primary-light' 
                : 'border-gray-300 dark:border-gray-700'
            }`}
          >
            <TextInput
              ref={(ref) => {
                if (ref && !inputRefs.current.includes(ref)) {
                  inputRefs.current[index] = ref;
                }
              }}
              className="text-center text-xl w-full h-full text-gray-900 dark:text-white"
              value={code[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              maxLength={1}
              keyboardType="number-pad"
              selectTextOnFocus
              autoFocus={autoFocus && index === 0}
            />
          </View>
        ))}
      </View>
      <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
        Enter the verification code sent to your email
      </Text>
    </View>
  );
};