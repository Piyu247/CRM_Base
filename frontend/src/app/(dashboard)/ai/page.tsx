"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your AI Workspace Assistant. I can help you analyze deals, create tasks, summarize leads, and automate workflows. How can I help you today?',
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I have received your request: "${userMessage.content}". I've gone ahead and created the necessary follow-up tasks and updated the deal timeline.`,
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Workspace AI</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Always here to help</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              message.role === 'user' 
                ? 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400' 
                : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
            }`}>
              {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={`rounded-2xl px-4 py-2 max-w-[80%] ${
              message.role === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
            }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI to analyze deals or create tasks..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
