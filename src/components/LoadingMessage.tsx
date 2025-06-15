
import React from 'react';
import { Bot } from 'lucide-react';

const LoadingMessage: React.FC = () => {
  return (
    <div className="flex space-x-4 animate-fade-in">
      <div className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="w-5 h-5 text-black" />
      </div>
      
      <div className="flex-1">
        <div className="bg-dark-card rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm text-gray-400">AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;
