'use client'
import React, { useState } from 'react';
import { User, Download, Heart, CreditCard, Settings, LogOut } from 'lucide-react';

// Mock data
const mockArtPieces = [
  { id: 1, title: "Pink Fantasy", tier: "free", downloads: 1234, likes: 89 },
  { id: 2, title: "Neon Dreams", tier: "premium", downloads: 2341, likes: 156 },
  { id: 3, title: "Cyber Princess", tier: "vip", downloads: 987, likes: 234 },
  { id: 4, title: "Midnight Elegance", tier: "free", downloads: 3456, likes: 445 },
];

interface UserDashboardProps {
  user: {
    id: number;
    name: string;
    email: string;
    tier: string;
    joinDate: string;
    totalDownloads: number;
    customRequestsUsed: number;
  };
  onLogout?: () => void;
}

export default function UserDashboard({ user, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'downloads', name: 'Downloads', icon: Download },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
              <p className="text-gray-400">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mr-3 ${
                  user.tier === 'vip' ? 'bg-purple-500 text-white' :
                  user.tier === 'premium' ? 'bg-pink-500 text-black' :
                  'bg-green-500 text-black'
                }`}>
                  {user.tier.toUpperCase()} MEMBER
                </span>
                Member since {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
            <button 
              onClick={onLogout}
              className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === tab.id 
                            ? 'bg-pink-500 text-black font-bold' 
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <Icon size={20} />
                        <span>{tab.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Account Overview</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
                      <div className="text-3xl font-bold text-pink-500 mb-2">{user.totalDownloads}</div>
                      <div className="text-gray-400">Total Downloads</div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
                      <div className="text-3xl font-bold text-purple-500 mb-2">{user.customRequestsUsed}</div>
                      <div className="text-gray-400">Custom Requests</div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
                      <div className="text-3xl font-bold text-green-500 mb-2">
                        {user.tier === 'vip' ? '∞' : user.tier === 'premium' ? '100' : '10'}
                      </div>
                      <div className="text-gray-400">Monthly Limit</div>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-600">
                    <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-300">Downloaded "Pink Fantasy"</span>
                        <span className="text-gray-500 text-sm">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-300">Liked "Cyber Princess"</span>
                        <span className="text-gray-500 text-sm">1 day ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-300">Custom request completed</span>
                        <span className="text-gray-500 text-sm">3 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'downloads' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Your Downloads</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mockArtPieces.slice(0, 4).map((piece) => (
                      <div key={piece.id} className="bg-gray-900 rounded-lg p-3 border border-gray-600">
                        <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg mb-3"></div>
                        <h4 className="text-white font-medium text-sm">{piece.title}</h4>
                        <p className="text-gray-400 text-xs">Downloaded today</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Billing & Subscription</h2>
                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-600 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">Current Plan: {user.tier.toUpperCase()}</h3>
                        <p className="text-gray-400">Next billing: January 15, 2025</p>
                      </div>
                      <button className="bg-pink-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-pink-400 transition-colors">
                        Upgrade Plan
                      </button>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-gray-300">Payment method: •••• •••• •••• 4242</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 