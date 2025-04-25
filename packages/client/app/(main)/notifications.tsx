import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Sample notification data
type NotificationType = {
  id: string;
  type: 'message' | 'update' | 'reminder';
  title: string;
  description: string;
  time: string;
  read: boolean;
};

const notificationData: NotificationType[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Apsara AI',
    description: 'Your question about climate patterns has been answered.',
    time: '2 minutes ago',
    read: false
  },
  {
    id: '2',
    type: 'update',
    title: 'App update available',
    description: 'New features and improvements are ready to install.',
    time: '1 hour ago',
    read: true
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Daily learning reminder',
    description: 'Continue your conversation with Apsara AI about machine learning.',
    time: '4 hours ago',
    read: true
  },
  {
    id: '4',
    type: 'message',
    title: 'New conversation suggested',
    description: 'Based on your interests, try asking about quantum computing basics.',
    time: '1 day ago',
    read: true
  }
];

export default function NotificationsScreen() {
  const router = useRouter();

  const renderNotificationItem = ({ item }: { item: { 
    id: string;
    type: 'message' | 'update' | 'reminder';
    title: string;
    description: string;
    time: string;
    read: boolean;
  }}) => {
    const iconName = 
      item.type === 'message' ? 'chatbox-outline' :
      item.type === 'update' ? 'arrow-up-circle-outline' : 'alarm-outline';
    
    return (
      <TouchableOpacity 
        className={`p-4 border-b border-secondary-800 ${!item.read ? 'bg-secondary-800/30' : ''}`}
        onPress={() => {
          // Handle notification press based on type
          if (item.type === 'message') {
            router.push('/chat');
          }
        }}
      >
        <View className="flex-row">
          <View className="w-10 h-10 rounded-full bg-primary-600/20 items-center justify-center mr-3">
            <Ionicons name={iconName} size={20} color="#10a37f" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-medium">{item.title}</Text>
              {!item.read && <View className="w-2 h-2 rounded-full bg-primary-500" />}
            </View>
            <Text className="text-gray-400 text-sm mt-1">{item.description}</Text>
            <Text className="text-gray-500 text-xs mt-2">{item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-secondary-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <Text className="text-xl font-medium text-white">Notifications</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Notifications list */}
      <FlatList
        data={notificationData}
        keyExtractor={item => item.id}
        renderItem={renderNotificationItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="notifications-off-outline" size={40} color="#71717a" />
            <Text className="text-gray-400 mt-4">No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}