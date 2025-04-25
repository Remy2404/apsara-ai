import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function AISettingsScreen() {
  const [settings, setSettings] = useState({
    useGPT4: true,
    saveHistory: true,
    contextLength: 'Medium',
    voiceEnabled: false,
    dataCollection: false,
  });

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />
      
      <View className="px-4 py-6 border-b border-gray-200 dark:border-gray-800">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">AI Settings</Text>
        <Text className="text-gray-500 dark:text-gray-400">Customize your AI experience</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Model Selection */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">AI Model</Text>
            <View className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-gray-800">
              <Text className="text-gray-800 dark:text-gray-300">Use GPT-4 (Premium)</Text>
              <Switch 
                value={settings.useGPT4}
                onValueChange={(value) => updateSetting('useGPT4', value)}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
              />
            </View>
          </View>

          {/* History Settings */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Chat History</Text>
            <View className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-gray-800">
              <Text className="text-gray-800 dark:text-gray-300">Save chat history</Text>
              <Switch 
                value={settings.saveHistory} 
                onValueChange={(value) => updateSetting('saveHistory', value)}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
              />
            </View>
          </View>

          {/* Context Settings */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Context Length</Text>
            <View className="flex-row justify-between mb-2">
              {['Short', 'Medium', 'Long'].map((option) => (
                <TouchableOpacity 
                  key={option}
                  onPress={() => updateSetting('contextLength', option)}
                  className={`flex-1 py-3 mx-1 items-center rounded-lg ${
                    settings.contextLength === option 
                      ? 'bg-blue-500' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <Text 
                    className={`font-medium ${
                      settings.contextLength === option 
                        ? 'text-white' 
                        : 'text-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Longer context allows the AI to reference more of your previous messages but may use more resources.
            </Text>
          </View>

          {/* Voice Features */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Voice Features</Text>
            <View className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-gray-800">
              <Text className="text-gray-800 dark:text-gray-300">Enable voice interactions</Text>
              <Switch 
                value={settings.voiceEnabled}
                onValueChange={(value) => updateSetting('voiceEnabled', value)}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
              />
            </View>
          </View>

          {/* Privacy */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Privacy</Text>
            <View className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-gray-800">
              <View>
                <Text className="text-gray-800 dark:text-gray-300">Help improve AI responses</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  Allow anonymous collection of conversation data to improve AI quality
                </Text>
              </View>
              <Switch 
                value={settings.dataCollection}
                onValueChange={(value) => updateSetting('dataCollection', value)} 
                trackColor={{ false: "#767577", true: "#81b0ff" }}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            className="bg-blue-500 py-4 rounded-lg items-center mt-6"
            onPress={() => console.log('Settings saved:', settings)}
          >
            <Text className="text-white font-semibold">Save Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}