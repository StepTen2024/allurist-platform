'use client'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Search, Filter, Calendar, Clock, Eye, Heart, ArrowLeft, ChevronRight, Tag, TrendingUp, Users, Star, Grid3X3, List, BookOpen, Trophy } from 'lucide-react';

// Mock articles data - organized by categories
const mockArticles = [
  // Tutorials Category
  {
    id: 1,
    slug: 'ultimate-ai-fantasy-art-guide',
    title: 'Ultimate Guide to AI Fantasy Art: From Prompts to Masterpieces',
    excerpt: 'Master the art of AI-generated fantasy characters with our comprehensive guide covering prompts, styles, and advanced techniques.',
    category: 'tutorials',
    tags: ['AI Art', 'Fantasy', 'Prompts', 'Tutorial'],
    author: { name: 'Luna Starweaver', avatar: '/api/placeholder/40/40' },
    publishedAt: '2025-01-15T10:00:00Z',
    readTime: 12,
    views: 15420,
    likes: 234,
    featured: true,
    coverImage: '/api/placeholder/600/400',
    difficulty: 'Beginner'
  },
  {
    id: 2,
    slug: 'advanced-digital-painting-techniques',
    title: 'Advanced Digital Painting Techniques for Photorealistic Art',
    excerpt: 'Learn professional digital painting methods used by industry experts to create stunning photorealistic artwork.',
    category: 'tutorials',
    tags: ['Digital Painting', 'Photorealism', 'Advanced'],
    author: { name: 'Alex Chen', avatar: '/api/placeholder/40/40' },
    publishedAt: '2025-01-12T14:30:00Z',
    readTime: 18,
    views: 9830,
    likes: 167,
    featured: false,
    coverImage: '/api/placeholder/600/400',
    difficulty: 'Advanced'
  },
  {
    id: 3,
    slug: 'color-theory-masterclass',
    title: 'Color Theory Masterclass: Psychology of Colors in Digital Art',
    excerpt: 'Deep dive into color psychology and theory to create emotionally impactful digital artwork.',
    category: 'tutorials',
    tags: ['Color Theory', 'Psychology', 'Design'],
    author: { name: 'Maya Rodriguez', avatar: '/api/placeholder/40/40' },
    publishedAt: '2025-01-08T09:15:00Z',
    readTime: 15,
    views: 12450,
    likes: 203,
    featured: true,
    coverImage: '/api/placeholder/600/400',
    difficulty: 'Intermediate'
  },
  
  // Fashion Category
  {
    id: 4,
    slug: 'cyberpunk-fashion-guide-2025',
    title: 'Get the Cyberpunk Look: Fashion Guide for Real Life',
    excerpt: 'Transform AI cyberpunk aesthetics into wearable fashion with our comprehensive style guide.',
    category: 'fashion',
    tags: ['Cyberpunk', 'Fashion', 'Streetwear', 'Style'],
    author: { name: 'Zara Kim', avatar: '/api/placeholder/40/40' },
    publishedAt: '2025-01-10T16:45:00Z',
    readTime: 8,
    views: 8920,
    likes: 156,
    featured: true,
    coverImage: '/api/placeholder/600/400',
    difficulty: 'Beginner'
  },
  {
    id: 5,
    slug: 'fantasy-cosplay-fashion-trends',
    title: 'Fantasy Cosplay Fashion: 2025 Trending Looks',
    excerpt: 'Discover the hottest fantasy fashion trends taking over cosplay communities worldwide.',
    category: 'fashion',
    tags: ['Cosplay', 'Fantasy', 'Trends', 'DIY'],
    author: { name: 'Kai Thompson', avatar: '/api/placeholder/40/40' },
    publishedAt: '2025-01-14T11:20:00Z',
    readTime: 10,
    views: 6780,
    likes: 134,
    featured: false,
    coverImage: '/api/placeholder/600/400',
    difficulty: 'Intermediate'
  },
  
  // Business Category
  {
    id: 6,
    slug: 'ai-art-business-monetization-2025',
    title: 'How to Monetize Your AI Art in 2025: Complete Business Guide',
    excerpt: 'Turn your AI art passion into profit with proven strategies and business models.',
    category: 'business',
    tags: ['Business', 'Monetization', 'AI Art', 'Entrepreneurship'],
    author: { name: 'David Park', avatar: '/api/placeholder/40/40' },
    publishedAt: '2025-01-13T13:00:00Z',
    readTime: 20,
    views: 11200,
    likes: 289,
    featured: true,
    coverImage: '/api/placeholder/600/400',
    difficulty: 'Advanced'
  },
  {
    id: 7,
    slug: 'nft-marketplace-strategy-2025',
    title: 'NFT Marketplace Strategy: Selling Digital Art Successfully',
    excerpt: 'Master the NFT marketplace with insider strategies for pricing, marketing, and community building.',
    category: 'business',
    tags: ['NFT', 'Marketplace', 'Strategy', 'Marketing'],
    author: { name: 'Elena Vasquez', avatar: '/api/placeholder/40/40' },
    publishedAt: '2025-01-11T08:30:00Z',
    readTime: 16,
    views: 9670,
    likes: 198,
    featured: false,
    coverImage: '/api/placeholder/600/400',
    difficulty: 'Intermediate'
  },
  
  // Artists Spotlight
  {
    id: 8,
    slug: 'artist-spotlight-digital-masters',
    title: 'Artist Spotlight: Meet the Digital Art Masters of 2025',
    excerpt: 'Exclusive interviews with top digital artists sharing their creative process and career insights.',
    category: 'artists',
    tags: ['Artist Spotlight', 'Interview', 'Inspiration', 'Career'],
    author: { name: 'Sarah Chen', avatar: '/api/placeholder/40/40' },
    publishedAt: '2025-01-09T12:00:00Z',
    readTime: 15,
    views: 14560,
    likes: 267,
    featured: true,
    coverImage: '/api/placeholder/600/400',
    difficulty: 'All Levels'
  }
];

const categories = {
  tutorials: {
    name: 'Tutorials',
    description: 'Master digital art with step-by-step guides and expert techniques',
    icon: '🎨',
    color: 'purple',
    count: 3
  },
  fashion: {
    name: 'Fashion & Style',
    description: 'Transform digital aesthetics into real-world fashion inspiration',
    icon: '👗',
    color: 'pink',
    count: 2
  },
  business: {
    name: 'Digital Art Business',
    description: 'Build your creative career and monetize your artistic talents',
    icon: '💼',
    color: 'blue',
    count: 2
  },
  artists: {
    name: 'Artist Spotlights',
    description: 'Meet the creators pushing boundaries in digital art',
    icon: '⭐',
    color: 'yellow',
    count: 1
  }
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  
  const category = categories[categorySlug as keyof typeof categories];
  const categoryArticles = mockArticles.filter(article => article.category === categorySlug);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort articles
  let filteredArticles = categoryArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (difficultyFilter !== 'all') {
    filteredArticles = filteredArticles.filter(article => 
      article.difficulty?.toLowerCase() === difficultyFilter
    );
  }

  // Sort articles
  filteredArticles.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'popular':
        return b.views - a.views;
      case 'liked':
        return b.likes - a.likes;
      case 'readTime':
        return a.readTime - b.readTime;
      default:
        return 0;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (!category) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          <p className="text-gray-400 mb-8">The category you're looking for doesn't exist.</p>
          <a href="/blog" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Navigation 
        user={null}
        onAuth={() => {}}
        onLogout={() => {}}
        onShowAuthModal={() => {}}
        onShowDashboard={() => {}}
      />
      
      {/* Breadcrumb */}
      <nav className="bg-gray-900/30 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 text-gray-400">
            <a href="/" className="hover:text-white transition-colors flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-purple-400">{category.name}</span>
          </div>
        </div>
      </nav>

      {/* Category Header */}
      <header className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-8xl mb-8">{category.icon}</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {category.name}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {category.description}
          </p>
          <div className="flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              <span>{category.count} Articles</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>Expert Authors</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              <span>Premium Content</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="py-12 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${category.name.toLowerCase()}...`}
                className="w-full bg-gray-800 border border-gray-600 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* View Toggle & Filter Button */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center bg-gray-800 border border-gray-600 text-gray-300 px-6 py-3 rounded-xl hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="liked">Most Liked</option>
                    <option value="readTime">Quick Reads</option>
                  </select>
                </div>
                
                {categorySlug === 'tutorials' && (
                  <div>
                    <label className="block text-white font-semibold mb-3">Difficulty Level</label>
                    <select
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="all">All Levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                )}
                
                <div>
                  <label className="block text-white font-semibold mb-3">Results</label>
                  <div className="text-gray-400 py-3">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Articles Grid/List */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">No Articles Found</h3>
              <p className="text-gray-400 mb-8">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setDifficultyFilter('all');
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-8'
            }>
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className={`group cursor-pointer ${
                    viewMode === 'list' ? 'flex bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300' : ''
                  }`}
                >
                  {viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="relative h-48">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex space-x-2">
                          {article.featured && (
                            <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-xs font-bold flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </span>
                          )}
                          {article.difficulty && (
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(article.difficulty)}`}>
                              {article.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center mb-4">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <p className="text-white text-sm font-semibold">{article.author.name}</p>
                            <p className="text-gray-500 text-xs">{formatDate(article.publishedAt)}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-800 text-gray-300 px-2 py-1 rounded-lg text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-700 pt-4">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {article.readTime}m
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {formatNumber(article.views)}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {formatNumber(article.likes)}
                            </span>
                          </div>
                          <TrendingUp className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* List View */
                    <>
                      <div className="relative w-80 h-48 flex-shrink-0">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex space-x-2">
                          {article.featured && (
                            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-gray-400 mb-4 line-clamp-2">
                              {article.excerpt}
                            </p>
                          </div>
                          {article.difficulty && (
                            <span className={`px-3 py-1 rounded-lg text-sm font-bold border ${getDifficultyColor(article.difficulty)} ml-4`}>
                              {article.difficulty}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-10 h-10 rounded-full mr-4"
                          />
                          <div>
                            <p className="text-white font-semibold">{article.author.name}</p>
                            <p className="text-gray-500 text-sm">{formatDate(article.publishedAt)}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {article.readTime} min read
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-2" />
                              {formatNumber(article.views)} views
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-2" />
                              {formatNumber(article.likes)} likes
                            </span>
                          </div>
                          <TrendingUp className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-pink-500 text-3xl font-bold mb-6">ALLURIST BLOG</div>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Empowering digital artists and creators with cutting-edge tutorials, insights, and inspiration.
          </p>
          <div className="flex justify-center space-x-8 text-gray-500 mb-8">
            <span className="cursor-pointer hover:text-white transition-colors">📱 TikTok</span>
            <span className="cursor-pointer hover:text-white transition-colors">📷 Instagram</span>
            <span className="cursor-pointer hover:text-white transition-colors">🎵 Spotify</span>
            <span className="cursor-pointer hover:text-white transition-colors">📌 Pinterest</span>
          </div>
          <p className="text-gray-600">© 2025 Allurist Blog. Digital art publication for creators worldwide.</p>
        </div>
      </footer>
    </div>
  );
} 