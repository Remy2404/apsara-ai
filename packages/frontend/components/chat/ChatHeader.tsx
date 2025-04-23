import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Avatar } from '../common/Avatar';
import { Modal } from '../common/Modal';

interface ChatHeaderProps {
  title: string;
  modelName?: string;
  onBackPress?: () => void;
  onInfoPress?: () => void;
  onSettingsPress?: () => void;
  onClearChat?: () => void;
  onExport?: () => void;
  isPinned?: boolean;
  onPinToggle?: () => void;
}

export const ChatHeader = ({
  title,
  modelName,
  onBackPress,
  onInfoPress,
  onSettingsPress,
  onClearChat,
  onExport,
  isPinned = false,
  onPinToggle,
}: ChatHeaderProps) => {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <>
      <View className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={handleBackPress}
            className="mr-3 p-1"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Back button"
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={isDark ? theme.colors.text : theme.colors.text}
            />
          </TouchableOpacity>

          <Avatar size="sm" name={title} />

          <View className="ml-2 flex-1">
            <Text 
              className="font-semibold text-text-light dark:text-text-dark" 
              numberOfLines={1}
            >
              {title}
            </Text>
            {modelName && (
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                {modelName}
              </Text>
            )}
          </View>
        </View>

        <View className="flex-row items-center">
          {onInfoPress && (
            <TouchableOpacity
              onPress={onInfoPress}
              className="p-2"
              accessibilityLabel="Chat information"
            >
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={isDark ? theme.colors.textSecondary : '#6B7280'}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            className="p-2"
            accessibilityLabel="Chat menu"
          >
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={isDark ? theme.colors.textSecondary : '#6B7280'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        title="Chat Options"
      >
        <View>
          {onPinToggle && (
            <TouchableOpacity
              onPress={() => {
                onPinToggle();
                setMenuVisible(false);
              }}
              className="flex-row items-center py-3"
            >
              <Ionicons
                name={isPinned ? 'pin' : 'pin-outline'}
                size={20}
                color={isDark ? theme.colors.text : theme.colors.text}
              />
              <Text className="ml-3 text-text-light dark:text-text-dark">
                {isPinned ? 'Unpin from top' : 'Pin to top'}
              </Text>
            </TouchableOpacity>
          )}

          {onSettingsPress && (
            <TouchableOpacity
              onPress={() => {
                onSettingsPress();
                setMenuVisible(false);
              }}
              className="flex-row items-center py-3"
            >
              <Ionicons
                name="settings-outline"
                size={20}
                color={isDark ? theme.colors.text : theme.colors.text}
              />
              <Text className="ml-3 text-text-light dark:text-text-dark">
                Chat settings
              </Text>
            </TouchableOpacity>
          )}

          {onExport && (
            <TouchableOpacity
              onPress={() => {
                onExport();
                setMenuVisible(false);
              }}
              className="flex-row items-center py-3"
            >
              <Ionicons
                name="download-outline"
                size={20}
                color={isDark ? theme.colors.text : theme.colors.text}
              />
              <Text className="ml-3 text-text-light dark:text-text-dark">
                Export chat
              </Text>
            </TouchableOpacity>
          )}

          {onClearChat && (
            <TouchableOpacity
              onPress={() => {
                onClearChat();
                setMenuVisible(false);
              }}
              className="flex-row items-center py-3"
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="#EF4444"
              />
              <Text className="ml-3 text-red-500">
                Clear chat
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </>
  );
};