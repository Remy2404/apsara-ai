import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Alert } from 'react-native';
import { UserProfile, UpdateProfileRequest, UpdatePreferencesRequest, UserPreferences } from '../../common/src/types/user'; // Use relative path until path aliases are working
import * as UserApi from '../services/api/user'; 
import { useAuthContext } from './AuthContext'; 

interface ProfileContextState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updatePreferences: (data: Partial<UserProfile['preferences']>) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextState | undefined>(undefined);

interface ProfileContextProviderProps {
  children: ReactNode;
}

export const ProfileContextProvider: React.FC<ProfileContextProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuthContext(); // Get auth state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setProfile(null); // Clear profile if not authenticated
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const fetchedProfile = await UserApi.getProfile(); // API call
      // Ensure createdAt is a Date object if needed, or handle string conversion
      setProfile({
        ...fetchedProfile,
        createdAt: new Date(fetchedProfile.createdAt), // Example conversion
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile');
      Alert.alert('Error', 'Could not load your profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]); // Fetch profile on mount or when auth state changes

  const updateProfile = async (data: UpdateProfileRequest) => {
    if (!profile) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const updatedProfile = await UserApi.updateProfile(data); // API call
      setProfile({
        ...updatedProfile,
        createdAt: new Date(updatedProfile.createdAt), // Ensure consistency
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      Alert.alert('Error', 'Could not update your profile. Please try again.');
      throw err; // Re-throw error for component handling
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await UserApi.changePassword({ currentPassword, newPassword }); // API call
      // No profile update needed here, just success/error handling
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
      // Check if err.response exists before accessing data
      const errorMessage = err.response?.data?.message || 'Could not change password. Please check your current password.';
      Alert.alert('Error', errorMessage);
      throw err; // Re-throw error for component handling
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (data: Partial<UserProfile['preferences']>) => {
    if (!profile) return;
    
    setIsLoading(true);
    setError(null);
    try {
      // Ensure only valid preference fields are sent and conform to expected types
      const validData: Partial<UserPreferences> = {};
      if (data.theme) validData.theme = data.theme;
      if (data.notifications) {
        validData.notifications = {
          push: data.notifications.push ?? false, // Ensure non-optional properties
          email: data.notifications.email ?? false
        };
      }
      if (data.privacy) validData.privacy = data.privacy;
      if (data.aiSettings) validData.aiSettings = data.aiSettings;

      const updatedPreferences = await UserApi.updatePreferences(validData); // API call with validated data
      setProfile((prev: UserProfile | null) => prev ? { ...prev, preferences: { ...prev.preferences, ...updatedPreferences } } : null); // Add type annotation
    } catch (err: any) {
      setError(err.message || 'Failed to update preferences');
      Alert.alert('Error', 'Could not update your settings. Please try again.');
      throw err; // Re-throw error for component handling
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    changePassword,
    updatePreferences,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileContext must be used within a ProfileContextProvider');
  }
  return context;
};
