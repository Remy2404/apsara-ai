import React, { useEffect, ReactNode } from 'react';
import { 
  View, 
  Modal as RNModal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
  Text
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
  animationType?: 'slide' | 'fade' | 'none';
  closeOnBackdropPress?: boolean;
  contentContainerClassName?: string;
}

export const Modal = ({
  visible,
  onClose,
  children,
  title,
  showCloseButton = true,
  animationType = 'fade',
  closeOnBackdropPress = true,
  contentContainerClassName = '',
}: ModalProps) => {
  const { theme, isDark } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  return (
    <RNModal
      transparent={true}
      visible={visible}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback>
            <Animated.View 
              className={`bg-white dark:bg-background-dark rounded-xl p-5 m-5 w-[90%] max-w-md shadow-lg ${contentContainerClassName}`}
              style={{ opacity: fadeAnim }}
            >
              {title && (
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg font-bold text-text-light dark:text-text-dark">
                    {title}
                  </Text>
                  {showCloseButton && (
                    <TouchableOpacity onPress={onClose} className="p-1">
                      <Text className="text-xl text-text-light dark:text-text-dark">×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};