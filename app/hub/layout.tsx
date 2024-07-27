import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <><nav className="fixed top-0 left-0 h-full bg-gray-800 text-white hidden lg:block">
          {/* Navbar content here */}
          <ul>
              <li>Home</li>
              <li>Dashboard</li>
              <li>Contact</li>
              <li>Information</li>
          </ul>
      </nav>
          // Mobile navbar
          <nav className={`fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 lg:hidden`}>
              <button className="absolute top-0 right-0 p-2">
                  {/* Hamburger icon or close icon */}
              </button>
              <ul>
                  <li>Home</li>
                  <li>Dashboard</li>
                  <li>Contact</li>
                  <li>Information</li>
              </ul>
          </nav></>
  );
}
