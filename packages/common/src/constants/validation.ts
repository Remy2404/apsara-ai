export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PASSWORD_REQUIREMENTS = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const BIO_MAX_LENGTH = 500;
export const LOCATION_MAX_LENGTH = 100;

export const CHAT_MESSAGE_MAX_LENGTH = 4000;
export const CONVERSATION_TITLE_MAX_LENGTH = 100;

export const ALLOWED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  VIDEO: ['video/mp4', 'video/webm', 'video/ogg']
};

export const MAX_FILE_SIZE = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  AUDIO: 15 * 1024 * 1024, // 15MB
  VIDEO: 50 * 1024 * 1024 // 50MB
};