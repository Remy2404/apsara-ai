import { useState } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../contexts/AuthContext';

/**
 * Custom hook for authentication operations
 */
export const useAuth = () => {
  const router = useRouter();
  const { 
    isAuthenticated, 
    isLoading: contextLoading, 
    user, 
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword: resetPasswordContext,
    error: authError
  } = useAuthContext();
  
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * Login user with email and password
   */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signIn(email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Register new user
   */
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await signUp(email, name, password);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Logout user
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.replace('/(auth)/login');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Reset password
   */
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await forgotPassword(email);
      Alert.alert(
        'Password Reset',
        'If an account exists with this email, we\'ve sent a password reset link.'
      );
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      Alert.alert('Error', authError || 'Failed to reset password. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    user,
    isAuthenticated,
    isLoading: isLoading || contextLoading,
    login,
    register,
    logout,
    resetPassword
  };
};

export default useAuth;