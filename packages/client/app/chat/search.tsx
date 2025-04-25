import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useChatContext } from '../../contexts/ChatContext';

export default function ChatSearchScreen() {
  const router = useRouter();
  const { searchMessages, conversations, setCurrentConversation } = useChatContext();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Perform search when query changes
  useEffect(() => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Add a small delay to avoid too frequent searches while typing
    const debounce = setTimeout(() => {
      const results = searchMessages(query);
      
      // Enhance results with conversation info
      const enhancedResults = results.map(message => {
        const conversation = conversations.find(c => 
          c.messages.some(m => m.id === message.id)
        );
        
        return {
          ...message,
          conversationId: conversation?.id,
          conversationTitle: conversation?.title || 'Unknown Conversation',
          timestamp: message.timestamp.toISOString()
        };
      });
      
      setSearchResults(enhancedResults);
      setIsSearching(false);
    }, 300);
    
    return () => clearTimeout(debounce);
  }, [query, searchMessages, conversations]);
  
  // Navigate to a specific message in its conversation
interface SearchResult {
    id: string;
    conversationId?: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: string;
    conversationTitle: string;
}

const navigateToMessage = (result: SearchResult): void => {
    if (result.conversationId) {
        setCurrentConversation(result.conversationId);
        router.push({
            pathname: `/chat/${result.conversationId}`,
            params: { messageId: result.id }
        });
    }
};
  
  // Format and highlight the search result text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} className="bg-yellow-300 dark:bg-yellow-800 text-gray-900 dark:text-white">
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />
      
      {/* Search Header */}
      <View className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-gray-900 dark:text-white"
            placeholder="Search messages..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query ? (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      {/* Search Results */}
      {query.trim().length >= 2 ? (
        isSearching ? (
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-gray-500 dark:text-gray-400">Searching...</Text>
          </View>
        ) : searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            className="flex-1"
            renderItem={({ item }) => (
              <TouchableOpacity 
                className="p-4 border-b border-gray-200 dark:border-gray-800"
                onPress={() => navigateToMessage(item)}
              >
                <View className="flex-row justify-between mb-1">
                  <Text className="text-sm font-medium text-blue-500">{item.conversationTitle}</Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <View 
                    className={`w-2 h-2 rounded-full mr-2 ${
                      item.sender === 'user' ? 'bg-blue-500' : 'bg-green-500'
                    }`} 
                  />
                  <Text className="text-gray-900 dark:text-white">
                    {item.sender === 'user' ? 'You' : 'AI'}:
                  </Text>
                </View>
                <Text className="text-gray-700 dark:text-gray-300 mt-1">
                  {highlightText(item.text, query)}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View className="flex-1 items-center justify-center p-4">
            <Ionicons name="search-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 dark:text-gray-400 mt-4 text-center">
              No messages found matching "{query}"
            </Text>
          </View>
        )
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Ionicons name="search" size={48} color="#9CA3AF" />
          <Text className="text-gray-500 dark:text-gray-400 mt-4 text-center">
            Enter at least 2 characters to search
          </Text>
          {conversations.length > 0 && (
            <Text className="text-gray-500 dark:text-gray-400 mt-2 text-center">
              Searching across {conversations.length} conversations
            </Text>
          )}
        </View>
      )}
    </View>
  );
}