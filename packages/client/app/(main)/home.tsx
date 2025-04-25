import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
}

function FeatureCard({ title, description, icon, onPress }: FeatureCardProps) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className="bg-secondary-800 p-4 rounded-xl mb-4"
    >
      <View className="flex-row items-center mb-2">
        <View className="w-10 h-10 rounded-full bg-primary-600 items-center justify-center mr-3">
          {icon}
        </View>
        <Text className="text-white text-lg font-medium">{title}</Text>
      </View>
      <Text className="text-gray-400">{description}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      {/* Header */}
      <View className="px-6 pt-2 pb-4 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-400">Welcome back</Text>
          <Text className="text-2xl text-white font-bold">Apsara AI</Text>
        </View>
        <TouchableOpacity 
          className="w-10 h-10 bg-secondary-800 rounded-full items-center justify-center"
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person" size={20} color="#10a37f" />
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <ScrollView className="flex-1 px-6">
        {/* Quick actions */}
        <View className="py-4">
          <Text className="text-white text-lg font-semibold mb-4">Quick Actions</Text>
          
          <FeatureCard
            title="Text Conversation"
            description="Start a new chat with Apsara AI to get answers or assistance with tasks."
            icon={<Ionicons name="chatbubble-outline" size={24} color="white" />}
            onPress={() => router.push('/chat')}
          />
          
          <FeatureCard
            title="Voice Interaction"
            description="Speak directly to Apsara AI and get voice responses. Perfect when your hands are busy."
            icon={<Ionicons name="mic-outline" size={24} color="white" />}
            onPress={() => router.push('/chat/voice-input')}
          />
          
          <FeatureCard
            title="Image Analysis"
            description="Upload images and get detailed descriptions or answers to questions about them."
            icon={<Ionicons name="image-outline" size={24} color="white" />}
            onPress={() => router.push('/chat/file-upload')}
          />
          
          <FeatureCard
            title="Knowledge Database"
            description="Access a vast knowledge base to get accurate information on countless topics."
            icon={<Ionicons name="library-outline" size={24} color="white" />}
            onPress={() => router.push('/ai/prompts')}
          />
        </View>
        
        {/* Recent activity section would go here */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}