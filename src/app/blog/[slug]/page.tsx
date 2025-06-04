'use client'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Calendar, Clock, Eye, Heart, User, Share2, BookmarkPlus, ArrowLeft, ArrowRight, Tag, MessageCircle, ThumbsUp, ChevronRight, Copy, Facebook, Twitter, Linkedin, Download, Star } from 'lucide-react';

// Mock article data - will be replaced with real CMS
const mockArticles = [
  {
    id: 1,
    slug: 'ultimate-ai-fantasy-art-guide',
    title: 'Ultimate Guide to AI Fantasy Art: From Prompts to Masterpieces',
    excerpt: 'Master the art of AI-generated fantasy characters with our comprehensive guide covering prompts, styles, and advanced techniques that will transform your creative process.',
    content: `
      <h2>Introduction to AI Fantasy Art</h2>
      <p>AI-generated fantasy art has revolutionized the creative landscape, offering artists unprecedented tools to bring their wildest imaginations to life. Whether you're a seasoned digital artist or just starting your creative journey, this comprehensive guide will walk you through everything you need to know about creating stunning fantasy art using AI.</p>
      
      <p>The world of AI art is expanding rapidly, with new tools and techniques emerging daily. From Midjourney to DALL-E, from Stable Diffusion to NovelAI, the possibilities are endless. But with great power comes the need for great knowledge - and that's exactly what this guide provides.</p>
      
      <h2>Understanding AI Art Prompts</h2>
      <p>The foundation of great AI art lies in crafting effective prompts. A well-structured prompt acts as a blueprint for the AI, guiding it to create exactly what you envision. Here are the key elements of a successful fantasy art prompt:</p>
      
      <h3>1. Subject Description</h3>
      <p>Start with a clear description of your main subject. For fantasy art, this could be:</p>
      <ul>
        <li><strong>Character types:</strong> "ethereal elven warrior", "cyberpunk sorceress", "dragon rider"</li>
        <li><strong>Creatures:</strong> "majestic phoenix", "shadow wolf", "crystal dragon"</li>
        <li><strong>Environments:</strong> "floating castle", "enchanted forest", "alien landscape"</li>
      </ul>
      
      <h3>2. Style and Aesthetic</h3>
      <p>Define the visual style you want to achieve:</p>
      <ul>
        <li><strong>Art styles:</strong> "hyperrealistic", "anime", "oil painting", "digital art"</li>
        <li><strong>Color palettes:</strong> "vibrant neon", "muted earth tones", "monochromatic blue"</li>
        <li><strong>Lighting:</strong> "dramatic backlighting", "soft morning light", "mystical glow"</li>
      </ul>
      
      <h2>Advanced Prompting Techniques</h2>
      <p>Once you've mastered the basics, these advanced techniques will help you create truly exceptional fantasy art:</p>
      
      <h3>Negative Prompting</h3>
      <p>Use negative prompts to exclude unwanted elements from your artwork. This is crucial for maintaining the fantasy aesthetic and avoiding modern or realistic elements that might break the immersion. Examples include "no modern technology", "no photography", "no realistic skin".</p>
      
      <h3>Weight and Emphasis</h3>
      <p>Learn to use weight modifiers to emphasize certain aspects of your prompt. Most AI art generators allow you to increase or decrease the importance of specific words or phrases using parentheses or brackets.</p>
      
      <h2>Popular Fantasy Art Styles</h2>
      <p>Explore these trending fantasy art styles that are perfect for AI generation:</p>
      
      <h3>1. Dark Fantasy</h3>
      <p>Characterized by gothic elements, muted colors, and atmospheric lighting. Perfect for creating mysterious and haunting artwork that captivates viewers.</p>
      
      <h3>2. High Fantasy</h3>
      <p>Bright, colorful, and magical. Think Lord of the Rings meets Disney magic - vibrant worlds filled with wonder and enchantment.</p>
      
      <h3>3. Cyberpunk Fantasy</h3>
      <p>A fusion of futuristic technology with magical elements. Neon colors meet mystical powers in this increasingly popular aesthetic.</p>
      
      <h2>Technical Considerations</h2>
      <p>When creating AI fantasy art, consider these technical aspects:</p>
      
      <h3>Resolution and Aspect Ratios</h3>
      <p>Different platforms require different image sizes. Instagram favors square images, while Pinterest loves vertical formats. Plan your compositions accordingly.</p>
      
      <h3>Iteration and Refinement</h3>
      <p>AI art is an iterative process. Don't expect perfect results on the first try. Use img2img techniques to refine your creations.</p>
      
      <h2>Tips for Commercial Success</h2>
      <p>If you're looking to monetize your AI fantasy art, consider these strategies:</p>
      <ul>
        <li><strong>Focus on trending themes:</strong> Stay current with popular fantasy tropes and seasonal trends</li>
        <li><strong>Create series and collections:</strong> Consistency builds brand recognition</li>
        <li><strong>Optimize for social media:</strong> Each platform has its own aesthetic preferences</li>
        <li><strong>Engage with the community:</strong> Building relationships is key to long-term success</li>
        <li><strong>Offer multiple formats:</strong> Prints, digital downloads, NFTs - diversify your offerings</li>
      </ul>
      
      <h2>Common Mistakes to Avoid</h2>
      <p>Learn from others' mistakes to accelerate your progress:</p>
      <ul>
        <li>Over-complicating prompts - sometimes less is more</li>
        <li>Ignoring composition rules - AI still benefits from good artistic principles</li>
        <li>Not saving prompt variations - document what works</li>
        <li>Rushing the process - great art takes time and iteration</li>
      </ul>
      
      <h2>Future of AI Fantasy Art</h2>
      <p>The field continues to evolve rapidly. New models, techniques, and tools are constantly emerging. Stay curious, keep experimenting, and don't be afraid to push boundaries.</p>
      
      <h2>Conclusion</h2>
      <p>AI fantasy art opens up infinite possibilities for creative expression. With the right prompts, techniques, and artistic vision, you can create artwork that captivates audiences and stands out in the digital art marketplace. Remember, the key to success is experimentation, continuous learning, and staying true to your unique creative voice.</p>
      
      <p>The journey into AI fantasy art is just beginning. As technology advances and new tools emerge, the only limit is your imagination. Start creating today, and let your fantasies come to life through the power of artificial intelligence.</p>
    `,
    category: 'tutorials',
    tags: ['AI Art', 'Fantasy', 'Prompts', 'Tutorial', 'Digital Art'],
    author: {
      id: 1,
      name: 'Luna Starweaver',
      avatar: '/api/placeholder/60/60',
      bio: 'Professional AI Artist & Tutorial Creator with over 5 years of experience in digital art. Specializes in fantasy and sci-fi artwork, and has created tutorials viewed by over 100,000 artists worldwide.',
      social: {
        twitter: '@lunastarweaver',
        instagram: '@luna_art_official',
        website: 'lunastarweaver.art'
      }
    },
    publishedAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T15:30:00Z',
    readTime: 12,
    views: 15420,
    likes: 234,
    bookmarks: 89,
    comments: 42,
    featured: true,
    coverImage: '/api/placeholder/1200/600',
    gallery: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    seoTitle: 'AI Fantasy Art Guide 2025 - Master Prompts & Techniques',
    seoDescription: 'Learn AI fantasy art creation with our ultimate guide. Master prompts, styles, and techniques for stunning fantasy characters. Complete tutorial for beginners and pros.',
    keywords: ['AI art', 'fantasy art', 'AI prompts', 'digital art tutorial', 'fantasy character creation'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Ultimate Guide to AI Fantasy Art: From Prompts to Masterpieces',
      description: 'Master the art of AI-generated fantasy characters with our comprehensive guide covering prompts, styles, and advanced techniques.',
      author: {
        '@type': 'Person',
        name: 'Luna Starweaver'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Allurist',
        logo: {
          '@type': 'ImageObject',
          url: 'https://allurist-platform.vercel.app/logo.png'
        }
      },
      datePublished: '2025-01-15T10:00:00Z',
      dateModified: '2025-01-15T15:30:00Z'
    }
  }
];

const relatedArticles = [
  {
    id: 2,
    slug: 'cyberpunk-fashion-guide-2025',
    title: 'Get the Cyberpunk Look: Fashion Guide for Real Life',
    excerpt: 'Transform AI cyberpunk aesthetics into wearable fashion.',
    coverImage: '/api/placeholder/300/200',
    category: 'fashion',
    readTime: 8,
    views: 8920,
    likes: 156
  },
  {
    id: 3,
    slug: 'artist-spotlight-digital-masters',
    title: 'Artist Spotlight: Meet the Digital Art Masters',
    excerpt: 'Exclusive interviews with top digital artists.',
    coverImage: '/api/placeholder/300/200',
    category: 'artists',
    readTime: 15,
    views: 12340,
    likes: 189
  },
  {
    id: 4,
    slug: 'ai-art-business-monetization-2025',
    title: 'How to Monetize Your AI Art in 2025',
    excerpt: 'Turn your AI art passion into profit.',
    coverImage: '/api/placeholder/300/200',
    category: 'business',
    readTime: 18,
    views: 9870,
    likes: 267
  }
];

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Find the article by slug
  const article = mockArticles.find(a => a.slug === slug) || mockArticles[0];
  
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
    const title = article.title;
    const text = article.excerpt;

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

    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      return;
    }

    // Native share API fallback
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
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
            <span className="text-purple-400 capitalize">{article.category}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300 truncate">{article.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="py-16 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-8">
              <Tag className="w-5 h-5 text-purple-400 mr-3" />
              <span className="text-purple-300 font-semibold capitalize">{article.category}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 mb-12">
              <div className="flex items-center">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="text-left">
                  <p className="text-white font-bold text-lg">{article.author.name}</p>
                  <p className="text-gray-400">Author</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="text-white font-semibold">{formatDate(article.publishedAt)}</p>
                  <p className="text-gray-400">Published</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="text-white font-semibold">{article.readTime} min</p>
                  <p className="text-gray-400">Read time</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Eye className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="text-white font-semibold">{formatNumber(article.views)}</p>
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
                {formatNumber(article.likes + (isLiked ? 1 : 0))} Likes
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
                        onClick={() => handleShare('linkedin')}
                        className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
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
            src={article.coverImage}
            alt={article.title}
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
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Gallery */}
            {article.gallery && article.gallery.length > 0 && (
              <section className="my-16">
                <h3 className="text-3xl font-bold text-white mb-8">Featured Artwork Examples</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {article.gallery.map((image, index) => (
                    <div key={index} className="relative rounded-2xl overflow-hidden group">
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            <div className="my-16">
              <h3 className="text-2xl font-bold text-white mb-6">Article Tags</h3>
              <div className="flex flex-wrap gap-4">
                {article.tags.map((tag) => (
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
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-gray-700 rounded-3xl p-10 my-16">
              <div className="flex items-start space-x-8">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-24 h-24 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4">{article.author.name}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">{article.author.bio}</p>
                  <div className="flex space-x-6">
                    {article.author.social.twitter && (
                      <a 
                        href={`https://twitter.com/${article.author.social.twitter.replace('@', '')}`} 
                        className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    )}
                    {article.author.social.instagram && (
                      <a 
                        href={`https://instagram.com/${article.author.social.instagram.replace('@', '')}`}
                        className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </a>
                    )}
                    {article.author.social.website && (
                      <a 
                        href={`https://${article.author.social.website}`}
                        className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Website
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
              {/* Table of Contents */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4 flex items-center">
                  <BookmarkPlus className="w-5 h-5 mr-2" />
                  Table of Contents
                </h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#introduction" className="text-gray-400 hover:text-purple-400 transition-colors">Introduction to AI Fantasy Art</a></li>
                  <li><a href="#prompts" className="text-gray-400 hover:text-purple-400 transition-colors">Understanding AI Art Prompts</a></li>
                  <li><a href="#advanced" className="text-gray-400 hover:text-purple-400 transition-colors">Advanced Prompting Techniques</a></li>
                  <li><a href="#styles" className="text-gray-400 hover:text-purple-400 transition-colors">Popular Fantasy Art Styles</a></li>
                  <li><a href="#commercial" className="text-gray-400 hover:text-purple-400 transition-colors">Tips for Commercial Success</a></li>
                </ul>
              </div>

              {/* Article Stats */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Article Stats
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Views</span>
                    <span className="text-white font-semibold">{formatNumber(article.views)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Likes</span>
                    <span className="text-white font-semibold">{formatNumber(article.likes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bookmarks</span>
                    <span className="text-white font-semibold">{formatNumber(article.bookmarks)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Comments</span>
                    <span className="text-white font-semibold">{article.comments}</span>
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
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((relatedArticle) => (
              <article
                key={relatedArticle.id}
                className="group cursor-pointer"
              >
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