"use client";

import React, { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

interface LayoutWrapperProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  user?: {
    firstName: string;
    lastName: string;
    subscriptionType: 'FREE' | 'PRO' | 'PREMIUM';
  } | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

const LayoutWrapper = ({ 
  children, 
  showNavbar = true, 
  showFooter = true,
  user = null,
  onLogin,
  onLogout 
}: LayoutWrapperProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && (
        <Navbar 
          user={user} 
          onLogin={onLogin} 
          onLogout={onLogout} 
        />
      )}
      
      <main className={`flex-1 ${showNavbar ? 'pt-16' : ''}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default LayoutWrapper;