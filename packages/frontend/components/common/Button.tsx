import React from 'react';
import { 
  Pressable, 
  Text, 
  ActivityIndicator, 
  StyleSheet,
  PressableProps,
  View
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button = ({ 
  title, 
  variant = 'primary', 
  size = 'medium', 
  isLoading = false, 
  leftIcon, 
  rightIcon, 
  fullWidth = false,
  disabled = false,
  onPress,
  ...rest 
}: ButtonProps) => {
  const { theme, isDark } = useTheme();

  // Class names based on variant, size and state
  const getButtonClassName = () => {
    let className = "rounded-lg flex-row justify-center items-center";

    // Variant styles
    if (variant === 'primary') {
      className += " bg-primary";
    } else if (variant === 'secondary') {
      className += " bg-secondary";
    } else if (variant === 'outline') {
      className += " bg-transparent border border-primary";
    } else if (variant === 'text') {
      className += " bg-transparent";
    }

    // Size styles
    if (size === 'small') {
      className += " py-2 px-3";
    } else if (size === 'medium') {
      className += " py-3 px-5";
    } else if (size === 'large') {
      className += " py-4 px-7";
    }

    // Width style
    if (fullWidth) {
      className += " w-full";
    }

    // Disabled state
    if (disabled) {
      className += " opacity-50";
    }

    return className;
  };

  const getTextClassName = () => {
    let className = "font-medium text-center";

    // Text color based on variant
    if (variant === 'primary' || variant === 'secondary') {
      className += " text-white";
    } else if (variant === 'outline' || variant === 'text') {
      className += " text-primary dark:text-primary-light";
    }

    // Text size based on button size
    if (size === 'small') {
      className += " text-sm";
    } else if (size === 'medium') {
      className += " text-base";
    } else if (size === 'large') {
      className += " text-lg";
    }

    return className;
  };

  return (
    <Pressable
      className={getButtonClassName()}
      onPress={disabled || isLoading ? undefined : onPress}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' || variant === 'secondary' ? 'white' : theme.colors.primary} 
        />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <Text className={getTextClassName()}>{title}</Text>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
};