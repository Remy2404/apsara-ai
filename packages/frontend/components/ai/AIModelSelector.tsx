import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface AIModel {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  icon?: string;
  isPremium?: boolean;
}

interface AIModelSelectorProps {
  models: AIModel[];
  selectedModelId: string;
  onModelSelect: (modelId: string) => void;
  showCapabilities?: boolean;
}

export const AIModelSelector = ({
  models,
  selectedModelId,
  onModelSelect,
  showCapabilities = true,
}: AIModelSelectorProps) => {
  const { theme, isDark } = useTheme();
  
  return (
    <View>
      <Text className="text-lg font-semibold mb-3 text-text-light dark:text-text-dark px-4">
        Select AI Model
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
      >
        {models.map((model) => (
          <TouchableOpacity
            key={model.id}
            onPress={() => onModelSelect(model.id)}
            className={`mr-3 p-4 rounded-xl ${
              selectedModelId === model.id
                ? 'border-2 border-primary'
                : `border ${isDark ? 'border-gray-700' : 'border-gray-200'}`
            } ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            style={{ 
              width: 200,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-row items-center">
                {model.icon ? (
                  <Ionicons
                    name="settings-outline"
                    size={20}
                    color={isDark ? theme.colors.textSecondary : '#6B7280'}
                    style={{ marginRight: 8 }}
                  />
                ) : (
                  <Ionicons
                    name="settings-outline"
                    size={20}
                    color={isDark ? theme.colors.textSecondary : '#6B7280'}
                    style={{ marginRight: 8 }}
                  />
                )}
                
                <Text className="font-medium text-text-light dark:text-text-dark">
                  {model.name}
                </Text>
              </View>
              
              {model.isPremium && (
                <View className="bg-yellow-500 py-1 px-2 rounded">
                  <Text className="text-xs text-white font-medium">
                    PRO
                  </Text>
                </View>
              )}
            </View>
            
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-2" numberOfLines={2}>
              {model.description}
            </Text>
            
            {showCapabilities && (
              <View className="mt-3">
                {model.capabilities.slice(0, 3).map((capability, index) => (
                  <View key={index} className="flex-row items-center mt-1">
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={theme.colors.success}
                    />
                    <Text 
                      className="ml-2 text-xs text-gray-500 dark:text-gray-400"
                      numberOfLines={1}
                    >
                      {capability}
                    </Text>
                  </View>
                ))}
                
                {model.capabilities.length > 3 && (
                  <Text className="text-xs text-primary dark:text-primary-light mt-1">
                    +{model.capabilities.length - 3} more capabilities
                  </Text>
                )}
              </View>
            )}
            
            {selectedModelId === model.id && (
              <View className="absolute bottom-2 right-2">
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};