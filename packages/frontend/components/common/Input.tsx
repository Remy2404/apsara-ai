import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  helperText?: string;
}

export const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  isPassword = false,
  helperText,
  value,
  onChangeText,
  placeholder,
  ...rest
}: InputProps) => {
  const { theme, isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  // Handle input focus state
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <View style={containerStyle} className="mb-4">
      {label && (
        <Text className="mb-1 text-text-light dark:text-text-dark font-medium">
          {label}
        </Text>
      )}
      
      <View 
        className={`flex-row items-center border rounded-lg px-3 py-2 ${
          isFocused 
            ? "border-primary" 
            : error 
              ? "border-error" 
              : "border-border dark:border-surface"
        } bg-white dark:bg-surface`}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        
        <TextInput
          className="flex-1 py-1 text-text-light dark:text-text-dark"
          placeholderTextColor={isDark ? theme.colors.textSecondary : '#9CA3AF'}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPassword && !showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        
        {isPassword ? (
          <Pressable className="p-1" onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={isDark ? theme.colors.textSecondary : '#9CA3AF'}
            />
          </Pressable>
        ) : (
          rightIcon && <View className="ml-2">{rightIcon}</View>
        )}
      </View>
      
      {error ? (
        <Text className="mt-1 text-error text-xs">{error}</Text>
      ) : helperText ? (
        <Text className="mt-1 text-textSecondary text-xs">{helperText}</Text>
      ) : null}
    </View>
  );
};