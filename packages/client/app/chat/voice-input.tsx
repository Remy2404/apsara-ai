import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { useTheme } from '../../hooks/useTheme';

export default function VoiceInputScreen() {
  const router = useRouter();
  const { 
    isRecording, 
    recordedText, 
    startRecording, 
    stopRecording, 
    isProcessing,
    recordingPermission,
    requestPermission,
    recordingDuration,
    sendVoiceMessage
  } = useVoiceInput();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Animation values
  const [pulseAnim] = useState(new Animated.Value(1));
  
  // Request permissions on mount
  useEffect(() => {
    if (!recordingPermission) {
      requestPermission();
    }
  }, [recordingPermission, requestPermission]);
  
  // Create a pulsing animation when recording
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording, pulseAnim]);
  
  // Handle the start of recording
  const handleStartRecording = async () => {
    if (!recordingPermission) {
      await requestPermission();
      return;
    }
    
    await startRecording();
  };
  
  // Handle the end of recording
  const handleStopRecording = async () => {
    await stopRecording();
  };

  // Handle sending the voice message
  const handleSendVoiceMessage = async () => {
    const result = await sendVoiceMessage();
    if (result) {
      // Navigate back to chat screen with the voice message data
      router.back();
    }
  };

  // Format recording duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={isDark ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Voice Message
        </Text>
        <View style={{ width: 28 }} /> {/* Empty view for spacing */}
      </View>
      
      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-6">
        {!recordingPermission ? (
          <View className="items-center">
            <Ionicons name="mic-off" size={60} color={isDark ? "#9ca3af" : "#6b7280"} />
            <Text className={`text-center mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Microphone permission is required
            </Text>
            <TouchableOpacity 
              className="mt-6 bg-blue-500 rounded-full px-6 py-3"
              onPress={requestPermission}
            >
              <Text className="text-white font-medium">Grant Permission</Text>
            </TouchableOpacity>
          </View>
        ) : isProcessing ? (
          <View className="items-center">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Processing your voice...
            </Text>
          </View>
        ) : recordedText ? (
          <View className="w-full">
            <View className={`w-full rounded-xl p-4 mb-6 ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <Text className={`text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {recordedText}
              </Text>
            </View>
            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity 
                className="bg-gray-500 rounded-full px-6 py-3"
                onPress={() => stopRecording(true)}
              >
                <Text className="text-white font-medium">Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-blue-500 rounded-full px-6 py-3"
                onPress={handleSendVoiceMessage}
              >
                <Text className="text-white font-medium">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="items-center">
            <Animated.View 
              style={{
                transform: [{ scale: pulseAnim }],
                opacity: isRecording ? 1 : 0.7,
              }}
            >
              <View className={`rounded-full p-6 ${isRecording ? 'bg-red-500' : 'bg-blue-500'}`}>
                <Ionicons name="mic" size={60} color="white" />
              </View>
            </Animated.View>
            
            {isRecording && (
              <Text className={`mt-6 text-xl font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {formatDuration(recordingDuration)}
              </Text>
            )}
            
            <Text className={`mt-4 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {isRecording 
                ? "Recording... Tap the button to stop" 
                : "Tap the microphone to start recording"}
            </Text>
          </View>
        )}
      </View>
      
      {/* Recording Controls */}
      {recordingPermission && !recordedText && !isProcessing && (
        <View className="items-center justify-center mb-12">
          <TouchableOpacity
            className={`rounded-full p-5 ${isRecording ? 'bg-red-500' : 'bg-blue-500'}`}
            onPress={isRecording ? handleStopRecording : handleStartRecording}
          >
            <Ionicons 
              name={isRecording ? "stop" : "mic"} 
              size={30} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}