import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useChatContext } from '../../../contexts/ChatContext';

export default function ChatDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { conversations, deleteConversation } = useChatContext();
  const router = useRouter();
  
  // Find the conversation by ID
  const conversation = conversations.find(c => c.id === id);
  
  if (!conversation) {
    return (
      <View className="flex-1 bg-white dark:bg-gray-900 items-center justify-center">
        <Text className="text-gray-500 dark:text-gray-400">Conversation not found</Text>
        <TouchableOpacity 
          className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const messageCount = conversation.messages.length;
  const userMessageCount = conversation.messages.filter(m => m.sender === 'user').length;
  const aiMessageCount = conversation.messages.filter(m => m.sender === 'ai').length;
  const firstMessageDate = conversation.messages.length > 0 
    ? conversation.messages[0].timestamp 
    : new Date();
  const lastMessageDate = conversation.messages.length > 0 
    ? conversation.messages[conversation.messages.length - 1].timestamp 
    : new Date();
    
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleDeleteConversation = () => {
    deleteConversation(conversation.id);
    router.push('/chat');
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />
      
      <ScrollView className="flex-1 p-4">
        {/* Conversation Title */}
        <View className="items-center pb-6 border-b border-gray-200 dark:border-gray-800">
          <View className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 items-center justify-center mb-3">
            <Ionicons name="chatbubble-ellipses" size={28} color="#3b82f6" />
          </View>
          <Text className="text-xl font-bold text-gray-900 dark:text-white">{conversation.title}</Text>
        </View>
        
        {/* Stats */}
        <View className="py-6 border-b border-gray-200 dark:border-gray-800">
          <Text className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Conversation Stats</Text>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600 dark:text-gray-400">Total Messages</Text>
            <Text className="font-medium text-gray-900 dark:text-white">{messageCount}</Text>
          </View>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600 dark:text-gray-400">Your Messages</Text>
            <Text className="font-medium text-gray-900 dark:text-white">{userMessageCount}</Text>
          </View>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600 dark:text-gray-400">Apsara AI Responses</Text>
            <Text className="font-medium text-gray-900 dark:text-white">{aiMessageCount}</Text>
          </View>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600 dark:text-gray-400">Started</Text>
            <Text className="font-medium text-gray-900 dark:text-white">{formatDate(firstMessageDate)}</Text>
          </View>
          
          <View className="flex-row justify-between">
            <Text className="text-gray-600 dark:text-gray-400">Last Activity</Text>
            <Text className="font-medium text-gray-900 dark:text-white">{formatDate(lastMessageDate)}</Text>
          </View>
        </View>
        
        {/* Actions */}
        <View className="py-6">
          <Text className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Actions</Text>
          
          <TouchableOpacity 
            className="flex-row items-center py-3 mb-2"
            onPress={() => console.log('Rename conversation')}
          >
            <Ionicons name="pencil" size={20} color="#3b82f6" />
            <Text className="text-blue-500 ml-3">Rename Conversation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center py-3 mb-2"
            onPress={() => console.log('Export conversation')}
          >
            <Ionicons name="download" size={20} color="#3b82f6" />
            <Text className="text-blue-500 ml-3">Export Conversation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center py-3"
            onPress={handleDeleteConversation}
          >
            <Ionicons name="trash" size={20} color="#ef4444" />
            <Text className="text-red-500 ml-3">Delete Conversation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}