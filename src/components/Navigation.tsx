'use client'
import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

interface NavigationProps {
  user?: any;
  onAuthClick?: () => void;
  onLogout?: () => void;
}

export default function Navigation({ user, onAuthClick, onLogout }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-lg border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-pink-500">ALLURIST</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#gallery" className="text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Gallery
              </a>
              <a href="#style" className="text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Style
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                VIP
              </a>
              {user ? (
                <div className="relative">
                  <button className="flex items-center space-x-2 bg-pink-500 text-black px-4 py-2 rounded-full font-medium">
                    <User size={16} />
                    <span>{user.name}</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onAuthClick}
                  className="bg-pink-500 text-black px-4 py-2 rounded-full font-medium hover:bg-pink-400 transition-colors"
                >
                  Join VIP
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-pink-500 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 border-t border-gray-800">
              <a href="#gallery" className="text-gray-300 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
                Gallery
              </a>
              <a href="#style" className="text-gray-300 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
                Style
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
                VIP
              </a>
              {user ? (
                <button className="w-full text-left bg-pink-500 text-black px-3 py-2 rounded-md font-medium">
                  Dashboard
                </button>
              ) : (
                <button 
                  onClick={onAuthClick}
                  className="w-full text-left bg-pink-500 text-black px-3 py-2 rounded-md font-medium"
                >
                  Join VIP
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 