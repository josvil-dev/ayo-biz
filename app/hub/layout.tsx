import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-md">
            <nav className="mt-5">
              <Link href="/hub/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Dashboard
              </Link>
              <Link href="/hub/chats" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Chats
              </Link>
              <Link href="/hub/broadcast" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Broadcast Center
              </Link>
              <Link href="/hub/settings" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Settings
              </Link>
              <Link href="/hub/account" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Account
              </Link>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="flex-1 p-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}