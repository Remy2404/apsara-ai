import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Sample feed data
const feedItems = [
  {
    id: '1',
    author: 'Apsara AI',
    avatar: 'https://i.pravatar.cc/100?img=1',
    content: "Check out our latest AI features! We've enhanced our conversation capabilities.",
    timestamp: '2h ago',
    likes: 24,
    comments: 5
  },
  {
    id: '2',
    author: 'Tech News',
    avatar: 'https://i.pravatar.cc/100?img=2',
    content: "AI assistants are revolutionizing productivity in 2025. Here's how you can leverage them in your daily workflow.",
    timestamp: '4h ago',
    likes: 42,
    comments: 11
  },
  {
    id: '3',
    author: 'AI Community',
    avatar: 'https://i.pravatar.cc/100?img=3',
    content: 'Join our upcoming webinar on the future of conversational AI and what it means for user experience.',
    timestamp: '8h ago',
    likes: 18,
    comments: 3
  }
];
export default function FeedScreen() {
  const renderFeedItem = ({ item }: { item: { id: string; author: string; avatar: string; content: string; timestamp: string; likes: number; comments: number } }) => (
    <View className="bg-secondary-800 rounded-lg p-4 mb-4">
      <View className="flex-row items-center mb-3">
        <Image 
          source={{ uri: item.avatar }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <View>
          <Text className="text-white font-medium">{item.author}</Text>
          <Text className="text-gray-400 text-xs">{item.timestamp}</Text>
        </View>
      </View>
      
      <Text className="text-white mb-4">{item.content}</Text>
      
      <View className="flex-row justify-between">
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="heart-outline" size={20} color="#a1a1aa" />
          <Text className="text-gray-400 ml-1">{item.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="chatbubble-outline" size={20} color="#a1a1aa" />
          <Text className="text-gray-400 ml-1">{item.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={20} color="#a1a1aa" />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <Text className="text-xl font-medium text-white">Feed</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Feed content */}
      <FlatList
        data={feedItems}
        renderItem={renderFeedItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}