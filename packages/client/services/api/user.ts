import apiClient from './axiosConfig'; 
import { 
  UserProfile, 
  UpdateProfileRequest, 
  UpdatePasswordRequest, 
  UpdatePreferencesRequest 
} from '../../../common/src/types/user'; // Use relative path until path aliases are working alias works
import { USER_ENDPOINTS } from '../../../common/src/constants/apiEndpoints'; // Use relative path until path aliases are working

/**
 * Fetches the current user's profile.
 */
export const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await apiClient.get<UserProfile>(USER_ENDPOINTS.ME); // Corrected endpoint
    return response.data;
  } catch (error) {
    console.error('API Error fetching profile:', error);
    // Consider throwing a more specific error or handling it based on app needs
    throw error;
  }
};

/**
 * Updates the current user's profile.
 * @param data - The profile data to update.
 */
export const updateProfile = async (data: UpdateProfileRequest): Promise<UserProfile> => {
  try {
    // Note: If handling avatar uploads, this might need to be a FormData request
    // depending on the backend implementation.
    const response = await apiClient.patch<UserProfile>(USER_ENDPOINTS.UPDATE_PROFILE, data); // Corrected endpoint
    return response.data;
  } catch (error) {
    console.error('API Error updating profile:', error);
    throw error;
  }
};

/**
 * Changes the current user's password.
 * @param data - Contains current and new passwords.
 */
export const changePassword = async (data: UpdatePasswordRequest): Promise<void> => {
  try {
    await apiClient.patch<void>(USER_ENDPOINTS.UPDATE_PASSWORD, data); // Corrected endpoint
  } catch (error) {
    console.error('API Error changing password:', error);
    throw error;
  }
};

/**
 * Updates the current user's preferences.
 * @param data - The preferences data to update.
 */
export const updatePreferences = async (data: Partial<UserProfile['preferences']>): Promise<UserProfile['preferences']> => {
  try {
    const response = await apiClient.patch<UserProfile['preferences']>(USER_ENDPOINTS.UPDATE_PREFERENCES, data); // Corrected endpoint
    return response.data;
  } catch (error) {
    console.error('API Error updating preferences:', error);
    throw error;
  }
};

// Add other user-related API functions as needed, e.g., delete account
