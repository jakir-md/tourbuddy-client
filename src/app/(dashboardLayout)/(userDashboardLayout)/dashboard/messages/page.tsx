"use client";

import React, { useState } from "react";
import { MessageSquareDashed } from "lucide-react";
import ChatSidebar from "@/components/modules/user/messages/ChatSidebar";
import ChatWindow from "@/components/modules/user/messages/Chatwindow";
import ChatBox from "@/components/modules/user/messages/ChatBox";

// Mock Data
const MOCK_USER_ID = "me";
const mockConversations = [
  {
    id: "c1",
    participant: {
      id: "u1",
      name: "Sarah Jenkins",
      image: "https://i.pravatar.cc/150?u=1",
      isOnline: true,
    },
    lastMessage: "Sounds great! See you then.",
    lastMessageTime: "10:42 AM",
    unreadCount: 2,
  },
  {
    id: "c2",
    participant: {
      id: "u2",
      name: "Mike Chen",
      image: "https://i.pravatar.cc/150?u=2",
      isOnline: false,
      lastSeen: "2h ago",
    },
    lastMessage: "Can you send me the itinerary?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
];
const mockMessages = [
  {
    id: "m1",
    senderId: "u1",
    content: "Hey! Are you still planning to go to Bali?",
    createdAt: new Date(Date.now() - 1000000),
    status: "read",
  },
  {
    id: "m2",
    senderId: "me",
    content: "Yes! I just booked my flight.",
    createdAt: new Date(Date.now() - 900000),
    status: "read",
  },
  {
    id: "m3",
    senderId: "u1",
    content: "That is awesome! Which airline?",
    createdAt: new Date(Date.now() - 800000),
    status: "sent",
  },
] as any;

export default function MessagesPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // 1. Get Active Data
  const activeConversation = mockConversations.find(
    (c) => c.id === selectedChatId
  );

  // 2. Logic to Handle Mobile/Desktop Views
  // We use CSS classes to toggle visibility based on 'selectedChatId' presence + Media Queries

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-white md:mx-0">
      {/* SIDEBAR: 
         - Mobile: Hidden if chat is selected (w-full)
         - Desktop: Always visible (w-80 or w-1/3)
      */}
      <div
        className={`
        flex-col w-full md:w-80 lg:w-96 border-r border-slate-200
        ${selectedChatId ? "hidden md:flex" : "flex"}
      `}
      >
        <ChatSidebar
          conversations={mockConversations}
          selectedId={selectedChatId}
          onSelect={setSelectedChatId}
          className="h-full"
        />
      </div>

      {/* CHAT WINDOW: 
         - Mobile: Hidden if NO chat selected
         - Desktop: Always visible (flex-1)
      */}
      <div
        className={`
        flex-1 flex-col bg-slate-50
        ${!selectedChatId ? "hidden md:flex" : "flex"}
      `}
      >
        {selectedChatId && activeConversation ? (
          // <ChatWindow
          //   conversation={activeConversation}
          //   messages={mockMessages} // In real app, fetch messages by ID
          //   currentUserId={MOCK_USER_ID}
          //   onSendMessage={(text) => console.log("Sent:", text)}
          //   onBack={() => setSelectedChatId(null)} // Clear selection to show Sidebar on mobile
          //   className="h-full"
          // />
          <ChatBox conversationId="kri" />
        ) : (
          /* Empty State (Desktop Only) */
          <div className="hidden md:flex h-full flex-col items-center justify-center text-slate-400 p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquareDashed className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">
              Your Messages
            </h3>
            <p className="max-w-sm mt-2 text-sm">
              Select a conversation from the sidebar to start chatting with your
              travel buddies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
