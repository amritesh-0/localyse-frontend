import { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import Button from './Button';

const Chat = ({ onClose }: { onClose: () => void }) => {
  const [messages] = useState([
    { id: 1, sender: 'support', text: 'Hello! How can we assist you today?' },
    { id: 2, sender: 'user', text: 'I have a question about my campaign.' },
    { id: 3, sender: 'support', text: 'Currently working on it. Please check back soon!' },
  ]);

  return (
    <div className="fixed bottom-4 right-4 w-80 max-w-full bg-white rounded-lg shadow-lg border border-slate-200 flex flex-col">
      <div className="flex items-center justify-between bg-gradient-to-r from-primary-500 to-primary-700 text-white px-4 py-2 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageSquare size={20} />
          <h2 className="text-lg font-semibold">Live Chat</h2>
        </div>
        <button onClick={onClose} aria-label="Close chat" className="hover:text-primary-300">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-3 py-2 max-w-xs break-words ${
                msg.sender === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-900'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-200">
        <Button disabled fullWidth>
          Chat functionality coming soon...
        </Button>
      </div>
    </div>
  );
};

export default Chat;
