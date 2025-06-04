'use client'
import React, { useState } from 'react';
import { Menu, X, User, LogOut, Settings, Download, Crown, Star } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  tier: string;
  joinDate: string;
  totalDownloads: number;
  customRequestsUsed: number;
}

interface NavigationProps {
  user: User | null;
  onAuth: () => void;
  onLogout: () => void;
  onShowAuthModal?: (mode: 'signin' | 'signup') => void;
  onShowDashboard?: () => void;
}

export default function Navigation({ user, onAuth, onLogout, onShowAuthModal, onShowDashboard }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'free':
        return { icon: '🆓', color: 'bg-green-500 text-black', name: 'Free' };
      case 'premium':
        return { icon: '⭐', color: 'bg-pink-500 text-black', name: 'Premium' };
      case 'vip':
        return { icon: '👑', color: 'bg-purple-500 text-white', name: 'VIP' };
      default:
        return { icon: '🔒', color: 'bg-gray-500 text-white', name: 'Guest' };
    }
  };

  const tierBadge = user ? getTierBadge(user.tier) : null;

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              ALLURIST
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#gallery" className="text-gray-300 hover:text-pink-500 transition-colors font-medium">
                Gallery
              </a>
              <a href="#style" className="text-gray-300 hover:text-pink-500 transition-colors font-medium">
                Style
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-pink-500 transition-colors font-medium">
                VIP
              </a>
            </div>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 rounded-full px-4 py-2 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="text-white text-sm font-medium">{user.name}</div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${tierBadge?.color} inline-flex items-center gap-1`}>
                        <span>{tierBadge?.icon}</span>
                        {tierBadge?.name}
                      </div>
                    </div>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-lg border border-gray-700 py-2">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-gray-400 text-sm">{user.email}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${tierBadge?.color} flex items-center gap-1`}>
                          <span>{tierBadge?.icon}</span>
                          {tierBadge?.name} Member
                        </span>
                        <span className="text-gray-500 text-xs">
                          {user.totalDownloads} downloads
                        </span>
                      </div>
                    </div>

                    <div className="py-2">
                      <button 
                        onClick={onShowDashboard}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-3"
                      >
                        <User size={16} />
                        Profile & Dashboard
                      </button>
                      <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-3">
                        <Download size={16} />
                        My Downloads ({user.totalDownloads})
                      </button>
                      <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-3">
                        <Crown size={16} />
                        Custom Requests ({user.customRequestsUsed}/2)
                      </button>
                      
                      {user.tier !== 'vip' && (
                        <div className="px-4 py-2 border-t border-gray-700 mt-2">
                          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-lg text-sm font-bold hover:from-pink-400 hover:to-purple-400 transition-all flex items-center justify-center gap-2">
                            <Star size={16} />
                            Upgrade to {user.tier === 'free' ? 'Premium' : 'VIP'}
                          </button>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-700 mt-2 pt-2">
                        <button 
                          onClick={onLogout}
                          className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors flex items-center gap-3"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onShowAuthModal?.('signin')}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onShowAuthModal?.('signup')}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-bold hover:from-pink-400 hover:to-purple-400 transition-all transform hover:scale-105"
                >
                  Join VIP
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 rounded-lg mt-2 border border-gray-700">
              <a
                href="#gallery"
                className="block text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#style"
                className="block text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Style
              </a>
              <a
                href="#pricing"
                className="block text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                VIP
              </a>
              
              <div className="border-t border-gray-700 pt-3 mt-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className={`text-xs px-2 py-0.5 rounded-full ${tierBadge?.color} inline-flex items-center gap-1`}>
                            <span>{tierBadge?.icon}</span>
                            {tierBadge?.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={onShowDashboard}
                      className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Profile & Dashboard
                    </button>
                    <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
                      My Downloads ({user.totalDownloads})
                    </button>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        onShowAuthModal?.('signin');
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        onShowAuthModal?.('signup');
                        setIsOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-md font-bold hover:from-pink-400 hover:to-purple-400 transition-all"
                    >
                      Join VIP
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 