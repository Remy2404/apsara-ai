import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

interface PromptCategory {
  id: string;
  name: string;
  prompts: Prompt[];
}

interface Prompt {
  id: string;
  text: string;
  icon?: string;
}

interface PromptSuggestionsProps {
  categories: PromptCategory[];
  onPromptPress: (promptText: string) => void;
  selectedCategoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
}

export const PromptSuggestions = ({
  categories,
  onPromptPress,
  selectedCategoryId,
  onCategoryChange,
}: PromptSuggestionsProps) => {
  const { theme, isDark } = useTheme();
  
  // Default to first category if none selected
  const activeCategory = selectedCategoryId
    ? categories.find(cat => cat.id === selectedCategoryId)
    : categories[0];
  
  if (!categories.length) return null;
  
  return (
    <View className="mb-4">
      {/* Categories tabs */}
      {categories.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-3"
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              onPress={() => onCategoryChange?.(category.id)}
              className={`mr-2 px-4 py-2 rounded-full ${
                activeCategory?.id === category.id
                  ? 'bg-primary'
                  : isDark
                  ? 'bg-gray-800'
                  : 'bg-gray-200'
              }`}
            >
              <Text
                className={`text-sm ${
                  activeCategory?.id === category.id
                    ? 'text-white font-medium'
                    : 'text-text-light dark:text-text-dark'
                }`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      {/* Prompts */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {activeCategory?.prompts.map(prompt => (
          <TouchableOpacity
            key={prompt.id}
            onPress={() => onPromptPress(prompt.text)}
            className={`mr-3 p-3 rounded-xl border ${
              isDark
                ? 'border-gray-700 bg-gray-800'
                : 'border-gray-200 bg-white'
            }`}
            style={{
              minWidth: 150,
              maxWidth: 200,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            {prompt.icon && (
              <Ionicons
                name={prompt.icon as any}
                size={20}
                color={theme.colors.primary}
                style={{ marginBottom: 8 }}
              />
            )}
            
            <Text
              className="text-text-light dark:text-text-dark"
              numberOfLines={2}
            >
              {prompt.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};