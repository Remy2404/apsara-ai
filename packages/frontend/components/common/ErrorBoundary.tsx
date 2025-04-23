import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text } from 'react-native';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI when an error occurs
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View className="flex-1 items-center justify-center p-6 bg-background-light dark:bg-background-dark">
          <Text className="text-xl font-bold text-error mb-2">Oops, Something Went Wrong</Text>
          <Text className="text-text-light dark:text-text-dark mb-4 text-center">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </Text>
          <Button 
            title="Try Again" 
            onPress={this.resetError} 
            variant="primary"
          />
        </View>
      );
    }

    return this.props.children;
  }
}