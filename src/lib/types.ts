export interface User {
  id: string;
  email: string;
  name: string;
  tier: 'free' | 'premium' | 'vip';
  joinDate: string;
  totalDownloads: number;
  customRequestsUsed: number;
}

export interface ArtPiece {
  id: string;
  title: string;
  tier: 'free' | 'premium' | 'vip';
  imageUrl?: string;
  downloads: number;
  likes: number;
  createdAt: string;
}

export interface CustomRequest {
  id: string;
  userId: string;
  prompt: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
  completedAt?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: 'premium' | 'vip';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: string;
  stripeSubscriptionId?: string;
} 