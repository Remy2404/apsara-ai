import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

interface SafeAreaWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
  edges?: Array<'top' | 'right' | 'bottom' | 'left'>;
  withBackground?: boolean;
}

export const SafeAreaWrapper = ({
  children,
  style,
  edges = ['top', 'right', 'bottom', 'left'],
  withBackground = true,
}: SafeAreaWrapperProps) => {
  const { isDark } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        withBackground && {
          backgroundColor: isDark ? '#121212' : '#FFFFFF',
        },
        style,
      ]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});