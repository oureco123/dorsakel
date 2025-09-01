"use client";

import React, { ReactNode } from 'react';
import { useAuth } from '@/components/Dorsakel'; // Import your existing useAuth hook
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useRouter } from 'next/navigation';

interface AuthenticatedLayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

const AuthenticatedLayout = ({ 
  children, 
  showNavbar = true, 
  showFooter = true 
}: AuthenticatedLayoutProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Transform your user data to match the navbar's expected format
  const navbarUser = user ? {
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    subscriptionType: user.subscriptionType
  } : null;

  return (
    <LayoutWrapper
      showNavbar={showNavbar}
      showFooter={showFooter}
      user={navbarUser}
      onLogin={handleLogin}
      onLogout={handleLogout}
    >
      {children}
    </LayoutWrapper>
  );
};

export default AuthenticatedLayout;