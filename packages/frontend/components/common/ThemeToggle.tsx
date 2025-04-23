import React from 'react';
import { View, Pressable, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle = ({ size = 'md' }: ThemeToggleProps) => {
  const { isDark, themeType, setThemeType } = useTheme();
  const toggleAnim = React.useRef(new Animated.Value(isDark ? 1 : 0)).current;
  
  // Size mappings
  const sizeMap = {
    sm: {
      width: 48,
      height: 24,
      iconSize: 16,
    },
    md: {
      width: 56,
      height: 28,
      iconSize: 18,
    },
    lg: {
      width: 64,
      height: 32,
      iconSize: 20,
    },
  };
  
  const { width, height, iconSize } = sizeMap[size];
  const knobSize = height - 4;
  
  React.useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [isDark]);
  
  const togglePosition = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, width - knobSize - 2],
  });
  
  const bgColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e5e7eb', '#374151'],
  });
  
  const handleToggle = () => {
    // Cycle through theme modes: light -> dark -> system
    if (themeType === 'light') {
      setThemeType('dark');
    } else if (themeType === 'dark') {
      setThemeType('system');
    } else {
      setThemeType('light');
    }
  };
  
  return (
    <Pressable onPress={handleToggle} accessibilityRole="switch" accessibilityLabel="Toggle theme">
      <Animated.View
        style={{
          width,
          height,
          backgroundColor: bgColor,
          borderRadius: height / 2,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: knobSize,
            height: knobSize,
            borderRadius: knobSize / 2,
            backgroundColor: 'white',
            transform: [{ translateX: togglePosition }],
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
          }}
        >
          <Ionicons 
            name={isDark ? 'moon' : 'sunny'} 
            size={iconSize} 
            color={isDark ? '#6366F1' : '#F59E0B'} 
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};