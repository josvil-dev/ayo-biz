'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

type ProfileData = {
  name: string
  email: string
  bio: string
  location: string
  phoneNumber: string
  profilePicture: string
}

type PrivacySettings = {
  profileVisibility: 'public' | 'contacts' | 'private'
  lastSeen: 'everyone' | 'contacts' | 'nobody'
  readReceipts: boolean
}

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
    bio: '',
    location: '',
    phoneNumber: '',
    profilePicture: '/default-avatar.png'
  })
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'public',
    lastSeen: 'everyone',
    readReceipts: true
  })
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    // Fetch profile data and privacy settings from your backend/Firestore
    // This is just a placeholder
    setProfile({
      name: 'John Doe',
      email: 'johndoe@example.com',
      bio: 'I love coding and building amazing apps!',
      location: 'New York, USA',
      phoneNumber: '+1234567890',
      profilePicture: '/default-avatar.png'
    })
    setPrivacySettings({
      profileVisibility: 'public',
      lastSeen: 'everyone',
      readReceipts: true
    })
  }, [])

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Send updated profile data to your backend/Firestore
    console.log('Updated profile:', profile)
    alert('Profile updated successfully!')
  }

  const handlePrivacyUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Send updated privacy settings to your backend/Firestore
    console.log('Updated privacy settings:', privacySettings)
    alert('Privacy settings updated successfully!')
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    // Send password change request to your backend
    console.log('Password change requested')
    alert('Password changed successfully!')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload this file to your server or a storage service
      // and get back a URL to the uploaded image
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePicture: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Account Management</h1>
      
      <div className="mb-6">
        <nav className="flex border-b">
          <button
            className={`mr-4 py-2 px-4 ${activeTab === 'profile' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`mr-4 py-2 px-4 ${activeTab === 'privacy' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy
          </button>
          <button
            className={`mr-4 py-2 px-4 ${activeTab === 'security' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </nav>
      </div>

      {activeTab === 'profile' && (
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src={profile.profilePicture}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1">Bio</label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="location" className="block mb-1">Location</label>
            <input
              type="text"
              id="location"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block mb-1">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={profile.phoneNumber}
              onChange={(e) => setProfile(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Update Profile
          </button>
        </form>
      )}

      {activeTab === 'privacy' && (
        <form onSubmit={handlePrivacyUpdate} className="space-y-4">
          <div>
            <label htmlFor="profileVisibility" className="block mb-1">Profile Visibility</label>
            <select
              id="profileVisibility"
              value={privacySettings.profileVisibility}
              onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value as 'public' | 'contacts' | 'private' }))}
              className="w-full p-2 border rounded"
            >
              <option value="public">Public</option>
              <option value="contacts">Contacts Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div>
            <label htmlFor="lastSeen" className="block mb-1">Last Seen</label>
            <select
              id="lastSeen"
              value={privacySettings.lastSeen}
              onChange={(e) => setPrivacySettings(prev => ({ ...prev, lastSeen: e.target.value as 'everyone' | 'contacts' | 'nobody' }))}
              className="w-full p-2 border rounded"
            >
              <option value="everyone">Everyone</option>
              <option value="contacts">Contacts Only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={privacySettings.readReceipts}
                onChange={(e) => setPrivacySettings(prev => ({ ...prev, readReceipts: e.target.checked }))}
                className="mr-2"
              />
              Send Read Receipts
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Update Privacy Settings
          </button>
        </form>
      )}

      {activeTab === 'security' && (
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block mb-1">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block mb-1">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Change Password
          </button>
        </form>
      )}
    </div>
  )
}