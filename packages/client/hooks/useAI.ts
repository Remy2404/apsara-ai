import { useState, useCallback } from 'react';

// This is a mock implementation that will be replaced with actual API calls in production
export function useAI() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendPrompt = useCallback(async (prompt: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would be an API call to your backend
      // For now, we'll simulate a delay and return a mock response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      setResponse(`This is a simulated response from Apsara AI to your prompt: "${prompt}"\n\nIn the actual implementation, this would be a real response from the AI model through your backend API.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('AI prompt error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sendPrompt,
    response,
    loading,
    error,
    clearResponse: () => setResponse(null),
    clearError: () => setError(null),
  };
}