export enum ErrorCode {
  // Authentication errors
  INVALID_CREDENTIALS = 'auth/invalid-credentials',
  EMAIL_ALREADY_EXISTS = 'auth/email-already-exists',
  UNAUTHORIZED = 'auth/unauthorized',
  INVALID_TOKEN = 'auth/invalid-token',
  TOKEN_EXPIRED = 'auth/token-expired',
  ACCOUNT_NOT_VERIFIED = 'auth/account-not-verified',
  INVALID_OTP = 'auth/invalid-otp',
  OTP_EXPIRED = 'auth/otp-expired',
  PASSWORD_RESET_REQUIRED = 'auth/password-reset-required',
  
  // User errors
  USER_NOT_FOUND = 'user/not-found',
  INVALID_USER_DATA = 'user/invalid-data',
  EMAIL_NOT_FOUND = 'user/email-not-found',
  PASSWORD_TOO_WEAK = 'user/password-too-weak',
  
  // Chat errors
  CONVERSATION_NOT_FOUND = 'chat/conversation-not-found',
  MESSAGE_NOT_FOUND = 'chat/message-not-found',
  INVALID_CHAT_DATA = 'chat/invalid-data',
  NOT_CONVERSATION_PARTICIPANT = 'chat/not-participant',
  
  // AI errors
  MODEL_NOT_FOUND = 'ai/model-not-found',
  INVALID_PROMPT = 'ai/invalid-prompt',
  CONTEXT_TOO_LONG = 'ai/context-too-long',
  API_LIMIT_EXCEEDED = 'ai/api-limit-exceeded',
  PROMPT_NOT_FOUND = 'ai/prompt-not-found',
  MODEL_ERROR = 'ai/model-error',
  
  // File errors
  FILE_TOO_LARGE = 'file/too-large',
  INVALID_FILE_TYPE = 'file/invalid-type',
  FILE_UPLOAD_FAILED = 'file/upload-failed',
  FILE_NOT_FOUND = 'file/not-found',
  
  // General errors
  VALIDATION_ERROR = 'general/validation-error',
  INTERNAL_SERVER_ERROR = 'general/server-error',
  NOT_FOUND = 'general/not-found',
  BAD_REQUEST = 'general/bad-request',
  RATE_LIMIT_EXCEEDED = 'general/rate-limit-exceeded',
}