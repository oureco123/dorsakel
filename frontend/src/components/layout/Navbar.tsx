"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import Image from 'next/image';
interface NavbarProps {
  user?: {
    firstName: string;
    lastName: string;
    subscriptionType: 'FREE' | 'PRO' | 'PREMIUM';
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  } | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Navbar = ({ user = null, onLogin, onLogout }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const getSubscriptionBadge = (subscription: string) => {
    const colors = {
      FREE: 'bg-gray-100 text-gray-700',
      PRO: 'bg-blue-100 text-blue-700',
      PREMIUM: 'bg-purple-100 text-purple-700'
    };
    return colors[subscription as keyof typeof colors] || colors.FREE;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
              <Image 
                src="/images/logo.png" 
                alt="Dorsakel Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Dorsakel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-color ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-900' 
                      : 'hover:bg-white/10 text-white'
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                    <Link 
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile Settings
                    </Link>
                    <Link 
                      href="/billing"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Billing
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      {user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? (
                    <Link 
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Admin Panel
                    </Link>
                  ) : null}
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost"
                  onClick={onLogin}
                  className={`transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-white hover:text-white hover:bg-white/10'
                  }`}
                >
                  Sign In
                </Button>
                <Button 
                  onClick={onLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 font-medium py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-100 pt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${getSubscriptionBadge(user.subscriptionType)}`}>
                          {user.subscriptionType}
                        </div>
                      </div>
                    </div>
                    <Link href="/dashboard" className="block text-gray-700 py-2">Dashboard</Link>
                    <Link href="/profile" className="block text-gray-700 py-2">Profile</Link>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left text-gray-700 py-2 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button 
                      variant="ghost" 
                      onClick={onLogin}
                      className="w-full justify-start text-gray-700"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={onLogin}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {isProfileDropdownOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsProfileDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;