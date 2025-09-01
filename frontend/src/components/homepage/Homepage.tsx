"use client";
import React from 'react';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import HeroSection from '@/components/homepage/HeroSection';
import PartnersSection from '@/components/homepage/PartnersSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import VideoSection from '@/components/homepage/VideoSection';
import PricingSection from '@/components/homepage/PricingSection';
import RegisterSection from '@/components/homepage/RegisterSection';

const Homepage = () => {

  return (
    <AuthenticatedLayout>
      <HeroSection />
      <PartnersSection />
      <FeaturesSection />
      <VideoSection />
      <PricingSection />
      <RegisterSection />
      </AuthenticatedLayout>
  );
};

export default Homepage;