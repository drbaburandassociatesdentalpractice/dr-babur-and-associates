"use client";

import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/constants/nav-links';

export const TopBar = () => {
  return (
    <div className="hidden md:block bg-dental-light-blue text-white text-xs py-2">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left: Phone & WhatsApp */}
        <div className="flex items-center space-x-6">
          <a 
            href={`tel:${siteConfig.phone}`} 
            className="flex items-center space-x-2 hover:text-dental-yellow transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{siteConfig.phoneDisplay}</span>
          </a>
          <a 
            href={`https://wa.me/${siteConfig.whatsapp.replace(/\s/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-dental-yellow transition"
          >
            WhatsApp: {siteConfig.whatsapp}
          </a>
        </div>

        {/* Right: Hours & Location */}
        <div className="flex items-center space-x-4">
          <span className="text-white">Mon–Fri {siteConfig.hours.mondayFriday}</span>
          <span className="text-white">|</span>
          <span className="text-white">DHA Phase 5, Karachi</span>
        </div>
      </div>
    </div>
  );
};