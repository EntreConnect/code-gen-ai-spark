import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
interface UserInputProps {
  onSendMessage: (content: string) => void;
  disabled: boolean;
}
const UserInput: React.FC<UserInputProps> = ({
  onSendMessage,
  disabled
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);
  return <div className="border-t border-dark-border bg-dark-surface p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end space-x-4 bg-dark-card rounded-2xl p-4 border border-dark-border">
            <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-dark-surface">
              
            </button>
            
            <div className="flex-1">
              <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything about coding, debugging, or code generation..." className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none" rows={1} disabled={disabled} />
            </div>
            
            <button type="submit" disabled={!input.trim() || disabled} className={`p-2 rounded-lg transition-colors ${input.trim() && !disabled ? 'bg-neon-blue text-black hover:bg-neon-blue-dark' : 'bg-dark-border text-gray-500 cursor-not-allowed'}`}>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>;
};
export default UserInput;