import { z } from 'zod';
import {
  CHAT_MESSAGE_MAX_LENGTH,
  CONVERSATION_TITLE_MAX_LENGTH
} from '../constants/validation';

export const sendMessageSchema = z.object({
  conversationId: z.string().min(1, 'Conversation ID is required'),
  content: z.string()
    .min(1, 'Message content is required')
    .max(CHAT_MESSAGE_MAX_LENGTH, `Message cannot exceed ${CHAT_MESSAGE_MAX_LENGTH} characters`),
  attachments: z.array(z.object({
    type: z.enum(['image', 'document', 'audio', 'video']),
    url: z.string().min(1, 'URL is required'),
    name: z.string().min(1, 'File name is required'),
    size: z.number().min(1, 'File size is required'),
    mimeType: z.string().min(1, 'MIME type is required'),
    metadata: z.record(z.any()).optional(),
  })).optional(),
});

export const createConversationSchema = z.object({
  title: z.string()
    .min(1, 'Conversation title is required')
    .max(CONVERSATION_TITLE_MAX_LENGTH, `Title cannot exceed ${CONVERSATION_TITLE_MAX_LENGTH} characters`),
  participants: z.array(z.string()).optional(),
  initialMessage: z.string().optional(),
});

export const updateConversationSchema = z.object({
  title: z.string()
    .max(CONVERSATION_TITLE_MAX_LENGTH, `Title cannot exceed ${CONVERSATION_TITLE_MAX_LENGTH} characters`)
    .optional(),
  isArchived: z.boolean().optional(),
});