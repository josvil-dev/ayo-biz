import { NextResponse } from 'next/server'
import { db } from '../../../firebase/config'
import { ref, push, set } from "firebase/database";

export async function GET() {
  const response = await fetch('https://api.ayoba.me/v1/business/message', {
    method: 'GET',
    headers: {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZjMjU5MDVlOTVhN2ZjNjk2ZGYyODAwMDg3NDU5ODQxZWRjNTRiNzgiLCJqaWQiOiJmYzI1OTA1ZTk1YTdmYzY5NmRmMjgwMDA4NzQ1OTg0MWVkYzU0Yjc4QGF5b2JhLm1lIiwiZ3JvdXAiOiJidXNpbmVzcyIsIm1zaXNkbiI6bnVsbCwiaWF0IjoxNzIyMDkzOTI0LCJleHAiOjE3MjIwOTU3MjR9.Q8h402_HjYOxzsac-B1KPmid_L3bG6ZyuWvebfnYilg' // Replace with your actual token
    },
  })

  const data = await response.json()

  // Store the response in Firebase
  const messageRef = ref(db, 'fetchedMessages');
  const newMessageRef = push(messageRef);
  await set(newMessageRef, {
    response: data,
    timestamp: Date.now()
  });

  return NextResponse.json(data)
}