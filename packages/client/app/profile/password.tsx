import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useProfileContext } from '../../contexts/ProfileContext';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordChangeScreen() {
  const router = useRouter();
  const { changePassword, isLoading } = useProfileContext();
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
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
  
  // Toggle password visibility
  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      await changePassword(formData.currentPassword, formData.newPassword);
      Alert.alert('Success', 'Your password has been changed successfully');
      router.back();
    } catch (error) {
      // Error is already handled in the context
    }
  };
  
  // Check password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return { level: 0, text: '', color: '' };
    
    if (password.length < 8) {
      return { level: 1, text: 'Weak', color: 'text-red-500' };
    }
    
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const score = [hasUppercase, hasLowercase, hasNumbers, hasSpecialChars].filter(Boolean).length;
    
    if (score <= 2) return { level: 2, text: 'Moderate', color: 'text-yellow-500' };
    if (score === 3) return { level: 3, text: 'Good', color: 'text-green-500' };
    return { level: 4, text: 'Strong', color: 'text-green-600' };
  };
  
  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 p-4">
      <StatusBar style="auto" />
      
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Change Password
      </Text>
      
      <Text className="text-gray-500 dark:text-gray-400 mb-6">
        Choose a strong password that you haven't used before on this account.
      </Text>
      
      {/* Current Password */}
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-300 mb-1 ml-1">
          Current Password
        </Text>
        <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3">
          <TextInput
            className="flex-1 py-3 text-gray-900 dark:text-white"
            secureTextEntry={!showPasswords.currentPassword}
            value={formData.currentPassword}
            onChangeText={(value) => handleChange('currentPassword', value)}
            placeholder="Enter your current password"
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity
            onPress={() => togglePasswordVisibility('currentPassword')}
            className="p-2"
          >
            <Ionicons 
              name={showPasswords.currentPassword ? 'eye-off' : 'eye'} 
              size={20} 
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>
        {errors.currentPassword && (
          <Text className="text-red-500 text-xs mt-1 ml-1">{errors.currentPassword}</Text>
        )}
      </View>
      
      {/* New Password */}
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-300 mb-1 ml-1">
          New Password
        </Text>
        <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3">
          <TextInput
            className="flex-1 py-3 text-gray-900 dark:text-white"
            secureTextEntry={!showPasswords.newPassword}
            value={formData.newPassword}
            onChangeText={(value) => handleChange('newPassword', value)}
            placeholder="Enter your new password"
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity
            onPress={() => togglePasswordVisibility('newPassword')}
            className="p-2"
          >
            <Ionicons 
              name={showPasswords.newPassword ? 'eye-off' : 'eye'} 
              size={20} 
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>
        
        {formData.newPassword && (
          <View className="flex-row justify-between items-center mt-1">
            <View className="flex-row items-center">
              {[1, 2, 3, 4].map((level) => (
                <View
                  key={level}
                  className={`h-1 w-6 mx-0.5 rounded-full ${
                    level <= passwordStrength.level
                      ? passwordStrength.level === 1
                        ? 'bg-red-500'
                        : passwordStrength.level === 2
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </View>
            <Text className={`text-xs ${passwordStrength.color}`}>
              {passwordStrength.text}
            </Text>
          </View>
        )}
        
        {errors.newPassword && (
          <Text className="text-red-500 text-xs mt-1 ml-1">{errors.newPassword}</Text>
        )}
      </View>
      
      {/* Confirm New Password */}
      <View className="mb-6">
        <Text className="text-gray-700 dark:text-gray-300 mb-1 ml-1">
          Confirm New Password
        </Text>
        <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3">
          <TextInput
            className="flex-1 py-3 text-gray-900 dark:text-white"
            secureTextEntry={!showPasswords.confirmPassword}
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange('confirmPassword', value)}
            placeholder="Confirm your new password"
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity
            onPress={() => togglePasswordVisibility('confirmPassword')}
            className="p-2"
          >
            <Ionicons 
              name={showPasswords.confirmPassword ? 'eye-off' : 'eye'} 
              size={20} 
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</Text>
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
            <Text className="text-center text-white">Change Password</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}