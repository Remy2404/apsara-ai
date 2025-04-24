import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';

interface ProfileOptionProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  showArrow?: boolean;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({ title, icon, onPress, showArrow = true }) => (
  <Pressable 
    onPress={onPress}
    className="flex-row items-center justify-between py-3 border-b border-gray-700"
  >
    <View className="flex-row items-center">
      <View className="w-8 justify-center items-center mr-3">
        {icon}
      </View>
      <Text className="text-white text-base">{title}</Text>
    </View>
    
    {showArrow && (
      <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
    )}
  </Pressable>
);

export default function ProfileScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      {/* Header */}
      <View className="px-6 pt-4 pb-6 bg-secondary-800 border-b border-gray-700">
        <View className="flex-row items-center justify-between mb-4">
          <Pressable 
            onPress={() => router.back()}
            className="p-2 -ml-2"
            hitSlop={8}
          >
            <Ionicons name="arrow-back" size={24} color="#f9fafb" />
          </Pressable>
          
          <Text className="text-xl font-medium text-white">Profile</Text>
          
          <Pressable 
            onPress={() => router.push('/profile/edit')}
            className="p-2 -mr-2"
            hitSlop={8}
          >
            <Ionicons name="create-outline" size={22} color="#f9fafb" />
          </Pressable>
        </View>
        
        <View className="items-center">
          <View className="rounded-full overflow-hidden border-2 border-primary mb-4">
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150' }}
              className="w-24 h-24"
            />
          </View>
          
          <Text className="text-white text-xl font-medium mb-1">John Doe</Text>
          <Text className="text-gray-400 mb-4">john.doe@example.com</Text>
          
          <View className="flex-row w-full">
            <Button 
              title="Edit Profile" 
              onPress={() => router.push('/profile/edit')}
              variant="outline"
              className="flex-1 mr-2"
              size="sm"
            />
            <Button 
              title="Subscription" 
              onPress={() => console.log('Subscription')}
              variant="primary"
              className="flex-1 ml-2"
              size="sm"
            />
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="text-lg font-medium text-white mb-4">Account</Text>
        
        <ProfileOption
          title="Personal Information"
          icon={<Ionicons name="person-outline" size={22} color="#10a37f" />}
          onPress={() => router.push('/profile/edit')}
        />
        
        <ProfileOption
          title="Password & Security"
          icon={<Ionicons name="shield-outline" size={22} color="#10a37f" />}
          onPress={() => router.push('/profile/password')}
        />
        
        <ProfileOption
          title="Subscription"
          icon={<Ionicons name="card-outline" size={22} color="#10a37f" />}
          onPress={() => console.log('Subscription')}
        />
        
        <ProfileOption
          title="Notification Settings"
          icon={<Ionicons name="notifications-outline" size={22} color="#10a37f" />}
          onPress={() => router.push('/settings/notifications')}
        />
        
        <Text className="text-lg font-medium text-white mt-8 mb-4">App Settings</Text>
        
        <ProfileOption
          title="Appearance"
          icon={<Ionicons name="color-palette-outline" size={22} color="#10a37f" />}
          onPress={() => router.push('/settings/theme')}
        />
        
        <ProfileOption
          title="Language"
          icon={<Ionicons name="language-outline" size={22} color="#10a37f" />}
          onPress={() => router.push('/settings')}
        />
        
        <ProfileOption
          title="Privacy"
          icon={<Ionicons name="lock-closed-outline" size={22} color="#10a37f" />}
          onPress={() => router.push('/settings/privacy')}
        />
        
        <ProfileOption
          title="Help & Support"
          icon={<Ionicons name="help-circle-outline" size={22} color="#10a37f" />}
          onPress={() => router.push('/settings/support')}
        />
        
        <ProfileOption
          title="About"
          icon={<Ionicons name="information-circle-outline" size={22} color="#10a37f" />}
          onPress={() => router.push('/settings/about')}
        />
        
        <Button 
          title="Sign Out" 
          onPress={() => console.log('Sign out')}
          variant="secondary"
          className="mt-8 mb-6"
        />
      </ScrollView>
    </SafeAreaView>
  );
}