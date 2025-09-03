import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Learning Materials", href: "/materials" },
        { name: "3D Models", href: "/3d-models" },
        { name: "Quizzes", href: "/quizzes" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Partners", href: "/partners" },
        { name: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Contact Support", href: "/contact" },
        { name: "Documentation", href: "/docs" },
        { name: "Community", href: "/community" },
        { name: "Status", href: "/status" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
        { name: "Accessibility", href: "/accessibility" }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      href: "https://facebook.com/dorsakel", 
      icon: Facebook,
      hoverColor: "hover:text-blue-600" 
    },
    { 
      name: "Twitter", 
      href: "https://twitter.com/dorsakel", 
      icon: Twitter,
      hoverColor: "hover:text-sky-500" 
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com/company/dorsakel", 
      icon: Linkedin,
      hoverColor: "hover:text-blue-700" 
    },
    { 
      name: "Instagram", 
      href: "https://instagram.com/dorsakel", 
      icon: Instagram,
      hoverColor: "hover:text-pink-500" 
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
                <Image 
                  src="/images/logo.png" 
                  alt="Dorsakel Logo" 
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <span className="text-2xl font-bold">Dorsakel</span>
            </Link>
            
            <p className="text-gray-400 leading-relaxed">
              Empowering dental professionals with innovative learning technology and comprehensive educational resources.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a 
                  href="mailto:hello@dorsakel.com" 
                  className="hover:text-blue-400 transition-colors"
                >
                  hello@dorsakel.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a 
                  href="tel:+491234567890" 
                  className="hover:text-blue-400 transition-colors"
                >
                  +49 (123) 456-7890
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Berlin, Germany<br />
                  European Union
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-700 ${social.hoverColor} group`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-2">
                Stay updated with dental education insights
              </h3>
              <p className="text-gray-400 text-sm">
                Get the latest learning materials, study tips, and platform updates delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[280px]"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Dorsakel. All rights reserved. Made with ❤️ for dental professionals worldwide.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link 
                href="/privacy" 
                className="hover:text-blue-400 transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-blue-400 transition-colors"
              >
                Terms
              </Link>
              <Link 
                href="/cookies" 
                className="hover:text-blue-400 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;