"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started",
      features: [
        "Access to basic learning cards",
        "5 quiz attempts per day",
        "Progress tracking",
        "Community support"
      ],
      buttonText: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: { monthly: 10.99, yearly: 8.99 },
      yearlyTotal: 107.88,
      description: "For serious dental professionals",
      features: [
        "Unlimited learning cards",
        "Unlimited quiz attempts",
        "3D anatomical models",
        "Advanced analytics",
        "Priority support",
        "Downloadable content",
        "Certification tracking"
      ],
      buttonText: "Start Pro Trial",
      popular: true
    }
  ];

  const StarAnimation = () => (
    <div className="absolute -top-1 -right-1">
      {[...Array(2)].map((_, i) => (
        <Star
          key={i}
          className={`absolute w-3 h-2 text-yellow-400 fill-current animate-ping`}
          style={{
            animationDelay: `${i * 0.25}s`,
            top: `${i * 2}px`,
            right: `${i * 7}px`
          }}
        />
      ))}
    </div>
  );
  const StarAnimation2 = () => (
    <div className="absolute -bottom-1 -left-1">
      {[...Array(2)].map((_, i) => (
        <Star
          key={i}
          className={`absolute w-3 h-2 text-yellow-400 fill-current animate-ping`}
          style={{
            animationDelay: `${i * 0.425}s`,
            bottom: `${i * 2}px`,
            left: `${i * 5}px`
          }}
        />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free or unlock advanced features with our professional plan
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all relative ${
                isYearly 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <Badge className="absolute -top-4 -right-8 bg-green-500 text-white text-xs px-2 py-1">
                22% cheaper!
              </Badge>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative transition-all duration-300 ${
                plan.popular 
                  ? 'ring-2 ring-blue-500 shadow-2xl scale-105 bg-gradient-to-b from-white to-blue-50/30' 
                  : 'hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                    <StarAnimation />
                    <StarAnimation2 />
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price[isYearly ? 'yearly' : 'monthly'].toFixed(2)}€
                    </span>
                    <span className="text-gray-600">/ month</span>
                  </div>
                  
                  {plan.name === "Pro" && isYearly && (
                    <p className="text-sm text-gray-500 mt-2">
                      Billed yearly at {plan.yearlyTotal}€ per year
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-3 text-base font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;