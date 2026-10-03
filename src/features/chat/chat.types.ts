export type ChatSenderRole = "USER" | "ADMIN" | "CUSTOMER_SERVICE";

export interface ChatSender {
  id: string;
  name: string;
  role: ChatSenderRole;
}

export interface ChatMessage {
  id: string;
  body: string;
  readAt: string | null;
  createdAt: string;
  sender: ChatSender;
}

export interface ChatConversationSummary {
  id: string;
  user: ChatSender;
  lastMessageAt: string;
  lastMessage: ChatMessage | null;
  unreadCount: number;
}

export interface ChatThreadResponse {
  conversation: {
    id: string;
    user: ChatSender;
  };
  messages: ChatMessage[];
  nextCursor: string | null;
}

export interface ChatInboxResponse {
  conversations: ChatConversationSummary[];
  nextCursor: string | null;
}
