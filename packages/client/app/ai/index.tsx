import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAI } from '../../hooks/useAI';

export default function AIScreen() {
  const [prompt, setPrompt] = useState('');
  const { sendPrompt, response, loading } = useAI();

  const handleSendPrompt: () => void = () => {
    if (prompt.trim() === '') return;
    sendPrompt(prompt);
    setPrompt('');
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />
      
      {/* Header */}
      <View className="px-4 py-6 border-b border-gray-200 dark:border-gray-800">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Apsara AI Assistant</Text>
        <Text className="text-gray-500 dark:text-gray-400">Ask me anything</Text>
      </View>
      
      {/* Chat Area */}
      <ScrollView 
        className="flex-1 p-4" 
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {response ? (
          <View className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <Text className="text-gray-800 dark:text-gray-200">{response}</Text>
          </View>
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 dark:text-gray-400 text-center">
              Ask Apsara AI a question to get started
            </Text>
          </View>
        )}
      </ScrollView>
      
      {/* Input Area */}
      <View className="p-4 border-t border-gray-200 dark:border-gray-800 flex-row items-center">
        <TextInput
          className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full px-4 py-3 mr-2"
          placeholder="Ask something..."
          placeholderTextColor="#9CA3AF"
          value={prompt}
          onChangeText={setPrompt}
          multiline
        />
        <TouchableOpacity 
          onPress={handleSendPrompt}
          disabled={loading || prompt.trim() === ''}
          className={`rounded-full p-3 ${loading || prompt.trim() === '' ? 'bg-blue-300' : 'bg-blue-500'}`}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text className="text-white font-semibold">Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}