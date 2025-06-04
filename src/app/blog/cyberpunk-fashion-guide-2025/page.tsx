'use client'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Calendar, Clock, Eye, Heart, User, Share2, BookmarkPlus, ArrowLeft, ArrowRight, Tag, ChevronRight, Copy, Facebook, Twitter, Linkedin, Star } from 'lucide-react';

// Mock article data
const mockArticle = {
  id: 2,
  slug: 'cyberpunk-fashion-guide-2025',
  title: 'Get the Cyberpunk Look: Fashion Guide for Real Life',
  excerpt: 'Transform AI cyberpunk aesthetics into wearable fashion with our curated shopping guide and styling tips that bring the future to your wardrobe.',
  content: `# Get the Cyberpunk Look: Fashion Guide for Real Life

## Introduction

The cyberpunk aesthetic has exploded in popularity, transforming from science fiction concept art into a real-world fashion movement. This comprehensive guide will show you how to achieve the cyberpunk look while remaining practical for everyday wear.

## Key Cyberpunk Fashion Elements

### 1. Color Palette
- **Neon Colors**: Electric blue, hot pink, acid green
- **Base Colors**: Black, dark gray, metallic silver
- **Accent Colors**: Chrome, holographic materials

### 2. Essential Pieces

#### Outerwear
- **Leather or Faux Leather Jackets**: The cornerstone of cyberpunk style
- **Reflective Materials**: Holographic or metallic finishes
- **Asymmetrical Cuts**: Unique silhouettes that break traditional fashion rules

#### Bottoms
- **Tech Pants**: Cargo pants with multiple pockets and straps
- **Leather Pants**: Fitted or loose, in black or metallic
- **Distressed Jeans**: With neon accents or patches

### 3. Accessories That Matter

#### Tech-Inspired Jewelry
- LED accessories that actually light up
- Circuit board patterns
- Geometric designs in metal

#### Footwear
- **Platform Boots**: Combat boots with chunky soles
- **LED Sneakers**: Shoes with built-in lighting
- **Metallic Finishes**: Chrome or holographic materials

## Shopping Guide: Where to Buy

### High Street Options
1. **Zara**: Tech-wear inspired pieces
2. **H&M**: Affordable cyberpunk accessories
3. **ASOS**: Wide selection of alternative fashion

### Specialized Brands
1. **Cyberdog**: Original rave and cyber fashion
2. **Killstar**: Dark alternative fashion
3. **Disturbia**: Gothic and cyber clothing

### DIY Modifications
- Add LED strips to existing clothing
- Apply holographic tape to accessories
- Customize with neon paint or patches

## Styling Tips for Different Occasions

### Everyday Cyberpunk
- Start with black basics
- Add one neon accent piece
- Include subtle tech accessories

### Full Cyber Look
- Layer metallic and leather pieces
- Multiple LED accessories
- Bold makeup with neon colors

## Makeup and Hair

### Cyberpunk Makeup
- **Eyes**: Electric blue or pink eyeshadow
- **Lips**: Metallic or matte black lipstick
- **Face**: Geometric patterns with face paint

### Hair Styling
- **Colors**: Electric blue, pink, or silver
- **Cuts**: Asymmetrical, undercuts, or shaved patterns
- **Accessories**: LED hair clips or metallic hair ties

## Budget-Friendly Cyberpunk Style

### Under $50
- Black cargo pants: $25
- Neon accessories: $15
- LED jewelry: $10

### Under $100
- Faux leather jacket: $60
- Platform boots: $40

### Under $200
- Complete cyberpunk outfit with quality pieces

## Conclusion

Achieving the cyberpunk look is about combining futuristic elements with practical wearability. Start with basics and gradually add more statement pieces as you develop your personal cyber style.

Remember: confidence is your best accessory in any cyberpunk outfit!`,
  category: 'Fashion',
  tags: ['Fashion', 'Cyberpunk', 'Style Guide', 'Shopping'],
  author: {
    id: 2,
    name: 'Neon Styles',
    bio: 'Fashion stylist and trend forecaster specializing in alternative and futuristic fashion. Neon has styled for major fashion weeks and cyberpunk events worldwide.',
    avatar: 'https://picsum.photos/64/64?random=2',
    social: {
      instagram: '@neonstyles_fashion',
      tiktok: '@neonstyles',
      website: 'https://neonstyles.fashion'
    }
  },
  publishedAt: '2025-01-14T14:30:00Z',
  updatedAt: '2025-01-14T16:15:00Z',
  readTime: 8,
  views: 8920,
  likes: 156,
  bookmarks: 42,
  comments: 28,
  featured: true,
  coverImage: 'https://picsum.photos/1920/1080?random=2',
  gallery: [
    {
      id: 1,
      url: 'https://picsum.photos/800/600?random=20',
      caption: 'Essential cyberpunk color palette and styling examples',
      alt: 'Cyberpunk fashion color palette'
    },
    {
      id: 2,
      url: 'https://picsum.photos/800/600?random=21',
      caption: 'Tech-wear accessories and LED jewelry showcase',
      alt: 'Cyberpunk accessories collection'
    }
  ],
  seoTitle: 'Cyberpunk Fashion Guide 2025 - Get the Future Look',
  seoDescription: 'Transform cyberpunk AI art into real fashion. Shopping guide, styling tips, and where to buy cyberpunk clothing.',
  keywords: ['cyberpunk fashion', 'futuristic clothing', 'cyberpunk style', 'alternative fashion']
};

const relatedArticles = [
  {
    id: 1,
    slug: 'ultimate-ai-fantasy-art-guide',
    title: 'Ultimate Guide to AI Fantasy Art: From Prompts to Masterpieces',
    excerpt: 'Master the art of AI-generated fantasy characters with our comprehensive guide.',
    coverImage: 'https://picsum.photos/400/300?random=1',
    category: 'Tutorials',
    readTime: 12,
    views: 15420,
    likes: 234,
    publishedAt: '2025-01-15',
    author: {
      name: 'Luna Starweaver',
      avatar: 'https://picsum.photos/40/40?random=1'
    }
  },
  {
    id: 3,
    slug: 'artist-spotlight-digital-masters',
    title: 'Artist Spotlight: Meet the Digital Art Masters Shaping AI',
    excerpt: 'Exclusive interviews with top digital artists shaping the AI art landscape.',
    coverImage: 'https://picsum.photos/400/300?random=3',
    category: 'Artists',
    readTime: 15,
    views: 12340,
    likes: 189,
    publishedAt: '2025-01-13',
    author: {
      name: 'Art Curator',
      avatar: 'https://picsum.photos/40/40?random=3'
    }
  }
];

export default function ArticlePage() {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

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

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = mockArticle.title;

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Article URL copied to clipboard!');
      return;
    }

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
      return;
    }

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
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
      
      {/* Breadcrumb */}
      <nav className="bg-gray-900/30 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 text-gray-400">
            <a href="/" className="hover:text-white transition-colors flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-purple-400 capitalize">{mockArticle.category}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300 truncate">{mockArticle.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="py-16 bg-gradient-to-br from-pink-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-pink-500/10 border border-pink-500/20 rounded-full px-6 py-3 mb-8">
              <Tag className="w-5 h-5 text-pink-400 mr-3" />
              <span className="text-pink-300 font-semibold capitalize">{mockArticle.category}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              {mockArticle.title}
            </h1>
            
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              {mockArticle.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 mb-12">
              <div className="flex items-center">
                <img
                  src={mockArticle.author.avatar}
                  alt={mockArticle.author.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="text-left">
                  <p className="text-white font-bold text-lg">{mockArticle.author.name}</p>
                  <p className="text-gray-400">Fashion Stylist</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="text-white font-semibold">{formatDate(mockArticle.publishedAt)}</p>
                  <p className="text-gray-400">Published</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="text-white font-semibold">{mockArticle.readTime} min</p>
                  <p className="text-gray-400">Read time</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Eye className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="text-white font-semibold">{formatNumber(mockArticle.views)}</p>
                  <p className="text-gray-400">Views</p>
                </div>
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                  isLiked
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400'
                }`}
              >
                <Heart className={`w-6 h-6 mr-3 ${isLiked ? 'fill-current' : ''}`} />
                {formatNumber(mockArticle.likes + (isLiked ? 1 : 0))} Likes
              </button>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                  isBookmarked
                    ? 'bg-yellow-500 border-yellow-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-400'
                }`}
              >
                <BookmarkPlus className={`w-6 h-6 mr-3 ${isBookmarked ? 'fill-current' : ''}`} />
                Save Article
              </button>
              
              <div className="relative">
                <button
                  onClick={() => handleShare()}
                  className="flex items-center px-6 py-3 rounded-full border-2 bg-gray-800 border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
                >
                  <Share2 className="w-6 h-6 mr-3" />
                  Share Article
                </button>
                
                {showShareMenu && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-xl p-4 shadow-xl z-10">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Twitter className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="p-3 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        <Facebook className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="p-3 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Copy className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src={mockArticle.coverImage}
            alt={mockArticle.title}
            className="w-full h-96 md:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-16">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <div 
              className="prose prose-invert prose-xl max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
                prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
                prose-ul:text-gray-300 prose-li:mb-3 prose-li:text-lg
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300"
              dangerouslySetInnerHTML={{ __html: mockArticle.content }}
            />

            {/* Tags */}
            <div className="my-16">
              <h3 className="text-2xl font-bold text-white mb-6">Article Tags</h3>
              <div className="flex flex-wrap gap-4">
                {mockArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-800 border border-gray-600 text-gray-300 px-4 py-3 rounded-xl hover:border-purple-500 hover:text-purple-400 transition-all duration-300 cursor-pointer font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 border border-gray-700 rounded-3xl p-10 my-16">
              <div className="flex items-start space-x-8">
                <img
                  src={mockArticle.author.avatar}
                  alt={mockArticle.author.name}
                  className="w-24 h-24 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4">{mockArticle.author.name}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">{mockArticle.author.bio}</p>
                  <div className="flex space-x-6">
                    {mockArticle.author.social.instagram && (
                      <a 
                        href={`https://instagram.com/${mockArticle.author.social.instagram.replace('@', '')}`}
                        className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </a>
                    )}
                    {mockArticle.author.social.tiktok && (
                      <a 
                        href={`https://tiktok.com/${mockArticle.author.social.tiktok.replace('@', '')}`}
                        className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        TikTok
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Article Stats */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Article Stats
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Views</span>
                    <span className="text-white font-semibold">{formatNumber(mockArticle.views)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Likes</span>
                    <span className="text-white font-semibold">{formatNumber(mockArticle.likes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bookmarks</span>
                    <span className="text-white font-semibold">{formatNumber(mockArticle.bookmarks)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Comments</span>
                    <span className="text-white font-semibold">{mockArticle.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Related Articles */}
      <section className="py-20 bg-gray-900/30 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedArticles.map((relatedArticle) => (
              <article
                key={relatedArticle.id}
                className="group cursor-pointer"
              >
                <a href={`/blog/${relatedArticle.slug}`} className="block">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="relative h-48">
                      <img
                        src={relatedArticle.coverImage}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-bold capitalize">
                          {relatedArticle.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {relatedArticle.readTime}m
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {formatNumber(relatedArticle.views)}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {formatNumber(relatedArticle.likes)}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

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