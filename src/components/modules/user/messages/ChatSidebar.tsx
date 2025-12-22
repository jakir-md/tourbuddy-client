"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Conversation } from "@/types/messages.interface";

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}

export default function ChatSidebar({
  conversations,
  selectedId,
  onSelect,
  className,
}: ChatSidebarProps) {
  const [search, setSearch] = useState("");

  // Filter logic
  const filtered = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-slate-200",
        className
      )}
    >
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-100 space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search chats..."
            className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {filtered.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={cn(
                "flex items-center gap-4 p-4 text-left transition-colors hover:bg-slate-50 border-b border-slate-50",
                selectedId === chat.id &&
                  "bg-emerald-50/50 hover:bg-emerald-50 border-l-4 border-l-emerald-500"
              )}
            >
              {/* Avatar with Online Indicator */}
              <div className="relative">
                <Avatar className="h-12 w-12 border border-slate-100">
                  <AvatarImage src={chat.participant.image} />
                  <AvatarFallback>{chat.participant.name[0]}</AvatarFallback>
                </Avatar>
                {chat.participant.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span
                    className={cn(
                      "font-semibold truncate",
                      selectedId === chat.id
                        ? "text-emerald-900"
                        : "text-slate-900"
                    )}
                  >
                    {chat.participant.name}
                  </span>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                    {chat.lastMessageTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p
                    className={cn(
                      "text-sm truncate pr-2",
                      chat.unreadCount > 0
                        ? "font-medium text-slate-900"
                        : "text-slate-500"
                    )}
                  >
                    {chat.lastMessage || "Started a conversation"}
                  </p>
                  {chat.unreadCount > 0 && (
                    <Badge className="bg-emerald-600 h-5 min-w-[1.25rem] px-1">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
