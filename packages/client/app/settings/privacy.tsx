import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PrivacyScreen() {
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // Section animation values
  const section1Anim = useRef(new Animated.Value(0)).current;
  const section2Anim = useRef(new Animated.Value(0)).current;
  const section3Anim = useRef(new Animated.Value(0)).current;
  const section4Anim = useRef(new Animated.Value(0)).current;
  const section5Anim = useRef(new Animated.Value(0)).current;
  const section6Anim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Animate header
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
    
    // Animate sections sequentially
    Animated.stagger(150, [
      Animated.timing(section1Anim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(section2Anim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(section3Anim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(section4Anim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(section5Anim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(section6Anim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);
  
  const renderSection = (title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, animValue: Animated.Value, icon: keyof typeof Ionicons.glyphMap | undefined, isLast = false) => {
    return (
      <Animated.View 
        className={`bg-secondary-800 rounded-xl p-4 mb-4 ${isLast ? '' : 'mb-4'}`}
        style={{
          opacity: animValue,
          transform: [{ translateY: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [15, 0]
          })}]
        }}
      >
        <View className="flex-row items-center mb-3">
          {icon && (
            <View className="w-8 h-8 rounded-full bg-primary-600/20 items-center justify-center mr-2">
              <Ionicons name={icon} size={16} color="#10a37f" />
            </View>
          )}
          <Text className="text-lg font-semibold text-white">{title}</Text>
        </View>
        <Text className="text-gray-300 text-base leading-6">{content}</Text>
      </Animated.View>
    );
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
          Privacy Policy
        </Text>
      </View>
      
      <ScrollView className="flex-1 px-5 pb-10">
        {/* Title */}
        <Animated.View 
          className="mt-2 mb-6"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <Text className="text-white text-base mb-3">
            Last updated: April 15, 2025
          </Text>
          
          <Text className="text-gray-300 leading-6">
            At Apsara AI, we take your privacy seriously. This policy explains how we collect, use, 
            and protect your information when you use our application and services.
          </Text>
        </Animated.View>
        
        {/* Privacy Sections */}
        {renderSection(
          "Information Collection",
          "We collect information that you provide directly to us, such as your email address, display name, and profile information. We also collect the content of conversations you have with our AI, including messages, attached files, and voice inputs.",
          section1Anim,
          "document-text"
        )}
        
        {renderSection(
          "Use of Information",
          "We use your information to operate and improve our services, personalize your experience, communicate with you, and develop new features. With your permission, we may use anonymized conversations to train and improve our AI models.",
          section2Anim,
          "analytics"
        )}
        
        {renderSection(
          "Data Security",
          "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. All data is encrypted in transit and at rest.",
          section3Anim,
          "shield-checkmark"
        )}
        
        {renderSection(
          "Information Sharing",
          "We do not sell your personal information to third parties. We may share your information with service providers who help us operate our services, or if required by law. These service providers are bound by strict confidentiality agreements.",
          section4Anim,
          "people"
        )}
        
        {renderSection(
          "Your Rights and Choices",
          "You can access, update, or delete your account information at any time through the app settings. You can also request a copy of your data or opt out of AI training. To exercise these rights, visit your account settings or contact our support team.",
          section5Anim,
          "options"
        )}
        
        {renderSection(
          "Contact Information",
          "If you have any questions or concerns about our Privacy Policy or data practices, please contact our Privacy Team at privacy@apsaraai.com or write to us at: Apsara AI, Inc., 123 Tech Plaza, San Francisco, CA 94105.",
          section6Anim,
          "mail",
          true
        )}
        
        {/* Additional Legal Information */}
        <View className="mt-6 mb-10">
          <TouchableOpacity 
            className="flex-row items-center bg-secondary-800 rounded-xl p-4 mb-4"
            onPress={() => router.push('/settings/terms')}
          >
            <View className="w-10 h-10 rounded-full bg-indigo-600/20 items-center justify-center mr-3">
              <Ionicons name="document-text-outline" size={20} color="#818cf8" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Terms of Service</Text>
              <Text className="text-gray-400 text-sm mt-1">
                Read our terms and conditions
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#818cf8" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center bg-secondary-800 rounded-xl p-4"
            onPress={() => console.log("Data deletion requested")}
          >
            <View className="w-10 h-10 rounded-full bg-red-600/20 items-center justify-center mr-3">
              <Ionicons name="trash-outline" size={20} color="#f87171" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Data Deletion Request</Text>
              <Text className="text-gray-400 text-sm mt-1">
                Request to delete all your data
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#f87171" />
          </TouchableOpacity>
        </View>
        
        {/* Copyright Footer */}
        <View className="items-center mb-8">
          <Text className="text-gray-500 text-sm">
            © 2025 Apsara AI. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}