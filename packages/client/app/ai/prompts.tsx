import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Sample prompt categories and data
const SAMPLE_PROMPTS = [
  {
    id: '1',
    category: 'Writing',
    prompts: [
      { id: '101', text: 'Write a blog post about the future of AI' },
      { id: '102', text: 'Create a creative story about space exploration' },
      { id: '103', text: 'Draft a professional email requesting feedback on my project' }
    ]
  },
  {
    id: '2',
    category: 'Business',
    prompts: [
      { id: '201', text: 'Generate a marketing plan for a new mobile app' },
      { id: '202', text: 'Create a SWOT analysis template for my business' },
      { id: '203', text: 'Draft a professional proposal for a potential client' }
    ]
  },
  {
    id: '3',
    category: 'Education',
    prompts: [
      { id: '301', text: 'Explain quantum computing like I\'m 10 years old' },
      { id: '302', text: 'Create a study plan for learning machine learning' },
      { id: '303', text: 'Provide a summary of recent advancements in renewable energy' }
    ]
  },
  {
    id: '4', 
    category: 'Personal',
    prompts: [
      { id: '401', text: 'Help me plan a 7-day itinerary for Japan' },
      { id: '402', text: 'Suggest exercises for a 30-minute home workout' },
      { id: '403', text: 'Create a weekly meal plan focusing on vegetarian options' }
    ]
  }
];

export default function PromptsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = selectedCategory 
    ? SAMPLE_PROMPTS.filter(cat => cat.id === selectedCategory) 
    : SAMPLE_PROMPTS;

  const filteredPrompts = filteredCategories.flatMap(category => 
    category.prompts.filter(prompt => 
      prompt.text.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(prompt => ({ ...prompt, category: category.category }))
  );

  const handlePromptSelect = (prompt: { category?: string; id?: string; text: any; }) => {
    // Navigate to AI screen with the selected prompt
    router.push({
      pathname: '/ai',
      params: { prompt: prompt.text }
    });
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />
      
      {/* Header */}
      <View className="px-4 py-6 border-b border-gray-200 dark:border-gray-800">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Prompt Library</Text>
        <Text className="text-gray-500 dark:text-gray-400">Find and save useful prompts</Text>
      </View>

      {/* Search Input */}
      <View className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 py-2 px-2 text-gray-900 dark:text-white"
            placeholder="Search prompts..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Category Selector */}
      <View className="px-4 py-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
          <TouchableOpacity 
            onPress={() => setSelectedCategory(null)} 
            className={`px-4 py-2 rounded-full mr-2 ${!selectedCategory ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <Text className={`${!selectedCategory ? 'text-white' : 'text-gray-800 dark:text-gray-300'}`}>All</Text>
          </TouchableOpacity>
          {SAMPLE_PROMPTS.map((category) => (
            <TouchableOpacity 
              key={category.id}
              onPress={() => setSelectedCategory(category.id)} 
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedCategory === category.id ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <Text className={`${
                selectedCategory === category.id ? 'text-white' : 'text-gray-800 dark:text-gray-300'
              }`}>{category.category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Prompts List */}
      <FlatList
        className="flex-1 px-4"
        data={filteredPrompts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="bg-gray-50 dark:bg-gray-800 p-4 mb-3 rounded-lg"
            onPress={() => handlePromptSelect(item)}
          >
            <Text className="text-gray-800 dark:text-gray-200">{item.text}</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.category}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 dark:text-gray-400 text-center">
              No prompts found. Try a different search term.
            </Text>
          </View>
        }
      />

      {/* Add Prompt Button */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => console.log('Add new prompt')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}