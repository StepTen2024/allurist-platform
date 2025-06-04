'use client'
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import UserDashboard from '@/components/UserDashboard';

// Mock user - will be replaced with real auth
const mockUser = {
  id: 1,
  name: "Alex Chen",
  email: "alex@example.com",
  tier: "premium" as const,
  joinDate: "2024-01-15",
  totalDownloads: 45,
  customRequestsUsed: 1
};

export default function DashboardPage() {
  const [user, setUser] = useState<typeof mockUser | null>(mockUser);

  const handleLogout = () => {
    setUser(null);
    // Redirect to home
    window.location.href = '/';
  };

  if (!user) {
    // Redirect to home if not logged in
    window.location.href = '/';
    return null;
  }

  return (
    <div className="bg-black min-h-screen">
      <Navigation user={user} onLogout={handleLogout} />
      <UserDashboard user={user} onLogout={handleLogout} />
    </div>
  );
} 