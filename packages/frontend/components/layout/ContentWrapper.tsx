import React, { ReactNode } from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ContentWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  centered?: boolean;
  withBackground?: boolean;
}

export const ContentWrapper = ({
  children,
  style,
  scrollable = false,
  paddingHorizontal = 16,
  paddingVertical = 16,
  centered = false,
  withBackground = true,
}: ContentWrapperProps) => {
  const { theme, isDark } = useTheme();
  
  const containerStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal,
    paddingVertical,
    ...(centered && {
      justifyContent: 'center',
      alignItems: 'center',
    }),
    ...(withBackground && {
      backgroundColor: isDark ? theme.colors.background : theme.colors.background,
    }),
    ...style,
  };
  
  if (scrollable) {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={containerStyle}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {children}
      </ScrollView>
    );
  }
  
  return <View style={containerStyle}>{children}</View>;
};