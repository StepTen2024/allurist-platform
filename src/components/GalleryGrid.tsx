'use client'
import React, { useState } from 'react';
import { Heart, Download, Share2 } from 'lucide-react';

// Mock data for testing
const mockArtPieces = [
  { id: 1, title: "Pink Fantasy", tier: "free", downloads: 1234, likes: 89 },
  { id: 2, title: "Neon Dreams", tier: "premium", downloads: 2341, likes: 156 },
  { id: 3, title: "Cyber Princess", tier: "vip", downloads: 987, likes: 234 },
  { id: 4, title: "Midnight Elegance", tier: "free", downloads: 3456, likes: 445 },
  { id: 5, title: "Digital Goddess", tier: "premium", downloads: 1876, likes: 321 },
  { id: 6, title: "Virtual Vixen", tier: "vip", downloads: 654, likes: 123 }
];

interface GalleryGridProps {
  userTier?: string;
}

export default function GalleryGrid({ userTier = "free" }: GalleryGridProps) {
  const [likedItems, setLikedItems] = useState(new Set());

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

  return (
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
              <div key={piece.id} className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/20">
                {/* Image Placeholder */}
                <div className="aspect-[3/4] bg-gradient-to-br from-pink-500/20 to-purple-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Tier Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                    piece.tier === 'free' ? 'bg-green-500 text-black' :
                    piece.tier === 'premium' ? 'bg-pink-500 text-black' :
                    'bg-purple-500 text-white'
                  }`}>
                    {piece.tier.toUpperCase()}
                  </div>

                  {/* Access Overlay */}
                  {!hasAccess && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-pink-500 mb-2">🔒</div>
                        <p className="text-white font-bold">
                          {piece.tier === 'premium' ? 'Premium Access Required' : 'VIP Access Required'}
                        </p>
                        <button className="mt-2 bg-pink-500 text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-pink-400 transition-colors">
                          Upgrade Now
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleLike(piece.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          likedItems.has(piece.id) 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-black/50 text-white hover:bg-pink-500'
                        }`}
                      >
                        <Heart size={18} fill={likedItems.has(piece.id) ? "currentColor" : "none"} />
                      </button>
                      {hasAccess && (
                        <>
                          <button className="p-2 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-pink-500 transition-colors">
                            <Download size={18} />
                          </button>
                          <button className="p-2 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-pink-500 transition-colors">
                            <Share2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-2">{piece.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>👁 {piece.downloads.toLocaleString()}</span>
                    <span>❤️ {piece.likes}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:from-pink-400 hover:to-purple-400 transition-all">
            Load More Fantasies
          </button>
        </div>
      </div>
    </section>
  );
} 