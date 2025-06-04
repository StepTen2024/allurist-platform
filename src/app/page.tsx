'use client'
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GalleryGrid from '@/components/GalleryGrid';
import PricingSection from '@/components/PricingSection';

// Mock user data - will be replaced with real auth
const mockUser = {
  id: 1,
  name: "Alex Chen",
  email: "alex@example.com",
  tier: "premium",
  joinDate: "2024-01-15",
  totalDownloads: 45,
  customRequestsUsed: 1
};

export default function HomePage() {
  const [user, setUser] = useState<typeof mockUser | null>(null);

  const handleAuth = () => {
    // Mock login - will be replaced with Supabase auth
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleJoinVIP = () => {
    if (user) {
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // Show sign up modal or redirect to auth
      alert('Sign up flow would trigger here - Supabase auth integration coming next!');
    }
  };

  const handleSelectPlan = (plan: string) => {
    // This will integrate with Stripe
    alert(`${plan} plan selected - Stripe checkout integration coming next!`);
  };

  return (
    <div className="bg-black min-h-screen">
      <Navigation user={user} onAuthClick={handleAuth} onLogout={handleLogout} />
      <HeroSection onJoinVIP={handleJoinVIP} />
      <GalleryGrid userTier={user?.tier || "free"} />
      <PricingSection onSelectPlan={handleSelectPlan} />
      
      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-pink-500 text-2xl font-bold mb-4">ALLURIST</div>
          <p className="text-gray-400 mb-4">Fantasy. Fashion. No Limits.</p>
          <div className="flex justify-center space-x-6 text-gray-500">
            <span>📱 TikTok</span>
            <span>📷 Instagram</span>
            <span>🎵 Spotify</span>
            <span>📌 Pinterest</span>
          </div>
          <p className="text-gray-600 text-sm mt-6">© 2025 Allurist. 18+ Premium fantasy art platform.</p>
        </div>
      </footer>
    </div>
  );
}
