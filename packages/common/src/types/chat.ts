export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system'
}

export enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed'
}

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  status: MessageStatus;
  isDeleted: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  messageId: string;
  type: 'image' | 'document' | 'audio' | 'video';
  url: string;
  name: string;
  size: number;
  mimeType: string;
  metadata?: Record<string, any>;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: Message;
  participants: string[];
  isArchived: boolean;
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  attachments?: Omit<Attachment, 'id' | 'messageId'>[];
}

export interface CreateConversationRequest {
  title: string;
  participants?: string[];
  initialMessage?: string;
}

export interface UpdateConversationRequest {
  title?: string;
  isArchived?: boolean;
}