import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { ClassNameValue } from 'tailwind-merge';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: ClassNameValue;
  textClassName?: ClassNameValue;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  className = '',
  textClassName = '',
}) => {
  const baseClasses = 'flex flex-row items-center justify-center rounded-md';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-800 hover:bg-secondary-700 active:bg-secondary-600',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 active:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 dark:active:bg-gray-700',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 min-h-8',
    md: 'px-4 py-2 min-h-10',
    lg: 'px-6 py-3 min-h-12',
  };
  
  const textClasses = {
    primary: 'text-white font-medium',
    secondary: 'text-white font-medium',
    outline: 'text-gray-800 dark:text-gray-200 font-medium',
  };
  
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  const disabledClasses = 'opacity-50';

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled || isLoading}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${isDisabled ? disabledClasses : ''}
        ${className}
      `}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#10a37f' : '#ffffff'} 
          className="mr-2" 
        />
      ) : leftIcon ? (
        <View className="mr-2">{leftIcon}</View>
      ) : null}
      
      <Text className={`
        ${textClasses[variant]} 
        ${textSizeClasses[size]} 
        ${textClassName}
      `}>
        {title}
      </Text>
      
      {rightIcon && !isLoading && (
        <View className="ml-2">{rightIcon}</View>
      )}
    </Pressable>
  );
};

export default Button;