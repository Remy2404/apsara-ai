import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for AI context
interface AISettings {
  model: 'gpt-3.5-turbo' | 'gpt-4';
  temperature: number;
  maxTokens: number;
  contextLength: 'short' | 'medium' | 'long';
  voiceEnabled: boolean;
  saveHistory: boolean;
  dataCollection: boolean;
}

interface AIContextType {
  settings: AISettings;
  updateSettings: (settings: Partial<AISettings>) => void;
  conversations: Array<{
    id: string;
    title: string;
    timestamp: Date;
  }>;
  savedPrompts: Array<{
    id: string;
    text: string;
    category: string;
  }>;
  addSavedPrompt: (prompt: { text: string, category: string }) => void;
  removeSavedPrompt: (id: string) => void;
}

// Create the context with a default value
const AIContext = createContext<AIContextType | undefined>(undefined);

// Provider component that wraps parts of the app that need AI context
export function AIContextProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AISettings>({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 2048,
    contextLength: 'medium',
    voiceEnabled: false,
    saveHistory: true,
    dataCollection: false,
  });

  const [conversations, setConversations] = useState([
    { id: '1', title: 'Project Brainstorming', timestamp: new Date(2023, 3, 15) },
    { id: '2', title: 'Travel Planning', timestamp: new Date(2023, 3, 10) },
    { id: '3', title: 'Code Review', timestamp: new Date(2023, 3, 5) },
  ]);

  const [savedPrompts, setSavedPrompts] = useState([
    { id: '1', text: 'Help me draft an email to my boss', category: 'Business' },
    { id: '2', text: 'Create a workout plan for beginners', category: 'Health' },
    { id: '3', text: 'Explain quantum computing simply', category: 'Education' },
  ]);

  const updateSettings = (newSettings: Partial<AISettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addSavedPrompt = (prompt: { text: string, category: string }) => {
    const newPrompt = {
      id: Math.random().toString(36).substring(7),
      text: prompt.text,
      category: prompt.category,
    };
    setSavedPrompts(prev => [...prev, newPrompt]);
  };

  const removeSavedPrompt = (id: string) => {
    setSavedPrompts(prev => prev.filter(prompt => prompt.id !== id));
  };

  const value = {
    settings,
    updateSettings,
    conversations,
    savedPrompts,
    addSavedPrompt,
    removeSavedPrompt,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

// Custom hook to use the AI context
export function useAIContext() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAIContext must be used within a AIContextProvider');
  }
  return context;
}