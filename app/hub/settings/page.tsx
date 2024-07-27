'use client'

import { useState } from 'react'

export default function Settings() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('johndoe@example.com')
  const [notificationEmail, setNotificationEmail] = useState(true)
  const [notificationPush, setNotificationPush] = useState(true)
  const [privacyProfile, setPrivacyProfile] = useState('public')
  const [privacyLastSeen, setPrivacyLastSeen] = useState('contacts')
  const [theme, setTheme] = useState('light')
  const [fontSize, setFontSize] = useState('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated settings to your backend
    console.log('Settings updated:', {
      name,
      email,
      notificationEmail,
      notificationPush,
      privacyProfile,
      privacyLastSeen,
      theme,
      fontSize
    })
    alert('Settings updated successfully!')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
          <div className="space-y-2">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.checked)}
                  className="mr-2"
                />
                Receive email notifications
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationPush}
                  onChange={(e) => setNotificationPush(e.target.checked)}
                  className="mr-2"
                />
                Receive push notifications
              </label>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="privacyProfile" className="block mb-1">Profile Visibility</label>
              <select
                id="privacyProfile"
                value={privacyProfile}
                onChange={(e) => setPrivacyProfile(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="public">Public</option>
                <option value="contacts">Contacts Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div>
              <label htmlFor="privacyLastSeen" className="block mb-1">Last Seen</label>
              <select
                id="privacyLastSeen"
                value={privacyLastSeen}
                onChange={(e) => setPrivacyLastSeen(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="everyone">Everyone</option>
                <option value="contacts">Contacts Only</option>
                <option value="nobody">Nobody</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">App Appearance</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="theme" className="block mb-1">Theme</label>
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            <div>
              <label htmlFor="fontSize" className="block mb-1">Font Size</label>
              <select
                id="fontSize"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </section>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Save Settings
        </button>
      </form>
    </div>
  )
}