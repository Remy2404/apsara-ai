import React, { useState, useRef } from 'react';
import { View, TextInput, Pressable, Keyboard, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

interface MessageInputProps {
  onSend: (message: string) => void;
  onVoicePress?: () => void;
  onAttachmentPress?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onVoicePress,
  onAttachmentPress,
  disabled = false,
  placeholder = 'Message...',
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<TextInput>(null);
  
  const handleSend = () => {
    if (message.trim() === '' || disabled) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSend(message.trim());
    setMessage('');
    Keyboard.dismiss();
  };
  
  return (
    <BlurView 
      intensity={80} 
      tint="dark" 
      className="px-4 py-2 border-t border-gray-800"
    >
      <View className="flex flex-row items-center w-full bg-secondary-700 dark:bg-secondary-800 rounded-lg p-1">
        {/* Attachment button */}
        <Pressable 
          onPress={onAttachmentPress}
          disabled={disabled}
          className="p-2"
          hitSlop={8}
        >
          <Ionicons name="attach" size={22} color="#a1a1aa" />
        </Pressable>
        
        {/* Text input */}
        <TextInput
          ref={inputRef}
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor="#71717a"
          multiline
          maxLength={4000}
          className="flex-1 max-h-24 text-base text-white px-2 py-1"
          style={{ lineHeight: Platform.OS === 'ios' ? 20 : 24 }}
          editable={!disabled}
        />
        
        {/* Voice or Send button */}
        {message.trim() === '' ? (
          <Pressable 
            onPress={onVoicePress}
            disabled={disabled}
            className="p-2 rounded-full bg-primary"
            hitSlop={8}
          >
            <Ionicons name="mic" size={20} color="white" />
          </Pressable>
        ) : (
          <Pressable 
            onPress={handleSend}
            disabled={disabled}
            className="p-2 rounded-full bg-primary"
            hitSlop={8}
          >
            <Ionicons name="send" size={20} color="white" />
          </Pressable>
        )}
      </View>
      
      <View className="h-1" />
    </BlurView>
  );
};

export default MessageInput;