'use client'

import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { ref, onValue, off } from "firebase/database";

export default function Home() {
  const [message, setMessage] = useState('')
  const [msisdn, setMsisdn] = useState('')
  const [status, setStatus] = useState('')
  const [fetchedMessages, setFetchedMessages] = useState<any[]>([])
  const [sentMessages, setSentMessages] = useState<any[]>([])

  useEffect(() => {
    const fetchedMessagesRef = ref(db, 'fetchedMessages');
    const sentMessagesRef = ref(db, 'messages');

    onValue(fetchedMessagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFetchedMessages(Object.values(data));
      }
    });

    onValue(sentMessagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSentMessages(Object.values(data));
      }
    });

    return () => {
      off(fetchedMessagesRef);
      off(sentMessagesRef);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Sending...')

    const response = await fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msisdns: [msisdn],
        message: message
      }),
    })

    const data = await response.json()
    setStatus(data.success ? 'Message sent successfully!' : 'Failed to send message.')
  }

  const handleFetchMessages = async () => {
    setStatus('Fetching messages...')

    const response = await fetch('/api/get-messages')
    const data = await response.json()

    if (data.messages && Array.isArray(data.messages)) {
      setStatus('Messages fetched successfully!')
    } else {
      setStatus('Failed to fetch messages or no messages available.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ayoba Message App</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="message" className="block mb-2">Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="msisdn" className="block mb-2">MSISDN:</label>
          <input
            type="text"
            id="msisdn"
            value={msisdn}
            onChange={(e) => setMsisdn(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="+27767675243"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send Message
        </button>
      </form>

      <button 
        onClick={handleFetchMessages} 
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Fetch Messages
      </button>

      {status && <p className="mt-4 mb-4">{status}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Sent Messages:</h2>
          <ul className="list-disc pl-5">
            {sentMessages.map((msg, index) => (
              <li key={index}>
                To: {msg.request.msisdns.join(', ')}<br />
                Message: {msg.request.message}<br />
                Response: {JSON.stringify(msg.response)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Fetched Messages:</h2>
          <ul className="list-disc pl-5">
            {fetchedMessages.map((msg, index) => (
              <li key={index}>
                {msg.response.map((item: any, i: number) => (
                  <div key={i}>
                    From: {item.fromJid}<br />
                    To: {item.msisdn}<br />
                    Message: {item.message.text}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}