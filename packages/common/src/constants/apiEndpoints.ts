export const API_BASE_URL = '/api/v1';

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
  VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
};

export const USER_ENDPOINTS = {
  ME: `${API_BASE_URL}/users/me`,
  UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
  UPDATE_PASSWORD: `${API_BASE_URL}/users/password`,
  UPDATE_PREFERENCES: `${API_BASE_URL}/users/preferences`,
};

export const CHAT_ENDPOINTS = {
  CONVERSATIONS: `${API_BASE_URL}/chat/conversations`,
  CONVERSATION: (id: string) => `${API_BASE_URL}/chat/conversations/${id}`,
  MESSAGES: (conversationId: string) => `${API_BASE_URL}/chat/conversations/${conversationId}/messages`,
  MESSAGE: (conversationId: string, messageId: string) => `${API_BASE_URL}/chat/conversations/${conversationId}/messages/${messageId}`,
};

export const AI_ENDPOINTS = {
  COMPLETION: `${API_BASE_URL}/ai/completion`,
  MODELS: `${API_BASE_URL}/ai/models`,
  PROMPTS: `${API_BASE_URL}/ai/prompts`,
  PROMPT: (id: string) => `${API_BASE_URL}/ai/prompts/${id}`,
};

export const FILE_ENDPOINTS = {
  UPLOAD: `${API_BASE_URL}/files/upload`,
  DOWNLOAD: (id: string) => `${API_BASE_URL}/files/${id}`,
};