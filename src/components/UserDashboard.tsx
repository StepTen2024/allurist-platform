'use client'
import React, { useState } from 'react';
import { 
  X, Download, Crown, Star, Calendar, Heart, Eye, 
  TrendingUp, Award, Zap, Settings, Grid, List,
  Filter, Search, ExternalLink
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  tier: string;
  joinDate: string;
  totalDownloads: number;
  customRequestsUsed: number;
}

interface UserDashboardProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onUpgrade: () => void;
}

export default function UserDashboard({ isOpen, user, onClose, onUpgrade }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'downloads' | 'favorites' | 'requests'>('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for the dashboard
  const stats = {
    totalDownloads: user.totalDownloads,
    favoriteArtworks: 23,
    customRequests: user.customRequestsUsed,
    memberSince: user.joinDate,
    nextTierUpgrade: user.tier === 'free' ? 'Premium' : user.tier === 'premium' ? 'VIP' : null
  };

  const recentDownloads = [
    { id: 1, title: 'Neon Dreams', artist: 'Luna Storm', date: '2024-01-15', size: '4K', category: 'Cyberpunk' },
    { id: 2, title: 'Mystic Forest', artist: 'Echo Vale', date: '2024-01-14', size: '8K', category: 'Nature' },
    { id: 3, title: 'Urban Sunset', artist: 'Nyx Digital', date: '2024-01-13', size: '4K', category: 'City' },
    { id: 4, title: 'Galaxy Portal', artist: 'Astro Vision', date: '2024-01-12', size: '6K', category: 'Space' },
    { id: 5, title: 'Cherry Blossom', artist: 'Sakura Art', date: '2024-01-11', size: '4K', category: 'Nature' }
  ];

  const favoriteArtworks = [
    { id: 1, title: 'Digital Goddess', artist: 'Pixel Dreams', likes: 1234, views: 15600 },
    { id: 2, title: 'Neon Warrior', artist: 'Cyber Arts', likes: 987, views: 12400 },
    { id: 3, title: 'Ethereal Beauty', artist: 'Dream Studio', likes: 2341, views: 23100 }
  ];

  const customRequests = [
    { id: 1, title: 'Anime girl with dragon', status: 'Completed', date: '2024-01-10', artist: 'Luna Storm' },
    { id: 2, title: 'Cyberpunk cityscape', status: 'In Progress', date: '2024-01-12', artist: 'Nyx Digital' }
  ];

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'free':
        return { icon: '🆓', color: 'bg-green-500 text-black', name: 'Free', nextTier: 'Premium ($29/mo)' };
      case 'premium':
        return { icon: '⭐', color: 'bg-pink-500 text-black', name: 'Premium', nextTier: 'VIP ($79/mo)' };
      case 'vip':
        return { icon: '👑', color: 'bg-purple-500 text-white', name: 'VIP', nextTier: null };
      default:
        return { icon: '🔒', color: 'bg-gray-500 text-white', name: 'Guest', nextTier: 'Premium ($29/mo)' };
    }
  };

  const tierInfo = getTierBadge(user.tier);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-6 border-b border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h2>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${tierInfo.color} flex items-center gap-2`}>
                  <span>{tierInfo.icon}</span>
                  {tierInfo.name} Member
                </span>
                <span className="text-gray-400 text-sm">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 bg-gray-900">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'downloads', label: 'My Downloads', icon: Download },
              { id: 'favorites', label: 'Favorites', icon: Heart },
              { id: 'requests', label: 'Custom Requests', icon: Crown }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-500'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Download className="text-pink-500" size={24} />
                    <div>
                      <div className="text-2xl font-bold text-white">{stats.totalDownloads}</div>
                      <div className="text-gray-400 text-sm">Total Downloads</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Heart className="text-red-500" size={24} />
                    <div>
                      <div className="text-2xl font-bold text-white">{stats.favoriteArtworks}</div>
                      <div className="text-gray-400 text-sm">Favorites</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Crown className="text-purple-500" size={24} />
                    <div>
                      <div className="text-2xl font-bold text-white">{stats.customRequests}/2</div>
                      <div className="text-gray-400 text-sm">Custom Requests</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-blue-500" size={24} />
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {Math.floor((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
                      </div>
                      <div className="text-gray-400 text-sm">Days Active</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upgrade Section */}
              {tierInfo.nextTier && (
                <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        🚀 Ready to level up?
                      </h3>
                      <p className="text-gray-300 mb-3">
                        Upgrade to {tierInfo.nextTier?.split(' ')[0]} and unlock exclusive features
                      </p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {user.tier === 'free' && (
                          <>
                            <li>• Full HD gallery access</li>
                            <li>• Weekly new releases</li>
                            <li>• No watermarks</li>
                          </>
                        )}
                        {user.tier === 'premium' && (
                          <>
                            <li>• Custom art requests (2/month)</li>
                            <li>• VIP-only collections</li>
                            <li>• Priority support</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <button
                      onClick={onUpgrade}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                      <Zap size={20} />
                      Upgrade Now
                    </button>
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Downloads</h3>
                <div className="space-y-3">
                  {recentDownloads.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg"></div>
                        <div>
                          <div className="text-white font-medium">{item.title}</div>
                          <div className="text-gray-400 text-sm">by {item.artist} • {item.size}</div>
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm">
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search downloads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>

              {/* Downloads List */}
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
                {recentDownloads.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors ${
                      viewMode === 'list' ? 'flex items-center justify-between' : ''
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${viewMode === 'grid' ? 'mb-3' : ''}`}>
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg"></div>
                      <div>
                        <div className="text-white font-medium">{item.title}</div>
                        <div className="text-gray-400 text-sm">by {item.artist}</div>
                      </div>
                    </div>
                    <div className={`flex items-center justify-between ${viewMode === 'grid' ? '' : 'gap-4'}`}>
                      <div className="text-gray-400 text-sm">
                        {item.size} • {new Date(item.date).toLocaleDateString()}
                      </div>
                      <button className="text-pink-500 hover:text-pink-400 transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteArtworks.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                    <div className="w-full h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg mb-3"></div>
                    <div className="space-y-2">
                      <div className="text-white font-medium">{item.title}</div>
                      <div className="text-gray-400 text-sm">by {item.artist}</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Heart size={14} />
                            {item.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={14} />
                            {item.views}
                          </span>
                        </div>
                        <button className="text-red-500 hover:text-red-400 transition-colors">
                          <Heart size={16} fill="currentColor" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-4">
              {/* Custom Requests Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Custom Art Requests</h3>
                  <p className="text-gray-400 text-sm">
                    {user.customRequestsUsed}/2 requests used this month
                  </p>
                </div>
                {user.customRequestsUsed < 2 && (
                  <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-pink-400 hover:to-purple-400 transition-all">
                    New Request
                  </button>
                )}
              </div>

              {/* Requests List */}
              <div className="space-y-3">
                {customRequests.map((request) => (
                  <div key={request.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-white font-medium">{request.title}</div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>by {request.artist}</span>
                      <span>{new Date(request.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {user.tier === 'free' && (
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6 text-center">
                  <Crown className="mx-auto text-purple-500 mb-3" size={32} />
                  <h3 className="text-xl font-bold text-white mb-2">Upgrade to VIP</h3>
                  <p className="text-gray-300 mb-4">
                    Get 2 custom art requests per month with VIP membership
                  </p>
                  <button
                    onClick={onUpgrade}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all"
                  >
                    Upgrade to VIP
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 