import React from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';

interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  containerStyle?: ViewStyle;
  borderColor?: string;
}

export const Avatar = ({
  uri,
  name,
  size = 'md',
  containerStyle,
  borderColor,
}: AvatarProps) => {
  // Size mapping
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };

  const avatarSize = sizeMap[size];
  const fontSize = size === 'xs' || size === 'sm' ? 12 : size === 'md' ? 16 : 20;
  
  // Generate initials from name
  const getInitials = () => {
    if (!name) return '?';
    
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Generate a color based on name
  const getColorFromName = () => {
    if (!name) return '#3B82F6'; // Default blue
    
    const colors = [
      '#3B82F6', // Blue
      '#10B981', // Green
      '#F59E0B', // Amber
      '#EF4444', // Red
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#6366F1', // Indigo
      '#14B8A6', // Teal
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  const avatarColor = getColorFromName();
  const borderWidth = borderColor ? 2 : 0;
  
  return (
    <View 
      style={[
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          overflow: 'hidden',
          borderWidth,
          borderColor: borderColor || 'transparent',
        },
        containerStyle,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: avatarColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize,
              fontWeight: '600',
            }}
          >
            {getInitials()}
          </Text>
        </View>
      )}
    </View>
  );
};