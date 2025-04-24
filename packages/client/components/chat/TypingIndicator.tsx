import React, { useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';

interface TypingIndicatorProps {
  isVisible: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  const animations = [
    React.useRef(new Animated.Value(0)).current,
    React.useRef(new Animated.Value(0)).current,
    React.useRef(new Animated.Value(0)).current,
  ];

  const animateDots = () => {
    const duration = 600;
    
    animations.forEach((animation, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(animation, {
            toValue: 1,
            duration: duration / 2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: duration / 2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.delay((animations.length - i - 1) * 150),
        ])
      ).start();
    });
  };

  useEffect(() => {
    if (isVisible) {
      animateDots();
    } else {
      animations.forEach((animation) => {
        animation.stopAnimation();
        animation.setValue(0);
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View className="flex flex-row items-center p-3 mb-4 ml-2 bg-secondary-800 rounded-xl rounded-tl-none w-[70px]">
      {animations.map((animation, index) => (
        <Animated.View
          key={index}
          className="w-2 h-2 mx-1 rounded-full bg-gray-300"
          style={{
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -5],
                }),
              },
            ],
          }}
        />
      ))}
    </View>
  );
};

export default TypingIndicator;