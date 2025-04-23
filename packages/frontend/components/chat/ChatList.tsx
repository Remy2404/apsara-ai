import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Avatar } from '../common/Avatar';

interface ChatItem {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp: number;
  unreadCount?: number;
  isPinned?: boolean;
}

interface ChatListProps {
  chats: ChatItem[];
  isLoading?: boolean;
  onChatPress?: (chatId: string) => void;
  onChatLongPress?: (chatId: string) => void;
  onCreateChat?: () => void;
  emptyText?: string;
}

export const ChatList = ({
  chats,
  isLoading = false,
  onChatPress,
  onChatLongPress,
  onCreateChat,
  emptyText = 'No conversations yet',
}: ChatListProps) => {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const handleChatPress = (chatId: string) => {
    if (onChatPress) {
      onChatPress(chatId);
    } else {
      // Default behavior: navigate to chat screen
      router.push(`/chat/${chatId}`);
    }
  };

  // Format timestamp to readable format
  const formatTime = (timestamp: number) => {
    const now = new Date();
    const date = new Date(timestamp);
    
    // If today, show time
    if (now.toDateString() === date.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this year, show month and day
    if (now.getFullYear() === date.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    // Otherwise show date with year
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Sort chats with pinned ones at the top, then by timestamp
  const sortedChats = [...chats].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.timestamp - a.timestamp;
  });

  // Render a chat item
  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleChatPress(item.id)}
      onLongPress={() => onChatLongPress?.(item.id)}
      className={`flex-row items-center px-4 py-3 ${
        item.isPinned 
          ? (isDark ? 'bg-gray-800/30' : 'bg-blue-50/30') 
          : ''
      }`}
      delayLongPress={300}
    >
      <Avatar size="md" name={item.title} />
      
      <View className="flex-1 ml-3">
        <View className="flex-row justify-between">
          <Text 
            className="font-medium text-text-light dark:text-text-dark" 
            numberOfLines={1}
            style={{ maxWidth: '70%' }}
          >
            {item.title}
          </Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(item.timestamp)}
          </Text>
        </View>
        
        <View className="flex-row justify-between mt-1">
          {item.lastMessage ? (
            <Text 
              className="text-sm text-gray-500 dark:text-gray-400" 
              numberOfLines={1}
              style={{ maxWidth: '85%' }}
            >
              {item.lastMessage}
            </Text>
          ) : null}
          
          <View className="flex-row items-center">
            {item.isPinned && (
              <Ionicons
                name="pin"
                size={12}
                color={isDark ? theme.colors.textSecondary : '#6B7280'}
                style={{ marginRight: 4 }}
              />
            )}
            
            {item.unreadCount && item.unreadCount > 0 ? (
              <View className="bg-primary rounded-full px-1.5 py-0.5 min-w-[18px] items-center">
                <Text className="text-xs text-white font-medium">
                  {item.unreadCount > 99 ? '99+' : item.unreadCount}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Empty state
  if (!isLoading && chats.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={64}
          color={isDark ? theme.colors.textSecondary : '#9CA3AF'}
        />
        <Text className="mt-4 text-center text-gray-500 dark:text-gray-400">
          {emptyText}
        </Text>
        {onCreateChat && (
          <TouchableOpacity
            onPress={onCreateChat}
            className="mt-6 bg-primary py-3 px-6 rounded-lg"
          >
            <Text className="text-white font-medium">Start a new chat</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <FlatList
      data={sortedChats}
      renderItem={renderChatItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingVertical: 8 }}
      ItemSeparatorComponent={() => (
        <View className="h-[1px] bg-gray-200 dark:bg-gray-800 ml-16 mr-4" />
      )}
    />
  );
};