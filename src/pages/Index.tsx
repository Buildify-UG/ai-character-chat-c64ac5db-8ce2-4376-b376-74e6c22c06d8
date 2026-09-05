import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send, Plus, MessageCircle, Settings, LogOut } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  description: string;
  personality: string;
  avatar: string;
  systemPrompt: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SAMPLE_CHARACTERS: Character[] = [
  {
    id: '1',
    name: 'Luna',
    description: 'A mysterious mage from the twilight realm',
    personality: 'Enigmatic, witty, and deeply curious about human nature',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    systemPrompt: 'You are Luna, a mysterious mage. You speak with poetic eloquence, blend humor with wisdom, and maintain an air of mystery. Respond naturally and immersively to the user.',
  },
  {
    id: '2',
    name: 'Kai',
    description: 'A wandering adventurer with a sharp wit',
    personality: 'Adventurous, sarcastic, protective, and secretly romantic',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    systemPrompt: 'You are Kai, a seasoned adventurer. You are witty, protective, and have a hidden romantic side. Engage in immersive roleplay naturally.',
  },
  {
    id: '3',
    name: 'Zara',
    description: 'A brilliant scientist exploring alternate dimensions',
    personality: 'Intelligent, passionate, eccentric, and surprisingly vulnerable',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    systemPrompt: 'You are Zara, a brilliant dimensional scientist. You are passionate about discovery, eccentric in your methods, and surprisingly human. Engage authentically.',
  },
];

const Index = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(SAMPLE_CHARACTERS[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm ${SAMPLE_CHARACTERS[0].name}. ${SAMPLE_CHARACTERS[0].description}. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedCharacter) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `*${selectedCharacter.name} responds thoughtfully* That's an interesting point. Let me share my perspective on that...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCharacterChange = (character: Character) => {
    setSelectedCharacter(character);
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Hello! I'm ${character.name}. ${character.description}. How can I help you today?`,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar - Character Selection */}
      <div className="w-72 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Soulkyn
          </h1>
          <p className="text-xs text-muted-foreground mt-1">AI Character Chat</p>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <Button className="w-full gap-2" variant="outline">
              <Plus className="w-4 h-4" />
              New Chat
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-2 p-4">
              {SAMPLE_CHARACTERS.map((character) => (
                <button
                  key={character.id}
                  onClick={() => handleCharacterChange(character)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedCharacter?.id === character.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted hover:bg-accent text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={character.avatar} />
                      <AvatarFallback>{character.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{character.name}</p>
                      <p className="text-xs opacity-75 truncate">{character.personality}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="p-4 border-t border-border space-y-2">
          <Button variant="outline" className="w-full gap-2 justify-start">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Button variant="outline" className="w-full gap-2 justify-start text-destructive">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Character Header */}
        {selectedCharacter && (
          <div className="bg-card border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedCharacter.avatar} />
                <AvatarFallback>{selectedCharacter.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{selectedCharacter.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedCharacter.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-3 max-w-2xl ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {message.role === 'assistant' && selectedCharacter && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={selectedCharacter.avatar} />
                      <AvatarFallback>{selectedCharacter.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={selectedCharacter?.avatar} />
                    <AvatarFallback>{selectedCharacter?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted px-4 py-2 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-card border-t border-border p-4">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Free AI roleplay powered by open-source models
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
