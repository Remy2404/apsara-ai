import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useProfileContext } from '../../contexts/ProfileContext';
import { useAuthContext } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useProfileContext();
  const { signOut } = useAuthContext();
  
  // Format date to readable string
  const formatDate = (date: Date) => {
        return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!profile) {
    return (
      <View className="flex-1 bg-white dark:bg-gray-900 items-center justify-center p-4">
        <Text className="text-gray-500 dark:text-gray-400">
          Profile not found. Please sign in again.
        </Text>
        <TouchableOpacity
          className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => signOut()}
        >
          <Text className="text-white font-semibold">Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />
      
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="p-4 items-center border-b border-gray-200 dark:border-gray-800">
          <View className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-4">
            {profile.avatar ? (
              <Image 
                source={{ uri: profile.avatar }} 
                className="h-full w-full" 
              />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <Ionicons name="person" size={40} color="#9ca3af" />
              </View>
            )}
          </View>
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {profile.name}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 mb-2">
            @{profile.username}
          </Text>
          
          {profile.bio && (
            <Text className="text-gray-700 dark:text-gray-300 text-center mb-3">
              {profile.bio}
            </Text>
          )}
          
          <View className="flex-row items-center mb-1">
            {profile.location && (
              <View className="flex-row items-center mr-4">
                <Ionicons name="location" size={16} color="#9ca3af" />
                <Text className="text-gray-500 dark:text-gray-400 ml-1">
                  {profile.location}
                </Text>
              </View>
            )}
            
            {profile.website && (
              <View className="flex-row items-center">
                <Ionicons name="globe" size={16} color="#9ca3af" />
                <Text className="text-blue-500 ml-1">
                  {profile.website.replace(/^https?:\/\//, '')}
                </Text>
              </View>
            )}
          </View>
          
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            Member since {formatDate(profile.createdAt)}
          </Text>
          
          <TouchableOpacity
            className="mt-4 px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-full"
            onPress={() => router.push('/profile/edit')}
          >
            <Text className="text-gray-900 dark:text-white font-medium">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Account Section */}
        <View className="p-4">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Account
          </Text>
          
          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-800"
            onPress={() => router.push('/profile/edit')}
          >
            <Ionicons name="person-circle" size={22} color="#3b82f6" />
            <Text className="text-gray-800 dark:text-gray-200 ml-3 flex-1">
              Personal Information
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-800"
            onPress={() => router.push('/profile/password')}
          >
            <Ionicons name="lock-closed" size={22} color="#3b82f6" />
            <Text className="text-gray-800 dark:text-gray-200 ml-3 flex-1">
              Change Password
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-800"
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings" size={22} color="#3b82f6" />
            <Text className="text-gray-800 dark:text-gray-200 ml-3 flex-1">
              App Settings
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-800"
            onPress={() => router.push('/settings/privacy')}
          >
            <Ionicons name="shield-checkmark" size={22} color="#3b82f6" />
            <Text className="text-gray-800 dark:text-gray-200 ml-3 flex-1">
              Privacy & Security
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={() => router.push('/settings/notifications')}
          >
            <Ionicons name="notifications" size={22} color="#3b82f6" />
            <Text className="text-gray-800 dark:text-gray-200 ml-3 flex-1">
              Notifications
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        {/* Support Section */}
        <View className="p-4">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Support
          </Text>
          
          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-800"
            onPress={() => router.push('/settings/support')}
          >
            <Ionicons name="help-buoy" size={22} color="#3b82f6" />
            <Text className="text-gray-800 dark:text-gray-200 ml-3 flex-1">
              Help Center
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-800"
            onPress={() => router.push('/settings/about')}
          >
            <Ionicons name="information-circle" size={22} color="#3b82f6" />
            <Text className="text-gray-800 dark:text-gray-200 ml-3 flex-1">
              About Apsara AI
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={() => console.log('Report a problem')}
          >
            <Ionicons name="flag" size={22} color="#3b82f6" />
            <Text className="text-gray-800 dark:text-gray-200 ml-3 flex-1">
              Report a Problem
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        {/* Account Actions */}
        <View className="p-4 mb-8">
          <TouchableOpacity
            className="flex-row items-center justify-center py-3 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3"
            onPress={() => signOut()}
          >
            <Ionicons name="log-out" size={20} color="#ef4444" />
            <Text className="text-red-500 ml-2">Sign Out</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="flex-row items-center justify-center py-3"
            onPress={() => console.log('Delete Account')}
          >
            <Text className="text-gray-500 dark:text-gray-400">Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}