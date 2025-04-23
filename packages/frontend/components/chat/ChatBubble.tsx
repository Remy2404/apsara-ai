import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Avatar } from '../common/Avatar';

interface Attachment {
  id: string;
  type: 'image' | 'file';
  url: string;
  name: string;
}

interface ChatBubbleProps {
  message: string;
  timestamp: number;
  isUser: boolean;
  status?: 'sending' | 'sent' | 'error';
  attachments?: Attachment[];
  onRetry?: () => void;
  onPress?: () => void;
  showAvatar?: boolean;
}

export const ChatBubble = ({
  message,
  timestamp,
  isUser,
  status = 'sent',
  attachments = [],
  onRetry,
  onPress,
  showAvatar = true,
}: ChatBubbleProps) => {
  const { theme, isDark } = useTheme();

  // Format timestamp to readable time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get status icon based on message status
  const getStatusIcon = () => {
    if (status === 'sending') return 'time-outline';
    if (status === 'sent') return 'checkmark';
    if (status === 'error') return 'alert-circle-outline';
    return '';
  };

  // Get status color based on message status
  const getStatusColor = () => {
    if (status === 'sending') return '#9CA3AF';
    if (status === 'sent') return '#10B981';
    if (status === 'error') return '#EF4444';
    return '#9CA3AF';
  };

  return (
    <Pressable 
      onPress={onPress}
      className={`flex-row mt-2 mb-1 mx-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Avatar for non-user messages */}
      {!isUser && showAvatar && (
        <View className="mr-2 mt-1">
          <Avatar size="sm" name="Apsara" />
        </View>
      )}

      <View 
        className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}
      >
        {/* Message bubble */}
        <View
          className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-primary rounded-tr-none' 
              : isDark 
                ? 'bg-gray-800 rounded-tl-none' 
                : 'bg-gray-200 rounded-tl-none'
          }`}
        >
          {/* Message text */}
          <Text 
            className={`${
              isUser 
                ? 'text-white' 
                : isDark 
                  ? 'text-white' 
                  : 'text-gray-800'
            }`}
          >
            {message}
          </Text>

          {/* Attachments if any */}
          {attachments && attachments.length > 0 && (
            <View className="mt-2">
              {attachments.map(attachment => (
                <View 
                  key={attachment.id} 
                  className={`flex-row items-center p-2 rounded-lg mb-1 ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <Ionicons 
                    name={attachment.type === 'image' ? 'image' : 'document'} 
                    size={18} 
                    color={isDark ? theme.colors.textSecondary : '#6B7280'} 
                  />
                  <Text 
                    className={`ml-2 flex-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`} 
                    numberOfLines={1}
                  >
                    {attachment.name}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Timestamp and status */}
        <View className={`flex-row items-center mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(timestamp)}
          </Text>
          
          {isUser && (
            <View className="flex-row items-center ml-1">
              {status === 'error' ? (
                <TouchableOpacity onPress={onRetry} className="ml-1">
                  <Ionicons name="refresh" size={14} color="#EF4444" />
                </TouchableOpacity>
              ) : (
                <Ionicons
                  name={
                    status === 'sending' ? 'time-outline' :
                    status === 'sent' ? 'checkmark-outline' :
                    status === 'error' ? 'alert-circle-outline' : 
                    'checkmark-outline'
                  }
                  size={12}
                  color={getStatusColor()}
                />
              )}
            </View>
          )}
        </View>
      </View>

      {/* Avatar for user messages (empty space for alignment) */}
      {isUser && showAvatar && <View style={{ width: 36, marginLeft: 8 }} />}
    </Pressable>
  );
};