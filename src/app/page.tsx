'use client'
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GalleryGrid from '@/components/GalleryGrid';
import PricingSection from '@/components/PricingSection';
import AuthModal from '@/components/AuthModal';
import UserDashboard from '@/components/UserDashboard';

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
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'signin' | 'signup';
  }>({
    isOpen: false,
    mode: 'signin'
  });
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAuth = () => {
    setAuthModal({ isOpen: true, mode: 'signin' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleJoinVIP = () => {
    setAuthModal({ isOpen: true, mode: 'signup' });
  };

  const handleAuthSuccess = (newUser: any) => {
    setUser(newUser);
  };

  const handleCloseAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'signin' });
  };

  const handleSwitchAuthMode = (mode: 'signin' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleSelectPlan = (plan: string) => {
    // This will integrate with Stripe
    alert(`${plan} plan selected - Stripe checkout integration coming next!`);
  };

  const handleUpgradeClick = (targetTier: string) => {
    // Handle upgrade clicks from gallery
    alert(`Upgrade to ${targetTier} plan triggered! Stripe checkout integration coming next.`);
  };

  const handleShowDashboard = () => {
    if (user) {
      setShowDashboard(true);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navigation 
        user={user} 
        onAuth={handleAuth} 
        onLogout={handleLogout} 
        onShowAuthModal={(mode) => setAuthModal({ isOpen: true, mode })}
        onShowDashboard={handleShowDashboard}
      />
      <HeroSection onJoinVIP={handleJoinVIP} />
      <GalleryGrid 
        userTier={user?.tier || "free"} 
        onUpgradeClick={handleUpgradeClick}
      />
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

      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={handleCloseAuthModal}
        onAuthSuccess={handleAuthSuccess}
        onSwitchMode={handleSwitchAuthMode}
      />

      {user && (
        <UserDashboard
          isOpen={showDashboard}
          user={user}
          onClose={() => setShowDashboard(false)}
          onUpgrade={() => {
            setShowDashboard(false);
            setAuthModal({ isOpen: true, mode: 'signup' });
          }}
        />
      )}
    </div>
  );
}
