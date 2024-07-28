export interface Message {
    id: number;
    sender: 'user' | 'contact';
    content: string;
    timestamp: string;
  }
  
  export interface Contact {
    id: number;
    name: string;
    
    messages: Message[];
  }
  
  export const dummyContacts: Contact[] = [
    {
      id: 1,
      name: "Alice Johnson",
      
      messages: [
        {
          id: 1,
          sender: 'contact',
          content: 'Hey! How are you doing?',
          timestamp: '2024-07-28T10:00:00Z',
        },
        {
          id: 2,
          sender: 'user',
          content: 'Hi Alice! I am doing well, thanks. How about you?',
          timestamp: '2024-07-28T10:01:30Z',
        },
        // Add more messages...
      ]
    },
    {
      id: 2,
      name: "Bob Smith",
     
      messages: [
        {
          id: 1,
          sender: 'user',
          content: 'Hi Bob, did you get the project files I sent?',
          timestamp: '2024-07-27T14:30:00Z',
        },
        {
          id: 2,
          sender: 'contact',
          content: 'Yes, I got them. Thanks! Ill review them soon.',
          timestamp: '2024-07-27T14:35:00Z',
        },
        // Add more messages...
      ]
    },
    // Add more contacts...
  ];