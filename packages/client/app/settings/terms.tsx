import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TermsScreen() {
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
        className={`bg-secondary-800 rounded-xl p-4 ${isLast ? '' : 'mb-4'}`}
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
          Terms of Service
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
            Please read these Terms of Service carefully before using the Apsara AI application. 
            By accessing or using our service, you agree to be bound by these terms.
          </Text>
        </Animated.View>
        
        {/* Terms Sections */}
        {renderSection(
          "Acceptance of Terms",
          "By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.",
          section1Anim,
          "document-text"
        )}
        
        {renderSection(
          "Service Description",
          "Apsara AI provides an artificial intelligence assistant accessible via mobile application. Our service allows users to interact with AI models for various purposes including answering questions, generating content, and providing recommendations.",
          section2Anim,
          "cube"
        )}
        
        {renderSection(
          "User Accounts",
          "To use certain features of our service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account.",
          section3Anim,
          "person"
        )}
        
        {renderSection(
          "Acceptable Use",
          "You agree not to use the service to: (a) violate any laws; (b) infringe on intellectual property rights; (c) distribute harmful content; (d) attempt to compromise system security; (e) engage in activities that could harm the service or other users; or (f) generate content that promotes harmful or illegal activities.",
          section4Anim,
          "shield"
        )}
        
        {renderSection(
          "Intellectual Property",
          "The service, content, and all related intellectual property rights belong to Apsara AI or its licensors. You retain ownership of any content you submit through the service, but grant us a worldwide, royalty-free license to use, reproduce, modify, and distribute that content for the purpose of providing our services.",
          section5Anim,
          "ribbon"
        )}
        
        {renderSection(
          "Service Modifications",
          "We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice or liability. We may also introduce new features or impose limits on certain features or restrict access to parts or all of the service.",
          section6Anim,
          "settings",
          true
        )}
        
        {/* Additional Legal Sections */}
        <View className="mt-6 mb-10">
          <TouchableOpacity 
            className="flex-row items-center bg-secondary-800 rounded-xl p-4 mb-4"
            onPress={() => router.push('/settings/privacy')}
          >
            <View className="w-10 h-10 rounded-full bg-indigo-600/20 items-center justify-center mr-3">
              <Ionicons name="lock-closed-outline" size={20} color="#818cf8" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Privacy Policy</Text>
              <Text className="text-gray-400 text-sm mt-1">
                How we handle your data
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#818cf8" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center bg-secondary-800 rounded-xl p-4"
            onPress={() => router.push('/settings/support')}
          >
            <View className="w-10 h-10 rounded-full bg-blue-600/20 items-center justify-center mr-3">
              <Ionicons name="help-circle-outline" size={20} color="#60a5fa" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Contact Support</Text>
              <Text className="text-gray-400 text-sm mt-1">
                Get help with any questions
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#60a5fa" />
          </TouchableOpacity>
        </View>
        
        {/* Additional Terms Text */}
        <View className="mb-8">
          <Text className="text-gray-300 text-sm mb-4">
            These Terms of Service constitute the entire agreement between you and Apsara AI regarding the use of our service. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </Text>
          
          <Text className="text-gray-300 text-sm">
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </Text>
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