import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ChatSettingsScreen() {
  const router = useRouter();
  
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    readReceipts: true,
    deleteAfter: 'Never',
    chatBackup: false,
    autoReply: false,
    fontSize: 'Medium'
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
      
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Chat Settings</Text>
          
          {/* Notifications */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Notifications</Text>
            <View className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <View className="flex-row justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <Text className="text-gray-800 dark:text-gray-300">Enable notifications</Text>
                <Switch 
                  value={settings.notifications} 
                  onValueChange={(value) => updateSetting('notifications', value)}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                />
              </View>
              
              <View className="flex-row justify-between items-center py-4 px-4">
                <Text className="text-gray-800 dark:text-gray-300">Sound</Text>
                <Switch 
                  value={settings.sound} 
                  onValueChange={(value) => updateSetting('sound', value)}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  disabled={!settings.notifications}
                />
              </View>
            </View>
          </View>
          
          {/* Privacy */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Privacy</Text>
            <View className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <View className="flex-row justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <Text className="text-gray-800 dark:text-gray-300">Read receipts</Text>
                <Switch 
                  value={settings.readReceipts} 
                  onValueChange={(value) => updateSetting('readReceipts', value)}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                />
              </View>
              
              <TouchableOpacity 
                className="flex-row justify-between items-center py-4 px-4"
                onPress={() => {
                  const options = ['Never', '30 Days', '90 Days', '1 Year'];
                  const currentIndex = options.indexOf(settings.deleteAfter);
                  const nextIndex = (currentIndex + 1) % options.length;
                  updateSetting('deleteAfter', options[nextIndex]);
                }}
              >
                <Text className="text-gray-800 dark:text-gray-300">Delete messages after</Text>
                <View className="flex-row items-center">
                  <Text className="text-blue-500 mr-2">{settings.deleteAfter}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#3b82f6" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Backup & Sync */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Backup & Sync</Text>
            <View className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <View className="flex-row justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <View>
                  <Text className="text-gray-800 dark:text-gray-300">Cloud backup</Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    Securely store your conversations in the cloud
                  </Text>
                </View>
                <Switch 
                  value={settings.chatBackup} 
                  onValueChange={(value) => updateSetting('chatBackup', value)}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                />
              </View>
              
              <TouchableOpacity 
                className="py-4 px-4"
                onPress={() => console.log('Export chats')}
                disabled={!settings.chatBackup}
              >
                <Text className={`${settings.chatBackup ? 'text-blue-500' : 'text-gray-400'}`}>
                  Export all conversations
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Automated Responses */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Automated Responses</Text>
            <View className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <View className="flex-row justify-between items-center py-4 px-4">
                <View>
                  <Text className="text-gray-800 dark:text-gray-300">Auto-reply when away</Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    Set an automated response when you're unavailable
                  </Text>
                </View>
                <Switch 
                  value={settings.autoReply} 
                  onValueChange={(value) => updateSetting('autoReply', value)}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                />
              </View>
            </View>
          </View>
          
          {/* Appearance */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Appearance</Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mb-3">Font Size</Text>
            <View className="flex-row justify-between mb-2">
              {['Small', 'Medium', 'Large'].map((size) => (
                <TouchableOpacity 
                  key={size}
                  onPress={() => updateSetting('fontSize', size)}
                  className={`flex-1 py-3 mx-1 items-center rounded-lg ${
                    settings.fontSize === size 
                      ? 'bg-blue-500' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <Text 
                    className={`font-medium ${
                      settings.fontSize === size 
                        ? 'text-white' 
                        : 'text-gray-800 dark:text-gray-300'
                    }`}
                    style={{ 
                      fontSize: size === 'Small' ? 14 : size === 'Medium' ? 16 : 18 
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Storage Management */}
          <TouchableOpacity
            className="bg-gray-50 dark:bg-gray-800 rounded-lg py-4 px-4 flex-row justify-between items-center mb-6"
            onPress={() => console.log('Manage storage')}
          >
            <View className="flex-row items-center">
              <Ionicons name="folder-open" size={24} color="#3b82f6" className="mr-3" />
              <Text className="text-gray-800 dark:text-gray-300">Manage chat storage</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          {/* Save Button */}
          <TouchableOpacity
            className="bg-blue-500 py-4 rounded-lg items-center"
            onPress={() => {
              // Save settings and navigate back
              console.log('Settings saved:', settings);
              router.back();
            }}
          >
            <Text className="text-white font-semibold">Save Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}