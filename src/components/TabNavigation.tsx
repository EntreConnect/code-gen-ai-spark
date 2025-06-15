import React from 'react';
import { MessageSquare, Code2 } from 'lucide-react';
interface TabNavigationProps {
  activeTab: 'prompt' | 'code';
  onTabChange: (tab: 'prompt' | 'code') => void;
}
const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return <div className="bg-dark-surface border-b border-dark-border">
      <div className="flex">
        <button onClick={() => onTabChange('prompt')} className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors ${activeTab === 'prompt' ? 'border-neon-blue text-neon-blue bg-dark-card' : 'border-transparent text-gray-400 hover:text-white hover:bg-dark-card'}`}>
          <MessageSquare className="w-4 h-4" />
          <span className="font-medium">User Prompt</span>
        </button>
        
        
      </div>
    </div>;
};
export default TabNavigation;