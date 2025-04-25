import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-4">
        <Text className="text-xl font-medium text-white">Explore</Text>
        <Ionicons name="search-outline" size={24} color="white" />
      </View>
      
      <ScrollView className="flex-1 px-6">
        <View className="py-4">
          <Text className="text-white text-lg font-semibold mb-4">Discover AI Features</Text>
          
          {/* Content cards would go here */}
          <View className="bg-secondary-800 rounded-xl p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="bulb-outline" size={24} color="#10a37f" className="mr-2" />
              <Text className="text-white text-lg">Creative Assistant</Text>
            </View>
            <Text className="text-gray-400">Generate creative writing, poetry, and stories</Text>
          </View>
          
          <View className="bg-secondary-800 rounded-xl p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="code-slash-outline" size={24} color="#10a37f" className="mr-2" />
              <Text className="text-white text-lg">Code Helper</Text>
            </View>
            <Text className="text-gray-400">Get coding assistance and debugging help</Text>
          </View>
          
          <View className="bg-secondary-800 rounded-xl p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="school-outline" size={24} color="#10a37f" className="mr-2" />
              <Text className="text-white text-lg">Learning Companion</Text>
            </View>
            <Text className="text-gray-400">Study assistance and knowledge expansion</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}