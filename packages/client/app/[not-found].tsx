import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/common/Button';

export default function NotFoundScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-32 h-32 bg-secondary-800 rounded-full items-center justify-center mb-6">
          <Ionicons name="alert-circle-outline" size={80} color="#10a37f" />
        </View>
        
        <Text className="text-3xl font-bold text-white mb-2 text-center">
          Page Not Found
        </Text>
        
        <Text className="text-gray-400 text-center mb-8 max-w-xs">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        
        <Button
          title="Go to Home"
          onPress={() => router.replace('/')}
          leftIcon={<Ionicons name="home-outline" size={20} color="white" />}
          size="lg"
          className="w-full mb-4"
        />
        
        <Button
          title="Go Back"
          onPress={() => router.back()}
          variant="outline"
          leftIcon={<Ionicons name="arrow-back" size={20} color="#10a37f" />}
          size="lg"
          className="w-full"
        />
      </View>
    </SafeAreaView>
  );
}