'use client'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import { Search, Filter, TrendingUp, Clock, Heart, Eye, User, Calendar, Tag, ArrowRight, Star, BookOpen, Palette, DollarSign, Users, Grid, List, ChevronDown, ArrowLeft, ChevronRight } from 'lucide-react';

// Enhanced mock articles with more comprehensive data
const mockArticles = {
  tutorials: [
    {
      id: 1,
      slug: 'ultimate-ai-fantasy-art-guide',
      title: 'Ultimate Guide to AI Fantasy Art: From Prompts to Masterpieces',
      excerpt: 'Master the art of creating breathtaking fantasy worlds using AI. Learn advanced prompting techniques, composition secrets, and professional post-processing methods.',
      category: 'Tutorials',
      tags: ['AI Art', 'Fantasy', 'Digital Painting', 'Prompts'],
      author: {
        id: 1,
        name: 'Elena Rodriguez',
        bio: 'Professional digital artist with 8+ years experience in fantasy art.',
        avatar: 'https://picsum.photos/40/40?random=1'
      },
      publishedAt: '2024-03-15',
      readTime: 12,
      views: 15420,
      likes: 342,
      featured: true,
      coverImage: 'https://picsum.photos/800/400?random=1',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      slug: 'ai-character-design-complete-course',
      title: 'AI Character Design: Complete Course for Beginners',
      excerpt: 'Learn to create compelling characters using AI tools. From concept to final render, master the complete character design workflow.',
      category: 'Tutorials',
      tags: ['Character Design', 'AI Art', 'Beginner', 'Tutorial'],
      author: {
        id: 2,
        name: 'Marcus Chen',
        bio: 'Character designer for major gaming studios.',
        avatar: 'https://picsum.photos/40/40?random=2'
      },
      publishedAt: '2024-03-18',
      readTime: 15,
      views: 12300,
      likes: 289,
      featured: false,
      coverImage: 'https://picsum.photos/800/400?random=7',
      difficulty: 'Beginner'
    },
    {
      id: 3,
      slug: 'advanced-prompt-engineering-techniques',
      title: 'Advanced Prompt Engineering: Pro Techniques for Better AI Art',
      excerpt: 'Unlock the full potential of AI art generation with advanced prompting strategies used by professional digital artists.',
      category: 'Tutorials',
      tags: ['Prompts', 'Advanced', 'AI Art', 'Professional'],
      author: {
        id: 3,
        name: 'Sarah Kim',
        bio: 'AI art consultant and prompt engineering expert.',
        avatar: 'https://picsum.photos/40/40?random=3'
      },
      publishedAt: '2024-03-20',
      readTime: 18,
      views: 9850,
      likes: 445,
      featured: true,
      coverImage: 'https://picsum.photos/800/400?random=8',
      difficulty: 'Advanced'
    }
  ],
  fashion: [
    {
      id: 4,
      slug: 'cyberpunk-fashion-trends-2024',
      title: 'Cyberpunk Fashion Trends Taking Over 2024',
      excerpt: 'Explore the fusion of technology and style. From neon accessories to smart fabrics, discover what\'s defining cyberpunk fashion.',
      category: 'Fashion',
      tags: ['Cyberpunk', 'Fashion', 'Technology', 'Trends'],
      author: {
        id: 4,
        name: 'Nova Style',
        bio: 'Fashion futurist and cyberpunk aesthetic specialist.',
        avatar: 'https://picsum.photos/40/40?random=4'
      },
      publishedAt: '2024-03-22',
      readTime: 8,
      views: 8730,
      likes: 198,
      featured: false,
      coverImage: 'https://picsum.photos/800/400?random=9',
      difficulty: 'Beginner'
    },
    {
      id: 5,
      slug: 'fantasy-hair-colors-complete-guide',
      title: 'Fantasy Hair Colors: Complete Transformation Guide',
      excerpt: 'Achieve stunning fantasy hair colors inspired by AI art. Rainbow gradients, ethereal pastels, and otherworldly hues await.',
      category: 'Fashion',
      tags: ['Hair', 'Fantasy', 'Color', 'Style'],
      author: {
        id: 5,
        name: 'Rainbow Maven',
        bio: 'Color specialist and fantasy fashion expert.',
        avatar: 'https://picsum.photos/40/40?random=5'
      },
      publishedAt: '2024-03-25',
      readTime: 10,
      views: 7650,
      likes: 234,
      featured: true,
      coverImage: 'https://picsum.photos/800/400?random=10',
      difficulty: 'Intermediate'
    }
  ],
  business: [
    {
      id: 6,
      slug: 'nft-art-business-strategies',
      title: 'NFT Art Business: Strategies That Actually Work in 2024',
      excerpt: 'Navigate the evolving NFT landscape with proven strategies. Market positioning, community building, and sustainable income streams.',
      category: 'Business',
      tags: ['NFT', 'Business', 'Digital Art', 'Crypto'],
      author: {
        id: 6,
        name: 'Crypto Artist',
        bio: 'NFT strategist and digital art entrepreneur.',
        avatar: 'https://picsum.photos/40/40?random=6'
      },
      publishedAt: '2024-03-28',
      readTime: 15,
      views: 12200,
      likes: 267,
      featured: true,
      coverImage: 'https://picsum.photos/800/400?random=11',
      difficulty: 'Advanced'
    },
    {
      id: 7,
      slug: 'ai-art-copyright-what-you-need-to-know',
      title: 'AI Art Copyright: What You Need to Know in 2025',
      excerpt: 'Navigate the complex world of AI art copyright with our comprehensive legal guide for digital artists and creators.',
      category: 'Business',
      tags: ['Copyright', 'Legal', 'AI Art', 'Business'],
      author: {
        id: 7,
        name: 'Legal Expert',
        bio: 'Digital art business consultant and legal advisor.',
        avatar: 'https://picsum.photos/40/40?random=7'
      },
      publishedAt: '2024-03-30',
      readTime: 14,
      views: 6890,
      likes: 134,
      featured: false,
      coverImage: 'https://picsum.photos/800/400?random=12',
      difficulty: 'Intermediate'
    }
  ],
  artists: [
    {
      id: 8,
      slug: 'spotlight-emerging-digital-artist-alex-nova',
      title: 'Artist Spotlight: How Alex Nova Redefined Digital Surrealism',
      excerpt: 'Meet the visionary artist behind the viral "Digital Dreams" series. Discover their unique process and creative journey.',
      category: 'Artists',
      tags: ['Artist Spotlight', 'Surrealism', 'Digital Art', 'Interview'],
      author: {
        id: 8,
        name: 'Art Curator',
        bio: 'Art journalist focused on emerging digital artists.',
        avatar: 'https://picsum.photos/40/40?random=8'
      },
      publishedAt: '2024-04-02',
      readTime: 10,
      views: 6840,
      likes: 156,
      featured: false,
      coverImage: 'https://picsum.photos/800/400?random=13',
      difficulty: 'Beginner'
    }
  ]
};

// Category metadata for SEO optimization
const categories = {
  tutorials: {
    name: 'AI Art Tutorials',
    description: 'Master AI art creation with our comprehensive tutorials. From beginner guides to advanced techniques, learn prompting, character design, and professional workflows.',
    icon: BookOpen,
    color: 'from-blue-500 to-purple-600',
    count: 24,
    keywords: ['AI art tutorials', 'digital art guides', 'AI prompting', 'character design', 'fantasy art'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'AI Art Tutorials - Allurist Blog',
      description: 'Comprehensive collection of AI art tutorials for all skill levels.',
      url: 'https://allurist.com/blog/category/tutorials'
    }
  },
  fashion: {
    name: 'Fantasy Fashion & Style',
    description: 'Explore the intersection of fantasy and fashion. Cyberpunk aesthetics, fantasy hair colors, and futuristic style guides for the modern creator.',
    icon: Palette,
    color: 'from-pink-500 to-rose-600',
    count: 18,
    keywords: ['fantasy fashion', 'cyberpunk style', 'fantasy hair', 'futuristic fashion', 'digital fashion'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Fantasy Fashion & Style - Allurist Blog',
      description: 'Fantasy fashion guides and style inspiration for digital creators.',
      url: 'https://allurist.com/blog/category/fashion'
    }
  },
  business: {
    name: 'Digital Art Business',
    description: 'Build a successful digital art business. NFT strategies, copyright guidance, monetization tips, and professional development for digital artists.',
    icon: DollarSign,
    color: 'from-yellow-500 to-orange-600',
    count: 15,
    keywords: ['digital art business', 'NFT strategies', 'art monetization', 'copyright law', 'freelance artist'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Digital Art Business - Allurist Blog',
      description: 'Business strategies and monetization guides for digital artists.',
      url: 'https://allurist.com/blog/category/business'
    }
  },
  artists: {
    name: 'Artist Spotlights',
    description: 'Meet the creators shaping digital art. Exclusive interviews, portfolio showcases, and behind-the-scenes looks at emerging and established digital artists.',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    count: 12,
    keywords: ['digital artists', 'artist interviews', 'portfolio showcase', 'creative process', 'art community'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Artist Spotlights - Allurist Blog',
      description: 'Featured artist interviews and portfolio showcases.',
      url: 'https://allurist.com/blog/category/artists'
    }
  }
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Get category data
  const categoryData = categories[category as keyof typeof categories];
  const articles = mockArticles[category as keyof typeof mockArticles] || [];

  // Filter and sort articles
  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDifficulty = difficultyFilter === 'all' || article.difficulty.toLowerCase() === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (!categoryData) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          <p className="text-gray-400 mb-8">The category you're looking for doesn't exist.</p>
          <a href="/blog" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  const Icon = categoryData.icon;

  return (
    <div className="bg-black min-h-screen">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoryData.schema)
        }}
      />
      
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
            <span className="text-purple-400">{categoryData.name}</span>
          </div>
        </div>
      </nav>

      {/* Category Header */}
      <header className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${categoryData.color} rounded-3xl mb-8`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-8">
              {categoryData.name}
            </h1>
            
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              {categoryData.description}
            </p>
            
            {/* Category Stats */}
            <div className="flex justify-center items-center space-x-8 text-gray-400 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{filteredArticles.length}</div>
                <div className="text-sm">Articles</div>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {formatNumber(filteredArticles.reduce((sum, article) => sum + article.views, 0))}
                </div>
                <div className="text-sm">Total Views</div>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {formatNumber(filteredArticles.reduce((sum, article) => sum + article.likes, 0))}
                </div>
                <div className="text-sm">Total Likes</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <section className="py-12 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/80 border border-gray-700 rounded-3xl p-8">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder={`Search ${categoryData.name.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-lg"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular' | 'trending')}
                className="bg-gray-800 border border-gray-600 rounded-2xl px-6 py-4 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-lg min-w-[180px]"
              >
                <option value="latest">✨ Latest</option>
                <option value="popular">🔥 Most Popular</option>
                <option value="trending">📈 Trending</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-800 border border-gray-600 rounded-2xl p-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-gray-300 hover:text-white transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Difficulty Filter */}
              {category === 'tutorials' && (
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as 'all' | 'beginner' | 'intermediate' | 'advanced')}
                  className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">🟢 Beginner</option>
                  <option value="intermediate">🟡 Intermediate</option>
                  <option value="advanced">🔴 Advanced</option>
                </select>
              )}

              {/* Results Counter */}
              <div className="text-gray-400 ml-auto">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid/List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <h2 className="text-3xl font-bold text-white mb-4">No Articles Found</h2>
              <p className="text-gray-400 mb-8">Try adjusting your search terms or filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setDifficultyFilter('all');
                }}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article key={article.id} className="group">
                  <a href={`/blog/${article.slug}`} className="block">
                    <div className="bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="relative h-48">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-bold capitalize">
                            {article.category}
                          </span>
                          {article.difficulty && (
                            <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getDifficultyColor(article.difficulty)}`}>
                              {article.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <img
                              src={article.author.avatar}
                              alt={article.author.name}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div>
                              <p className="text-white font-semibold text-sm">{article.author.name}</p>
                              <p className="text-gray-500 text-xs">{formatDate(article.publishedAt)}</p>
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
          ) : (
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <article key={article.id} className="group">
                  <a href={`/blog/${article.slug}`} className="block">
                    <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                      <div className="flex gap-6">
                        <div className="flex-shrink-0">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-48 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                                {article.category}
                              </span>
                              {article.difficulty && (
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(article.difficulty)}`}>
                                  {article.difficulty}
                                </span>
                              )}
                              {article.featured && (
                                <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-xs font-bold flex items-center">
                                  <Star className="w-3 h-3 mr-1 fill-current" />
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 mb-4 leading-relaxed">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img
                                src={article.author.avatar}
                                alt={article.author.name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <p className="text-white font-semibold">{article.author.name}</p>
                                <p className="text-gray-500 text-sm">{formatDate(article.publishedAt)}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6 text-gray-500">
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
                              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-2 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="text-pink-500 text-3xl font-bold mb-6">ALLURIST BLOG</div>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                Your ultimate destination for {categoryData.name.toLowerCase()} and digital creativity insights.
              </p>
              <div className="flex space-x-6 text-gray-500">
                <span className="cursor-pointer hover:text-white transition-colors">📱 TikTok</span>
                <span className="cursor-pointer hover:text-white transition-colors">📷 Instagram</span>
                <span className="cursor-pointer hover:text-white transition-colors">🎵 Spotify</span>
                <span className="cursor-pointer hover:text-white transition-colors">📌 Pinterest</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Other Categories</h3>
              <ul className="space-y-3">
                {Object.entries(categories).map(([key, cat]) => (
                  <li key={key}>
                    <a
                      href={`/blog/category/${key}`}
                      className={`transition-colors ${key === category ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">All Articles</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-600">© 2025 Allurist Blog. Specialized in {categoryData.name.toLowerCase()} for digital creators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 