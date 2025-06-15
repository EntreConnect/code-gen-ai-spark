
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  code: string;
  onCopy: (text: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSyntax = (code: string, language: string) => {
    // Simple syntax highlighting for demo purposes
    let highlighted = code;
    
    if (language === 'python') {
      highlighted = highlighted
        .replace(/\b(def|return|if|else|elif|for|while|class|import|from|as|try|except|finally|with|lambda|and|or|not|in|is|True|False|None)\b/g, '<span class="syntax-keyword">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="syntax-string">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="syntax-string">\'$1\'</span>')
        .replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>')
        .replace(/#.*/g, '<span class="syntax-comment">$&</span>');
    } else if (language === 'javascript') {
      highlighted = highlighted
        .replace(/\b(function|return|if|else|for|while|const|let|var|class|import|export|from|as|try|catch|finally|async|await|true|false|null|undefined)\b/g, '<span class="syntax-keyword">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="syntax-string">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="syntax-string">\'$1\'</span>')
        .replace(/`([^`]*)`/g, '<span class="syntax-string">`$1`</span>')
        .replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>')
        .replace(/\/\/.*/g, '<span class="syntax-comment">$&</span>');
    } else if (language === 'css') {
      highlighted = highlighted
        .replace(/([.#][\w-]+)/g, '<span class="syntax-function">$1</span>')
        .replace(/([\w-]+):/g, '<span class="syntax-keyword">$1</span>:')
        .replace(/"([^"]*)"/g, '<span class="syntax-string">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="syntax-string">\'$1\'</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="syntax-comment">$&</span>');
    }
    
    return highlighted;
  };

  return (
    <div className="code-block my-4">
      {/* Code Header */}
      <div className="code-header">
        <span className="text-sm text-gray-400 capitalize">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-400 hover:text-white rounded transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      {/* Code Content */}
      <div className="code-content">
        <pre className="text-sm leading-relaxed">
          <code
            dangerouslySetInnerHTML={{
              __html: highlightSyntax(code, language)
            }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
