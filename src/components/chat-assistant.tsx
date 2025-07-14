'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageSquare, Bot, User, Loader2 } from 'lucide-react';
import type { ChatMessage } from '@/lib/types';
import { getAiChatResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ChatAssistantProps {
  portfolioDescription: string;
  projectDescriptions: string;
}

export default function ChatAssistant({ portfolioDescription, projectDescriptions }: ChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const response = await getAiChatResponse(input, portfolioDescription, projectDescriptions);
      if (response.startsWith("Sorry")) {
         toast({
          variant: "destructive",
          title: "Achuzi is taking a break",
          description: response,
        })
      }
      const assistantMessage: ChatMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg shadow-primary/30"
          aria-label="Open chat assistant"
        >
          <Bot className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg border-primary/50">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl text-glow">chat_with_achuzi.sh</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="space-y-6 p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 border border-accent">
                <AvatarFallback>AI</AvatarFallback>
                <Bot className="p-1 text-accent"/>
              </Avatar>
              <div className="rounded-none border border-secondary bg-secondary p-3 text-sm">
                <p>awe!!, It’s your digital laaitie, Achuzi, if you have questions about my portfolio or projects? ask, don’t be shy, neh🤗?</p>
              </div>
            </div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {message.role === 'assistant' && (
                   <Avatar className="h-8 w-8 border border-accent">
                    <AvatarFallback>AI</AvatarFallback>
                    <Bot className="p-1 text-accent"/>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-none border p-3 text-sm',
                    message.role === 'user' ? 'border-primary bg-primary text-primary-foreground' : 'border-secondary bg-secondary'
                  )}
                >
                  <p>{message.content}</p>
                </div>
                {message.role === 'user' && (
                   <Avatar className="h-8 w-8 border border-primary">
                    <AvatarFallback>U</AvatarFallback>
                    <User className="p-1 text-primary"/>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
              <div className="flex items-start gap-3">
                 <Avatar className="h-8 w-8 border border-accent">
                    <AvatarFallback>AI</AvatarFallback>
                    <Bot className="p-1 text-accent"/>
                  </Avatar>
                <div className="rounded-none border border-secondary bg-secondary p-3 text-sm">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <SheetFooter className="p-4">
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="user@host:~$ ask about a project..."
              className="flex-1 resize-none rounded-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                }
              }}
            />
            <Button type="submit" size="icon" disabled={isPending} className="rounded-none">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
