'use client'
import React, { useState } from 'react';
import { Heart, Download, Share2, X, Eye, Star, Zap } from 'lucide-react';

// Enhanced mock data with more realistic information
const mockArtPieces = [
  { 
    id: 1, 
    title: "Pink Fantasy", 
    tier: "free", 
    downloads: 1234, 
    likes: 89,
    description: "Ethereal pink fantasy artwork featuring magical elements and dreamy aesthetics.",
    tags: ["fantasy", "pink", "ethereal", "magic"],
    resolution: "4096x6144",
    fileSize: "8.2 MB"
  },
  { 
    id: 2, 
    title: "Neon Dreams", 
    tier: "premium", 
    downloads: 2341, 
    likes: 156,
    description: "Cyberpunk-inspired neon artwork with vibrant colors and futuristic vibes.",
    tags: ["cyberpunk", "neon", "future", "digital"],
    resolution: "4096x6144",
    fileSize: "12.5 MB"
  },
  { 
    id: 3, 
    title: "Cyber Princess", 
    tier: "free", 
    downloads: 987, 
    likes: 234,
    description: "Royal cyberpunk character with advanced technology and elegant design.",
    tags: ["cyberpunk", "princess", "tech", "royal"],
    resolution: "4096x6144",
    fileSize: "10.1 MB"
  },
  { 
    id: 4, 
    title: "Midnight Elegance", 
    tier: "premium", 
    downloads: 3456, 
    likes: 445,
    description: "Sophisticated dark fantasy with elegant lighting and mysterious atmosphere.",
    tags: ["dark", "elegant", "mystery", "fantasy"],
    resolution: "4096x6144",
    fileSize: "9.8 MB"
  },
  { 
    id: 5, 
    title: "Digital Goddess", 
    tier: "vip", 
    downloads: 1876, 
    likes: 321,
    description: "Divine digital artwork featuring goddess-like figure with cosmic elements.",
    tags: ["goddess", "divine", "cosmic", "digital"],
    resolution: "8192x12288",
    fileSize: "24.7 MB"
  },
  { 
    id: 6, 
    title: "Virtual Vixen", 
    tier: "free", 
    downloads: 654, 
    likes: 123,
    description: "Playful virtual character with vibrant personality and modern style.",
    tags: ["virtual", "playful", "modern", "character"],
    resolution: "4096x6144",
    fileSize: "7.9 MB"
  }
];

interface GalleryGridProps {
  userTier?: string;
  onUpgradeClick?: (targetTier: string) => void;
}

export default function GalleryGrid({ userTier = "free", onUpgradeClick }: GalleryGridProps) {
  const [likedItems, setLikedItems] = useState(new Set());
  const [selectedArt, setSelectedArt] = useState<any>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedItems(newLiked);
  };

  const canAccess = (artTier: string, userTier: string) => {
    const tierHierarchy = { free: 0, premium: 1, vip: 2 };
    return tierHierarchy[userTier as keyof typeof tierHierarchy] >= tierHierarchy[artTier as keyof typeof tierHierarchy];
  };

  const handleArtClick = (piece: any) => {
    if (canAccess(piece.tier, userTier)) {
      setSelectedArt(piece);
    } else {
      setShowUpgradeModal(piece.tier);
    }
  };

  const handleDownload = async (piece: any) => {
    setDownloading(piece.id);
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDownloading(null);
    alert(`Downloaded: ${piece.title} in ${piece.resolution}`);
  };

  const handleShare = (piece: any) => {
    navigator.clipboard.writeText(`Check out "${piece.title}" on Allurist! https://allurist-platform.vercel.app`);
    alert('Link copied to clipboard!');
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-green-500 text-black';
      case 'premium': return 'bg-pink-500 text-black';
      case 'vip': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'free': return '🆓';
      case 'premium': return '⭐';
      case 'vip': return '👑';
      default: return '🔒';
    }
  };

  return (
    <>
      <section className="py-20 bg-black" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Fantasy Art Gallery
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Exclusive AI-generated art collections. Upgrade for full access and commercial licensing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArtPieces.map((piece) => {
              const hasAccess = canAccess(piece.tier, userTier);
              
              return (
                <div 
                  key={piece.id} 
                  className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/20 cursor-pointer"
                  onClick={() => handleArtClick(piece)}
                >
                  {/* Image Placeholder */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-pink-500/20 to-purple-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Tier Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getTierColor(piece.tier)}`}>
                      <span>{getTierIcon(piece.tier)}</span>
                      {piece.tier.toUpperCase()}
                    </div>

                    {/* View Button */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye size={18} className="text-white" />
                    </div>

                    {/* Access Overlay */}
                    {!hasAccess && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="text-pink-500 mb-4 text-4xl">🔒</div>
                          <p className="text-white font-bold text-lg mb-2">
                            {piece.tier === 'premium' ? 'Premium Access Required' : 'VIP Access Required'}
                          </p>
                          <p className="text-gray-300 text-sm mb-4">
                            Unlock this artwork and thousands more
                          </p>
                          <button 
                            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-bold hover:from-pink-400 hover:to-purple-400 transition-all transform hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowUpgradeModal(piece.tier);
                            }}
                          >
                            <Zap size={16} className="inline mr-1" />
                            Upgrade Now
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {hasAccess && (
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(piece.id);
                            }}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                              likedItems.has(piece.id) 
                                ? 'bg-pink-500 text-white scale-110' 
                                : 'bg-black/50 text-white hover:bg-pink-500'
                            }`}
                          >
                            <Heart size={18} fill={likedItems.has(piece.id) ? "currentColor" : "none"} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(piece);
                            }}
                            className="p-2 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-green-500 transition-colors"
                            disabled={downloading === piece.id}
                          >
                            {downloading === piece.id ? (
                              <div className="animate-spin">⏳</div>
                            ) : (
                              <Download size={18} />
                            )}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(piece);
                            }}
                            className="p-2 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-blue-500 transition-colors"
                          >
                            <Share2 size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-2">{piece.title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {piece.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {piece.likes}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {piece.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:from-pink-400 hover:to-purple-400 transition-all transform hover:scale-105">
              Load More Fantasies
            </button>
          </div>
        </div>
      </section>

      {/* Art Preview Modal */}
      {selectedArt && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50" onClick={() => setSelectedArt(null)}>
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={() => setSelectedArt(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="aspect-[3/4] bg-gradient-to-br from-pink-500/20 to-purple-500/20 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${getTierColor(selectedArt.tier)}`}>
                  <span>{getTierIcon(selectedArt.tier)}</span>
                  {selectedArt.tier.toUpperCase()}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedArt.title}</h2>
                <p className="text-gray-400 mb-4">{selectedArt.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-gray-500 text-sm">Resolution:</span>
                    <p className="text-white font-bold">{selectedArt.resolution}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">File Size:</span>
                    <p className="text-white font-bold">{selectedArt.fileSize}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedArt.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDownload(selectedArt)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold hover:from-green-400 hover:to-green-500 transition-all flex items-center justify-center gap-2"
                    disabled={downloading === selectedArt.id}
                  >
                    {downloading === selectedArt.id ? (
                      <>
                        <div className="animate-spin">⏳</div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download size={20} />
                        Download HD
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => toggleLike(selectedArt.id)}
                    className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                      likedItems.has(selectedArt.id)
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-pink-500 hover:text-white'
                    }`}
                  >
                    <Heart size={20} fill={likedItems.has(selectedArt.id) ? "currentColor" : "none"} />
                    {likedItems.has(selectedArt.id) ? 'Liked' : 'Like'}
                  </button>
                  
                  <button
                    onClick={() => handleShare(selectedArt)}
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2"
                  >
                    <Share2 size={20} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50" onClick={() => setShowUpgradeModal(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <button
                onClick={() => setShowUpgradeModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="text-4xl mb-4">
                {showUpgradeModal === 'premium' ? '⭐' : '👑'}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                Upgrade to {showUpgradeModal === 'premium' ? 'Premium' : 'VIP'}
              </h3>
              
              <p className="text-gray-400 mb-6">
                {showUpgradeModal === 'premium' 
                  ? 'Unlock full HD gallery access and exclusive fashion partnerships'
                  : 'Get everything in Premium plus custom art requests and VIP-only collections'
                }
              </p>
              
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-white">
                  ${showUpgradeModal === 'premium' ? '29' : '79'}
                </span>
                <span className="text-gray-400">/month</span>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    onUpgradeClick?.(showUpgradeModal);
                    setShowUpgradeModal(null);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold hover:from-pink-400 hover:to-purple-400 transition-all transform hover:scale-105"
                >
                  <Zap size={20} className="inline mr-2" />
                  Upgrade Now
                </button>
                
                <button
                  onClick={() => setShowUpgradeModal(null)}
                  className="w-full border border-gray-600 text-gray-300 px-6 py-3 rounded-full font-bold hover:bg-gray-700 transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 