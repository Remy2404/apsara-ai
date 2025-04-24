import React from 'react';
import { View, Text, ScrollView, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => (
  <View className="mb-8">
    <Text className="text-lg font-medium text-white mb-4">{title}</Text>
    <View className="bg-secondary-800 rounded-lg overflow-hidden">
      {children}
    </View>
  </View>
);

interface SettingsItemProps {
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
  isLast?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  title, 
  icon, 
  onPress, 
  rightElement, 
  showChevron = true,
  isLast = false 
}) => (
  <Pressable 
    onPress={onPress}
    className={`flex-row items-center justify-between px-4 py-3 ${!isLast ? 'border-b border-gray-700' : ''}`}
  >
    <View className="flex-row items-center">
      <View className="w-8 justify-center items-center mr-3">
        {icon}
      </View>
      <Text className="text-white text-base">{title}</Text>
    </View>
    
    {rightElement || (showChevron && (
      <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
    ))}
  </Pressable>
);

export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-4">
        <Text className="text-xl font-medium text-white">Settings</Text>
      </View>
      
      {/* Settings Content */}
      <ScrollView className="flex-1 px-6">
        <SettingsSection title="App Preferences">
          <SettingsItem
            title="Appearance"
            icon={<Ionicons name="color-palette-outline" size={22} color="#10a37f" />}
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: '#3e3e3e', true: 'rgba(16, 163, 127, 0.4)' }}
                thumbColor={isDarkMode ? '#10a37f' : '#f4f3f4'}
              />
            }
            showChevron={false}
          />
          
          <SettingsItem
            title="Notifications"
            icon={<Ionicons name="notifications-outline" size={22} color="#10a37f" />}
            rightElement={
              <Switch
                value={isNotificationsEnabled}
                onValueChange={setIsNotificationsEnabled}
                trackColor={{ false: '#3e3e3e', true: 'rgba(16, 163, 127, 0.4)' }}
                thumbColor={isNotificationsEnabled ? '#10a37f' : '#f4f3f4'}
              />
            }
            showChevron={false}
          />
          
          <SettingsItem
            title="Language"
            icon={<Ionicons name="language-outline" size={22} color="#10a37f" />}
            onPress={() => console.log('Language settings')}
            rightElement={
              <Text className="text-gray-400">English</Text>
            }
          />
          
          <SettingsItem
            title="Chat History"
            icon={<Ionicons name="time-outline" size={22} color="#10a37f" />}
            onPress={() => console.log('Chat history settings')}
            isLast={true}
          />
        </SettingsSection>
        
        <SettingsSection title="Account">
          <SettingsItem
            title="Subscription"
            icon={<Ionicons name="card-outline" size={22} color="#10a37f" />}
            onPress={() => console.log('Subscription settings')}
            rightElement={
              <View className="px-2 py-1 bg-primary rounded-full">
                <Text className="text-white text-xs">Free</Text>
              </View>
            }
          />
          
          <SettingsItem
            title="Account Information"
            icon={<Ionicons name="person-outline" size={22} color="#10a37f" />}
            onPress={() => router.push('/profile')}
          />
          
          <SettingsItem
            title="Password & Security"
            icon={<Ionicons name="lock-closed-outline" size={22} color="#10a37f" />}
            onPress={() => router.push('/profile/password')}
            isLast={true}
          />
        </SettingsSection>
        
        <SettingsSection title="Support">
          <SettingsItem
            title="Help Center"
            icon={<Ionicons name="help-circle-outline" size={22} color="#10a37f" />}
            onPress={() => router.push('/settings/support')}
          />
          
          <SettingsItem
            title="Report a Bug"
            icon={<Ionicons name="bug-outline" size={22} color="#10a37f" />}
            onPress={() => console.log('Report a bug')}
          />
          
          <SettingsItem
            title="Privacy Policy"
            icon={<Ionicons name="shield-outline" size={22} color="#10a37f" />}
            onPress={() => router.push('/settings/privacy')}
          />
          
          <SettingsItem
            title="Terms of Service"
            icon={<Ionicons name="document-text-outline" size={22} color="#10a37f" />}
            onPress={() => router.push('/settings/terms')}
            isLast={true}
          />
        </SettingsSection>
        
        <SettingsSection title="About">
          <SettingsItem
            title="App Version"
            icon={<Ionicons name="information-circle-outline" size={22} color="#10a37f" />}
            rightElement={<Text className="text-gray-400">1.0.0</Text>}
            showChevron={false}
            isLast={true}
          />
        </SettingsSection>
        
        <Pressable 
          className="bg-secondary-800 rounded-lg py-3 items-center mb-8"
          onPress={() => console.log('Sign out')}
        >
          <Text className="text-red-500 font-medium">Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}