import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useAI } from '../../hooks/useAI';

interface MessageInputProps {
  onSend: (message: string, attachments?: any[]) => void;
  onVoicePress?: () => void;
  onAttachmentPress?: () => void;
  disabled?: boolean;
  placeholder?: string;
  attachments?: any[];
  onRemoveAttachment?: (id: string) => void;
}

export const MessageInput = ({
  onSend,
  onVoicePress,
  onAttachmentPress,
  disabled = false,
  placeholder = 'Type a message...',
  attachments = [],
  onRemoveAttachment,
}: MessageInputProps) => {
  const { theme, isDark } = useTheme();
  const { isProcessing } = useAI();
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const animatedHeight = useRef(new Animated.Value(50)).current;

  // Expand input when typing longer messages
  const handleContentSizeChange = (event: {nativeEvent: {contentSize: {height: number}}}) => {
    const { height } = event.nativeEvent.contentSize;
    const newHeight = Math.min(Math.max(50, height), 120);
    
    Animated.timing(animatedHeight, {
      toValue: newHeight,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  // Handle image paste from clipboard
  const handleImagePaste = (file: File) => {
    // This would normally process the pasted image file
    // For now, we'll just log it as this functionality would be implemented
    // in a platform-specific way for React Native
    console.log('Image pasted:', file.name);
    // Here you would typically:
    // 1. Convert the file to a format React Native can use
    // 2. Add it to attachments using onAttachmentPress or similar
  };
  
  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;
    
    for (const item of Array.from(items)) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          handleImagePaste(file);
        }
      }
    }
  };

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSend(message, attachments);
      setMessage('');
      
      // Reset height after sending
      Animated.timing(animatedHeight, {
        toValue: 50,
        duration: 100,
        useNativeDriver: false,
      }).start();
      
      // Dismiss keyboard
      Keyboard.dismiss();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Attachments preview (if any) */}
      {attachments && attachments.length > 0 && (
        <View className="flex-row flex-wrap p-2 bg-gray-100 dark:bg-gray-800">
          {/* Attachment preview implementation would go here */}
        </View>
      )}
      
      <View className="border-t border-gray-200 dark:border-gray-800 px-2 py-2 bg-white dark:bg-background-dark">
        <View className="flex-row items-end">
          {/* Attachment button */}
          <TouchableOpacity
            onPress={onAttachmentPress}
            disabled={disabled || isProcessing}
            className={`p-2 ${disabled || isProcessing ? 'opacity-50' : ''}`}
          >
            <Ionicons
              name="attach"
              size={24}
              color={isDark ? theme.colors.textSecondary : '#6B7280'}
            />
          </TouchableOpacity>

          {/* Text input */}
          <Animated.View
            className={`flex-1 border rounded-3xl px-3 mx-1 ${
              isFocused 
                ? 'border-primary dark:border-primary-light' 
                : 'border-gray-300 dark:border-gray-700'
            } bg-white dark:bg-gray-800`}
            style={{ height: animatedHeight }}
          >
            <TextInput
              ref={inputRef}
              className="flex-1 py-2 text-text-light dark:text-text-dark"
              value={message}
              onChangeText={setMessage}
              placeholder={placeholder}
              placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
              multiline
              maxLength={1000}
              editable={!disabled && !isProcessing}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onContentSizeChange={handleContentSizeChange}
            />
          </Animated.View>

          {/* Voice input or Send button */}
          {message.trim() || attachments.length > 0 ? (
            <TouchableOpacity
              onPress={handleSend}
              disabled={disabled || isProcessing}
              className={`p-2 bg-primary rounded-full ${
                disabled || isProcessing ? 'opacity-50' : ''
              }`}
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onVoicePress}
              disabled={disabled || isProcessing}
              className={`p-2 ${disabled || isProcessing ? 'opacity-50' : ''}`}
            >
              <Ionicons
                name="mic"
                size={24}
                color={isDark ? theme.colors.textSecondary : '#6B7280'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};