import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Share, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from '../../hooks/useTheme';

interface AIResponseCardProps {
  content: string;
  timestamp: number;
  modelName?: string;
  tokensUsed?: number;
  onLikePress?: () => void;
  onDislikePress?: () => void;
  isLiked?: boolean;
  isDisliked?: boolean;
  onRegeneratePress?: () => void;
}

export const AIResponseCard = ({
  content,
  timestamp,
  modelName,
  tokensUsed,
  onLikePress,
  onDislikePress,
  isLiked = false,
  isDisliked = false,
  onRegeneratePress,
}: AIResponseCardProps) => {
  const { theme, isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  
  // Format timestamp to readable format
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Copy response to clipboard
  const handleCopy = async () => {
    await Clipboard.setStringAsync(content);
    setCopied(true);
    
    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Share response
  const handleShare = async () => {
    try {
      await Share.share({
        message: content,
      });
    } catch (error) {
      console.error('Error sharing response', error);
    }
  };
  
  return (
    <View 
      className={`mb-4 rounded-xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-sm overflow-hidden`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Content */}
      <View className="p-4">
        <Text className="text-text-light dark:text-text-dark">
          {content}
        </Text>
      </View>
      
      {/* Footer */}
      <View className="p-2 border-t border-gray-200 dark:border-gray-700">
        <View className="flex-row justify-between items-center">
          {/* Model info */}
          <View className="flex-row items-center">
            {modelName && (
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                {modelName}
              </Text>
            )}
            
            {tokensUsed && (
              <Text className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {tokensUsed} tokens
              </Text>
            )}
            
            <Text className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              {formatTime(timestamp)}
            </Text>
          </View>
          
          {/* Action buttons */}
          <View className="flex-row">
            {onLikePress && onDislikePress && (
              <View className="flex-row mr-2">
                <TouchableOpacity 
                  onPress={onLikePress}
                  className={`p-1 mx-1 ${isLiked ? 'bg-gray-200 dark:bg-gray-700 rounded' : ''}`}
                >
                  <Ionicons 
                    name={isLiked ? "thumbs-up" : "thumbs-up-outline"}
                    size={16}
                    color={isLiked 
                      ? theme.colors.primary 
                      : isDark ? theme.colors.textSecondary : '#6B7280'
                    }
                  />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={onDislikePress}
                  className={`p-1 mx-1 ${isDisliked ? 'bg-gray-200 dark:bg-gray-700 rounded' : ''}`}
                >
                  <Ionicons 
                    name={isDisliked ? "thumbs-down" : "thumbs-down-outline"}
                    size={16}
                    color={isDisliked 
                      ? theme.colors.error 
                      : isDark ? theme.colors.textSecondary : '#6B7280'
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
            
            <TouchableOpacity 
              onPress={handleCopy}
              className="p-1 mx-1"
            >
              <Ionicons 
                name={copied ? "checkmark" : "copy-outline"}
                size={16}
                color={copied 
                  ? theme.colors.success 
                  : isDark ? theme.colors.textSecondary : '#6B7280'
                }
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleShare}
              className="p-1 mx-1"
            >
              <Ionicons 
                name="share-outline"
                size={16}
                color={isDark ? theme.colors.textSecondary : '#6B7280'}
              />
            </TouchableOpacity>
            
            {onRegeneratePress && (
              <TouchableOpacity 
                onPress={onRegeneratePress}
                className="p-1 mx-1"
              >
                <Ionicons 
                  name="refresh-outline"
                  size={16}
                  color={isDark ? theme.colors.textSecondary : '#6B7280'}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};