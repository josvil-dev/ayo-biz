import React from 'react';
import ChatInterface from '../../components/ChatInterface';
import { dummyContacts } from '../../../lib/dummyData';

const ChatPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-start">Chats</h1>
      <ChatInterface contacts={dummyContacts} />
    </div>
  );
};

export default ChatPage;