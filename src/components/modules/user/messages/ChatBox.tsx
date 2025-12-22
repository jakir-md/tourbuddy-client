'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Send, MoreVertical, Loader2 } from 'lucide-react'
import { useSocket } from '@/hooks/useSocket'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Mock User (Replace with Auth Context)
const currentUser = { id: 'user-1', name: 'Me' }

interface Message {
  id: string
  content: string
  senderId: string
  createdAt: Date | string
}

export default function ChatBox({ conversationId }: { conversationId: string }) {
  const { socket, isConnected } = useSocket()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // 1. Join Room & Listen
  useEffect(() => {
    if (!socket || !isConnected) return

    socket.emit('join_room', conversationId)

    socket.on('receive_message', (msg: Message) => {
      setMessages((prev) => [...prev, msg])
      // Scroll to bottom on new message
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    })

    socket.on('user_typing', (data) => {
      if (data.userId !== currentUser.id) {
        setIsTyping(data.isTyping)
      }
    })

    return () => {
      socket.off('receive_message')
      socket.off('user_typing')
    }
  }, [socket, isConnected, conversationId])

  // 2. Send Message Handler
  const handleSend = () => {
    if (!newMessage.trim()) return

    const msgData = {
      roomId: conversationId,
      senderId: currentUser.id,
      content: newMessage,
    }

    // Emit to server
    socket.emit('send_message', msgData)

    // Optimistic Update (Show my message immediately)
    setMessages((prev) => [
      ...prev, 
      { ...msgData, id: Date.now().toString(), createdAt: new Date() }
    ])
    
    setNewMessage('')
  }

  // 3. Typing Indicator Logic
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
    socket.emit('typing', { roomId: conversationId, userId: currentUser.id, isTyping: true })
    
    // Stop typing after 2 seconds of inactivity
    const timeout = setTimeout(() => {
      socket.emit('typing', { roomId: conversationId, userId: currentUser.id, isTyping: false })
    }, 2000)
    return () => clearTimeout(timeout)
  }

  return (
    <div className="flex flex-col h-[500px] border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-slate-200">
            <AvatarImage src="/avatar-placeholder.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-slate-900">Travel Group Chat</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className="text-slate-500">{isConnected ? 'Online' : 'Reconnecting...'}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
      </div>

      {/* Message List */}
      <ScrollArea className="flex-1 p-4 bg-slate-50/30">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  isMe 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  <p>{msg.content}</p>
                  <span className={`text-[10px] opacity-70 block mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            )
          })}
          
          {/* Typing Bubble */}
          {isTyping && (
             <div className="flex justify-start animate-pulse">
                <div className="bg-slate-200 rounded-full px-3 py-2 text-xs text-slate-500">
                   Someone is typing...
                </div>
             </div>
          )}
          
          {/* Invisible div to scroll to */}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
        <Input 
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="bg-slate-50 border-slate-200 focus-visible:ring-primary"
        />
        <Button onClick={handleSend} size="icon" className="bg-primary hover:bg-primary/90 shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}