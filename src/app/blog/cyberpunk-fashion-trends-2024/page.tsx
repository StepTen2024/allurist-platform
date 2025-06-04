'use client'
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Calendar, Clock, Eye, Heart, Bookmark, Share2, ArrowLeft, ChevronRight, Twitter, Facebook, Linkedin, Link, User, Tag } from 'lucide-react';

// Mock article data
const article = {
  id: 4,
  slug: 'cyberpunk-fashion-trends-2024',
  title: 'Cyberpunk Fashion Trends Taking Over 2024',
  excerpt: 'Explore the fusion of technology and style. From neon accessories to smart fabrics, discover what\'s defining cyberpunk fashion.',
  content: `
    <h2>The Future is Now: Cyberpunk Fashion Revolution</h2>
    <p>Cyberpunk fashion is no longer confined to the realm of science fiction. In 2024, we're witnessing an unprecedented fusion of technology and style that's reshaping how we think about clothing, accessories, and personal expression. From neon-lit runways to street style influencers, the cyberpunk aesthetic is taking center stage.</p>
    
    <h3>Key Elements of Cyberpunk Fashion</h3>
    <p>The cyberpunk aesthetic draws inspiration from a dystopian future where technology and humanity merge. Key elements include:</p>
    <ul>
      <li><strong>Neon Color Palettes:</strong> Electric blues, hot pinks, and vibrant greens dominate the scene</li>
      <li><strong>Metallic Accents:</strong> Chrome, silver, and holographic materials add futuristic flair</li>
      <li><strong>Tech Integration:</strong> LED strips, smart fabrics, and wearable technology</li>
      <li><strong>Asymmetrical Cuts:</strong> Non-traditional silhouettes that challenge conventional fashion norms</li>
    </ul>
    
    <h3>Smart Fabrics: The Next Frontier</h3>
    <p>One of the most exciting developments in cyberpunk fashion is the integration of smart fabrics. These revolutionary materials can change color based on temperature, respond to sound with light patterns, or even charge your devices while you wear them.</p>
    
    <blockquote>
      "Fashion technology isn't just about looking futuristic – it's about creating clothing that actively enhances your daily life while making a bold style statement."
    </blockquote>
    
    <h3>Accessories That Define the Movement</h3>
    <p>Cyberpunk accessories are where creativity truly shines:</p>
    <ul>
      <li><strong>LED Jewelry:</strong> Programmable necklaces and bracelets that sync with your music</li>
      <li><strong>Augmented Reality Glasses:</strong> Not just functional, but fashion-forward</li>
      <li><strong>Holographic Bags:</strong> Reflective materials that shift color with movement</li>
      <li><strong>Circuit Board Accessories:</strong> Repurposed tech components as statement pieces</li>
    </ul>
    
    <h3>How to Incorporate Cyberpunk Elements</h3>
    <p>You don't need a complete wardrobe overhaul to embrace cyberpunk fashion. Start small with these approachable pieces:</p>
    <ol>
      <li>Add neon accents to your existing wardrobe</li>
      <li>Experiment with metallic makeup and nail art</li>
      <li>Incorporate one statement tech accessory</li>
      <li>Play with asymmetrical layering</li>
    </ol>
    
    <h3>The Future of Fashion Technology</h3>
    <p>As we look ahead, cyberpunk fashion represents more than just an aesthetic choice – it's a glimpse into the future of wearable technology. Designers are pushing boundaries, creating pieces that are both visually striking and functionally innovative.</p>
    
    <p>The movement challenges us to rethink the relationship between fashion and technology, asking: What if our clothes could do more than just cover our bodies? What if they could express our digital identities, connect us to the world around us, and adapt to our needs in real-time?</p>
  `,
  category: 'Fashion',
  tags: ['Cyberpunk', 'Fashion', 'Technology', 'Trends', 'Wearable Tech', 'Future Fashion'],
  author: {
    id: 4,
    name: 'Nova Style',
    bio: 'Fashion futurist and cyberpunk aesthetic specialist with over 10 years of experience in emerging fashion trends.',
    avatar: 'https://picsum.photos/100/100?random=4',
    socialMedia: {
      twitter: '@novastyle',
      instagram: '@nova.style'
    }
  },
  publishedAt: '2024-03-22',
  updatedAt: '2024-03-22',
  readTime: 8,
  views: 8730,
  likes: 198,
  bookmarks: 45,
  comments: 23,
  featured: false,
  coverImage: 'https://picsum.photos/1200/600?random=9',
  gallery: [
    'https://picsum.photos/800/500?random=20',
    'https://picsum.photos/800/500?random=21',
    'https://picsum.photos/800/500?random=22'
  ],
  seoTitle: 'Cyberpunk Fashion Trends 2024: The Future of Style & Technology',
  seoDescription: 'Discover the hottest cyberpunk fashion trends of 2024. From neon accessories to smart fabrics, explore how technology is revolutionizing fashion.',
  keywords: ['cyberpunk fashion', 'fashion trends 2024', 'smart fabrics', 'wearable technology', 'neon fashion', 'future fashion'],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cyberpunk Fashion Trends Taking Over 2024',
    description: 'Explore the fusion of technology and style. From neon accessories to smart fabrics, discover what\'s defining cyberpunk fashion.',
    author: {
      '@type': 'Person',
      name: 'Nova Style'
    },
    datePublished: '2024-03-22',
    dateModified: '2024-03-22'
  }
};

// Related articles
const relatedArticles = [
  {
    id: 5,
    slug: 'fantasy-hair-colors-complete-guide',
    title: 'Fantasy Hair Colors: Complete Transformation Guide',
    excerpt: 'Achieve stunning fantasy hair colors inspired by AI art.',
    category: 'Fashion',
    coverImage: 'https://picsum.photos/400/250?random=10',
    readTime: 10,
    views: 7650,
    likes: 234
  },
  {
    id: 1,
    slug: 'ultimate-ai-fantasy-art-guide',
    title: 'Ultimate Guide to AI Fantasy Art',
    excerpt: 'Master the art of creating breathtaking fantasy worlds using AI.',
    category: 'Tutorials',
    coverImage: 'https://picsum.photos/400/250?random=1',
    readTime: 12,
    views: 15420,
    likes: 342
  },
  {
    id: 6,
    slug: 'nft-art-business-strategies',
    title: 'NFT Art Business: Strategies That Actually Work',
    excerpt: 'Navigate the evolving NFT landscape with proven strategies.',
    category: 'Business',
    coverImage: 'https://picsum.photos/400/250?random=11',
    readTime: 15,
    views: 12200,
    likes: 267
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

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
    setShowShareMenu(false);
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
      
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(article.schema)
        }}
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
            <a href="/blog/category/fashion" className="hover:text-white transition-colors">Fashion</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-purple-400">Article</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="bg-pink-500 text-white px-4 py-2 rounded-lg font-bold">
                {article.category}
              </span>
              <div className="flex items-center text-gray-400 space-x-4">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {article.readTime} min read
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-8 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              {article.excerpt}
            </p>
            
            {/* Author Info */}
            <div className="flex items-center justify-center mb-8">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">{article.author.name}</h3>
                <p className="text-gray-400">{article.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Cover Image */}
            <div className="mb-12">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
            
            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            
            {/* Article Gallery */}
            {article.gallery && article.gallery.length > 0 && (
              <div className="my-16">
                <h3 className="text-2xl font-bold text-white mb-8">Gallery</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {article.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-64 object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Tags */}
            <div className="my-12">
              <h3 className="text-xl font-bold text-white mb-6">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-800 hover:bg-purple-600 text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Author Bio */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 my-12">
              <div className="flex items-start space-x-6">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">About {article.author.name}</h3>
                  <p className="text-gray-400 mb-4 text-lg">{article.author.bio}</p>
                  <div className="flex space-x-4">
                    <span className="text-purple-400 cursor-pointer hover:text-purple-300 transition-colors">
                      {article.author.socialMedia?.twitter}
                    </span>
                    <span className="text-purple-400 cursor-pointer hover:text-purple-300 transition-colors">
                      {article.author.socialMedia?.instagram}
                    </span>
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
                <h3 className="text-xl font-bold text-white mb-6">Article Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-400">
                      <Eye className="w-5 h-5 mr-2" />
                      Views
                    </span>
                    <span className="text-white font-semibold">{formatNumber(article.views)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-400">
                      <Heart className="w-5 h-5 mr-2" />
                      Likes
                    </span>
                    <span className="text-white font-semibold">{formatNumber(article.likes)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-400">
                      <Bookmark className="w-5 h-5 mr-2" />
                      Bookmarks
                    </span>
                    <span className="text-white font-semibold">{formatNumber(article.bookmarks)}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-full flex items-center justify-center px-4 py-3 rounded-xl transition-colors ${
                      isLiked
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Liked' : 'Like Article'}
                  </button>
                  
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`w-full flex items-center justify-center px-4 py-3 rounded-xl transition-colors ${
                      isBookmarked
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="w-full flex items-center justify-center bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white px-4 py-3 rounded-xl transition-colors"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Share Article
                    </button>
                    
                    {showShareMenu && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-xl p-4 z-10">
                        <div className="space-y-2">
                          <button
                            onClick={() => handleShare('twitter')}
                            className="w-full flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            <Twitter className="w-4 h-4 mr-3" />
                            Twitter
                          </button>
                          <button
                            onClick={() => handleShare('facebook')}
                            className="w-full flex items-center text-gray-300 hover:text-blue-600 transition-colors"
                          >
                            <Facebook className="w-4 h-4 mr-3" />
                            Facebook
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="w-full flex items-center text-gray-300 hover:text-blue-700 transition-colors"
                          >
                            <Linkedin className="w-4 h-4 mr-3" />
                            LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className="w-full flex items-center text-gray-300 hover:text-green-400 transition-colors"
                          >
                            <Link className="w-4 h-4 mr-3" />
                            Copy Link
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Related Articles */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((relatedArticle) => (
              <article key={relatedArticle.id} className="group cursor-pointer">
                <a href={`/blog/${relatedArticle.slug}`} className="block">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="relative h-48">
                      <img
                        src={relatedArticle.coverImage}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                          {relatedArticle.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {relatedArticle.readTime}m
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {formatNumber(relatedArticle.views)}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {formatNumber(relatedArticle.likes)}
                          </span>
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
      
      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="text-pink-500 text-3xl font-bold mb-6">ALLURIST BLOG</div>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                Your ultimate destination for cyberpunk fashion trends and digital creativity insights.
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
                <li><a href="/blog/category/tutorials" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="/blog/category/fashion" className="text-purple-400">Fashion</a></li>
                <li><a href="/blog/category/business" className="text-gray-400 hover:text-white transition-colors">Business</a></li>
                <li><a href="/blog/category/artists" className="text-gray-400 hover:text-white transition-colors">Artists</a></li>
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
            <p className="text-gray-600">© 2025 Allurist Blog. Fashion forward thinking for digital creators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 