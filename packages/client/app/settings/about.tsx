import React, { useRef, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AboutScreen() {
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  
  // Team members animation values
  const teamItem1 = useRef(new Animated.Value(0)).current;
  const teamItem2 = useRef(new Animated.Value(0)).current;
  const teamItem3 = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Animate header
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
    
    // Animate team items sequentially
    Animated.stagger(200, [
      Animated.timing(teamItem1, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(teamItem2, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(teamItem3, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);
  
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't open URL: ", err));
  };
  
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <StatusBar style="light" />
      
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity 
          className="p-2" 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-white ml-2">
          About Apsara AI
        </Text>
      </View>
      
      <ScrollView className="flex-1">
        {/* Logo and App Info */}
        <Animated.View 
          className="items-center pt-6 pb-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <View className="w-28 h-28 bg-primary-600/20 rounded-full items-center justify-center mb-5">
            {/* Replace with actual logo */}
            <Ionicons name="sparkles" size={56} color="#10a37f" />
          </View>
          
          <Text className="text-3xl font-bold text-white mb-2">
            Apsara AI
          </Text>
          
          <Text className="text-gray-400 text-base mb-5">
            Version 1.0.0 (Build 1021)
          </Text>
          
          <View className="flex-row items-center justify-center px-4 py-2 bg-primary-600/10 rounded-full">
            <Ionicons name="shield-checkmark" size={18} color="#10a37f" />
            <Text className="text-primary-500 text-sm ml-2">
              All systems running normally
            </Text>
          </View>
        </Animated.View>
        
        {/* About Section */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-semibold text-white mb-3">
            About
          </Text>
          
          <View className="bg-secondary-800 rounded-xl p-4 mb-4">
            <Text className="text-white text-base leading-6">
              Apsara AI is a sophisticated artificial intelligence assistant designed to provide exceptional 
              conversational experiences, creative content generation, and personalized assistance.
            </Text>
            
            <View className="h-px bg-secondary-700 my-4" />
            
            <Text className="text-white text-base leading-6">
              Powered by advanced machine learning algorithms and natural language processing, 
              Apsara AI adapts to your needs and provides intelligent responses to a wide variety of requests.
            </Text>
          </View>
        </View>
        
        {/* Features */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-semibold text-white mb-3">
            Key Features
          </Text>
          
          <View className="bg-secondary-800 rounded-xl overflow-hidden">
            <View className="flex-row items-center p-4 border-b border-secondary-700">
              <View className="w-10 h-10 rounded-full bg-primary-600/20 items-center justify-center mr-3">
                <Ionicons name="chatbubbles" size={20} color="#10a37f" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium text-base">Smart Conversations</Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Natural, context-aware dialog with memory of previous interactions
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center p-4 border-b border-secondary-700">
              <View className="w-10 h-10 rounded-full bg-primary-600/20 items-center justify-center mr-3">
                <Ionicons name="create" size={20} color="#10a37f" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium text-base">Creative Content</Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Generate text, ideas, and creative writing in various formats
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center p-4 border-b border-secondary-700">
              <View className="w-10 h-10 rounded-full bg-primary-600/20 items-center justify-center mr-3">
                <Ionicons name="globe" size={20} color="#10a37f" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium text-base">Knowledge Access</Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Tap into a vast repository of information about a wide range of topics
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center p-4">
              <View className="w-10 h-10 rounded-full bg-primary-600/20 items-center justify-center mr-3">
                <Ionicons name="mic" size={20} color="#10a37f" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium text-base">Voice Interaction</Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Communicate through voice commands with speech recognition
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Team */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-semibold text-white mb-3">
            Development Team
          </Text>
          
          <View className="bg-secondary-800 rounded-xl overflow-hidden">
            <Animated.View 
              className="flex-row items-center p-4 border-b border-secondary-700"
              style={{ opacity: teamItem1 }}
            >
              <View className="w-10 h-10 rounded-full bg-blue-600/20 items-center justify-center mr-3">
                <Text className="text-blue-500 font-bold">AP</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Aditya Pratama</Text>
                <Text className="text-gray-400 text-sm">Lead Developer</Text>
              </View>
            </Animated.View>
            
            <Animated.View 
              className="flex-row items-center p-4 border-b border-secondary-700"
              style={{ opacity: teamItem2 }}
            >
              <View className="w-10 h-10 rounded-full bg-pink-600/20 items-center justify-center mr-3">
                <Text className="text-pink-500 font-bold">SC</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Sarah Chen</Text>
                <Text className="text-gray-400 text-sm">UI/UX Designer</Text>
              </View>
            </Animated.View>
            
            <Animated.View 
              className="flex-row items-center p-4"
              style={{ opacity: teamItem3 }}
            >
              <View className="w-10 h-10 rounded-full bg-yellow-600/20 items-center justify-center mr-3">
                <Text className="text-yellow-500 font-bold">RK</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Raj Kumar</Text>
                <Text className="text-gray-400 text-sm">AI Engineer</Text>
              </View>
            </Animated.View>
          </View>
        </View>
        
        {/* Connect */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-semibold text-white mb-3">
            Connect With Us
          </Text>
          
          <View className="bg-secondary-800 rounded-xl overflow-hidden">
            <TouchableOpacity 
              className="flex-row items-center p-4 border-b border-secondary-700"
              onPress={() => handleOpenLink('https://www.apsaraai.com')}
            >
              <View className="w-10 h-10 rounded-full bg-indigo-600/20 items-center justify-center mr-3">
                <Ionicons name="globe-outline" size={20} color="#818cf8" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Website</Text>
                <Text className="text-indigo-500 text-sm">www.apsaraai.com</Text>
              </View>
              <Ionicons name="open-outline" size={18} color="#818cf8" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-row items-center p-4 border-b border-secondary-700"
              onPress={() => handleOpenLink('mailto:support@apsaraai.com')}
            >
              <View className="w-10 h-10 rounded-full bg-indigo-600/20 items-center justifyCenter mr-3">
                <Ionicons name="mail-outline" size={20} color="#818cf8" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Support Email</Text>
                <Text className="text-indigo-500 text-sm">support@apsaraai.com</Text>
              </View>
              <Ionicons name="open-outline" size={18} color="#818cf8" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-row items-center p-4"
              onPress={() => handleOpenLink('https://twitter.com/apsaraai')}
            >
              <View className="w-10 h-10 rounded-full bg-indigo-600/20 items-center justify-center mr-3">
                <Ionicons name="logo-twitter" size={20} color="#818cf8" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Twitter</Text>
                <Text className="text-indigo-500 text-sm">@apsaraai</Text>
              </View>
              <Ionicons name="open-outline" size={18} color="#818cf8" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Legal */}
        <View className="px-6 mb-10">
          <Text className="text-xl font-semibold text-white mb-3">
            Legal
          </Text>
          
          <View className="bg-secondary-800 rounded-xl overflow-hidden">
            <TouchableOpacity 
              className="flex-row items-center p-4 border-b border-secondary-700"
              onPress={() => router.push('/settings/privacy')}
            >
              <View className="w-10 h-10 rounded-full bg-gray-600/20 items-center justify-center mr-3">
                <Ionicons name="shield-outline" size={20} color="#a1a1aa" />
              </View>
              <Text className="text-white flex-1">Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={18} color="#a1a1aa" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-row items-center p-4 border-b border-secondary-700"
              onPress={() => router.push('/settings/terms')}
            >
              <View className="w-10 h-10 rounded-full bg-gray-600/20 items-center justify-center mr-3">
                <Ionicons name="document-text-outline" size={20} color="#a1a1aa" />
              </View>
              <Text className="text-white flex-1">Terms of Service</Text>
              <Ionicons name="chevron-forward" size={18} color="#a1a1aa" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-row items-center p-4"
              onPress={() => console.log('Open licenses')}
            >
              <View className="w-10 h-10 rounded-full bg-gray-600/20 items-center justify-center mr-3">
                <Ionicons name="code-slash-outline" size={20} color="#a1a1aa" />
              </View>
              <Text className="text-white flex-1">Open Source Licenses</Text>
              <Ionicons name="chevron-forward" size={18} color="#a1a1aa" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Copyright */}
        <View className="items-center pb-10">
          <Text className="text-gray-500 text-sm">
            © 2025 Apsara AI. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}