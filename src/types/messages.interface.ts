// client/types/chat.ts
export interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
  status: "sent" | "delivered" | "read";
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    image: string;
    isOnline: boolean;
    lastSeen?: string;
  };
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}
