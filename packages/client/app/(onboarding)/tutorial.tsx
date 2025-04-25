import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface TutorialItem {
  id: string;
  title: string;
  description: string;
  icon: 'help-circle-outline' | 'mic-outline' | 'image-outline';
}

const tutorialData: TutorialItem[] = [
  {
    id: '1',
    title: 'Ask Anything',
    description: 'Get instant answers to your questions, no matter how complex.',
    icon: 'help-circle-outline'
  },
  {
    id: '2',
    title: 'Voice Interaction',
    description: 'Speak naturally with Apsara AI using voice commands.',
    icon: 'mic-outline'
  },
  {
    id: '3',
    title: 'Image Understanding',
    description: 'Share images for Apsara to analyze and provide insights.',
    icon: 'image-outline'
  }
];
export default function TutorialScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  
  interface TutorialItem {
    id: string;
    title: string;
    description: string;
    icon: 'help-circle-outline' | 'mic-outline' | 'image-outline';
  }

  const renderTutorialItem = ({ item, index }: { item: TutorialItem; index: number }) => {
    return (
      <View style={{ width }} className="items-center px-8">
        <View className="w-40 h-40 bg-primary-600/20 rounded-full items-center justify-center mb-8">
          <Ionicons name={item.icon} size={80} color="#10a37f" />
        </View>
        
        <Text className="text-2xl text-white font-bold text-center mb-4">
          {item.title}
        </Text>
        
        <Text className="text-gray-400 text-center mb-8">
          {item.description}
        </Text>
      </View>
    );
  };
  
  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number }; layoutMeasurement: { width: number } } }) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setActiveIndex(pageNum);
  };
  
  const goToNextScreen = () => {
    if (activeIndex === tutorialData.length - 1) {
      router.push('/(onboarding)/permissions');
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <TouchableOpacity 
        className="absolute top-12 right-6 z-10"
        onPress={() => router.push('/(onboarding)/complete')}
      >
        <Text className="text-gray-400">Skip</Text>
      </TouchableOpacity>
      
      <View className="flex-1 justify-center">
        <FlatList
          data={tutorialData}
          renderItem={renderTutorialItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>
      
      <View className="pb-12 px-6">
        <View className="flex-row justify-center mb-8">
          {tutorialData.map((_, index) => (
            <View 
              key={index} 
              className={`h-1 w-8 rounded-full mx-1 ${index === activeIndex ? 'bg-primary-600' : 'bg-gray-600'}`} 
            />
          ))}
        </View>
        
        <TouchableOpacity 
          className="bg-primary-600 py-4 rounded-full"
          onPress={goToNextScreen}
        >
          <Text className="text-white font-semibold text-center">
            {activeIndex === tutorialData.length - 1 ? 'Continue' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}