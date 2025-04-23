import { 
  EMAIL_REGEX, 
  PASSWORD_REGEX, 
  NAME_MIN_LENGTH, 
  NAME_MAX_LENGTH,
  BIO_MAX_LENGTH,
  LOCATION_MAX_LENGTH,
  CHAT_MESSAGE_MAX_LENGTH,
  CONVERSATION_TITLE_MAX_LENGTH,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE
} from '../constants/validation';

/**
 * Validates an email address
 * @param email Email address to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validates a password against security requirements
 * @param password Password to validate
 * @returns Whether the password is valid
 */
export function isValidPassword(password: string): boolean {
  return PASSWORD_REGEX.test(password);
}

/**
 * Validates a user's name
 * @param name Name to validate
 * @returns Whether the name is valid
 */
export function isValidName(name: string): boolean {
  return name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH;
}

/**
 * Validates a user's bio
 * @param bio Bio to validate
 * @returns Whether the bio is valid
 */
export function isValidBio(bio: string): boolean {
  return bio.length <= BIO_MAX_LENGTH;
}

/**
 * Validates a location string
 * @param location Location to validate
 * @returns Whether the location is valid
 */
export function isValidLocation(location: string): boolean {
  return location.length <= LOCATION_MAX_LENGTH;
}

/**
 * Validates a chat message
 * @param message Message to validate
 * @returns Whether the message is valid
 */
export function isValidChatMessage(message: string): boolean {
  return message.trim().length > 0 && message.length <= CHAT_MESSAGE_MAX_LENGTH;
}

/**
 * Validates a conversation title
 * @param title Title to validate
 * @returns Whether the title is valid
 */
export function isValidConversationTitle(title: string): boolean {
  return title.trim().length > 0 && title.length <= CONVERSATION_TITLE_MAX_LENGTH;
}

/**
 * Validates a file based on type and size
 * @param file File object to validate
 * @param allowedTypes Array of allowed MIME types
 * @param maxSize Maximum file size in bytes
 * @returns Object containing validation result and error message if applicable
 */
export function validateFile(
  file: { type: string; size: number; name?: string },
  fileCategory: keyof typeof ALLOWED_FILE_TYPES
): { valid: boolean; error?: string } {
  // Check file type
  if (!ALLOWED_FILE_TYPES[fileCategory].includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES[fileCategory].join(', ')}` 
    };
  }
  
  // Check file size
  if (file.size > MAX_FILE_SIZE[fileCategory]) {
    return { 
      valid: false, 
      error: `File too large. Maximum size: ${MAX_FILE_SIZE[fileCategory] / (1024 * 1024)}MB` 
    };
  }
  
  return { valid: true };
}

/**
 * Checks if a value is undefined, null, or an empty string
 * @param value Value to check
 * @returns Whether the value is empty
 */
export function isEmpty(value: any): boolean {
  return value === undefined || value === null || value === '';
}

/**
 * Checks if an object has all required fields
 * @param obj Object to check
 * @param requiredFields Array of required field names
 * @returns Array of missing field names or null if all fields are present
 */
export function validateRequiredFields<T>(
  obj: T, 
  requiredFields: (keyof T)[]
): (keyof T)[] | null {
  const missingFields = requiredFields.filter(field => isEmpty(obj[field]));
  return missingFields.length > 0 ? missingFields : null;
}