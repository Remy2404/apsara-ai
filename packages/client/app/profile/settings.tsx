import React, { useState, useEffect } from 'react'; 
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProfileContext } from '../../contexts/ProfileContext';
import { useTheme } from '../../hooks/useTheme';
import { UserPreferences } from '../../../common/src/types/user'; // Use relative path until path aliases are working

// Define a default state structure matching UserPreferences
const defaultPreferences: UserPreferences = {
  theme: 'system',
  notifications: { push: false, email: false },
  privacy: { showEmail: false, showActivity: false },
  aiSettings: { model: 'default', temperature: 0.7, historyLength: 10 }
};

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const { profile, updatePreferences, isLoading } = useProfileContext();
  const { theme, setTheme } = useTheme(); // Keep this if theme context is separate
  
  // Initialize state with default structure, then override with profile data
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    if (profile?.preferences) {
      // Deep merge profile preferences onto defaults to ensure all keys exist
      return {
        ...defaultPreferences,
        ...profile.preferences,
        notifications: {
          ...defaultPreferences.notifications,
          ...(profile.preferences.notifications || {}),
        },
        privacy: {
          ...defaultPreferences.privacy,
          ...(profile.preferences.privacy || {}),
        },
        aiSettings: {
          ...defaultPreferences.aiSettings,
          ...(profile.preferences.aiSettings || {}),
        },
      };
    }
    return defaultPreferences;
  });
  
  // Update local state when profile changes from context
  useEffect(() => {
    if (profile?.preferences) {
       setPreferences({
        ...defaultPreferences,
        ...profile.preferences,
        notifications: {
          ...defaultPreferences.notifications,
          ...(profile.preferences.notifications || {}),
        },
        privacy: {
          ...defaultPreferences.privacy,
          ...(profile.preferences.privacy || {}),
        },
        aiSettings: {
          ...defaultPreferences.aiSettings,
          ...(profile.preferences.aiSettings || {}),
        },
      });
    }
  }, [profile]);
  
  // Handle toggle switch changes for nested objects
  const handleToggle = (category: keyof UserPreferences, field: string, value: boolean) => {
    setPreferences((prev: UserPreferences) => { // Add type annotation
      const categoryState = prev[category];
      // Ensure the category exists and is an object
      if (typeof categoryState === 'object' && categoryState !== null) {
        return {
          ...prev,
          [category]: {
            ...categoryState,
            [field]: value,
          },
        };
      }
      // Handle non-object categories if any (though preferences are objects here)
      return { ...prev, [category]: value }; 
    });
  };
  
  // Handle theme selection
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setPreferences((prev: UserPreferences) => ({ // Add type annotation
      ...prev,
      theme: newTheme,
    }));
    
    // Update theme in the theme context as well
    setTheme(newTheme);
  };
  
  // Save preferences
  const handleSave = async () => {
    try {
      // Pass only the parts of preferences that might have changed
      await updatePreferences({
         theme: preferences.theme,
         notifications: preferences.notifications,
         privacy: preferences.privacy,
         // aiSettings: preferences.aiSettings // Uncomment if AI settings are managed here
      });
      Alert.alert('Success', 'Your settings have been updated');
      router.back();
    } catch (error) {
      // Error is already handled in context
      // Alert.alert('Error', 'Failed to update settings'); 
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />
      
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Profile Settings
          </Text>
          
          {/* Notifications Section */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Notifications
            </Text>
            
            <View className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-800 dark:text-gray-200">
                  Push Notifications
                </Text>
                <Switch
                  value={preferences.notifications.push} // Correctly access nested value
                  onValueChange={(value) => handleToggle('notifications', 'push', value)} // Pass category and field
                  trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
                  thumbColor={preferences.notifications.push ? '#ffffff' : '#ffffff'} // Correctly access nested value
                />
              </View>
              {/* Add Email Notifications Toggle if needed */}
              {/* <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-800 dark:text-gray-200">
                  Email Notifications
                </Text>
                <Switch
                  value={preferences.notifications.email} 
                  onValueChange={(value) => handleToggle('notifications', 'email', value)}
                  trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
                  thumbColor={preferences.notifications.email ? '#ffffff' : '#ffffff'}
                />
              </View> */}
              
            
              <Text className="text-gray-500 dark:text-gray-400 text-sm">
                Receive notifications about new messages, updates, and activities.
              </Text>
            </View>
          </View>
          
          {/* Theme Section */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Theme
            </Text>
            
            <View className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <TouchableOpacity
                className={`flex-row items-center justify-between py-2 ${preferences.theme === 'light' ? 'opacity-100' : 'opacity-50'}`}
                onPress={() => handleThemeChange('light')}
              >
                <View className="flex-row items-center">
                  <Ionicons name="sunny" size={20} color={preferences.theme === 'light' ? '#4f46e5' : '#9ca3af'} />
                  <Text className="text-gray-800 dark:text-gray-200 ml-3">
                    Light
                  </Text>
                </View>
                {preferences.theme === 'light' && (
                  <Ionicons name="checkmark" size={20} color="#4f46e5" />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                className={`flex-row items-center justify-between py-2 ${preferences.theme === 'dark' ? 'opacity-100' : 'opacity-50'}`}
                onPress={() => handleThemeChange('dark')}
              >
                <View className="flex-row items-center">
                  <Ionicons name="moon" size={20} color={preferences.theme === 'dark' ? '#4f46e5' : '#9ca3af'} />
                  <Text className="text-gray-800 dark:text-gray-200 ml-3">
                    Dark
                  </Text>
                </View>
                {preferences.theme === 'dark' && (
                  <Ionicons name="checkmark" size={20} color="#4f46e5" />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                className={`flex-row items-center justify-between py-2 ${preferences.theme === 'system' ? 'opacity-100' : 'opacity-50'}`}
                onPress={() => handleThemeChange('system')}
              >
                <View className="flex-row items-center">
                  <Ionicons name="settings" size={20} color={preferences.theme === 'system' ? '#4f46e5' : '#9ca3af'} />
                  <Text className="text-gray-800 dark:text-gray-200 ml-3">
                    System Default
                  </Text>
                </View>
                {preferences.theme === 'system' && (
                  <Ionicons name="checkmark" size={20} color="#4f46e5" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Privacy Section */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Privacy
            </Text>
            
            <View className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-800 dark:text-gray-200">
                  Show Email
                </Text>
                <Switch
                  value={preferences.privacy.showEmail} // Correctly access nested value
                  onValueChange={(value) => handleToggle('privacy', 'showEmail', value)} // Pass category and field
                  trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
                  thumbColor={preferences.privacy.showEmail ? '#ffffff' : '#ffffff'} // Correctly access nested value
                />
              </View>
              
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-800 dark:text-gray-200">
                  Show Activity Status
                </Text>
                <Switch
                  value={preferences.privacy.showActivity} // Correctly access nested value
                  onValueChange={(value) => handleToggle('privacy', 'showActivity', value)} // Pass category and field
                  trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
                  thumbColor={preferences.privacy.showActivity ? '#ffffff' : '#ffffff'} // Correctly access nested value
                />
              </View>
              
              <Text className="text-gray-500 dark:text-gray-400 text-sm">
                Control the visibility of your profile information to other users.
              </Text>
            </View>
          </View>
          
          {/* Action Buttons */}
          <View className="flex-row mt-4">
            <TouchableOpacity
              className="flex-1 bg-gray-200 dark:bg-gray-700 py-3 rounded-lg mr-2"
              onPress={() => router.back()}
              disabled={isLoading}
            >
              <Text className="text-center text-gray-800 dark:text-gray-200">Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-1 bg-blue-500 py-3 rounded-lg ml-2 items-center"
              onPress={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-center text-white">Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}