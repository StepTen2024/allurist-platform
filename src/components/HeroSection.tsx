'use client'
import React from 'react';

interface HeroSectionProps {
  onJoinVIP?: () => void;
}

export default function HeroSection({ onJoinVIP }: HeroSectionProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-pink-500 to-purple-500 bg-clip-text text-transparent">
          ALLURIST
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Fantasy. Fashion. No Limits.
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
          Discover exclusive AI fantasy art and transform inspiration into reality with our curated fashion marketplace.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onJoinVIP}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-black px-8 py-4 rounded-full text-lg font-bold hover:from-pink-400 hover:to-pink-500 transition-all transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
          >
            Join VIP Access
          </button>
          <button className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-full text-lg font-bold hover:bg-pink-500 hover:text-black transition-all">
            Explore Gallery
          </button>
        </div>
      </div>
    </section>
  );
} 