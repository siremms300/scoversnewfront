'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User, Bell } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Find Universities', href: '/universities' },
      { name: 'Find Courses', href: '/courses' }, // Added this
    { name: 'Scholarships', href: '/scholarships' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Blog', href: '/blog' },
    { name: 'UPI Registration', href: '/upi-registration' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">
                {/* the logo text was here */}
                <span className="text-primary">.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary">
              <Bell size={20} />
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Login
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 bg-primary text-white rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 border border-primary text-primary rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}