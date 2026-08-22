import React, { useState } from 'react';
import { ViewMode, Category, ThemeConfig } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode, category?: Category) => void;
  themeConfig: ThemeConfig;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, themeConfig }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="w-full max-w-[1400px] mx-auto px-4 pt-16 pb-6 font-['Satoshi',sans-serif]">
      {/* Main Footer Box */}
      <div className="bg-[#4a3129] border border-[#4a3129] text-[#f4f1eb] p-6 md:p-10 flex flex-col md:flex-row justify-between gap-10">
        
        {/* Left: Navigation Links Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
          
          {/* SHOP Column */}
          <div>
            <p className="font-['DM_Serif_Display',serif] text-sm md:text-base uppercase tracking-wider mb-4 text-[#f4f1eb]">
              SHOP
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#f4f1eb]/80">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'new-arrivals')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'all')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  All
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'tees')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'bottoms')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Bottoms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'outerwear')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Outerwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'headwear')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Headwear
                </button>
              </li>
            </ul>
          </div>

          {/* BRAND Column */}
          <div>
            <p className="font-['DM_Serif_Display',serif] text-sm md:text-base uppercase tracking-wider mb-4 text-[#f4f1eb]">
              BRAND
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#f4f1eb]/80">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('size-guide')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('returns')}
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Returns
                </button>
              </li>
            </ul>
          </div>

          {/* SOCIALS Column */}
          <div>
            <p className="font-['DM_Serif_Display',serif] text-sm md:text-base uppercase tracking-wider mb-4 text-[#f4f1eb]">
              SOCIALS
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-[#f4f1eb]/80">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors border-b border-transparent hover:border-[#f4f1eb]"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Newsletter Box */}
        <div className="w-full md:w-80 flex flex-col justify-between">
          <div>
            <h3 className="font-['DM_Serif_Display',serif] text-lg sm:text-xl text-[#f4f1eb] mb-3 leading-snug">
              Sign up to receive our promotions and news
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@framer.com"
                className="w-full bg-transparent border-b border-[#f4f1eb]/60 py-2 px-1 text-xs sm:text-sm text-[#f4f1eb] placeholder-[#f4f1eb]/50 focus:outline-none focus:border-[#f4f1eb]"
              />

              <button
                type="submit"
                className="w-full bg-[#f4f1eb] text-[#4a3129] py-2.5 px-4 font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-sm"
              >
                {subscribed ? 'Subscribed!' : 'Submit'}
              </button>
            </form>
          </div>

          <div className="mt-8 pt-4 border-t border-[#f4f1eb]/20 text-[11px] text-[#f4f1eb]/80">
            {themeConfig.copyrightText}
          </div>
        </div>
      </div>

      {/* Footer Sub-Bar with Logo */}
      <div className="bg-[#4a3129] border-x border-b border-[#4a3129] px-6 py-4 flex items-center justify-between mt-0">
        <button
          onClick={() => onNavigate('home')}
          className="font-['DM_Serif_Display',serif] text-2xl text-[#f4f1eb] tracking-tight hover:opacity-80 transition-opacity"
        >
          {themeConfig.shortName}
        </button>

        <p className="text-xs text-[#f4f1eb]/70 font-['Satoshi',sans-serif]">
          Timeless, Sustainable Luxury
        </p>
      </div>
    </footer>
  );
};

