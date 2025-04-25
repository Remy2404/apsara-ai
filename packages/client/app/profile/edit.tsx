import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useProfileContext } from '../../contexts/ProfileContext';

export default function EditProfileScreen() {
  const router = useRouter();
  const { profile, updateProfile, isLoading } = useProfileContext();
  
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website: profile?.website || '',
    avatar: profile?.avatar || null,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        username: profile.username,
        bio: profile.bio || '',
        location: profile.location || '',
        website: profile.website || '',
        avatar: profile.avatar || null,
      });
    }
  }, [profile]);
  
  // Handle form input changes
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (formData.website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+.*$/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      await updateProfile(formData);
      Alert.alert('Success', 'Your profile has been updated');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };
  
  // Handle image selection
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Sorry, we need camera roll permissions to upload images.');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    
    if (!result.canceled && result.assets && result.assets[0]) {
      handleChange('avatar', result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className="flex-1 bg-white dark:bg-gray-900">
        <StatusBar style="auto" />
        
        <ScrollView className="flex-1">
          <View className="p-4">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Edit Profile
            </Text>
            
            {/* Avatar */}
            <View className="items-center mb-6">
              <TouchableOpacity 
                className="relative"
                onPress={pickImage}
              >
                <View className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {formData.avatar ? (
                    <Image 
                      source={{ uri: formData.avatar }} 
                      className="h-full w-full" 
                    />
                  ) : (
                    <View className="h-full w-full items-center justify-center">
                      <Ionicons name="person" size={40} color="#9ca3af" />
                    </View>
                  )}
                </View>
                <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5">
                  <Ionicons name="camera" size={16} color="white" />
                </View>
              </TouchableOpacity>
              
              <Text className="text-blue-500 mt-2" onPress={pickImage}>
                Change profile photo
              </Text>
            </View>
            
            {/* Name */}
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-gray-300 mb-1 ml-1">
                Name
              </Text>
              <TextInput
                className="bg-gray-100 dark:bg-gray-800 py-3 px-4 rounded-lg text-gray-900 dark:text-white"
                value={formData.name}
                onChangeText={(value) => handleChange('name', value)}
                placeholder="Your full name"
                placeholderTextColor="#9ca3af"
              />
              {errors.name && (
                <Text className="text-red-500 text-xs mt-1 ml-1">{errors.name}</Text>
              )}
            </View>
            
            {/* Username */}
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-gray-300 mb-1 ml-1">
                Username
              </Text>
              <TextInput
                className="bg-gray-100 dark:bg-gray-800 py-3 px-4 rounded-lg text-gray-900 dark:text-white"
                value={formData.username}
                onChangeText={(value) => handleChange('username', value)}
                placeholder="Your username"
                placeholderTextColor="#9ca3af"
              />
              {errors.username && (
                <Text className="text-red-500 text-xs mt-1 ml-1">{errors.username}</Text>
              )}
            </View>
            
            {/* Bio */}
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-gray-300 mb-1 ml-1">
                Bio
              </Text>
              <TextInput
                className="bg-gray-100 dark:bg-gray-800 py-3 px-4 rounded-lg text-gray-900 dark:text-white h-24"
                value={formData.bio}
                onChangeText={(value) => handleChange('bio', value)}
                placeholder="Tell us about yourself"
                placeholderTextColor="#9ca3af"
                multiline
                textAlignVertical="top"
              />
              <Text className="text-gray-500 text-xs mt-1 ml-1 text-right">
                {formData.bio.length}/150 characters
              </Text>
            </View>
            
            {/* Location */}
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-gray-300 mb-1 ml-1">
                Location
              </Text>
              <TextInput
                className="bg-gray-100 dark:bg-gray-800 py-3 px-4 rounded-lg text-gray-900 dark:text-white"
                value={formData.location}
                onChangeText={(value) => handleChange('location', value)}
                placeholder="Your location"
                placeholderTextColor="#9ca3af"
              />
            </View>
            
            {/* Website */}
            <View className="mb-6">
              <Text className="text-gray-700 dark:text-gray-300 mb-1 ml-1">
                Website
              </Text>
              <TextInput
                className="bg-gray-100 dark:bg-gray-800 py-3 px-4 rounded-lg text-gray-900 dark:text-white"
                value={formData.website}
                onChangeText={(value) => handleChange('website', value)}
                placeholder="Your website URL"
                placeholderTextColor="#9ca3af"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
              />
              {errors.website && (
                <Text className="text-red-500 text-xs mt-1 ml-1">{errors.website}</Text>
              )}
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
                onPress={handleSubmit}
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
    </KeyboardAvoidingView>
  );
}