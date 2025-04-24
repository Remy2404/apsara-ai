import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function MainLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  
  // Define the tabs and their icons
  const tabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home', path: '/' },
    { name: 'Chat', icon: 'chatbubble-outline', activeIcon: 'chatbubble', path: '/chat' },
    { name: 'Profile', icon: 'person-outline', activeIcon: 'person', path: '/profile' },
    { name: 'Settings', icon: 'settings-outline', activeIcon: 'settings', path: '/settings' },
  ];
  
  // Check if the current path matches a tab
  const isTabActive = (tabPath: string) => {
    if (tabPath === '/' && pathname === '/') return true;
    if (tabPath !== '/' && pathname.startsWith(tabPath)) return true;
    return false;
  };
  
  return (
    <>
      <StatusBar style="light" />
      <View className="flex-1 bg-secondary-900">
        <Slot />
        
        {/* Tab Bar */}
        <View 
          className="flex-row justify-around bg-secondary-800 border-t border-gray-700"
          style={{ paddingBottom: insets.bottom }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.name}
              onPress={() => router.push(tab.path)}
              className="flex-1 items-center py-3"
            >
              <Ionicons
                name={isTabActive(tab.path) ? tab.activeIcon as keyof typeof Ionicons.glyphMap : tab.icon as keyof typeof Ionicons.glyphMap}
                size={24}
                color={isTabActive(tab.path) ? "#10a37f" : "#a1a1aa"}
              />
            </TouchableOpacity>
          ))}        </View>
      </View>
    </>
  );
}