export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends Omit<User, 'role' | 'isVerified'> {
  bio?: string;
  location?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    push: boolean;
    email: boolean;
    chat: boolean;
    marketing: boolean;
  };
  aiSettings: {
    model: string;
    temperature: number;
    historyLength: number;
  };
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  location?: string;
  avatar?: string;
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
    chat?: boolean;
    marketing?: boolean;
  };
  aiSettings?: {
    model?: string;
    temperature?: number;
    historyLength?: number;
  };
}