import { NextResponse } from 'next/server'
import { db } from '../../../firebase/config'
import { ref, push, set } from "firebase/database";

export async function POST(request: Request) {
  const body = await request.json()

  const response = await fetch('https://api.ayoba.me/v1/business/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZjMjU5MDVlOTVhN2ZjNjk2ZGYyODAwMDg3NDU5ODQxZWRjNTRiNzgiLCJqaWQiOiJmYzI1OTA1ZTk1YTdmYzY5NmRmMjgwMDA4NzQ1OTg0MWVkYzU0Yjc4QGF5b2JhLm1lIiwiZ3JvdXAiOiJidXNpbmVzcyIsIm1zaXNkbiI6bnVsbCwiaWF0IjoxNzIyMDkzOTI0LCJleHAiOjE3MjIwOTU3MjR9.Q8h402_HjYOxzsac-B1KPmid_L3bG6ZyuWvebfnYilg' // Replace with your actual token
    },
    body: JSON.stringify({
      msisdns: body.msisdns,
      message: {
        text: body.message,
        type: 'text'
      }
    }),
  })

  const data = await response.json()

  // Store the request and response in Firebase
  const messageRef = ref(db, 'messages');
  const newMessageRef = push(messageRef);
  await set(newMessageRef, {
    request: body,
    response: data,
    timestamp: Date.now()
  });

  return NextResponse.json(data)
}