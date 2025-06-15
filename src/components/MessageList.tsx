import React from 'react';
import MessageBubble from './MessageBubble';
import LoadingMessage from './LoadingMessage';
import { Message } from '../types/Message';

interface MessageListProps {
  messages: Message[];
  activeTab: 'prompt' | 'code';
  isLoading: boolean;
  onRegenerate: (messageId: number) => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  activeTab, 
  isLoading, 
  onRegenerate 
}) => {
  const filteredMessages = activeTab === 'prompt' 
    ? messages 
    : messages.filter(msg => msg.type === 'assistant' && msg.content.includes('```'));

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {filteredMessages.length === 0 && activeTab === 'code' ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-dark-card rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No Code Generated Yet</h3>
          <p className="text-gray-500">Ask me to write some code and it will appear here!</p>
        </div>
      ) : (
        filteredMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onRegenerate={onRegenerate}
          />
        ))
      )}
      
      {isLoading && <LoadingMessage />}
    </div>
  );
};

export default MessageList;
