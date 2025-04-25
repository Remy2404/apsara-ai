import React from 'react';
import { View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <StatusBar style="dark" />
      
      <View className="items-center">
        <Image 
          source={require('../../assets/images/logo.png')} 
          className="w-24 h-24 mb-4"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-black">Apsara AI</Text>
      </View>
      
      <View className="absolute bottom-10">
        <View className="flex-row">
          <View className="w-2 h-2 rounded-full bg-black mx-0.5" />
          <View className="w-2 h-2 rounded-full bg-black mx-0.5" />
          <View className="w-2 h-2 rounded-full bg-black mx-0.5" />
        </View>
        <View className="flex-row mt-1">
          <View className="w-2 h-2 rounded-full bg-black mx-0.5" />
          <View className="w-2 h-2 rounded-full bg-black mx-0.5" />
        </View>
      </View>
    </View>
  );
}