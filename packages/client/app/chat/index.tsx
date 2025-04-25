import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useChatContext } from '../../contexts/ChatContext';
import { useRouter } from 'expo-router';

export default function ChatScreen() {
  const { conversations, setCurrentConversation } = useChatContext();
  const router = useRouter();

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id);
    router.push(`/chat/${id}`);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.getTime() > today.getTime()) {
      // Today, return time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.getTime() > yesterday.getTime()) {
      // Yesterday
      return 'Yesterday';
    } else if (date.getFullYear() === now.getFullYear()) {
      // This year, return month and day
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      // Different year, return date with year
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />

      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row p-4 border-b border-gray-200 dark:border-gray-800"
              onPress={() => handleSelectConversation(item.id)}
            >
              <View className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 items-center justify-center mr-3">
                <Ionicons name="chatbubble-ellipses" size={24} color="#3b82f6" />
              </View>
              <View className="flex-1 justify-center">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="font-semibold text-gray-900 dark:text-white">{item.title}</Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(item.lastMessageTime)}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text 
                    className="text-gray-500 dark:text-gray-400 text-sm flex-1"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.lastMessagePreview}
                  </Text>
                  {item.unreadCount > 0 && (
                    <View className="bg-blue-500 rounded-full w-5 h-5 items-center justify-center ml-2">
                      <Text className="text-white text-xs">{item.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Ionicons name="chatbubble-ellipses-outline" size={64} color="#9CA3AF" />
          <Text className="text-xl font-semibold text-gray-900 dark:text-white mt-4">No Conversations Yet</Text>
          <Text className="text-gray-500 dark:text-gray-400 text-center mt-2">
            Start a new conversation with Apsara AI to get help with your tasks.
          </Text>
        </View>
      )}

      {/* New Chat Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('/ai')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}