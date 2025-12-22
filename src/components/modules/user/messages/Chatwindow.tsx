"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Conversation, Message } from "@/types/messages.interface";

interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (text: string) => void;
  onBack: () => void; // For Mobile Navigation
  className?: string;
}

export default function ChatWindow({
  conversation,
  messages,
  currentUserId,
  onSendMessage,
  onBack,
  className,
}: ChatWindowProps) {
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
  };

  return (
    <div className={cn("flex flex-col h-full bg-[#F4F6F8]", className)}>
      {/* 1. Chat Header */}
      <div className="h-16 px-4 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="flex items-center gap-3">
          {/* Back Button (Mobile Only) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <Avatar className="h-10 w-10">
            <AvatarImage src={conversation.participant.image} />
            <AvatarFallback>{conversation.participant.name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-bold text-slate-900 leading-none">
              {conversation.participant.name}
            </h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              {conversation.participant.isOnline
                ? "Online"
                : `Last seen ${conversation.participant.lastSeen}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 hidden sm:flex"
          >
            <Phone className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 hidden sm:flex"
          >
            <Video className="w-5 h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-500">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 2. Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((msg) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full",
                  isMe ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm relative group",
                    isMe
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                  )}
                >
                  <p className="leading-relaxed">{msg.content}</p>
                  <span
                    className={cn(
                      "text-[10px] block text-right mt-1 opacity-70",
                      isMe ? "text-emerald-100" : "text-slate-400"
                    )}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* 3. Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={handleSend}
          className="max-w-3xl mx-auto flex items-end gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-slate-600 shrink-0"
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-2 py-3 h-auto max-h-32 min-h-[44px]"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-slate-600 shrink-0"
          >
            <Smile className="w-5 h-5" />
          </Button>

          <Button
            type="submit"
            size="icon"
            disabled={!inputText.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
