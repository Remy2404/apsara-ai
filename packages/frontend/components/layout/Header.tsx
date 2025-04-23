import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Avatar } from '../common/Avatar';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  showProfileAvatar?: boolean;
  containerStyle?: ViewStyle;
  transparent?: boolean;
  titleStyle?: ViewStyle;
}

export const Header = ({
  title,
  showBackButton = false,
  onBackPress,
  rightElement,
  showProfileAvatar = false,
  containerStyle,
  transparent = false,
  titleStyle,
}: HeaderProps) => {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 ${
        transparent ? 'bg-transparent' : 'bg-white dark:bg-background-dark'
      }`}
      style={[
        !transparent && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 3,
        },
        containerStyle,
      ]}
    >
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBackPress}
            className="mr-2 p-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Back button"
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={isDark ? theme.colors.text : theme.colors.text}
            />
          </TouchableOpacity>
        )}

        {title && (
          <Text
            className="text-lg font-semibold text-text-light dark:text-text-dark"
            style={titleStyle}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
      </View>

      <View className="flex-row items-center">
        {rightElement}

        {showProfileAvatar && (
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            className="ml-2"
            accessibilityLabel="Profile"
          >
            <Avatar size="sm" name="User" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};