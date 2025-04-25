import React, { useEffect } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen() {
  // Animation values
  const logoOpacity = new Animated.Value(0);
  const logoScale = new Animated.Value(0.8);
  const textOpacity = new Animated.Value(0);
  
  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Fade in and scale up the logo
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        // Scale logo to normal size
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
        // Fade in text after logo appears
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          delay: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#121212', '#1E1E1E', '#121212']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 items-center justify-center"
    >
      <StatusBar style="light" />
      
      <View className="items-center">
        <Animated.View style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}>
          <View className="w-24 h-24 bg-primary-600/20 rounded-full items-center justify-center mb-4">
            <Ionicons name="chatbubble" size={48} color="#10a37f" />
          </View>
        </Animated.View>
        
        <Animated.View style={{ opacity: textOpacity }}>
          <Text className="text-3xl font-bold text-white mb-2">Apsara AI</Text>
          <Text className="text-gray-400 text-center">Your intelligent assistant</Text>
        </Animated.View>
      </View>
      
      <View className="absolute bottom-10">
        <Animated.View style={{ opacity: textOpacity }} className="flex-row">
          <View className="w-2 h-2 rounded-full bg-primary-600 mx-0.5" />
          <View className="w-2 h-2 rounded-full bg-gray-600 mx-0.5" />
          <View className="w-2 h-2 rounded-full bg-gray-600 mx-0.5" />
        </Animated.View>
      </View>
    </LinearGradient>
  );
}