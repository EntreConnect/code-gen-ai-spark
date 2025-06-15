import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import { Message } from '../types/Message';

interface ChatInterfaceProps {
  activeTab: 'prompt' | 'code';
  messages: Message[];
  onAddMessage: (content: string, type: 'user' | 'assistant') => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  activeTab, 
  messages, 
  onAddMessage 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    onAddMessage(content, 'user');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Here's a Python function that should solve your problem:\n\n```python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\n# Example usage\nprint(fibonacci(10))\n```\n\nThis recursive approach calculates the nth Fibonacci number.",
        "I can help you debug that issue. Here's what might be causing the problem:\n\n```javascript\n// Issue: Missing return statement\nfunction calculateTotal(items) {\n    let total = 0;\n    items.forEach(item => {\n        total += item.price;\n    });\n    return total; // This was missing!\n}\n```\n\nMake sure to return the calculated value.",
        "Great question! Here's how you can implement that feature:\n\n```css\n.button {\n    background: linear-gradient(45deg, #00d4ff, #0099cc);\n    border: none;\n    color: white;\n    padding: 12px 24px;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: transform 0.2s ease;\n}\n\n.button:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);\n}\n```"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      onAddMessage(randomResponse, 'assistant');
      setIsLoading(false);
    }, 1500);
  };

  const handleRegenerate = (messageId: number) => {
    setIsLoading(true);
    setTimeout(() => {
      onAddMessage("Here's an alternative approach to your question:\n\n```python\n# Alternative implementation\ndef optimized_solution(data):\n    \"\"\"A more efficient approach\"\"\"\n    return [item for item in data if item.is_valid]\n```\n\nThis version uses list comprehension for better performance.", 'assistant');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <MessageList 
          messages={messages}
          activeTab={activeTab}
          isLoading={isLoading}
          onRegenerate={handleRegenerate}
        />
        <div ref={messagesEndRef} />
      </div>
      
      {/* User Input */}
      <UserInput 
        onSendMessage={handleSendMessage}
        disabled={isLoading}
      />
    </div>
  );
};

export default ChatInterface;
