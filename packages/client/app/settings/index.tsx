import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, Switch, Pressable, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useAuthContext } from '../../contexts/AuthContext';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children, delay = 0 }) => {
  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  return (
    <Animated.View 
      className="mb-6"
      style={{
        transform: [{ translateY }],
        opacity,
      }}
    >
      <Text className="text-lg font-medium text-white mb-3 px-1">{title}</Text>
      <View className="bg-secondary-800 rounded-2xl overflow-hidden">
        {children}
      </View>
    </Animated.View>
  );
};

interface SettingsItemProps {
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
  isLast?: boolean;
  subtitle?: string;
  iconBgColor?: string;
  iconColor?: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  title,
  subtitle, 
  icon, 
  onPress, 
  rightElement, 
  showChevron = true,
  isLast = false,
  iconBgColor = "bg-primary-600/20",
  iconColor = "#10a37f"
}) => (
  <Pressable 
    onPress={onPress}
    className={`flex-row items-center justify-between px-4 py-3.5 ${!isLast ? 'border-b border-secondary-700' : ''}`}
    style={({ pressed }) => [
      pressed ? { backgroundColor: 'rgba(255, 255, 255, 0.05)' } : {}
    ]}
  >
    <View className="flex-row items-center flex-1">
      <View className={`w-9 h-9 rounded-full ${iconBgColor} items-center justify-center mr-4`}>
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-white text-base">{title}</Text>
        {subtitle && (
          <Text className="text-gray-400 text-sm mt-0.5">{subtitle}</Text>
        )}
      </View>
    </View>
    
    {rightElement || (showChevron && (
      <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
    ))}
  </Pressable>
);

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useAuthContext();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [dataUsageOption, setDataUsageOption] = useState('Balanced');
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  
  // Animation for header
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0)).current;
  const modalBgOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // Show sign out confirmation
  const showSignOutConfirmation = () => {
    setShowSignOutModal(true);
    Animated.parallel([
      Animated.timing(modalScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalBgOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };
  
  // Hide sign out confirmation
  const hideSignOutConfirmation = () => {
    Animated.parallel([
      Animated.timing(modalScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(modalBgOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowSignOutModal(false);
    });
  };
  
  const handleSignOut = () => {
    hideSignOutConfirmation();
    setTimeout(() => signOut(), 300);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <StatusBar style="light" />
      
      {/* Header */}
      <Animated.View 
        className="px-6 pt-2 pb-4"
        style={{ opacity: headerOpacity }}
      >
        <Text className="text-2xl font-bold text-white">Settings</Text>
        <Text className="text-gray-400">Customize your app experience</Text>
      </Animated.View>
      
      {/* Settings Content */}
      <ScrollView className="flex-1 px-6">
        <SettingsSection title="Appearance" delay={100}>
          <SettingsItem
            title="Dark Mode"
            subtitle="Use dark theme for the app interface"
            icon={<Ionicons name="moon" size={20} color="#10a37f" />}
            rightElement={
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: '#3e3e3e', true: 'rgba(16, 163, 127, 0.4)' }}
                thumbColor={theme === 'dark' ? '#10a37f' : '#f4f3f4'}
              />
            }
            showChevron={false}
          />
          
          <SettingsItem
            title="Text Size"
            subtitle="Adjust the text size throughout the app"
            icon={<Ionicons name="text" size={20} color="#10a37f" />}
            onPress={() => console.log('Text size settings')}
            isLast={true}
            rightElement={
              <Text className="text-gray-400">Medium</Text>
            }
          />
        </SettingsSection>
        
        <SettingsSection title="Notifications & Privacy" delay={200}>
          <SettingsItem
            title="Push Notifications"
            subtitle="Get notified about important updates"
            icon={<Ionicons name="notifications" size={20} color="#10a37f" />}
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
            title="Biometric Authentication"
            subtitle="Use Face ID or fingerprint to unlock"
            icon={<Ionicons name="finger-print" size={20} color="#10a37f" />}
            rightElement={
              <Switch
                value={isBiometricEnabled}
                onValueChange={setIsBiometricEnabled}
                trackColor={{ false: '#3e3e3e', true: 'rgba(16, 163, 127, 0.4)' }}
                thumbColor={isBiometricEnabled ? '#10a37f' : '#f4f3f4'}
              />
            }
            showChevron={false}
          />
          
          <SettingsItem
            title="Privacy Settings"
            subtitle="Manage data collection and privacy"
            icon={<Ionicons name="shield-checkmark" size={20} color="#10a37f" />}
            onPress={() => router.push('/settings/privacy')}
            isLast={true}
          />
        </SettingsSection>
        
        <SettingsSection title="Data & Storage" delay={300}>
          <SettingsItem
            title="Data Usage"
            subtitle="Control how media and messages are downloaded"
            icon={<Ionicons name="cellular" size={20} color="#3b82f6" />}
            onPress={() => console.log('Data usage settings')}
            rightElement={
              <Text className="text-gray-400">{dataUsageOption}</Text>
            }
            iconBgColor="bg-blue-600/20"
            iconColor="#3b82f6"
          />
          
          <SettingsItem
            title="Storage"
            subtitle="View app storage and clear cache"
            icon={<Ionicons name="save" size={20} color="#3b82f6" />}
            onPress={() => console.log('Storage settings')}
            iconBgColor="bg-blue-600/20"
            iconColor="#3b82f6"
            isLast={true}
          />
        </SettingsSection>
        
        <SettingsSection title="Account" delay={400}>
          <SettingsItem
            title="Subscription"
            subtitle="Manage your current plan"
            icon={<Ionicons name="card" size={20} color="#f59e0b" />}
            onPress={() => console.log('Subscription settings')}
            rightElement={
              <View className="px-3 py-1 bg-primary-600 rounded-full">
                <Text className="text-white text-xs font-medium">Free</Text>
              </View>
            }
            iconBgColor="bg-yellow-600/20"
            iconColor="#f59e0b"
          />
          
          <SettingsItem
            title="Account Information"
            subtitle="Edit profile and personal details"
            icon={<Ionicons name="person" size={20} color="#f59e0b" />}
            onPress={() => router.push('/profile')}
            iconBgColor="bg-yellow-600/20"
            iconColor="#f59e0b"
          />
          
          <SettingsItem
            title="Password & Security"
            subtitle="Update password and security settings"
            icon={<Ionicons name="lock-closed" size={20} color="#f59e0b" />}
            onPress={() => router.push('/profile/password')}
            iconBgColor="bg-yellow-600/20"
            iconColor="#f59e0b"
            isLast={true}
          />
        </SettingsSection>
        
        <SettingsSection title="Support & About" delay={500}>
          <SettingsItem
            title="Help Center"
            subtitle="Get help and contact support"
            icon={<Ionicons name="help-circle" size={20} color="#ec4899" />}
            onPress={() => router.push('/settings/support')}
            iconBgColor="bg-pink-600/20"
            iconColor="#ec4899"
          />
          
          <SettingsItem
            title="Report a Bug"
            subtitle="Tell us about issues you've encountered"
            icon={<Ionicons name="bug" size={20} color="#ec4899" />}
            onPress={() => console.log('Report a bug')}
            iconBgColor="bg-pink-600/20"
            iconColor="#ec4899"
          />
          
          <SettingsItem
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            icon={<Ionicons name="shield" size={20} color="#ec4899" />}
            onPress={() => router.push('/settings/privacy')}
            iconBgColor="bg-pink-600/20"
            iconColor="#ec4899"
          />
          
          <SettingsItem
            title="Terms of Service"
            subtitle="Read our terms of service"
            icon={<Ionicons name="document-text" size={20} color="#ec4899" />}
            onPress={() => router.push('/settings/terms')}
            iconBgColor="bg-pink-600/20"
            iconColor="#ec4899"
          />
          
          <SettingsItem
            title="App Version"
            subtitle="Current version installed"
            icon={<Ionicons name="information-circle" size={20} color="#ec4899" />}
            rightElement={<Text className="text-gray-400">1.0.0</Text>}
            iconBgColor="bg-pink-600/20"
            iconColor="#ec4899"
            showChevron={false}
            isLast={true}
          />
        </SettingsSection>
        
        <Animated.View 
          style={{
            opacity: headerOpacity,
            transform: [{ 
              translateY: headerOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })
            }]
          }}
          className="mb-10"
        >
          <TouchableOpacity 
            className="bg-red-500/10 py-4 items-center rounded-2xl mb-2"
            onPress={showSignOutConfirmation}
          >
            <Text className="text-red-500 font-medium">Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
      
      {/* Sign Out Confirmation Modal */}
      {showSignOutModal && (
        <View className="absolute inset-0 items-center justify-center">
          <Animated.View 
            className="absolute inset-0 bg-black"
            style={{ 
              opacity: modalBgOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.6]
              })
            }}
          >
            <TouchableOpacity 
              className="w-full h-full" 
              onPress={hideSignOutConfirmation}
              activeOpacity={1}
            />
          </Animated.View>
          
          <Animated.View 
            className="bg-secondary-800 w-5/6 rounded-2xl p-6"
            style={{ 
              transform: [{ 
                scale: modalScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1]
                })
              }]
            }}
          >
            <View className="items-center mb-4">
              <View className="w-14 h-14 bg-red-600/10 rounded-full items-center justify-center mb-3">
                <Ionicons name="log-out" size={28} color="#ef4444" />
              </View>
              <Text className="text-xl font-bold text-white mb-1">Sign Out</Text>
              <Text className="text-gray-400 text-center mb-2">
                Are you sure you want to sign out from your account?
              </Text>
            </View>
            
            <TouchableOpacity 
              className="bg-red-500 rounded-lg py-3 mb-3"
              onPress={handleSignOut}
            >
              <Text className="text-white font-medium text-center">Yes, Sign Out</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-secondary-700 rounded-lg py-3"
              onPress={hideSignOutConfirmation}
            >
              <Text className="text-white text-center">Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
}