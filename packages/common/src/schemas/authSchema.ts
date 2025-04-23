import { z } from 'zod';
import { EMAIL_REGEX, PASSWORD_REGEX, PASSWORD_REQUIREMENTS } from '../constants/validation';

export const forgotPasswordSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().regex(PASSWORD_REGEX, PASSWORD_REQUIREMENTS),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export const otpVerificationSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Please enter a valid email address'),
  otp: z.string().length(6, 'OTP must be 6 characters'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});