import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface TabItem {
  key: string;
  label: string;
  icon: string;
  route: string;
}

interface TabBarProps {
  tabs: TabItem[];
}

export const TabBar = ({ tabs = defaultTabs }: TabBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, isDark } = useTheme();
  
  const isActive = (route: string) => {
    return pathname.includes(route);
  };

  return (
    <View className="flex-row bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
      {tabs.map((tab) => {
        const active = isActive(tab.route);
        
        return (
          <TouchableOpacity
            key={tab.key}
            className="flex-1 items-center justify-center py-2"
            onPress={() => router.push(tab.route)}
            accessibilityLabel={tab.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Ionicons
              name={tab.icon as "home-outline" | "chatbubbles-outline" | "search-outline" | "person-outline"}
              size={24}
              color={active ? theme.colors.primary : (isDark ? theme.colors.textSecondary : '#6B7280')}
            />
            <Text
              className={`text-xs mt-1 ${
                active 
                  ? 'text-primary dark:text-primary-light font-medium' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Default tabs configuration
const defaultTabs: TabItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: 'home-outline',
    route: '/(main)/home',
  },
  {
    key: 'chat',
    label: 'Chat',
    icon: 'chatbubbles-outline',
    route: '/chat',
  },
  {
    key: 'ai',
    label: 'AI',
    icon: 'search-outline',
    route: '/ai',
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: 'person-outline',
    route: '/profile',
  },
];