import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ChatBubble from '../../components/chat/ChatBubble';
import MessageInput from '../../components/chat/MessageInput';
import TypingIndicator from '../../components/chat/TypingIndicator';
import ChatHeader from '../../components/chat/ChatHeader';

// Mock message type
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am Apsara AI, your intelligent assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      text,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      const aiResponse: Message = {
        id: Date.now().toString() + '-ai',
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
  };

  // Simple mock AI response function
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello there! How can I assist you today?";
    } else if (lowerMessage.includes('how are you')) {
      return "I'm just a digital assistant, but I'm functioning well! How can I help you?";
    } else if (lowerMessage.includes('name')) {
      return "I'm Apsara AI, your intelligent assistant. I'm designed to help answer questions and assist with various tasks.";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Feel free to ask if you need anything else.";
    } else if (lowerMessage.includes('weather')) {
      return "I don't have access to real-time weather data in this demo. In a full implementation, I could check the weather for you using a weather API.";
    } else {
      return "That's an interesting question. In a complete implementation, I would have access to more knowledge to provide you with a detailed answer.";
    }
  };

  const handleCopyText = (text: string) => {
    // In a real app, this would copy to clipboard
    console.log('Copied to clipboard:', text);
    // Show toast notification
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {/* Header */}
        <ChatHeader 
          title="Apsara AI" 
          subtitle="AI Assistant" 
        />
        
        {/* Chat messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          className="flex-1 px-4 pt-4"
          renderItem={({ item }) => (
            <ChatBubble
              message={item.text}
              isUser={item.isUser}
              timestamp={item.timestamp}
              onCopyText={() => handleCopyText(item.text)}
            />
          )}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={() => (
            isTyping ? <TypingIndicator isVisible={true} /> : null
          )}
        />
        
        {/* Message input */}
        <MessageInput
          onSend={handleSendMessage}
          onVoicePress={() => console.log('Voice input')}
          onAttachmentPress={() => console.log('Attachment')}
          placeholder="Message Apsara AI..."
        />
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}