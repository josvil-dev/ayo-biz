import React from 'react';
import Image from 'next/image';
import { Contact } from '../../lib/dummyData';

interface ContactListProps {
  contacts: Contact[];
  activeContact: number;
  setActiveContact: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, activeContact, setActiveContact }) => {
  return (
    <div className="w-64 border-r overflow-y-auto">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
            activeContact === contact.id ? 'bg-gray-200' : ''
          }`}
          onClick={() => setActiveContact(contact.id)}
        >
         
          <span className="font-medium">{contact.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ContactList;