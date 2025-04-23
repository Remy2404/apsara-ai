/**
 * Sanitizes a string by removing potentially dangerous HTML/script content
 * @param input String to sanitize
 * @returns Sanitized string
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generates a random string for use in security contexts
 * @param length Length of the random string
 * @returns Random string
 */
export function generateRandomString(length: number = 16): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  const bytes = new Uint8Array(length);
  if (typeof window !== 'undefined' && window.crypto) {
    // Browser environment
    window.crypto.getRandomValues(bytes);
  } else {
    // Node.js environment
    try {
      // Use dynamic import instead of require
      import('crypto').then(crypto => {
        bytes.set(crypto.randomBytes(length));
      }).catch(() => {
        // Fallback to less secure Math.random if crypto is not available
        for (let i = 0; i < length; i++) {
          bytes[i] = Math.floor(Math.random() * charset.length);
        }
      });
    } catch (e) {
      // Fallback to less secure Math.random if crypto is not available
      for (let i = 0; i < length; i++) {
        bytes[i] = Math.floor(Math.random() * charset.length);
      }
    }
  }
  
  for (let i = 0; i < length; i++) {
    result += charset[bytes[i] % charset.length];
  }
  
  return result;
}

/**
 * Obfuscates sensitive data like email addresses
 * @param email Email address to obfuscate
 * @returns Obfuscated email (e.g., j***e@example.com)
 */
export function obfuscateEmail(email: string): string {
  if (!email || !email.includes('@')) return email;
  
  const [localPart, domain] = email.split('@');
  
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  
  return `${localPart[0]}***${localPart[localPart.length - 1]}@${domain}`;
}

/**
 * Obfuscates a phone number
 * @param phoneNumber Phone number to obfuscate
 * @returns Obfuscated phone number (e.g., (***) ***-1234)
 */
export function obfuscatePhone(phoneNumber: string): string {
  if (!phoneNumber) return phoneNumber;
  
  // Keep only the last 4 digits visible
  const cleaned = phoneNumber.replace(/\D/g, '');
  const last4 = cleaned.slice(-4);
  
  return `******${last4}`;
}

/**
 * Safely parses JSON with error handling
 * @param json JSON string to parse
 * @param fallback Fallback value if parsing fails
 * @returns Parsed object or fallback value
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    return fallback;
  }
}