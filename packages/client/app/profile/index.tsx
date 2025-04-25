import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfileContext } from '../../contexts/ProfileContext';
import { useAuthContext } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useProfileContext();
  const { signOut } = useAuthContext();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  
  // Animation values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(50)).current;
  const confirmModalScale = useRef(new Animated.Value(0)).current;
  const confirmModalBg = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Animate elements on mount
    Animated.sequence([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslate, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  // Show sign out confirmation modal
  const showConfirmation = () => {
    setShowSignOutConfirm(true);
    Animated.parallel([
      Animated.timing(confirmModalScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(confirmModalBg, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };
  
  // Hide sign out confirmation modal
  const hideConfirmation = () => {
    Animated.parallel([
      Animated.timing(confirmModalScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(confirmModalBg, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowSignOutConfirm(false);
    });
  };
  
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
      <SafeAreaView className="flex-1 bg-secondary-900 items-center justify-center p-8">
        <View className="items-center">
          <View className="w-20 h-20 rounded-full bg-secondary-800 items-center justify-center mb-6">
            <Ionicons name="person" size={36} color="#71717a" />
          </View>
          <Text className="text-xl font-bold text-white mb-2">
            Profile Not Found
          </Text>
          <Text className="text-gray-400 text-center mb-8">
            Please sign in again to access your profile information
          </Text>
          <TouchableOpacity
            className="bg-primary-600 px-8 py-3 rounded-full"
            onPress={() => signOut()}
          >
            <Text className="text-white font-medium">Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <StatusBar style="light" />
      
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <Animated.View 
          className="p-6 items-center"
          style={{ opacity: headerOpacity }}
        >
          <View className="h-28 w-28 rounded-full bg-secondary-800 overflow-hidden mb-4 border-2 border-primary-600">
            {profile.avatar ? (
              <Image 
                source={{ uri: profile.avatar }} 
                className="h-full w-full" 
              />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <Ionicons name="person" size={48} color="#10a37f" />
              </View>
            )}
          </View>
          <Text className="text-2xl font-bold text-white mb-1">
            {profile.name}
          </Text>
          <Text className="text-gray-400 mb-3">
            @{profile.username}
          </Text>
          
          {profile.bio && (
            <Text className="text-gray-300 text-center mb-4 max-w-xs">
              {profile.bio}
            </Text>
          )}
          
          <View className="flex-row items-center mb-4">
            {profile.location && (
              <View className="flex-row items-center mr-4">
                <Ionicons name="location" size={16} color="#71717a" />
                <Text className="text-gray-400 ml-1">
                  {profile.location}
                </Text>
              </View>
            )}
            
            {profile.website && (
              <View className="flex-row items-center">
                <Ionicons name="globe" size={16} color="#71717a" />
                <Text className="text-primary-500 ml-1">
                  {profile.website.replace(/^https?:\/\//, '')}
                </Text>
              </View>
            )}
          </View>
          
          <View className="flex-row items-center px-4 py-2 bg-secondary-800 rounded-xl mb-3">
            <Ionicons name="calendar" size={18} color="#10a37f" />
            <Text className="text-gray-300 ml-2 text-sm">
              Member since {formatDate(profile.createdAt)}
            </Text>
          </View>
          
          <TouchableOpacity
            className="mt-2 px-8 py-3 bg-primary-600 rounded-full"
            onPress={() => router.push('/profile/edit')}
          >
            <Text className="text-white font-medium">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Divider */}
        <View className="h-[1px] bg-secondary-800 mx-6 my-2" />
        
        {/* Account Section */}
        <Animated.View 
          className="p-6"
          style={{ 
            transform: [{ translateY: contentTranslate }],
            opacity: headerOpacity,
          }}
        >
          <Text className="text-lg font-semibold text-white mb-4">
            Account Settings
          </Text>
          
          <View className="bg-secondary-800 rounded-xl overflow-hidden mb-6">
            <TouchableOpacity
              className="flex-row items-center py-4 px-5 border-b border-secondary-700"
              onPress={() => router.push('/profile/edit')}
            >
              <View className="w-8 h-8 rounded-full bg-primary-600/20 items-center justify-center mr-4">
                <Ionicons name="person-circle" size={18} color="#10a37f" />
              </View>
              <Text className="text-gray-200 flex-1">
                Personal Information
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#71717a" />
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-row items-center py-4 px-5 border-b border-secondary-700"
              onPress={() => router.push('/profile/password')}
            >
              <View className="w-8 h-8 rounded-full bg-primary-600/20 items-center justify-center mr-4">
                <Ionicons name="lock-closed" size={18} color="#10a37f" />
              </View>
              <Text className="text-gray-200 flex-1">
                Change Password
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#71717a" />
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-row items-center py-4 px-5 border-b border-secondary-700"
              onPress={() => router.push('/settings')}
            >
              <View className="w-8 h-8 rounded-full bg-primary-600/20 items-center justify-center mr-4">
                <Ionicons name="settings" size={18} color="#10a37f" />
              </View>
              <Text className="text-gray-200 flex-1">
                App Settings
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#71717a" />
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-row items-center py-4 px-5"
              onPress={() => router.push('/settings/privacy')}
            >
              <View className="w-8 h-8 rounded-full bg-primary-600/20 items-center justify-center mr-4">
                <Ionicons name="shield-checkmark" size={18} color="#10a37f" />
              </View>
              <Text className="text-gray-200 flex-1">
                Privacy & Security
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#71717a" />
            </TouchableOpacity>
          </View>
          
          {/* Support Section */}
          <Text className="text-lg font-semibold text-white mb-4">
            Support & Information
          </Text>
          
          <View className="bg-secondary-800 rounded-xl overflow-hidden mb-8">
            <TouchableOpacity
              className="flex-row items-center py-4 px-5 border-b border-secondary-700"
              onPress={() => router.push('/settings/support')}
            >
              <View className="w-8 h-8 rounded-full bg-blue-600/20 items-center justify-center mr-4">
                <Ionicons name="help-buoy" size={18} color="#3b82f6" />
              </View>
              <Text className="text-gray-200 flex-1">
                Help Center
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#71717a" />
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-row items-center py-4 px-5 border-b border-secondary-700"
              onPress={() => router.push('/settings/about')}
            >
              <View className="w-8 h-8 rounded-full bg-blue-600/20 items-center justify-center mr-4">
                <Ionicons name="information-circle" size={18} color="#3b82f6" />
              </View>
              <Text className="text-gray-200 flex-1">
                About Apsara AI
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#71717a" />
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-row items-center py-4 px-5"
              onPress={() => console.log('Report a problem')}
            >
              <View className="w-8 h-8 rounded-full bg-blue-600/20 items-center justify-center mr-4">
                <Ionicons name="flag" size={18} color="#3b82f6" />
              </View>
              <Text className="text-gray-200 flex-1">
                Report a Problem
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#71717a" />
            </TouchableOpacity>
          </View>
          
          {/* Account Actions */}
          <View className="items-center mb-8">
            <TouchableOpacity
              className="flex-row items-center justify-center py-3 px-6 bg-red-600/10 rounded-full mb-4"
              onPress={showConfirmation}
            >
              <Ionicons name="log-out" size={18} color="#ef4444" />
              <Text className="text-red-500 ml-2 font-medium">Sign Out</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-row items-center justify-center py-2"
              onPress={() => console.log('Delete Account')}
            >
              <Text className="text-gray-500">Delete Account</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
      
      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <View className="absolute inset-0 items-center justify-center">
          <Animated.View 
            className="absolute inset-0 bg-black"
            style={{ opacity: confirmModalBg.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.6]
            }) }}
          >
            <TouchableOpacity 
              className="w-full h-full" 
              onPress={hideConfirmation}
              activeOpacity={1}
            />
          </Animated.View>
          
          <Animated.View 
            className="bg-secondary-800 w-5/6 rounded-2xl p-6"
            style={{ 
              transform: [{ scale: confirmModalScale.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1]
              }) }]
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
              onPress={() => {
                hideConfirmation();
                setTimeout(() => signOut(), 300);
              }}
            >
              <Text className="text-white font-medium text-center">Yes, Sign Out</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-secondary-700 rounded-lg py-3"
              onPress={hideConfirmation}
            >
              <Text className="text-white text-center">Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
}