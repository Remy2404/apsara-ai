import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showOptionsButton?: boolean;
  onBackPress?: () => void;
  onOptionsPress?: () => void;
  avatarSource?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  subtitle,
  showBackButton = true,
  showOptionsButton = true,
  onBackPress,
  onOptionsPress,
  avatarSource,
}) => {
  const router = useRouter();
  
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };
  
  const handleOptionsPress = () => {
    if (onOptionsPress) {
      onOptionsPress();
    } else {
      router.push('/settings');
    }
  };
  
  return (
    <View className="flex-row items-center justify-between px-4 py-2 bg-secondary-800 border-b border-gray-800">
      <View className="flex-row items-center">
        {showBackButton && (
          <Pressable 
            onPress={handleBackPress}
            className="p-2"
            hitSlop={8}
          >
            <Ionicons name="arrow-back" size={24} color="#f9fafb" />
          </Pressable>
        )}
        
        {avatarSource ? (
          <Image 
            source={{ uri: avatarSource }} 
            className="w-8 h-8 rounded-full mr-3" 
          />
        ) : (
          <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
            <Ionicons name="chatbubble-outline" size={16} color="#fff" />
          </View>
        )}
        
        <View>
          <Text className="text-white text-lg font-medium">{title}</Text>
          {subtitle && <Text className="text-gray-400 text-xs">{subtitle}</Text>}
        </View>
      </View>
      
      {showOptionsButton && (
        <Pressable 
          onPress={handleOptionsPress}
          className="p-2"
          hitSlop={8}
        >
          <Ionicons name="ellipsis-vertical" size={22} color="#f9fafb" />
        </Pressable>
      )}
    </View>
  );
};

export default ChatHeader;