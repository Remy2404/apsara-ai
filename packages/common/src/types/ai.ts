export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'local';
  maxTokens: number;
  capabilities: AIModelCapability[];
  contextWindow: number;
}

export enum AIModelCapability {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  CODE = 'code',
  FUNCTION_CALLING = 'function_calling',
}

export interface AICompletionRequest {
  model: string;
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
  functions?: AIFunction[];
  functionCall?: 'auto' | 'none' | { name: string };
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  name?: string;
  functionCall?: AIFunctionCall;
}

export interface AIFunction {
  name: string;
  description: string;
  parameters: Record<string, any>;
  required?: string[];
}

export interface AIFunctionCall {
  name: string;
  arguments: string;
}

export interface AICompletionResponse {
  id: string;
  model: string;
  choices: {
    message: AIMessage;
    finishReason: 'stop' | 'length' | 'function_call';
  }[];
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface SavedPrompt {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}