import React from 'react';
import { Settings, MessageSquare, Code2, Menu, X } from 'lucide-react';
import { Message } from '../types/Message';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: Message[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, messages }) => {
  const chatHistory = messages
    .filter(msg => msg.type === 'user')
    .slice(-10)
    .reverse();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-80 bg-dark-surface border-r border-dark-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${!isOpen ? 'lg:w-0 lg:overflow-hidden' : ''}
        flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-neon-blue rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-semibold">CodeAI</span>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 hover:bg-dark-card rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <button className="w-full bg-neon-blue text-black py-2 px-4 rounded-lg font-medium hover:bg-neon-blue-dark transition-colors">
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">
              Recent Chats
            </h3>
            <div className="space-y-2">
              {chatHistory.map((message) => (
                <div
                  key={message.id}
                  className="p-3 rounded-lg bg-dark-card hover:bg-dark-border cursor-pointer transition-colors group"
                >
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 line-clamp-2 group-hover:text-white transition-colors">
                        {message.content.length > 50 
                          ? message.content.substring(0, 50) + '...'
                          : message.content
                        }
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {chatHistory.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500">No chat history yet</p>
                  <p className="text-sm text-gray-600 mt-1">Start a conversation to see your history</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-dark-border">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-dark-card cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">User</p>
              <p className="text-xs text-gray-400">Free Plan</p>
            </div>
            <Settings className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
