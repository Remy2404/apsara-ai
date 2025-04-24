import React from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';
import { ClassNameValue } from 'tailwind-merge';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  className?: ClassNameValue;
  inputClassName?: ClassNameValue;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
  autoFocus?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  className = '',
  inputClassName = '',
  maxLength,
  autoCapitalize = 'none',
  keyboardType = 'default',
  returnKeyType,
  onSubmitEditing,
  autoFocus = false,
}) => {
  return (
    <View className={`w-full ${className}`}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {label}
        </Text>
      )}
      
      <View className={`
        flex flex-row items-center
        w-full border rounded-md
        bg-white dark:bg-secondary-800
        border-gray-300 dark:border-gray-600
        ${error ? 'border-red-500' : 'focus:border-primary-500'}
        ${multiline ? 'min-h-[100px]' : 'h-10'}
      `}>
        {leftIcon && <View className="ml-3">{leftIcon}</View>}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          className={`
            flex-1 px-3 py-2
            text-gray-800 dark:text-white
            ${leftIcon ? 'pl-2' : 'pl-3'}
            ${rightIcon ? 'pr-2' : 'pr-3'}
            ${multiline ? 'text-base py-3' : 'text-base'}
            ${inputClassName}
          `}
        />
        
        {rightIcon && (
          <Pressable 
            onPress={onRightIconPress} 
            className="mr-3"
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
      
      {error && (
        <Text className="mt-1 text-xs text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;