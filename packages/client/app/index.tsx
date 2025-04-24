import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/common/Button';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, onPress }) => (
  <Pressable 
    onPress={onPress}
    className="bg-secondary-800 rounded-xl p-4 mb-4 border border-gray-700"
  >
    <View className="flex-row items-center mb-2">
      <View className="bg-primary rounded-full p-2 mr-3">
        {icon}
      </View>
      <Text className="text-white text-lg font-medium">{title}</Text>
    </View>
    <Text className="text-gray-300">{description}</Text>
  </Pressable>
);

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      {/* Header */}
      <LinearGradient
        colors={['rgba(16, 163, 127, 0.3)', 'rgba(16, 163, 127, 0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="px-6 pt-4 pb-8"
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-white mb-1">
              Welcome to Apsara AI
            </Text>
            <Text className="text-gray-300">
              Your intelligent assistant
            </Text>
          </View>
          
          <Pressable 
            onPress={() => router.push('/profile')}
            className="rounded-full overflow-hidden border-2 border-primary"
          >
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100' }}
              className="w-10 h-10"
            />
          </Pressable>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView className="flex-1 px-6 pt-6">
        {/* New Chat Button */}
        <Button 
          title="New Chat" 
          onPress={() => router.push('/chat')}
          leftIcon={<Ionicons name="chatbubble-outline" size={20} color="white" />}
          className="mb-6"
          size="lg"
        />
        
        {/* Feature Cards */}
        <Text className="text-xl font-medium text-white mb-4">
          What can I help you with?
        </Text>
        
        <FeatureCard
          title="Text Conversations"
          description="Chat naturally with Apsara AI about any topic. Get answers, creative ideas, and assistance."
          icon={<Ionicons name="chatbubbles-outline" size={24} color="white" />}
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
        
        {/* Footer */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}