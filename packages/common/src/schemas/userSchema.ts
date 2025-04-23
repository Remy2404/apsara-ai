import { z } from 'zod';
import { 
  EMAIL_REGEX, 
  PASSWORD_REGEX, 
  PASSWORD_REQUIREMENTS,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  BIO_MAX_LENGTH,
  LOCATION_MAX_LENGTH
} from '../constants/validation';

export const loginSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string()
    .min(NAME_MIN_LENGTH, `Name must be at least ${NAME_MIN_LENGTH} characters`)
    .max(NAME_MAX_LENGTH, `Name cannot exceed ${NAME_MAX_LENGTH} characters`),
  email: z.string().regex(EMAIL_REGEX, 'Please enter a valid email address'),
  password: z.string()
    .regex(PASSWORD_REGEX, PASSWORD_REQUIREMENTS),
});

export const updateProfileSchema = z.object({
  name: z.string()
    .min(NAME_MIN_LENGTH, `Name must be at least ${NAME_MIN_LENGTH} characters`)
    .max(NAME_MAX_LENGTH, `Name cannot exceed ${NAME_MAX_LENGTH} characters`)
    .optional(),
  bio: z.string()
    .max(BIO_MAX_LENGTH, `Bio cannot exceed ${BIO_MAX_LENGTH} characters`)
    .optional(),
  location: z.string()
    .max(LOCATION_MAX_LENGTH, `Location cannot exceed ${LOCATION_MAX_LENGTH} characters`)
    .optional(),
  avatar: z.string().optional(),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().regex(PASSWORD_REGEX, PASSWORD_REQUIREMENTS),
});

export const updatePreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).optional(),
  notifications: z.object({
    push: z.boolean().optional(),
    email: z.boolean().optional(),
    chat: z.boolean().optional(),
    marketing: z.boolean().optional(),
  }).optional(),
  aiSettings: z.object({
    model: z.string().optional(),
    temperature: z.number().min(0).max(1).optional(),
    historyLength: z.number().min(1).max(50).optional(),
  }).optional(),
});