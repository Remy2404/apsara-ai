import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useChatContext } from '../../contexts/ChatContext';
import BlurView from 'expo-blur/build/BlurView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatConversationScreen() {
  const { id } = useLocalSearchParams();
  const { currentConversation, setCurrentConversation, sendMessage, isLoading } = useChatContext();
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  // Animation for new messages
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
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
      // Animate new message appearance
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      // Scroll to bottom
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
      }, 100);
    }
  }, [currentConversation?.messages?.length]);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    sendMessage(messageText);
    setMessageText('');
    // Reset the fade animation for next message
    fadeAnim.setValue(0);
  };

  // If no conversation is selected or conversation not found
  if (!currentConversation) {
    return (
      <SafeAreaView className="flex-1 bg-secondary-900 items-center justify-center">
        <Text className="text-gray-400">Conversation not found</Text>
        <TouchableOpacity 
          className="mt-4 bg-primary-600 px-5 py-3 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const formatTime = (date: { toLocaleTimeString: (arg0: never[], arg1: { hour: string; minute: string; }) => any; }) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-secondary-900">
      <StatusBar style="light" />

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        className="flex-1 px-4 py-2"
        data={currentConversation.messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 10 }}
        inverted
        renderItem={({ item, index }) => {
          const isLatest = index === 0;
          return (
            <Animated.View 
              style={{ 
                opacity: isLatest ? fadeAnim : 1,
                transform: [{ 
                  translateY: isLatest ? 
                    fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0]
                    }) : 0 
                }]
              }}
              className={`mb-3 max-w-[85%] ${item.sender === 'user' ? 'self-end ml-auto' : 'self-start mr-auto'}`}
            >
              <View 
                className={`p-3 rounded-2xl ${
                  item.sender === 'user' 
                    ? 'bg-primary-600 rounded-tr-none' 
                    : 'bg-secondary-800 rounded-tl-none'
                }`}
              >
                <Text className={`${item.sender === 'user' ? 'text-white' : 'text-gray-200'}`}>
                  {item.text}
                </Text>
              </View>
              <Text 
                className="text-xs text-gray-500 mt-1"
                style={{ alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start' }}
              >
                {formatTime(item.timestamp)}
              </Text>
            </Animated.View>
          );
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <View className="w-16 h-16 bg-primary-600/20 rounded-full items-center justify-center mb-4">
              <Ionicons name="chatbubble" size={30} color="#10a37f" />
            </View>
            <Text className="text-white text-lg font-medium mb-2">Start Conversation</Text>
            <Text className="text-gray-400 text-center px-8">
              Send a message to begin chatting with Apsara AI
            </Text>
          </View>
        }
      />

      {/* Typing Indicator (when AI is responding) */}
      {isLoading && (
        <View className="flex-row items-center px-4 pb-2">
          <View className="bg-secondary-800 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-primary-600 mx-0.5" />
              <View className="w-2 h-2 rounded-full bg-primary-600 mx-0.5" />
              <View className="w-2 h-2 rounded-full bg-primary-600 mx-0.5" />
            </View>
          </View>
        </View>
      )}

      {/* Input Area */}
      <BlurView intensity={30} tint="dark" className="border-t border-gray-800">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View className="px-4 py-2 flex-row items-center">
            <TouchableOpacity 
              className="mr-2 p-2" 
              onPress={() => router.push('/chat/file-upload')}
            >
              <Ionicons name="attach" size={22} color="#9CA3AF" />
            </TouchableOpacity>
            
            <View className="flex-1 flex-row items-center bg-secondary-800 rounded-full px-4">
              <TextInput
                className="flex-1 text-white py-2"
                placeholder="Type a message..."
                placeholderTextColor="#71717a"
                value={messageText}
                onChangeText={setMessageText}
                multiline
              />
              <TouchableOpacity 
                className="ml-2 p-1" 
                onPress={() => router.push('/chat/voice-input')}
              >
                <Ionicons name="mic" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              className={`ml-2 p-3 rounded-full ${
                messageText.trim() ? 'bg-primary-600' : 'bg-gray-700'
              }`}
              onPress={handleSendMessage}
              disabled={messageText.trim() === ''}
            >
              <Ionicons 
                name="send" 
                size={18} 
                color={messageText.trim() ? 'white' : '#9CA3AF'} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </BlurView>
    </SafeAreaView>
  );
}