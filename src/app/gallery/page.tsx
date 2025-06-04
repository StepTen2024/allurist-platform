'use client'
import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Grid, List, MoreHorizontal, Heart, Download, Share2,
  ChevronDown, X, Eye, Star, Crown, Zap, SlidersHorizontal, ArrowUpDown,
  Users, Calendar, Palette, Image, Tag, TrendingUp
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import AuthModal from '@/components/AuthModal';
import UserDashboard from '@/components/UserDashboard';

// Enhanced art pieces with rich metadata
const artPieces = [
  {
    id: "art_001",
    title: "Cyberpunk Princess",
    artist: "NeonDreams_AI",
    style: "Cyberpunk",
    colors: ["pink", "purple", "neon"],
    tier: "premium",
    resolution: "4K",
    orientation: "portrait",
    tags: ["futuristic", "female", "neon", "trending"],
    likes: 1247,
    downloads: 892,
    views: 15600,
    dateAdded: "2024-12-20",
    description: "Futuristic princess in neon-lit cityscape",
    fileSize: "8.5 MB"
  },
  {
    id: "art_002",
    title: "Ethereal Fantasy",
    artist: "DreamWeaver_Studio",
    style: "Fantasy",
    colors: ["blue", "white", "silver"],
    tier: "free",
    resolution: "HD",
    orientation: "portrait",
    tags: ["fantasy", "magical", "ethereal", "popular"],
    likes: 2341,
    downloads: 1567,
    views: 23100,
    dateAdded: "2024-12-18",
    description: "Magical forest guardian with ethereal beauty",
    fileSize: "6.2 MB"
  },
  {
    id: "art_003",
    title: "Neon Warrior",
    artist: "CyberArts_Pro",
    style: "Cyberpunk",
    colors: ["red", "black", "neon"],
    tier: "vip",
    resolution: "8K",
    orientation: "landscape",
    tags: ["warrior", "cyberpunk", "action", "exclusive"],
    likes: 987,
    downloads: 445,
    views: 12400,
    dateAdded: "2024-12-22",
    description: "Elite cyber warrior in futuristic battleground",
    fileSize: "15.7 MB"
  },
  {
    id: "art_004",
    title: "Anime Goddess",
    artist: "MangaStyle_AI",
    style: "Anime",
    colors: ["pink", "gold", "white"],
    tier: "premium",
    resolution: "4K",
    orientation: "portrait",
    tags: ["anime", "goddess", "divine", "trending"],
    likes: 3456,
    downloads: 2234,
    views: 34500,
    dateAdded: "2024-12-19",
    description: "Divine anime goddess with golden aura",
    fileSize: "9.8 MB"
  },
  {
    id: "art_005",
    title: "Dark Romance",
    artist: "GothicArt_Master",
    style: "Gothic",
    colors: ["black", "red", "purple"],
    tier: "premium",
    resolution: "6K",
    orientation: "portrait",
    tags: ["gothic", "romance", "dark", "atmospheric"],
    likes: 1876,
    downloads: 1023,
    views: 18700,
    dateAdded: "2024-12-17",
    description: "Mysterious gothic beauty in moonlit setting",
    fileSize: "11.3 MB"
  },
  {
    id: "art_006",
    title: "Space Explorer",
    artist: "CosmicVisions",
    style: "Sci-Fi",
    colors: ["blue", "purple", "silver"],
    tier: "free",
    resolution: "HD",
    orientation: "landscape",
    tags: ["space", "explorer", "sci-fi", "adventure"],
    likes: 1234,
    downloads: 876,
    views: 14500,
    dateAdded: "2024-12-21",
    description: "Brave explorer discovering alien worlds",
    fileSize: "7.4 MB"
  },
  {
    id: "art_007",
    title: "Celestial Queen",
    artist: "StardustCreator",
    style: "Fantasy",
    colors: ["gold", "purple", "white"],
    tier: "vip",
    resolution: "8K",
    orientation: "portrait",
    tags: ["celestial", "queen", "royal", "exclusive"],
    likes: 2987,
    downloads: 1456,
    views: 29800,
    dateAdded: "2024-12-16",
    description: "Majestic celestial queen ruling the stars",
    fileSize: "16.2 MB"
  },
  {
    id: "art_008",
    title: "Cyber Samurai",
    artist: "FutureSamurai",
    style: "Cyberpunk",
    colors: ["orange", "black", "neon"],
    tier: "premium",
    resolution: "4K",
    orientation: "landscape",
    tags: ["samurai", "cyber", "warrior", "japanese"],
    likes: 2156,
    downloads: 1234,
    views: 21600,
    dateAdded: "2024-12-15",
    description: "Ancient honor meets futuristic technology",
    fileSize: "10.5 MB"
  }
];

interface User {
  id: number;
  name: string;
  email: string;
  tier: string;
  joinDate: string;
  totalDownloads: number;
  customRequestsUsed: number;
}

export default function GalleryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'masonry'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedArt, setSelectedArt] = useState<any>(null);
  const [sortBy, setSortBy] = useState('popular');
  const [gridCols, setGridCols] = useState(3);
  
  // Filter states
  const [filters, setFilters] = useState({
    style: '',
    tier: '',
    artist: '',
    color: '',
    resolution: '',
    orientation: '',
    dateAdded: ''
  });

  // Auth modal states
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'signin' | 'signup';
  }>({
    isOpen: false,
    mode: 'signin'
  });

  const [showDashboard, setShowDashboard] = useState(false);

  // Filter and search logic
  const filteredArtPieces = useMemo(() => {
    let filtered = artPieces.filter(piece => {
      // Search filter
      if (searchTerm && !piece.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !piece.artist.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !piece.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      // Style filter
      if (filters.style && piece.style !== filters.style) return false;
      
      // Tier filter
      if (filters.tier && piece.tier !== filters.tier) return false;
      
      // Artist filter
      if (filters.artist && piece.artist !== filters.artist) return false;
      
      // Color filter
      if (filters.color && !piece.colors.includes(filters.color)) return false;
      
      // Resolution filter
      if (filters.resolution && piece.resolution !== filters.resolution) return false;
      
      // Orientation filter
      if (filters.orientation && piece.orientation !== filters.orientation) return false;
      
      return true;
    });

    // Sort logic
    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => (b.likes + b.downloads) - (a.likes + a.downloads));
      case 'newest':
        return filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case 'mostLiked':
        return filtered.sort((a, b) => b.likes - a.likes);
      case 'mostDownloaded':
        return filtered.sort((a, b) => b.downloads - a.downloads);
      case 'artist':
        return filtered.sort((a, b) => a.artist.localeCompare(b.artist));
      default:
        return filtered;
    }
  }, [artPieces, searchTerm, filters, sortBy]);

  // Auth handlers
  const handleAuth = () => {
    setAuthModal({ isOpen: true, mode: 'signin' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAuthSuccess = (newUser: any) => {
    setUser(newUser);
  };

  const handleCloseAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'signin' });
  };

  const handleSwitchAuthMode = (mode: 'signin' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleShowDashboard = () => {
    if (user) {
      setShowDashboard(true);
    }
  };

  // Art interaction handlers
  const handleArtClick = (art: any) => {
    if (art.tier !== 'free' && !user) {
      setAuthModal({ isOpen: true, mode: 'signup' });
      return;
    }
    setSelectedArt(art);
  };

  const handleLike = (artId: string) => {
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'signin' });
      return;
    }
    // Mock like functionality
    console.log('Liked art:', artId);
  };

  const handleDownload = (artId: string) => {
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'signin' });
      return;
    }
    // Mock download functionality
    console.log('Downloaded art:', artId);
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'free':
        return { icon: '🆓', color: 'bg-green-500/20 text-green-400 border-green-500/30', name: 'Free' };
      case 'premium':
        return { icon: '⭐', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30', name: 'Premium' };
      case 'vip':
        return { icon: '👑', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', name: 'VIP' };
      default:
        return { icon: '🔒', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', name: 'Locked' };
    }
  };

  const clearFilters = () => {
    setFilters({
      style: '',
      tier: '',
      artist: '',
      color: '',
      resolution: '',
      orientation: '',
      dateAdded: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="bg-black min-h-screen">
      <Navigation 
        user={user} 
        onAuth={handleAuth} 
        onLogout={handleLogout} 
        onShowAuthModal={(mode) => setAuthModal({ isOpen: true, mode })}
        onShowDashboard={handleShowDashboard}
      />
      
      {/* Gallery Header */}
      <div className="pt-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
              Art Gallery
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover premium digital art from talented creators worldwide. Filter, search, and find your perfect piece.
            </p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search artwork, artists, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-pink-500 appearance-none pr-10"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="mostLiked">Most Liked</option>
                  <option value="mostDownloaded">Most Downloaded</option>
                  <option value="artist">Artist A-Z</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>

              {/* View Mode Toggles */}
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'masonry' ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  showFilters ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-24 bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-pink-500 hover:text-pink-400 text-sm"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Style Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Style</label>
                    <select
                      value={filters.style}
                      onChange={(e) => setFilters({...filters, style: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-pink-500"
                    >
                      <option value="">All Styles</option>
                      <option value="Cyberpunk">Cyberpunk</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Anime">Anime</option>
                      <option value="Gothic">Gothic</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Realistic">Realistic</option>
                      <option value="Abstract">Abstract</option>
                    </select>
                  </div>

                  {/* Tier Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Access Tier</label>
                    <select
                      value={filters.tier}
                      onChange={(e) => setFilters({...filters, tier: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-pink-500"
                    >
                      <option value="">All Access</option>
                      <option value="free">🆓 Free</option>
                      <option value="premium">⭐ Premium</option>
                      <option value="vip">👑 VIP Exclusive</option>
                    </select>
                  </div>

                  {/* Artist Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Artist</label>
                    <select
                      value={filters.artist}
                      onChange={(e) => setFilters({...filters, artist: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-pink-500"
                    >
                      <option value="">All Artists</option>
                      {Array.from(new Set(artPieces.map(art => art.artist))).map(artist => (
                        <option key={artist} value={artist}>{artist}</option>
                      ))}
                    </select>
                  </div>

                  {/* Color Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Color Palette</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['pink', 'purple', 'blue', 'red', 'black', 'white', 'gold', 'green', 'orange'].map(color => (
                        <button
                          key={color}
                          onClick={() => setFilters({...filters, color: filters.color === color ? '' : color})}
                          className={`h-8 w-full rounded-md border-2 transition-all ${
                            filters.color === color ? 'border-pink-500 scale-110' : 'border-gray-600 hover:border-gray-500'
                          }`}
                          style={{ backgroundColor: color === 'white' ? '#f9fafb' : color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Resolution Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Resolution</label>
                    <select
                      value={filters.resolution}
                      onChange={(e) => setFilters({...filters, resolution: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-pink-500"
                    >
                      <option value="">All Resolutions</option>
                      <option value="HD">HD</option>
                      <option value="4K">4K</option>
                      <option value="6K">6K</option>
                      <option value="8K">8K Ultra</option>
                    </select>
                  </div>

                  {/* Orientation Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Orientation</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['portrait', 'landscape'].map(orientation => (
                        <button
                          key={orientation}
                          onClick={() => setFilters({...filters, orientation: filters.orientation === orientation ? '' : orientation})}
                          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                            filters.orientation === orientation
                              ? 'bg-pink-500 text-white'
                              : 'bg-gray-800 text-gray-300 hover:text-white border border-gray-700'
                          }`}
                        >
                          {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-400">
                Showing {filteredArtPieces.length} of {artPieces.length} artworks
              </div>
              {viewMode === 'grid' && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Columns:</span>
                  <div className="flex bg-gray-800 rounded-lg p-1">
                    {[2, 3, 4, 6].map(cols => (
                      <button
                        key={cols}
                        onClick={() => setGridCols(cols)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          gridCols === cols ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {cols}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Content */}
            {viewMode === 'grid' && (
              <div className={`grid gap-6 ${
                gridCols === 2 ? 'grid-cols-2' :
                gridCols === 3 ? 'grid-cols-3' :
                gridCols === 4 ? 'grid-cols-4' :
                'grid-cols-6'
              }`}>
                {filteredArtPieces.map((art) => {
                  const tierBadge = getTierBadge(art.tier);
                  const hasAccess = art.tier === 'free' || user;
                  
                  return (
                    <div
                      key={art.id}
                      className="group relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-pink-500/50 transition-all cursor-pointer transform hover:scale-105"
                      onClick={() => handleArtClick(art)}
                    >
                      {/* Art Preview */}
                      <div className="aspect-[3/4] bg-gradient-to-br from-pink-500/20 to-purple-500/20 relative">
                        {!hasAccess && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                            <div className="text-center">
                              <div className="text-4xl mb-2">🔒</div>
                              <div className="text-white font-bold mb-1">Premium Content</div>
                              <div className="text-gray-300 text-sm">Sign up to unlock</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Tier Badge */}
                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold border ${tierBadge.color} flex items-center gap-1`}>
                          <span>{tierBadge.icon}</span>
                          {tierBadge.name}
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(art.id);
                              }}
                              className="p-2 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
                            >
                              <Heart size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(art.id);
                              }}
                              className="p-2 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
                            >
                              <Download size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle share
                              }}
                              className="p-2 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
                            >
                              <Share2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Stats Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="flex items-center justify-between text-sm text-gray-300">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Heart size={14} />
                                {art.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Download size={14} />
                                {art.downloads}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye size={14} />
                                {art.views}
                              </span>
                            </div>
                            <span className="text-xs">{art.resolution}</span>
                          </div>
                        </div>
                      </div>

                      {/* Art Info */}
                      <div className="p-4">
                        <h3 className="text-white font-bold mb-1 truncate">{art.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">by {art.artist}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {art.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(art.dateAdded).toLocaleDateString()}</span>
                          <span>{art.fileSize}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredArtPieces.map((art) => {
                  const tierBadge = getTierBadge(art.tier);
                  const hasAccess = art.tier === 'free' || user;
                  
                  return (
                    <div
                      key={art.id}
                      className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all cursor-pointer"
                      onClick={() => handleArtClick(art)}
                    >
                      <div className="flex gap-6">
                        {/* Thumbnail */}
                        <div className="w-32 h-40 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg flex-shrink-0 relative">
                          {!hasAccess && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                              <div className="text-2xl">🔒</div>
                            </div>
                          )}
                          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold border ${tierBadge.color} flex items-center gap-1`}>
                            <span>{tierBadge.icon}</span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">{art.title}</h3>
                              <p className="text-gray-400">by {art.artist}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLike(art.id);
                                }}
                                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                              >
                                <Heart size={16} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownload(art.id);
                                }}
                                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                              >
                                <Download size={16} />
                              </button>
                            </div>
                          </div>

                          <p className="text-gray-300 mb-4">{art.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {art.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-6">
                              <span className="flex items-center gap-1">
                                <Heart size={14} />
                                {art.likes} likes
                              </span>
                              <span className="flex items-center gap-1">
                                <Download size={14} />
                                {art.downloads} downloads
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye size={14} />
                                {art.views} views
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span>{art.resolution}</span>
                              <span>{art.fileSize}</span>
                              <span>{new Date(art.dateAdded).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {viewMode === 'masonry' && (
              <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
                {filteredArtPieces.map((art, index) => {
                  const tierBadge = getTierBadge(art.tier);
                  const hasAccess = art.tier === 'free' || user;
                  
                  // Vary the height for masonry effect
                  const heights = ['h-64', 'h-80', 'h-96', 'h-72', 'h-60', 'h-88'];
                  const randomHeight = heights[index % heights.length];
                  
                  return (
                    <div
                      key={art.id}
                      className="break-inside-avoid mb-6 group cursor-pointer"
                      onClick={() => handleArtClick(art)}
                    >
                      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-pink-500/50 transition-all transform hover:scale-105">
                        {/* Art Preview */}
                        <div className={`${randomHeight} bg-gradient-to-br from-pink-500/20 to-purple-500/20 relative`}>
                          {!hasAccess && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                              <div className="text-center">
                                <div className="text-3xl mb-2">🔒</div>
                                <div className="text-white font-bold mb-1">Premium</div>
                                <div className="text-gray-300 text-xs">Sign up</div>
                              </div>
                            </div>
                          )}
                          
                          {/* Tier Badge */}
                          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold border ${tierBadge.color} flex items-center gap-1`}>
                            <span>{tierBadge.icon}</span>
                          </div>

                          {/* Quick Actions */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLike(art.id);
                                }}
                                className="p-1.5 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
                              >
                                <Heart size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownload(art.id);
                                }}
                                className="p-1.5 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
                              >
                                <Download size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Stats Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <div className="flex items-center justify-between text-xs text-gray-300">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Heart size={12} />
                                  {art.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Download size={12} />
                                  {art.downloads}
                                </span>
                              </div>
                              <span className="text-xs">{art.resolution}</span>
                            </div>
                          </div>
                        </div>

                        {/* Art Info */}
                        <div className="p-3">
                          <h3 className="text-white font-bold mb-1 text-sm truncate">{art.title}</h3>
                          <p className="text-gray-400 text-xs mb-2">by {art.artist}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {art.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 bg-gray-800 text-gray-300 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{new Date(art.dateAdded).toLocaleDateString()}</span>
                            <span>{art.fileSize}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* No Results */}
            {filteredArtPieces.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-white mb-2">No artwork found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search terms or filters to find more results.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Art Preview Modal */}
      {selectedArt && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50" onClick={() => setSelectedArt(null)}>
          <div 
            className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedArt(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="aspect-[3/4] bg-gradient-to-br from-pink-500/20 to-purple-500/20"></div>

                {/* Details */}
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedArt.title}</h2>
                    <p className="text-xl text-gray-400">by {selectedArt.artist}</p>
                  </div>

                  <p className="text-gray-300 mb-6">{selectedArt.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-gray-400">Resolution:</span>
                      <span className="text-white ml-2">{selectedArt.resolution}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">File Size:</span>
                      <span className="text-white ml-2">{selectedArt.fileSize}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Style:</span>
                      <span className="text-white ml-2">{selectedArt.style}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Orientation:</span>
                      <span className="text-white ml-2">{selectedArt.orientation}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedArt.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mb-8 text-gray-400">
                    <span className="flex items-center gap-2">
                      <Heart size={16} />
                      {selectedArt.likes}
                    </span>
                    <span className="flex items-center gap-2">
                      <Download size={16} />
                      {selectedArt.downloads}
                    </span>
                    <span className="flex items-center gap-2">
                      <Eye size={16} />
                      {selectedArt.views}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(selectedArt.id)}
                      className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart size={20} />
                      Like
                    </button>
                    <button
                      onClick={() => handleDownload(selectedArt.id)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={handleCloseAuthModal}
        onAuthSuccess={handleAuthSuccess}
        onSwitchMode={handleSwitchAuthMode}
      />

      {/* User Dashboard */}
      {user && (
        <UserDashboard
          isOpen={showDashboard}
          user={user}
          onClose={() => setShowDashboard(false)}
          onUpgrade={() => {
            setShowDashboard(false);
            setAuthModal({ isOpen: true, mode: 'signup' });
          }}
        />
      )}
    </div>
  );
} 