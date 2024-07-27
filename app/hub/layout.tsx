import Link from 'next/link';
import { MdOutlineAccountCircle } from "react-icons/md";
import { BsBroadcastPin } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsChatSquareDots } from "react-icons/bs";

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
          <div className="w-4rem gap-8 bg-white shadow-md">
            <nav className="mt-5">
            <Link href="/hub/dashboard" className="block text-4xl mb-16 py-2 px-4 text-gray-700 hover:bg-gray-200">
              Ay
              </Link>
              <Link href="/hub/dashboard" className="block text-4xl py-2 px-4 text-gray-700 hover:bg-gray-200">
              <LuLayoutDashboard />
              </Link>
              <Link href="/hub/chats" className="block text-4xl py-2 px-4 text-gray-700 hover:bg-gray-200">
              <BsChatSquareDots/>
              </Link>
              <Link href="/hub/broadcast" className="block text-4xl py-2 px-4 text-gray-700 hover:bg-gray-200">
              <BsBroadcastPin />
              </Link>
              <Link href="/hub/settings" className="block text-4xl py-2 px-4 text-gray-700 hover:bg-gray-200">
              <IoSettingsOutline />
              </Link>
              <Link href="/hub/account" className="block text-4xl py-2 px-4 text-gray-700 hover:bg-gray-200">
              <MdOutlineAccountCircle />
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