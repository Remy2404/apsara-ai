import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useChatContext } from '../../contexts/ChatContext';

export default function ChatConversationScreen() {
  const { id } = useLocalSearchParams();
  const { currentConversation, setCurrentConversation, sendMessage, isLoading } = useChatContext();
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  useEffect(() => {
    // Set the current conversation based on the URL param
    if (id) {
      setCurrentConversation(id.toString());
    }
    
    // Clean up when unmounting
    return () => {
      setCurrentConversation(null);
    };
  }, [id, setCurrentConversation]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (currentConversation?.messages?.length && flatListRef.current) {
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
      }, 100);    }
  }, [currentConversation?.messages?.length]);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    sendMessage(messageText);
    setMessageText('');
  };

  // If no conversation is selected or conversation not found
  if (!currentConversation) {
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

  const formatTime = (date: { toLocaleTimeString: (arg0: never[], arg1: { hour: string; minute: string; }) => any; }) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100 dark:bg-gray-900"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar style="auto" />

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        className="flex-1 px-4 py-2"
        data={currentConversation.messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={({ item }) => (
          <View className={`mb-3 max-w-[85%] ${item.sender === 'user' ? 'self-end ml-auto' : 'self-start mr-auto'}`}>
            <View 
              className={`p-3 rounded-2xl ${
                item.sender === 'user' 
                  ? 'bg-blue-500 rounded-tr-none' 
                  : 'bg-white dark:bg-gray-800 rounded-tl-none'
              }`}
            >
              <Text 
                className={`${
                  item.sender === 'user' 
                    ? 'text-white' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                {item.text}
              </Text>
            </View>
            <Text 
              className="text-xs text-gray-500 dark:text-gray-400 mt-1"
              style={{ alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start' }}
            >
              {formatTime(item.timestamp)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500 dark:text-gray-400">No messages yet</Text>
          </View>
        }
      />

      {/* Typing Indicator (when AI is responding) */}
      {isLoading && (
        <View className="flex-row items-center px-4 pb-2">
          <View className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-gray-400 mx-0.5 animate-bounce" />
              <View className="w-2 h-2 rounded-full bg-gray-400 mx-0.5 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <View className="w-2 h-2 rounded-full bg-gray-400 mx-0.5 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </View>
          </View>
        </View>
      )}

      {/* Input Area */}
      <View className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-2" onPress={() => router.push('/chat/file-upload')}>
            <Ionicons name="attach" size={24} color="#9CA3AF" />
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1">
            <TextInput
              className="flex-1 text-gray-900 dark:text-white py-2"
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={messageText}
              onChangeText={setMessageText}
              multiline
            />
            <TouchableOpacity className="ml-2" onPress={() => router.push('/chat/voice-input')}>
              <Ionicons name="mic" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            className={`ml-2 p-2 rounded-full ${messageText.trim() ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}
            onPress={handleSendMessage}
            disabled={messageText.trim() === ''}
          >
            <Ionicons name="send" size={20} color={messageText.trim() ? 'white' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}