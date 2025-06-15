
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatInterface from '../components/ChatInterface';
import TabNavigation from '../components/TabNavigation';
import { Message } from '../types/Message';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'code'>('prompt');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant' as const,
      content: 'Hello! I\'m your AI coding assistant. How can I help you with your code today?',
      timestamp: new Date()
    }
  ]);

  const addMessage = (content: string, type: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        messages={messages}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Tab Navigation */}
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        {/* Chat Interface */}
        <ChatInterface 
          activeTab={activeTab}
          messages={messages}
          onAddMessage={addMessage}
        />
      </div>
    </div>
  );
};

export default Index;
