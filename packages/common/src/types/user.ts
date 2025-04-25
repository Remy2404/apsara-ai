export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  website?: string;
  bio?: string;
  location?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string; // ISO date string from the server
  updatedAt: string;
}

export interface UserProfile extends Omit<User, 'role' | 'isVerified' | 'createdAt'> {
  createdAt: Date;
  preferences: UserPreferences;
}
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    push: boolean;
    email: boolean;
  };
  privacy: {
    showEmail: boolean;
    showActivity: boolean;
  };
  aiSettings: {
    model: string;
    temperature: number;
    historyLength: number;
  };
}

export interface UpdateProfileRequest {
  name?: string;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string | null; // Allow null for avatar removal
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePreferencesRequest {
  theme?: 'light' | 'dark' | 'system';
  notifications?: {
    push?: boolean;
    email?: boolean;
  };
  privacy?: {
    showEmail?: boolean;
    showActivity?: boolean;
  };
  aiSettings?: {
    model?: string;
    temperature?: number;
    historyLength?: number;
  };
}