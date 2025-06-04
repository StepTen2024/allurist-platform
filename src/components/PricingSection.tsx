'use client'
import React from 'react';

interface PricingSectionProps {
  onSelectPlan?: (plan: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      name: "Explore",
      price: "Free",
      period: "",
      features: [
        "Gallery previews",
        "Style inspiration posts", 
        "Basic fashion guides",
        "Community access"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Premium",
      price: "$29",
      period: "/month",
      features: [
        "Full HD gallery access",
        "Weekly new releases",
        "Exclusive fashion partnerships",
        "Style consultation",
        "Mobile app access",
        "No watermarks"
      ],
      buttonText: "Join Premium",
      popular: true
    },
    {
      name: "VIP",
      price: "$79",
      period: "/month", 
      features: [
        "Everything in Premium",
        "Custom art requests (2/month)",
        "Personal style curator",
        "Early access (48hrs)",
        "VIP-only collections",
        "Direct creator chat"
      ],
      buttonText: "Go VIP",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Experience
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Unlock exclusive content, custom requests, and premium fashion partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-2xl p-8 ${
              plan.popular 
                ? 'bg-gradient-to-b from-pink-500/10 to-purple-500/10 border-2 border-pink-500 transform scale-105' 
                : 'bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700'
            } hover:scale-105 transition-all duration-300`}>
              
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-pink-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onSelectPlan?.(plan.name.toLowerCase())}
                className={`w-full py-3 rounded-full font-bold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-400 hover:to-purple-400'
                    : 'bg-gray-700 text-white hover:bg-pink-500 hover:text-black'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 