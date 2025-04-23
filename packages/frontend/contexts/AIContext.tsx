import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supported AI models
export type AIModel = 'gpt-4' | 'gpt-3.5-turbo' | 'gpt-4-turbo' | 'claude-3';

interface AISettings {
  model: AIModel;
  temperature: number;
  maxTokens: number;
  includeHistory: boolean;
  autoSummarize: boolean;
  preferredLanguage: string;
  voiceEnabled: boolean;
  streamingEnabled: boolean;
}

interface SavedPrompt {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: number;
  usageCount: number;
}

interface AIContextType {
  settings: AISettings;
  isProcessing: boolean;
  savedPrompts: SavedPrompt[];
  lastResponse: string | null;
  updateSettings: (newSettings: Partial<AISettings>) => Promise<void>;
  savePrompt: (title: string, content: string, tags?: string[]) => Promise<void>;
  deletePrompt: (id: string) => Promise<void>;
  generateResponse: (prompt: string, conversationHistory?: any[]) => Promise<string>;
  setIsProcessing: (processing: boolean) => void;
}

const defaultSettings: AISettings = {
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 2048,
  includeHistory: true,
  autoSummarize: false,
  preferredLanguage: 'en',
  voiceEnabled: false,
  streamingEnabled: true,
};

const defaultAIContext: AIContextType = {
  settings: defaultSettings,
  isProcessing: false,
  savedPrompts: [],
  lastResponse: null,
  updateSettings: async () => {},
  savePrompt: async () => {},
  deletePrompt: async () => {},
  generateResponse: async () => '',
  setIsProcessing: () => {},
};

export const AIContext = createContext<AIContextType>(defaultAIContext);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AISettings>(defaultSettings);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [lastResponse, setLastResponse] = useState<string | null>(null);

  // Load settings and saved prompts from storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem('ai_settings');
        if (storedSettings) {
          setSettings({ ...defaultSettings, ...JSON.parse(storedSettings) });
        }

        const storedPrompts = await AsyncStorage.getItem('saved_prompts');
        if (storedPrompts) {
          setSavedPrompts(JSON.parse(storedPrompts));
        }
      } catch (error) {
        console.error('Failed to load AI data from storage', error);
      }
    };

    loadData();
  }, []);

  // Update AI settings
  const updateSettings = async (newSettings: Partial<AISettings>): Promise<void> => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      await AsyncStorage.setItem('ai_settings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Failed to save AI settings', error);
    }
  };

  // Save a prompt for reuse
  const savePrompt = async (title: string, content: string, tags: string[] = []): Promise<void> => {
    try {
      const newPrompt: SavedPrompt = {
        id: Date.now().toString(),
        title,
        content,
        tags,
        createdAt: Date.now(),
        usageCount: 0,
      };

      const updatedPrompts = [...savedPrompts, newPrompt];
      setSavedPrompts(updatedPrompts);
      await AsyncStorage.setItem('saved_prompts', JSON.stringify(updatedPrompts));
    } catch (error) {
      console.error('Failed to save prompt', error);
    }
  };

  // Delete a saved prompt
  const deletePrompt = async (id: string): Promise<void> => {
    try {
      const updatedPrompts = savedPrompts.filter(prompt => prompt.id !== id);
      setSavedPrompts(updatedPrompts);
      await AsyncStorage.setItem('saved_prompts', JSON.stringify(updatedPrompts));
    } catch (error) {
      console.error('Failed to delete prompt', error);
    }
  };

  // Generate AI response (simple mock implementation)
  const generateResponse = async (prompt: string, conversationHistory: any[] = []): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Mock API call - in a real app, this would call your backend which integrates with OpenAI or other AI providers
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example responses based on prompt content
      let response: string;
      
      if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('hi')) {
        response = "Hello! I'm Apsara AI, your intelligent assistant. How can I help you today?";
      } else if (prompt.toLowerCase().includes('help')) {
        response = "I can help you with information, answering questions, creative writing, coding assistance, and much more. Just ask me anything!";
      } else if (prompt.toLowerCase().includes('weather')) {
        response = "I don't have real-time weather data, but I can help you find a weather forecast if you tell me your location.";
      } else {
        response = `I've processed your request: "${prompt}". In a real application, this would connect to OpenAI's API or another AI service to generate a meaningful response based on your prompt and conversation history.`;
      }
      
      // Update the saved prompt usage count if this was a saved prompt
      const matchedPrompt = savedPrompts.find(p => p.content === prompt);
      if (matchedPrompt) {
        updatePromptUsage(matchedPrompt.id);
      }
      
      setLastResponse(response);
      return response;
    } catch (error) {
      console.error('AI response generation failed', error);
      throw new Error('Failed to generate AI response');
    } finally {
      setIsProcessing(false);
    }
  };

  // Update usage count for a prompt
  const updatePromptUsage = async (id: string) => {
    try {
      const updatedPrompts = savedPrompts.map(prompt => 
        prompt.id === id 
          ? { ...prompt, usageCount: prompt.usageCount + 1 } 
          : prompt
      );
      
      setSavedPrompts(updatedPrompts);
      await AsyncStorage.setItem('saved_prompts', JSON.stringify(updatedPrompts));
    } catch (error) {
      console.error('Failed to update prompt usage', error);
    }
  };

  return (
    <AIContext.Provider
      value={{
        settings,
        isProcessing,
        savedPrompts,
        lastResponse,
        updateSettings,
        savePrompt,
        deletePrompt,
        generateResponse,
        setIsProcessing,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};