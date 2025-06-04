'use client'
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Search, Filter, TrendingUp, Clock, Heart, Eye, User, Calendar, Tag, ArrowRight, Star, BookOpen, Palette, DollarSign, Users, Zap, Sparkles } from 'lucide-react';

// Mock blog data - will be replaced with real CMS
const mockArticles = [
  {
    id: 1,
    slug: 'ultimate-ai-fantasy-art-guide',
    title: 'Ultimate Guide to AI Fantasy Art: From Prompts to Masterpieces',
    excerpt: 'Master the art of AI-generated fantasy characters with our comprehensive guide covering prompts, styles, and advanced techniques that will transform your creative process.',
    content: 'Full article content...',
    category: 'tutorials',
    tags: ['AI Art', 'Fantasy', 'Prompts', 'Tutorial'],
    author: {
      id: 1,
      name: 'Luna Starweaver',
      avatar: 'https://picsum.photos/40/40?random=1',
      bio: 'Professional AI Artist & Tutorial Creator'
    },
    publishedAt: '2025-01-15T10:00:00Z',
    readTime: 12,
    views: 15420,
    likes: 234,
    featured: true,
    coverImage: 'https://picsum.photos/800/400?random=1',
    seoTitle: 'AI Fantasy Art Guide 2025 - Master Prompts & Techniques',
    seoDescription: 'Learn AI fantasy art creation with our ultimate guide. Master prompts, styles, and techniques for stunning fantasy characters.',
    keywords: ['AI art', 'fantasy art', 'AI prompts', 'digital art tutorial']
  },
  {
    id: 2,
    slug: 'cyberpunk-fashion-guide-2025',
    title: 'Get the Cyberpunk Look: Fashion Guide for Real Life',
    excerpt: 'Transform AI cyberpunk aesthetics into wearable fashion with our curated shopping guide and styling tips that bring the future to your wardrobe.',
    content: 'Full article content...',
    category: 'fashion',
    tags: ['Fashion', 'Cyberpunk', 'Style Guide', 'Shopping'],
    author: {
      id: 2,
      name: 'Neon Styles',
      avatar: 'https://picsum.photos/40/40?random=2',
      bio: 'Fashion Stylist & Trend Forecaster'
    },
    publishedAt: '2025-01-14T14:30:00Z',
    readTime: 8,
    views: 8920,
    likes: 156,
    featured: true,
    coverImage: 'https://picsum.photos/800/400?random=2',
    seoTitle: 'Cyberpunk Fashion Guide 2025 - Get the Future Look',
    seoDescription: 'Transform cyberpunk AI art into real fashion. Shopping guide, styling tips, and where to buy cyberpunk clothing.',
    keywords: ['cyberpunk fashion', 'futuristic clothing', 'cyberpunk style', 'alternative fashion']
  },
  {
    id: 3,
    slug: 'artist-spotlight-digital-masters',
    title: 'Artist Spotlight: Meet the Digital Art Masters Shaping AI',
    excerpt: 'Exclusive interviews with top digital artists shaping the AI art landscape and their creative processes that are revolutionizing digital creativity.',
    content: 'Full article content...',
    category: 'artists',
    tags: ['Artist Interview', 'Digital Art', 'Inspiration', 'Community'],
    author: {
      id: 3,
      name: 'Art Curator',
      avatar: 'https://picsum.photos/40/40?random=3',
      bio: 'Digital Art Historian & Curator'
    },
    publishedAt: '2025-01-13T09:15:00Z',
    readTime: 15,
    views: 12340,
    likes: 189,
    featured: false,
    coverImage: 'https://picsum.photos/800/400?random=3',
    seoTitle: 'Digital Art Masters - Artist Interviews & Insights',
    seoDescription: 'Meet leading digital artists. Exclusive interviews, creative processes, and insights into the AI art revolution.',
    keywords: ['digital artists', 'AI art interviews', 'artist spotlight', 'creative process']
  },
  {
    id: 4,
    slug: 'ai-art-business-monetization-2025',
    title: 'How to Monetize Your AI Art in 2025: Complete Business Guide',
    excerpt: 'Turn your AI art passion into profit with proven strategies for selling, licensing, and building an art business that generates consistent income.',
    content: 'Full article content...',
    category: 'business',
    tags: ['Business', 'Monetization', 'AI Art', 'Marketing'],
    author: {
      id: 4,
      name: 'Business Pro',
      avatar: 'https://picsum.photos/40/40?random=4',
      bio: 'Digital Art Business Consultant'
    },
    publishedAt: '2025-01-12T16:45:00Z',
    readTime: 18,
    views: 9870,
    likes: 267,
    featured: false,
    coverImage: 'https://picsum.photos/800/400?random=4',
    seoTitle: 'Monetize AI Art 2025 - Complete Business Guide',
    seoDescription: 'Turn AI art into income. Complete guide to selling, licensing, and building a profitable AI art business in 2025.',
    keywords: ['AI art business', 'monetize digital art', 'sell AI art', 'art business guide']
  },
  {
    id: 5,
    slug: 'fantasy-hair-colors-complete-guide',
    title: 'Fantasy Hair Colors: A Complete Guide to Magical Transformations',
    excerpt: 'Discover how to achieve stunning fantasy hair colors inspired by AI art, from rainbow gradients to ethereal pastels.',
    content: 'Full article content...',
    category: 'Fashion',
    tags: ['Hair', 'Fantasy', 'Color', 'Style'],
    author: {
      id: 2,
      name: 'Neon Styles',
      avatar: 'https://picsum.photos/40/40?random=5',
      bio: 'Fashion Stylist & Trend Forecaster'
    },
    publishedAt: '2025-01-11T12:00:00Z',
    readTime: 10,
    views: 7650,
    likes: 198,
    featured: false,
    coverImage: 'https://picsum.photos/800/400?random=5',
    seoTitle: 'Fantasy Hair Colors Guide - Magical Hair Transformations',
    seoDescription: 'Complete guide to fantasy hair colors inspired by AI art. Tips, techniques, and products for magical hair transformations.',
    keywords: ['fantasy hair', 'colorful hair', 'hair dye', 'fantasy style']
  },
  {
    id: 6,
    slug: 'ai-art-copyright-what-you-need-to-know',
    title: 'AI Art Copyright: What You Need to Know in 2025',
    excerpt: 'Navigate the complex world of AI art copyright with our comprehensive legal guide for digital artists.',
    content: 'Full article content...',
    category: 'Business',
    tags: ['Copyright', 'Legal', 'AI Art', 'Business'],
    author: {
      id: 4,
      name: 'Business Pro',
      avatar: 'https://picsum.photos/40/40?random=6',
      bio: 'Digital Art Business Consultant'
    },
    publishedAt: '2025-01-10T14:20:00Z',
    readTime: 14,
    views: 6890,
    likes: 134,
    featured: false,
    coverImage: 'https://picsum.photos/800/400?random=6',
    seoTitle: 'AI Art Copyright Guide 2025 - Legal Rights & Protection',
    seoDescription: 'Complete guide to AI art copyright. Legal rights, protection strategies, and what every digital artist needs to know.',
    keywords: ['AI art copyright', 'digital art legal', 'art copyright protection', 'AI art rights']
  }
];

const categories = [
  { id: 'tutorials', name: 'Tutorials', icon: BookOpen, color: 'from-blue-500 to-purple-600', count: 24, description: 'Learn AI art creation' },
  { id: 'fashion', name: 'Fashion', icon: Palette, color: 'from-pink-500 to-rose-600', count: 18, description: 'Style guides & trends' },
  { id: 'artists', name: 'Artists', icon: Users, color: 'from-green-500 to-emerald-600', count: 12, description: 'Creator spotlights' },
  { id: 'business', name: 'Business', icon: DollarSign, color: 'from-yellow-500 to-orange-600', count: 15, description: 'Monetization tips' },
  { id: 'trends', name: 'Trends', icon: TrendingUp, color: 'from-purple-500 to-indigo-600', count: 21, description: 'Latest in AI art' },
  { id: 'community', name: 'Community', icon: Heart, color: 'from-red-500 to-pink-600', count: 9, description: 'User highlights' }
];

const popularTags = [
  'AI Art', 'Fantasy', 'Cyberpunk', 'Fashion', 'Tutorial', 'Business', 'Prompts', 
  'Style Guide', 'Digital Art', 'Monetization', 'Trends', 'Community', 'Copyright',
  'Hair Color', 'Makeup', 'Cosplay', 'Portfolio', 'Marketing'
];

const trendingTopics = [
  { name: 'AI Fantasy Prompts', count: 142, trend: '+12%' },
  { name: 'Cyberpunk Fashion', count: 98, trend: '+8%' },
  { name: 'Art Monetization', count: 87, trend: '+15%' },
  { name: 'Digital Portfolios', count: 76, trend: '+6%' }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');

  // Filter and sort articles
  const filteredArticles = mockArticles
    .filter(article => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.views - a.views;
        case 'trending':
          return b.likes - a.likes;
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

  const featuredArticles = mockArticles.filter(article => article.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="bg-black min-h-screen">
      <Navigation 
        user={null}
        onAuth={() => {}}
        onLogout={() => {}}
        onShowAuthModal={() => {}}
        onShowDashboard={() => {}}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 py-20">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?random=100')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-purple-400 mr-3" />
              <span className="text-purple-300 font-medium">Digital Art Publication</span>
              <Zap className="w-5 h-5 text-yellow-400 ml-3" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-8">
              ALLURIST BLOG
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Your ultimate guide to <span className="text-purple-400 font-semibold">AI art mastery</span>, 
              <span className="text-pink-400 font-semibold"> fantasy fashion</span>, and 
              <span className="text-blue-400 font-semibold"> digital creativity</span>. 
              Discover tutorials, trends, and insider secrets from top creators.
            </p>
            
            {/* Stats Bar */}
            <div className="flex justify-center items-center space-x-8 text-gray-400 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{mockArticles.length}+</div>
                <div className="text-sm">Articles</div>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50k+</div>
                <div className="text-sm">Readers</div>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">6</div>
                <div className="text-sm">Categories</div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-gray-900/80 border border-gray-700 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <input
                      type="text"
                      placeholder="Search articles, tutorials, guides, artists..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-lg"
                    />
                  </div>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular' | 'trending')}
                    className="bg-gray-800 border border-gray-600 rounded-2xl px-6 py-4 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-lg min-w-[180px]"
                  >
                    <option value="latest">✨ Latest</option>
                    <option value="popular">🔥 Most Popular</option>
                    <option value="trending">📈 Trending</option>
                  </select>
                </div>
                
                {/* Results Counter */}
                <div className="mt-4 text-center">
                  <span className="text-gray-400">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                  </span>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-4 text-purple-400 hover:text-purple-300 text-sm"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Explore Categories</h2>
            <p className="text-xl text-gray-400">Discover content tailored to your interests</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6">
            {/* All Categories Button */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === 'all'
                  ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">All Topics</h3>
                <p className="text-gray-400 text-sm mb-2">Everything</p>
                <div className="text-purple-400 font-semibold">{mockArticles.length} articles</div>
              </div>
            </button>
            
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{category.description}</p>
                    <div className="text-purple-400 font-semibold">{category.count} articles</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4">Featured Articles</h2>
                <p className="text-xl text-gray-400">Editor's picks and trending content</p>
              </div>
              <div className="flex items-center text-purple-400">
                <Star className="w-6 h-6 mr-3 fill-current" />
                <span className="font-semibold">Editor's Choice</span>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {featuredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className={`group cursor-pointer ${index === 0 ? 'lg:col-span-2' : ''}`}
                >
                  <a href={`/blog/${article.slug}`} className="block">
                    <div className="bg-gray-900/50 border border-gray-700 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 transform hover:scale-[1.02]">
                      <div className={`relative ${index === 0 ? 'h-96' : 'h-80'}`}>
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        <div className="absolute top-6 left-6">
                          <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold capitalize">
                            {article.category}
                          </span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className={`text-white font-bold mb-4 group-hover:text-purple-300 transition-colors line-clamp-2 ${
                            index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'
                          }`}>
                            {article.title}
                          </h3>
                          <p className="text-gray-300 mb-6 line-clamp-2 text-lg">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6 text-gray-400">
                              <div className="flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                <span className="font-medium">{article.author.name}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-2" />
                                <span>{article.readTime}m read</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-5 h-5 mr-2" />
                                <span>{formatNumber(article.views)}</span>
                              </div>
                              <div className="flex items-center">
                                <Heart className="w-5 h-5 mr-2" />
                                <span>{formatNumber(article.likes)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(cat => cat.id === selectedCategory)?.name} Articles`}
              </h2>
              <p className="text-xl text-gray-400">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer"
              >
                <a href={`/blog/${article.slug}`} className="block">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
                    <div className="relative h-56">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-bold capitalize">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
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
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.readTime}m
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {formatNumber(article.views)}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {formatNumber(article.likes)}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Topics & Tags */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Trending Topics */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-green-400" />
                Trending Topics
              </h2>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{topic.name}</h3>
                        <p className="text-gray-400">{topic.count} articles</p>
                      </div>
                      <div className="text-green-400 font-bold text-lg">
                        {topic.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <Tag className="w-8 h-8 mr-3 text-purple-400" />
                Popular Topics
              </h2>
              <div className="flex flex-wrap gap-3">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="bg-gray-800 hover:bg-purple-600 border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Tag className="w-4 h-4 inline mr-2" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Stay Updated with Allurist</h2>
            <p className="text-xl text-gray-300">
              Get the latest AI art tutorials, fashion guides, and creator insights delivered weekly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email for exclusive content"
              className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-lg"
            />
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Join 50,000+ creators getting weekly insights • No spam, unsubscribe anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="text-pink-500 text-3xl font-bold mb-6">ALLURIST BLOG</div>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                Your ultimate destination for AI art tutorials, fantasy fashion guides, and digital creativity insights. 
                Empowering creators worldwide.
              </p>
              <div className="flex space-x-6 text-gray-500">
                <span className="cursor-pointer hover:text-white transition-colors">📱 TikTok</span>
                <span className="cursor-pointer hover:text-white transition-colors">📷 Instagram</span>
                <span className="cursor-pointer hover:text-white transition-colors">🎵 Spotify</span>
                <span className="cursor-pointer hover:text-white transition-colors">📌 Pinterest</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Categories</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
                <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-600">© 2025 Allurist Blog. Digital art publication for creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 