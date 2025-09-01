"use client";
import React from 'react';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import HeroSection from '@/components/homepage/HeroSection';
import PartnersSection from '@/components/homepage/PartnersSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import VideoSection from '@/components/homepage/VideoSection';
import PricingSection from '@/components/homepage/PricingSection';
import RegisterSection from '@/components/homepage/RegisterSection';

const Homepage = () => {
  // You can integrate with your auth system here
  const handleLogin = () => {
    // Navigate to login or open login modal
    window.location.href = '/auth';
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout');
  };

  return (
    <LayoutWrapper 
      onLogin={handleLogin}
      onLogout={handleLogout}
      // user={currentUser} // Pass user data when available
    >
      <HeroSection />
      <PartnersSection />
      <FeaturesSection />
      <VideoSection />
      <PricingSection />
      <RegisterSection />
    </LayoutWrapper>
  );
};

export default Homepage;