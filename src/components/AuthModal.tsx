'use client'
import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Zap, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'signin' | 'signup';
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
  onSwitchMode: (mode: 'signin' | 'signup') => void;
}

export default function AuthModal({ isOpen, mode, onClose, onAuthSuccess, onSwitchMode }: AuthModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedTier: 'premium'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'signup' && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock successful authentication
    const mockUser = {
      id: 1,
      name: formData.name || 'New User',
      email: formData.email,
      tier: mode === 'signup' ? formData.selectedTier : 'premium',
      joinDate: new Date().toISOString().split('T')[0],
      totalDownloads: 0,
      customRequestsUsed: 0
    };

    setIsLoading(false);
    onAuthSuccess(mockUser);
    onClose();
  };

  const handleSocialAuth = (provider: string) => {
    // Mock social authentication
    alert(`${provider} authentication would trigger here - OAuth integration coming next!`);
  };

  if (!isOpen) return null;

  const tiers = [
    { 
      id: 'premium', 
      name: 'Premium', 
      price: 29, 
      icon: '⭐',
      features: ['Full HD gallery access', 'Weekly new releases', 'No watermarks']
    },
    { 
      id: 'vip', 
      name: 'VIP', 
      price: 79, 
      icon: '👑',
      features: ['Everything in Premium', 'Custom art requests (2/month)', 'VIP-only collections']
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-6">
            <div className="text-3xl mb-2">
              {mode === 'signin' ? '🚀' : '✨'}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {mode === 'signin' ? 'Welcome Back!' : 'Join Allurist'}
            </h2>
            <p className="text-gray-400">
              {mode === 'signin' 
                ? 'Sign in to access your exclusive content'
                : 'Create your account and start exploring'
              }
            </p>
          </div>

          {/* Social Authentication */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth('Google')}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded"></div>
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialAuth('Discord')}
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <div className="w-5 h-5 bg-indigo-400 rounded"></div>
              Continue with Discord
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder={mode === 'signin' ? 'Enter your password' : 'Create a strong password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Choose Your Plan
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {tiers.map((tier) => (
                    <label
                      key={tier.id}
                      className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        formData.selectedTier === tier.id
                          ? 'border-pink-500 bg-pink-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedTier"
                        value={tier.id}
                        checked={formData.selectedTier === tier.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{tier.icon}</span>
                          <div>
                            <div className="text-white font-bold">{tier.name}</div>
                            <div className="text-gray-400 text-sm">
                              ${tier.price}/month
                            </div>
                          </div>
                        </div>
                        {formData.selectedTier === tier.id && (
                          <CheckCircle className="text-pink-500" size={20} />
                        )}
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        {tier.features.slice(0, 2).map((feature, index) => (
                          <div key={index}>• {feature}</div>
                        ))}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  <Zap size={20} />
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          {mode === 'signin' && (
            <div className="text-center mt-4">
              <button className="text-pink-500 hover:text-pink-400 text-sm">
                Forgot your password?
              </button>
            </div>
          )}

          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => onSwitchMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-pink-500 hover:text-pink-400 font-medium ml-2"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 