'use client'

import { useState } from 'react'

type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
}

type Contact = {
  id: number
  name: string
  lastMessage: string
  unreadCount: number
}

export default function Chats() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "Alice Johnson", lastMessage: "See you tomorrow!", unreadCount: 0 },
    { id: 2, name: "Bob Smith", lastMessage: "How's the project going?", unreadCount: 2 },
    { id: 3, name: "Charlie Brown", lastMessage: "Thanks for your help!", unreadCount: 0 },
  ])

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  const selectContact = (contact: Contact) => {
    setSelectedContact(contact)
    // In a real app, you'd fetch messages for this contact here
    setMessages([
      { id: 1, sender: contact.name, content: "Hey there!", timestamp: "10:00 AM" },
      { id: 2, sender: "You", content: "Hi! How are you?", timestamp: "10:05 AM" },
      { id: 3, sender: contact.name, content: contact.lastMessage, timestamp: "10:10 AM" },
    ])
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && selectedContact) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-screen">
      {/* Contacts Sidebar */}
      <div className="w-1/4 border-r bg-blue-100 overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b-4">Contacts</h2>
        {contacts.map(contact => (
          <div
            key={contact.id}
            className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedContact?.id === contact.id ? 'bg-gray-200' : ''}`}
            onClick={() => selectContact(contact)}
          >
            <h3 className="font-semibold">{contact.name}</h3>
            <p className="text-sm text-gray-600">{contact.lastMessage}</p>
            {contact.unreadCount > 0 && (
              <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs float-right">
                {contact.unreadCount}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <div className="bg-gray-200 p-4">
              <h2 className="text-xl font-bold">{selectedContact.name}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map(message => (
                <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 bg-gray-200">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-2 rounded-l-lg"
                  placeholder="Type a message..."
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl text-gray-500">Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}