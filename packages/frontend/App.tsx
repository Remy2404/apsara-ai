import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';

export default function App() {
  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark items-center justify-center">
      <Text className="text-text-light dark:text-text-dark text-lg font-bold">
        Welcome to Apsara AI
      </Text>
      <Text className="text-text-light dark:text-text-dark mt-4">
        Your intelligent AI assistant
      </Text>
      <Text className="text-text-light dark:text-text-dark mt-2">
        Start your journey with us today!
      </Text>
      <View className="mt-8 p-4 bg-primary rounded-md">
        <Text className="text-white">Get Started</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
