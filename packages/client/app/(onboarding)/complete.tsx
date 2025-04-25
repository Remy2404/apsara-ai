import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function CompleteScreen() {
  const router = useRouter();
  const checkmarkScale = useSharedValue(0);
  
  useEffect(() => {
    // Animate checkmark in
    checkmarkScale.value = withSpring(1, { damping: 15 });
  }, []);
  
  const checkmarkAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: checkmarkScale.value }]
    };
  });
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <View className="flex-1 items-center justify-center px-6">
        <Animated.View 
          className="w-40 h-40 rounded-full bg-primary-600/20 items-center justify-center mb-8"
          style={checkmarkAnimatedStyle}
        >
          <Ionicons name="checkmark-circle" size={100} color="#10a37f" />
        </Animated.View>
        
        <Text className="text-2xl text-white font-bold text-center mb-4">
          You're All Set!
        </Text>
        
        <Text className="text-gray-400 text-center mb-8 px-4">
          You're ready to start exploring Apsara AI's capabilities. Ask questions, get insights, and discover new possibilities.
        </Text>
        
        <View className="w-full">
          <TouchableOpacity 
            className="bg-primary-600 py-4 rounded-full mb-4"
            onPress={() => router.push('/(auth)/register')}
          >
            <Text className="text-white font-semibold text-center">
              Create Account
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="py-4"
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-primary-500 font-medium text-center">
              Sign In
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="py-4 mt-2"
            onPress={() => router.push('/(main)/home')}
          >
            <Text className="text-gray-400 text-center">
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}