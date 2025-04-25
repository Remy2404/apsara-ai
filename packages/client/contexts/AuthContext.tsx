import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

// Define types
interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token storage keys
const AUTH_TOKEN_KEY = 'apsara_auth_token';
const USER_DATA_KEY = 'apsara_user_data';

// Provider component
export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Check for existing session on startup
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        
        if (token) {
          const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
          if (userData) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
          }
        }
      } catch (e) {
        console.error('Failed to load auth data:', e);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStoredAuth();
  }, []);
  
  // Sign in handler
  const signIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // In a real app, make an API call here
      // For this demo, we'll simulate an API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email !== 'user@example.com' && password !== 'password123') {
        throw new Error('Invalid email or password');
      }
      
      // Mock user data
      const userData: User = {
        id: '1',
        email,
        username: 'johndoe',
      };
      
      // Store auth token and user data
      const mockToken = 'mock_jwt_token_' + Date.now();
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, mockToken);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign in failed');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sign up handler
  const signUp = async (email: string, username: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // In a real app, make an API call here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (email === 'user@example.com') {
        throw new Error('Email already in use');
      }
      
      // Mock user data
      const userData: User = {
        id: Date.now().toString(),
        email,
        username,
      };
      
      // Store auth token and user data
      const mockToken = 'mock_jwt_token_' + Date.now();
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, mockToken);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign up failed');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sign out handler
  const signOut = async () => {
    setIsLoading(true);
    
    try {
      // Clear stored data
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Sign out error:', e);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Forgot password handler
  const forgotPassword = async (email: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // In a real app, make an API call here
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation
      if (email !== 'user@example.com') {
        throw new Error('No account found with this email');
      }
      
      // Success - code would be sent to user's email in real app
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Password reset request failed');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Verify code handler
  const verifyCode = async (email: string, code: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // In a real app, make an API call here
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation
      if (code !== '123456') {
        throw new Error('Invalid verification code');
      }
      
      // Success
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Code verification failed');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset password handler
  const resetPassword = async (email: string, code: string, newPassword: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // In a real app, make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (code !== '123456') {
        throw new Error('Invalid verification code');
      }
      
      if (newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      
      // Success
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Password reset failed');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    verifyCode,
    resetPassword,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
}