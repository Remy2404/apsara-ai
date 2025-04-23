import React, { useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Avatar } from '../common/Avatar';

interface TypingIndicatorProps {
  visible?: boolean;
  showAvatar?: boolean;
}

export const TypingIndicator = ({ 
  visible = true,
  showAvatar = true 
}: TypingIndicatorProps) => {
  const { isDark } = useTheme();
  
  // Animation values for each dot
  const dot1Opacity = React.useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = React.useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = React.useRef(new Animated.Value(0.3)).current;
  
  // Animation sequence
  useEffect(() => {
    if (visible) {
      const createAnimation = (value: Animated.Value) => {
        return Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0.3,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]);
      };
      
      // Run animations in sequence with slight delays
      Animated.loop(
        Animated.stagger(150, [
          createAnimation(dot1Opacity),
          createAnimation(dot2Opacity),
          createAnimation(dot3Opacity),
        ]),
      ).start();
    }
    
    return () => {
      dot1Opacity.setValue(0.3);
      dot2Opacity.setValue(0.3);
      dot3Opacity.setValue(0.3);
    };
  }, [visible]);
  
  if (!visible) return null;
  
  return (
    <View className="flex-row items-end my-2 mx-2">
      {showAvatar && (
        <View className="mr-2">
          <Avatar size="sm" name="Apsara" />
        </View>
      )}
      
      <View 
        className={`rounded-2xl px-4 py-2 ${
          isDark ? 'bg-gray-800' : 'bg-gray-200'
        }`}
      >
        <View className="flex-row items-center h-6">
          {[dot1Opacity, dot2Opacity, dot3Opacity].map((opacity, index) => (
            <Animated.View 
              key={index}
              style={{
                opacity,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: isDark ? '#D1D5DB' : '#6B7280',
                marginHorizontal: 2,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};