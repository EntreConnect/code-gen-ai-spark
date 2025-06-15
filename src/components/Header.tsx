
import React from 'react';
import { Menu, Settings, Code2 } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-dark-surface border-b border-dark-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-dark-card rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 lg:hidden">
            <div className="w-6 h-6 bg-neon-blue rounded flex items-center justify-center">
              <Code2 className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-semibold">CodeAI</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-dark-card rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
