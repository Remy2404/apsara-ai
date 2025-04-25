import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock history data - in a real app this would come from a context or API
const MOCK_HISTORY = [
  {
    id: '1',
    title: 'Essay on Climate Change',
    preview: 'Climate change presents one of the most pressing challenges facing humanity today...',
    timestamp: new Date(2023, 4, 15, 10, 30),
    type: 'academic',
    starred: true
  },
  {
    id: '2',
    title: 'Discussion about renewable energy',
    preview: 'Solar and wind power have become increasingly affordable options for sustainable energy...',
    timestamp: new Date(2023, 4, 14, 14, 45),
    type: 'chat',
    starred: false
  },
  {
    id: '3',
    title: 'Research paper outline: Artificial Intelligence',
    preview: 'Abstract: This paper examines the evolution and impact of artificial intelligence...',
    timestamp: new Date(2023, 4, 12, 9, 15),
    type: 'academic',
    starred: true
  },
  {
    id: '4',
    title: 'Code review: React component',
    preview: 'The component structure looks good, but there are some performance optimizations...',
    timestamp: new Date(2023, 4, 10, 16, 20),
    type: 'chat',
    starred: false
  },
  {
    id: '5',
    title: 'Literature Review: Modern Poetry',
    preview: 'This literature review examines the key developments in poetry from 2000-2020...',
    timestamp: new Date(2023, 4, 8, 11, 10),
    type: 'academic',
    starred: false
  },
  {
    id: '6',
    title: 'Trip planning assistance',
    preview: 'Based on your preferences, here are some recommendations for your visit to Japan...',
    timestamp: new Date(2023, 4, 5, 19, 30),
    type: 'chat',
    starred: true
  },
];

export default function HistoryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'chat', 'academic', 'starred'
  const [historyData, setHistoryData] = useState(MOCK_HISTORY);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // Animation values for the filter menu
  const filterMenuAnim = useRef(new Animated.Value(0)).current;
  
  // Toggle filter menu visibility
  const toggleFilterMenu = () => {
    if (showFilterMenu) {
      // Hide menu
      Animated.timing(filterMenuAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => setShowFilterMenu(false));
    } else {
      // Show menu
      setShowFilterMenu(true);
      Animated.timing(filterMenuAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  };
  
  // Apply filter to history items
  const applyFilter = (filter: string) => {
    setActiveFilter(filter);
    toggleFilterMenu();
    
    // Filter the history data based on the selected filter
    if (filter === 'all') {
      setHistoryData(MOCK_HISTORY);
    } else if (filter === 'starred') {
      setHistoryData(MOCK_HISTORY.filter(item => item.starred));
    } else {
      setHistoryData(MOCK_HISTORY.filter(item => item.type === filter));
    }
  };
  
  // Format date string
  const formatDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.getTime() > today.getTime()) {
      // Today, return time
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.getTime() > yesterday.getTime()) {
      // Yesterday
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      // Other dates
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };
  
  // Handle search
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      // Reset to current filter if search is cleared
      if (activeFilter === 'all') {
        setHistoryData(MOCK_HISTORY);
      } else if (activeFilter === 'starred') {
        setHistoryData(MOCK_HISTORY.filter(item => item.starred));
      } else {
        setHistoryData(MOCK_HISTORY.filter(item => item.type === activeFilter));
      }
      return;
    }
    
    // Filter by search query and current filter type
    const filtered = MOCK_HISTORY.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(text.toLowerCase()) || 
                          item.preview.toLowerCase().includes(text.toLowerCase());
                          
      if (activeFilter === 'all') return matchesSearch;
      if (activeFilter === 'starred') return matchesSearch && item.starred;
      return matchesSearch && item.type === activeFilter;
    });
    
    setHistoryData(filtered);
  };
  
  // Navigate to the appropriate screen based on history item type
  const navigateToHistoryItem = (item: any) => {
    if (item.type === 'chat') {
      router.push(`/chat/${item.id}`);
    } else if (item.type === 'academic') {
      // Navigate to a dedicated academic content viewer
      router.push(`/ai?content=${item.id}`);
    }
  };
  
  // Toggle star status
  const toggleStar = (id: string) => {
    setHistoryData(prevData => 
      prevData.map(item => 
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    );
  };
  
  // Render each history item
  const renderHistoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-secondary-800 rounded-xl p-4 mb-3"
      onPress={() => navigateToHistoryItem(item)}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-row items-center">
          <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
            item.type === 'academic' ? 'bg-primary-600/20' : 'bg-blue-600/20'
          }`}>
            <Ionicons 
              name={item.type === 'academic' ? 'document-text' : 'chatbubble'} 
              size={16} 
              color={item.type === 'academic' ? '#10a37f' : '#3b82f6'} 
            />
          </View>
          <Text className="text-white font-medium flex-1">{item.title}</Text>
        </View>
        
        <TouchableOpacity
          className="p-1"
          onPress={() => toggleStar(item.id)}
        >
          <Ionicons 
            name={item.starred ? 'star' : 'star-outline'} 
            size={20} 
            color={item.starred ? '#f59e0b' : '#a1a1aa'} 
          />
        </TouchableOpacity>
      </View>
      
      <Text 
        className="text-gray-400 ml-11 mb-2"
        numberOfLines={2}
      >
        {item.preview}
      </Text>
      
      <Text className="text-xs text-gray-500 ml-11">
        {formatDate(item.timestamp)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      <StatusBar style="light" />
      
      {/* Header */}
      <View className="px-6 py-4">
        <Text className="text-2xl font-bold text-white">History</Text>
      </View>
      
      {/* Search and Filter Bar */}
      <View className="px-6 mb-4">
        <View className="flex-row items-center bg-secondary-800 rounded-xl px-4 h-12">
          <Ionicons name="search" size={20} color="#71717a" />
          <TextInput
            className="flex-1 ml-2 text-white"
            placeholder="Search history..."
            placeholderTextColor="#71717a"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          
          {/* Filter button */}
          <TouchableOpacity 
            className="ml-2 flex-row items-center"
            onPress={toggleFilterMenu}
          >
            <Text className="text-primary-500 mr-1">{
              activeFilter === 'all' ? 'All' :
              activeFilter === 'chat' ? 'Chats' :
              activeFilter === 'academic' ? 'Academic' :
              'Starred'
            }</Text>
            <Ionicons name="chevron-down" size={16} color="#10a37f" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Filter Menu Popup */}
      {showFilterMenu && (
        <Animated.View 
          className="absolute top-24 right-6 z-10 bg-secondary-800 rounded-xl shadow-xl overflow-hidden"
          style={{
            opacity: filterMenuAnim,
            transform: [{
              translateY: filterMenuAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })
            }]
          }}
        >
          <TouchableOpacity
            className={`flex-row items-center px-4 py-3 ${activeFilter === 'all' ? 'bg-primary-600/20' : ''}`}
            onPress={() => applyFilter('all')}
          >
            <Ionicons name="apps" size={18} color={activeFilter === 'all' ? '#10a37f' : '#a1a1aa'} />
            <Text className={`ml-2 ${activeFilter === 'all' ? 'text-primary-500' : 'text-white'}`}>All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className={`flex-row items-center px-4 py-3 ${activeFilter === 'chat' ? 'bg-primary-600/20' : ''}`}
            onPress={() => applyFilter('chat')}
          >
            <Ionicons name="chatbubble" size={18} color={activeFilter === 'chat' ? '#10a37f' : '#a1a1aa'} />
            <Text className={`ml-2 ${activeFilter === 'chat' ? 'text-primary-500' : 'text-white'}`}>Chats</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className={`flex-row items-center px-4 py-3 ${activeFilter === 'academic' ? 'bg-primary-600/20' : ''}`}
            onPress={() => applyFilter('academic')}
          >
            <Ionicons name="document-text" size={18} color={activeFilter === 'academic' ? '#10a37f' : '#a1a1aa'} />
            <Text className={`ml-2 ${activeFilter === 'academic' ? 'text-primary-500' : 'text-white'}`}>Academic</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className={`flex-row items-center px-4 py-3 ${activeFilter === 'starred' ? 'bg-primary-600/20' : ''}`}
            onPress={() => applyFilter('starred')}
          >
            <Ionicons name="star" size={18} color={activeFilter === 'starred' ? '#10a37f' : '#a1a1aa'} />
            <Text className={`ml-2 ${activeFilter === 'starred' ? 'text-primary-500' : 'text-white'}`}>Starred</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      
      {/* History List */}
      <FlatList
        className="flex-1 px-6"
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <View className="w-16 h-16 bg-secondary-800 rounded-full items-center justify-center mb-4">
              <Ionicons name="time-outline" size={30} color="#a1a1aa" />
            </View>
            <Text className="text-white text-lg font-medium mb-2">No history found</Text>
            <Text className="text-gray-400 text-center">
              {searchQuery.trim() !== '' 
                ? "No matches for your search" 
                : "Start conversations or create content to build your history"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}