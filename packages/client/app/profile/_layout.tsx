import React from 'react';
import { Stack } from 'expo-router';
import { ProfileContextProvider } from '../../contexts/ProfileContext'; // Corrected relative path

export default function ProfileLayout() {
  return (
    <ProfileContextProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Profile',
            headerLargeTitle: true,
          }} 
        />
        <Stack.Screen 
          name="edit" 
          options={{ 
            title: 'Edit Profile',
            presentation: 'card',
          }} 
        />
        <Stack.Screen 
          name="password" 
          options={{ 
            title: 'Change Password',
            presentation: 'card',
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: 'Account Settings',
            presentation: 'card',
          }} 
        />
      </Stack>
    </ProfileContextProvider>
  );
}