import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// List of permissions the app will request
const permissionsList = [
  {
    id: 'mic',
    title: 'Microphone',
    description: 'For voice conversations with Apsara AI',
    icon: 'mic-outline' as const
  },
  {
    id: 'camera',
    title: 'Camera',
    description: 'For sharing images with Apsara AI to analyze',
    icon: 'camera-outline' as const
  },
  {
    id: 'storage',
    title: 'Storage',
    description: 'For uploading files and saving conversations',
    icon: 'folder-outline' as const
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'For receiving important updates and responses',
    icon: 'notifications-outline' as const
  }
];

export default function PermissionsScreen() {
  const router = useRouter();
  interface AcceptedPermissions {
    [key: string]: boolean;
  }
  const [acceptedPermissions, setAcceptedPermissions] = useState<AcceptedPermissions>({});

  const togglePermission = (id: string): void => {
    setAcceptedPermissions((prev: AcceptedPermissions) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const allPermissionsAccepted = () => {
    return permissionsList.every(p => acceptedPermissions[p.id]);
  };
  
  const handleContinue = () => {
    // In a real app, we would request permissions here
    router.push('/(onboarding)/complete');
  };
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <View className="flex-1 px-6 pt-8">
        <View className="items-center pb-8">
          <Ionicons name="shield-checkmark-outline" size={56} color="#10a37f" />
          <Text className="text-2xl font-bold text-white mt-4 mb-2">App Permissions</Text>
          <Text className="text-gray-400 text-center">
            Apsara AI needs the following permissions to provide you with the best experience
          </Text>
        </View>
        
        <ScrollView className="flex-1">
          {permissionsList.map((permission) => (
            <TouchableOpacity
              key={permission.id}
              className="flex-row items-center py-4 border-b border-gray-800"
              onPress={() => togglePermission(permission.id)}
            >
              <View className="w-12 h-12 bg-primary-600/20 rounded-full items-center justify-center mr-4">
                <Ionicons name={permission.icon} size={24} color="#10a37f" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">{permission.title}</Text>
                <Text className="text-gray-400 text-sm">{permission.description}</Text>
              </View>
              <Ionicons
                name={acceptedPermissions[permission.id] ? "checkmark-circle" : "ellipse-outline" as const}
                size={24}
                color={acceptedPermissions[permission.id] ? "#10a37f" : "#71717a"}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View className="px-6 pb-8">
        <TouchableOpacity
          className={`py-4 rounded-full ${allPermissionsAccepted() ? 'bg-primary-600' : 'bg-gray-700'}`}
          onPress={handleContinue}
          disabled={!allPermissionsAccepted()}
        >
          <Text className="text-white font-semibold text-center">Continue</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="py-4"
          onPress={() => router.push('/(onboarding)/complete')}
        >
          <Text className="text-gray-400 text-center">Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}