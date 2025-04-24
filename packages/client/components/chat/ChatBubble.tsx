import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date | string;
  isLoading?: boolean;
  onCopyText?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  timestamp,
  isLoading = false,
  onCopyText,
}) => {
  // Format timestamp
  const formattedTime = typeof timestamp === 'string'
    ? timestamp
    : timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View className={`w-full flex flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <View
        className={`
          max-w-[85%] rounded-2xl p-3
          ${isUser 
            ? 'bg-primary rounded-tr-none' 
            : 'bg-secondary-700 dark:bg-secondary-800 rounded-tl-none'
          }
        `}
      >
        {/* Message content */}
        <Text 
          className={`
            text-base 
            ${isUser ? 'text-white' : 'text-gray-100 dark:text-gray-100'}
          `}
          selectable={true}
        >
          {message}
          {isLoading && <Text className="animate-pulse">...</Text>}
        </Text>
        
        {/* Bottom row with timestamp and actions */}
        <View className="flex flex-row justify-between items-center mt-1">
          <Text 
            className={`
              text-xs opacity-80
              ${isUser ? 'text-gray-100' : 'text-gray-300'}
            `}
          >
            {formattedTime}
          </Text>
          
          {!isUser && !isLoading && (
            <Pressable 
              onPress={onCopyText}
              className="ml-2 p-1"
              hitSlop={10}
            >
              <Ionicons 
                name="copy-outline" 
                size={16} 
                color={isUser ? "#fff" : "#a1a1aa"} 
              />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default ChatBubble;