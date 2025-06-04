# 💫 ALLURIST - Fantasy Fashion MVP

**Fantasy. Fashion. No Limits.**

An exclusive AI fantasy art platform with premium subscription tiers and fashion marketplace integration.

## ✨ Features

### 🎨 Art Gallery
- **Tier-based Access Control**: Free, Premium, and VIP content tiers
- **Interactive Art Cards**: Like, download, and share functionality
- **Responsive Grid Layout**: Optimized for all device sizes
- **Access Overlays**: Clear upgrade prompts for restricted content

### 👤 User Dashboard
- **Account Overview**: Download stats, usage metrics, tier status
- **Download History**: Track all downloaded content
- **Billing Management**: Subscription and payment tracking
- **Settings Panel**: User preferences and account settings

### 💳 Subscription System
- **Free Tier**: Gallery previews and basic access
- **Premium ($29/month)**: Full HD access, weekly releases, no watermarks
- **VIP ($79/month)**: Custom requests, early access, exclusive collections

### 🎯 Navigation & UX
- **Responsive Navigation**: Mobile-first design with hamburger menu
- **Smooth Animations**: CSS transitions and hover effects
- **Glass Morphism**: Modern UI with backdrop blur effects
- **Dark Theme**: Premium black and pink color scheme

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd allurist
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   # Fill in your Supabase and Stripe keys
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Database**: Supabase (ready to configure)
- **Payments**: Stripe (ready to integrate)
- **Deployment**: Vercel-optimized

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # User dashboard
│   ├── globals.css           # Custom styles & animations
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── Navigation.tsx        # Responsive navigation
│   ├── HeroSection.tsx       # Landing hero section
│   ├── GalleryGrid.tsx       # Art gallery with tiers
│   ├── PricingSection.tsx    # Subscription plans
│   └── UserDashboard.tsx     # Dashboard interface
└── lib/
    ├── types.ts              # TypeScript interfaces
    └── supabase.ts           # Database client
```

## 🎨 Design System

### Colors
- **Primary**: Pink (#ec4899) / Purple (#a855f7)
- **Background**: Black / Gray-900
- **Text**: White / Gray-300
- **Accents**: Green (#10b981) for free tier

### Typography  
- **Font**: Inter (modern, readable)
- **Sizes**: Responsive with mobile-first approach
- **Weights**: Regular (400) to Bold (700)

### Components
- **Buttons**: Rounded-full with hover effects
- **Cards**: Glass morphism with gradient borders
- **Navigation**: Fixed header with backdrop blur
- **Modals**: Coming in Phase 2

## 📱 Responsive Design

- **Mobile First**: Optimized for 375px+
- **Tablet**: 768px+ with adapted layouts
- **Desktop**: 1024px+ with full feature set
- **Large Screens**: 1440px+ with max-width containers

## 🔒 Authentication (Ready for Integration)

The app includes Supabase configuration for:
- User registration and login
- Session management
- Protected routes
- Profile management

## 💰 Subscription Tiers

### Free Tier
- Gallery previews
- Style inspiration posts
- Basic fashion guides
- Community access

### Premium Tier ($29/month)
- Full HD gallery access
- Weekly new releases
- Exclusive fashion partnerships
- Style consultation
- Mobile app access
- No watermarks

### VIP Tier ($79/month)
- Everything in Premium
- Custom art requests (2/month)
- Personal style curator
- Early access (48hrs)
- VIP-only collections
- Direct creator chat

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

## 🔄 Next Steps

### Phase 2 (Backend Integration)
- [ ] Supabase database setup
- [ ] Real authentication flow
- [ ] Stripe payment integration
- [ ] Image upload/storage
- [ ] Custom request system

### Phase 3 (Advanced Features)  
- [ ] Social sharing
- [ ] Fashion marketplace
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Creator tools

## 🐛 Troubleshooting

### Common Issues
1. **Components not found**: Ensure all files are created in correct directories
2. **Styling issues**: Check Tailwind CSS compilation
3. **Environment variables**: Verify `.env.local` file setup

### Development
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Run development server
npm run dev
```

## 📄 License

This project is proprietary. All rights reserved.

---

**Built with ❤️ for the fantasy fashion community**
