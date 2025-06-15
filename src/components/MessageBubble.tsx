
import React, { useState } from 'react';
import { Copy, RefreshCw, User, Bot, Check } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  onRegenerate: (messageId: number) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onRegenerate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    const parts = message.content.split(/(```[\s\S]*?```)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n?([\s\S]*?)```/);
        if (match) {
          const language = match[1] || 'text';
          const code = match[2];
          return (
            <CodeBlock
              key={index}
              language={language}
              code={code}
              onCopy={handleCopy}
            />
          );
        }
      }
      return part ? (
        <p key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </p>
      ) : null;
    });
  };

  return (
    <div className={`flex space-x-4 animate-fade-in ${
      message.type === 'user' ? 'justify-end' : 'justify-start'
    }`}>
      {message.type === 'assistant' && (
        <div className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-black" />
        </div>
      )}
      
      <div className={`max-w-3xl ${
        message.type === 'user' 
          ? 'bg-neon-blue text-black rounded-2xl px-4 py-3' 
          : 'space-y-3'
      }`}>
        {message.type === 'user' ? (
          <p className="font-medium">{message.content}</p>
        ) : (
          <div className="space-y-3">
            {renderContent()}
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => handleCopy(message.content)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-400 hover:text-white hover:bg-dark-card rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              
              <button
                onClick={() => onRegenerate(message.id)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-400 hover:text-white hover:bg-dark-card rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {message.type === 'user' && (
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
