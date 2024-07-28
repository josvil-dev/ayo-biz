'use client';

import React, { useState } from 'react';
import { Contact, Message } from '../../lib/dummyData';
// import ContactList from './ContactList';

interface ChatInterfaceProps {
  contacts: Contact[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ contacts }) => {
  const [activeContact, setActiveContact] = useState(contacts[0].id);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>(
    contacts.reduce((acc, contact) => ({ ...acc, [contact.id]: contact.messages }), {})
  );
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: messages[activeContact].length + 1,
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => ({
      ...prev,
      [activeContact]: [...prev[activeContact], message]
    }));
    setNewMessage('');
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const activeMessages = messages[activeContact] || [];

  return (
    <div className="flex bg-gradient-to-t from-blue-200 to-blue-300 h-[calc(100vh-4rem)]">
     
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 text-gray-400">
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;