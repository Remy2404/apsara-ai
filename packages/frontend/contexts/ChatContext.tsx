import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  status: 'sending' | 'sent' | 'error';
  attachments?: Array<{
    id: string;
    type: 'image' | 'file';
    url: string;
    name: string;
  }>;
}

interface Chat {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp: number;
  messages: Message[];
  isPinned?: boolean;
  unreadCount?: number;
}

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  isLoading: boolean;
  createChat: (title?: string) => Promise<Chat>;
  loadChat: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, text: string, attachments?: any[]) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
  clearChat: (chatId: string) => Promise<void>;
  pinChat: (chatId: string) => Promise<void>;
  unpinChat: (chatId: string) => Promise<void>;
}

const defaultChatContext: ChatContextType = {
  chats: [],
  currentChat: null,
  isLoading: false,
  createChat: async () => ({ 
    id: '', 
    title: '', 
    messages: [], 
    createdAt: 0, 
    updatedAt: 0 
  }),
  loadChat: async () => {},
  sendMessage: async () => {},
  deleteChat: async () => {},
  clearChat: async () => {},
  pinChat: async () => {},
  unpinChat: async () => {},
};

export const ChatContext = createContext<ChatContextType>(defaultChatContext);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, isSignedIn } = useContext(AuthContext);

  // Load chats from storage on mount or when user changes
  useEffect(() => {
    const loadChats = async () => {
      if (!isSignedIn || !user) {
        setChats([]);
        setCurrentChat(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const storedChats = await AsyncStorage.getItem(`chats_${user.id}`);
        if (storedChats) {
          const parsedChats = JSON.parse(storedChats) as Chat[];
          setChats(parsedChats);
        }
      } catch (error) {
        console.error('Failed to load chats from storage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();
  }, [isSignedIn, user]);

  // Save chats to storage whenever they change
  useEffect(() => {
    const saveChats = async () => {
      if (!isSignedIn || !user) return;

      try {
        await AsyncStorage.setItem(`chats_${user.id}`, JSON.stringify(chats));
      } catch (error) {
        console.error('Failed to save chats to storage', error);
      }
    };

    if (chats.length > 0) {
      saveChats();
    }
  }, [chats, isSignedIn, user]);

  // Create a new chat
  const createChat = async (title?: string): Promise<Chat> => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: title || 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setChats(prevChats => [newChat, ...prevChats]);
    return newChat;
  };

  // Load a specific chat
  const loadChat = async (chatId: string): Promise<void> => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };

  // Send a message in a chat
  const sendMessage = async (chatId: string, text: string, attachments: any[] = []): Promise<void> => {
    if (!text.trim() && !attachments.length) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: Date.now(),
      status: 'sending',
      attachments: attachments.map(att => ({
        id: att.id || Date.now().toString(),
        type: att.type || 'file',
        url: att.url || '',
        name: att.name || 'File',
      })),
    };

    // Add message to current chat
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          updatedAt: Date.now(),
        };
      }
      return chat;
    });

    setChats(updatedChats);
    
    // In a real app, this would call your API to send the message
    // For now, we'll simulate a response after a short delay
    setTimeout(() => {
      // Update message status to sent
      const updatedWithStatus = updatedChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
            ),
          };
        }
        return chat;
      });
      setChats(updatedWithStatus);

      // Add AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `This is an automated response to your message: "${text}"`,
        isUser: false,
        timestamp: Date.now() + 1000,
        status: 'sent',
      };

      setChats(prevChats => 
        prevChats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [...chat.messages, aiResponse],
              updatedAt: Date.now() + 1000,
            };
          }
          return chat;
        })
      );
      
      // Update current chat if this is the active one
      if (currentChat?.id === chatId) {
        const updatedCurrentChat = chats.find(c => c.id === chatId);
        if (updatedCurrentChat) {
          setCurrentChat(updatedCurrentChat);
        }
      }
    }, 1000);
  };

  // Delete a chat
  const deleteChat = async (chatId: string): Promise<void> => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(null);
    }
  };

  // Clear messages in a chat
  const clearChat = async (chatId: string): Promise<void> => {
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [],
            updatedAt: Date.now(),
          };
        }
        return chat;
      })
    );

    if (currentChat?.id === chatId) {
      setCurrentChat(prev => prev ? { ...prev, messages: [] } : null);
    }
  };

  // Pin a chat
  const pinChat = async (chatId: string): Promise<void> => {
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            isPinned: true,
          };
        }
        return chat;
      })
    );
  };

  // Unpin a chat
  const unpinChat = async (chatId: string): Promise<void> => {
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            isPinned: false,
          };
        }
        return chat;
      })
    );
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        isLoading,
        createChat,
        loadChat,
        sendMessage,
        deleteChat,
        clearChat,
        pinChat,
        unpinChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};