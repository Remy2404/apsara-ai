import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Animated, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAI } from '../../hooks/useAI';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Predefined academic writing templates
const ACADEMIC_TEMPLATES = [
  { id: 'essay', title: 'Essay', icon: 'document-text', description: 'Standard academic essay structure' },
  { id: 'research', title: 'Research Paper', icon: 'flask', description: 'Formal research paper format' },
  { id: 'thesis', title: 'Thesis Statement', icon: 'bulb', description: 'Concise thesis structure' },
  { id: 'lit-review', title: 'Literature Review', icon: 'book', description: 'Summarize existing research' }
];

export default function AIScreen() {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { sendPrompt, response, loading } = useAI();
  const router = useRouter();
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  // Show template selection
  const showTemplates = () => {
    Keyboard.dismiss();
    
    // Animate the template panel in
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Fade the main content
    Animated.timing(fadeAnim, {
      toValue: 0.4,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  // Hide template selection
  const hideTemplates = () => {
    // Animate the template panel out
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Restore the main content opacity
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  // Handle template selection
  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    hideTemplates();
    
    // Set appropriate prompt based on the template
    switch(templateId) {
      case 'essay':
        setPrompt('Write an academic essay on the topic of [YOUR TOPIC]. Include introduction, thesis statement, body paragraphs, and conclusion.');
        break;
      case 'research':
        setPrompt('Create a research paper outline on [YOUR TOPIC] with abstract, methodology, results, discussion, and conclusion sections.');
        break;
      case 'thesis':
        setPrompt('Generate a strong thesis statement for a paper about [YOUR TOPIC].');
        break;
      case 'lit-review':
        setPrompt('Write a literature review summarizing the key research on [YOUR TOPIC].');
        break;
    }
  };

  const handleSendPrompt = () => {
    if (prompt.trim() === '') return;
    sendPrompt(prompt);
  };
  
  const handleClearResponse = () => {
    setPrompt('');
    // Clear response - this would need to be implemented in the useAI hook
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <StatusBar style="light" />
      
      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-white">Apsara AI</Text>
          <Text className="text-gray-400">Academic Writing Assistant</Text>
        </View>
        <TouchableOpacity 
          className="h-10 w-10 rounded-full bg-secondary-800 items-center justify-center"
          onPress={() => router.push('/ai/settings')}
        >
          <Ionicons name="settings-outline" size={20} color="#a1a1aa" />
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {/* Main Content Area */}
        <Animated.View 
          className="flex-1"
          style={{ opacity: fadeAnim }}
        >
          <ScrollView 
            className="flex-1 px-6" 
            contentContainerStyle={{ paddingVertical: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Tools Quick Access */}
            <View className="flex-row mb-6">
              <TouchableOpacity 
                className="flex-1 bg-secondary-800 rounded-2xl p-4 mr-2 items-center"
                onPress={showTemplates}
              >
                <View className="w-12 h-12 rounded-full bg-primary-600/20 items-center justify-center mb-2">
                  <Ionicons name="document-text" size={24} color="#10a37f" />
                </View>
                <Text className="text-white text-sm">Academic Templates</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-1 bg-secondary-800 rounded-2xl p-4 ml-2 items-center"
                onPress={() => router.push('/ai/prompts')}
              >
                <View className="w-12 h-12 rounded-full bg-primary-600/20 items-center justify-center mb-2">
                  <Ionicons name="bookmark" size={24} color="#10a37f" />
                </View>
                <Text className="text-white text-sm">Saved Prompts</Text>
              </TouchableOpacity>
            </View>
            
            {selectedTemplate && (
              <View className="mb-4 bg-primary-600/10 p-3 rounded-lg flex-row items-center">
                <Ionicons name="information-circle" size={20} color="#10a37f" />
                <Text className="text-primary-500 ml-2 text-sm flex-1">
                  Using {ACADEMIC_TEMPLATES.find(t => t.id === selectedTemplate)?.title} template. Edit the prompt if needed.
                </Text>
                <TouchableOpacity onPress={() => setSelectedTemplate(null)}>
                  <Ionicons name="close" size={20} color="#10a37f" />
                </TouchableOpacity>
              </View>
            )}
            
            {response ? (
              <View className="bg-secondary-800 p-5 rounded-xl mb-4">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-white font-medium">AI Response</Text>
                  <View className="flex-row">
                    <TouchableOpacity className="mr-4" onPress={handleClearResponse}>
                      <Ionicons name="refresh" size={20} color="#a1a1aa" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons name="copy-outline" size={20} color="#a1a1aa" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className="text-gray-300 leading-6">{response}</Text>
              </View>
            ) : (
              <View className="items-center justify-center py-12">
                <View className="w-16 h-16 bg-primary-600/20 rounded-full items-center justify-center mb-4">
                  <Ionicons name="document-text" size={30} color="#10a37f" />
                </View>
                <Text className="text-xl font-medium text-white mb-2">Academic Writing</Text>
                <Text className="text-gray-400 text-center mb-6">
                  Generate essays, research papers, and more with the help of Apsara AI
                </Text>
                <TouchableOpacity 
                  className="bg-primary-600/20 py-3 px-6 rounded-lg"
                  onPress={showTemplates}
                >
                  <Text className="text-primary-500 font-medium">Choose a Template</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
          
          {/* Input Area */}
          <View className="px-6 pb-4">
            <View className="bg-secondary-800 rounded-xl p-3 shadow-lg">
              <TextInput
                className="text-white min-h-[80px] max-h-36 px-2"
                placeholder="Describe what you want to write about..."
                placeholderTextColor="#71717a"
                value={prompt}
                onChangeText={setPrompt}
                multiline
                textAlignVertical="top"
              />
              
              <View className="flex-row justify-between items-center mt-2 px-2">
                <View className="flex-row">
                  <TouchableOpacity className="mr-4" onPress={showTemplates}>
                    <Ionicons name="document-text-outline" size={22} color="#71717a" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="mic-outline" size={22} color="#71717a" />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  onPress={handleSendPrompt}
                  disabled={loading || prompt.trim() === ''}
                  className={`rounded-full px-4 py-2 ${
                    loading || prompt.trim() === '' ? 'bg-primary-800' : 'bg-primary-600'
                  }`}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" size="small" />
                  ) : (
                    <Text className="text-white font-medium">Generate</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
        
        {/* Template Selection Panel */}
        <Animated.View 
          className="absolute bottom-0 left-0 right-0 bg-secondary-800 rounded-t-3xl px-6 pt-4 pb-8"
          style={{
            transform: [{
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 0]
              })
            }]
          }}
        >
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-white">Academic Templates</Text>
            <TouchableOpacity onPress={hideTemplates}>
              <Ionicons name="close-circle" size={28} color="#a1a1aa" />
            </TouchableOpacity>
          </View>
          
          <View className="mb-4">
            {ACADEMIC_TEMPLATES.map(template => (
              <TouchableOpacity 
                key={template.id}
                className="flex-row items-center bg-secondary-700 rounded-xl p-4 mb-3"
                onPress={() => selectTemplate(template.id)}
              >
                <View className="w-12 h-12 rounded-full bg-primary-600/20 items-center justify-center mr-4">
                  <Ionicons name={template.icon as keyof typeof Ionicons.glyphMap} size={24} color="#10a37f" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium mb-1">{template.title}</Text>
                  <Text className="text-gray-400 text-sm">{template.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
              </TouchableOpacity>
            ))}          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}