import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useChatContext } from '../../contexts/ChatContext';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const { conversations, setCurrentConversation } = useChatContext();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  
  // Animation for the floating button
  const buttonScale = new Animated.Value(1);
  
  useEffect(() => {
    // Button pulse animation
    const pulseAnimation = Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

    // Only animate if there are no conversations
    if (conversations.length === 0) {
      Animated.loop(pulseAnimation, { iterations: 3 }).start();
    }
  }, [conversations.length]);

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id);
    router.push(`/chat/${id}`);
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    // In a real app, fetch latest conversations here
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleNewChat = () => {
    router.push('/ai');
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
    <SafeAreaView className="flex-1 bg-secondary-900">
      <StatusBar style="light" />

      {/* Header */}
      <View className="px-6 py-3 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-white">Conversations</Text>
        <TouchableOpacity 
          className="h-10 w-10 rounded-full bg-secondary-800 items-center justify-center"
          onPress={() => router.push('/chat/search')}
        >
          <Ionicons name="search" size={20} color="#a1a1aa" />
        </TouchableOpacity>
      </View>

      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row p-4 mx-4 my-1 rounded-lg bg-secondary-800 border border-secondary-700"
              onPress={() => handleSelectConversation(item.id)}
            >
              <View className="h-12 w-12 rounded-full bg-primary-600/20 items-center justify-center mr-3">
                <Ionicons name="chatbubble-ellipses" size={24} color="#10a37f" />
              </View>
              <View className="flex-1 justify-center">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="font-semibold text-white">{item.title}</Text>
                  <Text className="text-xs text-gray-400">
                    {formatDate(item.lastMessageTime)}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text 
                    className="text-gray-400 text-sm flex-1"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.lastMessagePreview}
                  </Text>
                  {item.unreadCount > 0 && (
                    <View className="bg-primary-600 rounded-full w-5 h-5 items-center justify-center ml-2">
                      <Text className="text-white text-xs">{item.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingVertical: 8 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-8">
          <View className="w-24 h-24 bg-primary-600/20 rounded-full items-center justify-center mb-6">
            <Ionicons name="chatbubble-ellipses" size={40} color="#10a37f" />
          </View>
          <Text className="text-xl font-bold text-white mb-3">No Conversations Yet</Text>
          <Text className="text-gray-400 text-center mb-8">
            Start a new conversation with Apsara AI to get help with your tasks, creative ideas, or to simply chat.
          </Text>
          
          <TouchableOpacity 
            className="bg-primary-600 py-3 px-6 rounded-full flex-row items-center"
            onPress={handleNewChat}
          >
            <Ionicons name="add" size={20} color="white" className="mr-2" />
            <Text className="text-white font-medium">Start New Chat</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* New Chat Floating Button (only show if there are conversations) */}
      {conversations.length > 0 && (
        <Animated.View
          style={{ 
            transform: [{ scale: buttonScale }],
            position: 'absolute',
            bottom: 24,
            right: 24,
          }}
        >
          <TouchableOpacity
            className="bg-primary-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
            onPress={handleNewChat}
          >
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}