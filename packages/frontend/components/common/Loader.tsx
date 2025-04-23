import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface LoaderProps {
  size?: 'small' | 'large';
  text?: string;
  fullScreen?: boolean;
  transparent?: boolean;
}

export const Loader = ({ 
  size = 'large', 
  text, 
  fullScreen = false,
  transparent = false
}: LoaderProps) => {
  const { theme } = useTheme();
  
  return (
    <View 
      className={`items-center justify-center ${
        fullScreen 
          ? 'absolute top-0 left-0 right-0 bottom-0' 
          : 'p-4'
      } ${
        transparent 
          ? 'bg-transparent' 
          : 'bg-background-light dark:bg-background-dark bg-opacity-70'
      }`}
    >
      <ActivityIndicator 
        size={size} 
        color={theme.colors.primary} 
      />
      
      {text && (
        <Text className="mt-2 text-text-light dark:text-text-dark">
          {text}
        </Text>
      )}
    </View>
  );
};