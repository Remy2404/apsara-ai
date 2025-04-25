import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for messages and conversations
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  attachments?: Array<{
    id: string;
    type: 'image' | 'file' | 'audio';
    url: string;
    name?: string;
    size?: number;
  }>;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessagePreview: string;
  lastMessageTime: Date;
  unreadCount: number;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  setCurrentConversation: (conversationId: string | null) => void;
  sendMessage: (text: string, attachments?: any[]) => void;
  startNewConversation: () => void;
  deleteConversation: (id: string) => void;
  searchMessages: (query: string) => Message[];
  isLoading: boolean;
}

// Create the context with default value
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Sample data for conversations
const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    title: 'Travel Planning',
    messages: [
      {
        id: '101',
        text: 'I need help planning a trip to Japan',
        sender: 'user',
        timestamp: new Date(2023, 4, 10, 14, 23),
        status: 'read',
      },
      {
        id: '102',
        text: 'I can help with that! Japan is a fascinating destination. When are you planning to visit and how long will your trip be?',
        sender: 'ai',
        timestamp: new Date(2023, 4, 10, 14, 24),
        status: 'read',
      }
    ],
    lastMessagePreview: 'I can help with that! Japan is a fascinating destination...',
    lastMessageTime: new Date(2023, 4, 10, 14, 24),
    unreadCount: 0,
  },
  {
    id: '2',
    title: 'Coding Help',
    messages: [
      {
        id: '201',
        text: 'How do I implement a binary search tree in TypeScript?',
        sender: 'user',
        timestamp: new Date(2023, 4, 9, 10, 15),
        status: 'read',
      },
      {
        id: '202',
        text: 'Here\'s how you can implement a binary search tree in TypeScript...',
        sender: 'ai',
        timestamp: new Date(2023, 4, 9, 10, 16),
        status: 'read',
      }
    ],
    lastMessagePreview: 'Here\'s how you can implement a binary search tree in TypeScript...',
    lastMessageTime: new Date(2023, 4, 9, 10, 16),
    unreadCount: 0,
  },
  {
    id: '3',
    title: 'Recipe Ideas',
    messages: [
      {
        id: '301',
        text: 'Can you suggest some vegetarian dinner recipes?',
        sender: 'user',
        timestamp: new Date(2023, 4, 8, 18, 30),
        status: 'read',
      },
      {
        id: '302',
        text: 'Certainly! Here are some delicious vegetarian dinner ideas...',
        sender: 'ai',
        timestamp: new Date(2023, 4, 8, 18, 31),
        status: 'read',
      }
    ],
    lastMessagePreview: 'Certainly! Here are some delicious vegetarian dinner ideas...',
    lastMessageTime: new Date(2023, 4, 8, 18, 31),
    unreadCount: 0,
  }
];

// Provider component
export function ChatContextProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(SAMPLE_CONVERSATIONS);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get current conversation object
  const currentConversation = currentConversationId 
    ? conversations.find(c => c.id === currentConversationId) || null
    : null;

  // Set current conversation by ID
  const setCurrentConversation = (conversationId: string | null) => {
    setCurrentConversationId(conversationId);
    
    // Mark messages as read if there are unread messages
    if (conversationId) {
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation && conversation.unreadCount > 0) {
        setConversations(prev => 
          prev.map(c => 
            c.id === conversationId ? { ...c, unreadCount: 0 } : c
          )
        );
      }
    }
  };

  // Send a message in the current conversation
  const sendMessage = (text: string, attachments: any[] = []) => {
    if (!currentConversationId || !text.trim()) return;

    setIsLoading(true);

    // Create new user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
      attachments: attachments.map((a, i) => ({
        id: `${Date.now()}-${i}`,
        type: a.type || 'file',
        url: a.url,
        name: a.name,
        size: a.size
      }))
    };

    // Update conversations with new message
    setConversations(prev => 
      prev.map(c => {
        if (c.id === currentConversationId) {
          return {
            ...c,
            messages: [...c.messages, newUserMessage],
            lastMessagePreview: text,
            lastMessageTime: new Date(),
          };
        }
        return c;
      })
    );

    // Simulate AI response after a delay
    setTimeout(() => {
      // Create AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `This is a simulated response to "${text.substring(0, 20)}${text.length > 20 ? '...' : ''}"`,
        sender: 'ai',
        timestamp: new Date(),
        status: 'delivered'
      };

      // Update conversations with AI response
      setConversations(prev => 
        prev.map(c => {
          if (c.id === currentConversationId) {
            return {
              ...c,
              messages: [...c.messages, aiResponse],
              lastMessagePreview: aiResponse.text.substring(0, 50) + (aiResponse.text.length > 50 ? '...' : ''),
              lastMessageTime: new Date(),
            };
          }
          return c;
        })
      );
      setIsLoading(false);
    }, 1500);
  };

  // Start a new conversation
  const startNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation: Conversation = {
      id: newId,
      title: 'New Conversation',
      messages: [],
      lastMessagePreview: 'No messages yet',
      lastMessageTime: new Date(),
      unreadCount: 0
    };

    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newId);
  };

  // Delete a conversation
  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
  };

  // Search messages across all conversations
  const searchMessages = (query: string) => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const results: Message[] = [];

    conversations.forEach(conversation => {
      conversation.messages.forEach(message => {
        if (message.text.toLowerCase().includes(lowerQuery)) {
          results.push(message);
        }
      });
    });

    return results;
  };

  const contextValue: ChatContextType = {
    conversations,
    currentConversation,
    setCurrentConversation,
    sendMessage,
    startNewConversation,
    deleteConversation,
    searchMessages,
    isLoading
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

// Custom hook to use chat context
export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatContextProvider');
  }
  return context;
}