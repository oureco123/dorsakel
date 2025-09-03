"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const placeholders = ["MRONJ", "Osteoradionekrose", "Tuberabriss"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/dental-hearo-bg.png" 
          alt="bg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-slate-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Study now
                <span className="block text-blue-300">Save lives later</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 max-w-2xl leading-relaxed">
                Advance your dental expertise with interactive 3D models, comprehensive learning materials, and evidence-based educational content.
              </p>
            </div>

            {/* Search Field */}
            <div className="space-y-4 max-w-md">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search "${placeholders[currentPlaceholder]}"...`}
                  className="w-full py-4 pl-12 pr-4 text-lg rounded-xl bg-white/95 backdrop-blur-sm border-0 shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 cursor-default"
                  readOnly
                  tabIndex={-1}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <p className="text-blue-200 text-sm">
                Instantly search through thousands of dental procedures and conditions
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
                <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </Button>
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Image 
                  src="/images/dorsakel_smiley.png" 
                  alt="Dorsakel Logo" 
                  className="w-48 h-48 object-contain filter brightness-110"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;