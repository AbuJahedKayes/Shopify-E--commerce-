import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Sliders } from 'lucide-react';
import { ViewMode, Category, ThemeConfig } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, category?: Category) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  themeConfig: ThemeConfig;
  onOpenCustomizer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  themeConfig,
  onOpenCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewMode, cat?: Category) => {
    onNavigate(view, cat);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-8 md:py-4 flex justify-center items-center pointer-events-none font-['Satoshi',sans-serif]">
        <div className="w-full max-w-[1400px] bg-[#f4f1eb]/95 backdrop-blur-md border border-[#4a3129] shadow-sm flex justify-between items-center h-12 md:h-14 px-3 md:px-5 pointer-events-auto transition-all duration-300">
          
          {/* Left: Menu button & Theme Customizer */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 text-[#4a3129] hover:opacity-80 transition-opacity text-sm md:text-base font-medium px-2 py-1"
              aria-label="Toggle menu"
            >
              <Menu className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
              <span className="tracking-tight text-base md:text-lg">
                Menu
              </span>
            </button>

            <button
              onClick={onOpenCustomizer}
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[#4a3129] bg-[#e3dbcf] hover:bg-[#4a3129] hover:text-[#f4f1eb] px-2.5 py-1 border border-[#4a3129] transition-colors ml-2"
              title="Customize Theme, Videos, Branding & Categories"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Theme Customizer</span>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <button
              onClick={() => handleNavClick('home')}
              className="font-['DM_Serif_Display',serif] text-xl sm:text-2xl md:text-2xl text-[#4a3129] tracking-tight hover:opacity-80 transition-opacity"
            >
              <span>{themeConfig.shortName}</span>
            </button>
          </div>

          {/* Right: Search & Cart */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={onOpenCustomizer}
              className="lg:hidden p-2 text-[#4a3129] hover:bg-[#e3dbcf]/50 transition-colors"
              title="Theme Settings"
            >
              <Sliders className="w-4 h-4 stroke-[1.5]" />
            </button>

            <button
              onClick={onOpenSearch}
              className="p-2 text-[#4a3129] hover:bg-[#e3dbcf]/50 transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#4a3129] hover:bg-[#e3dbcf]/50 transition-colors flex items-center justify-center"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 bg-[#4a3129] text-[#f4f1eb] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#e3dbcf] absolute top-1 right-1 animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex font-['Satoshi',sans-serif]">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#4a3129]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative bg-[#f4f1eb] w-full max-w-md h-full shadow-2xl border-r border-[#4a3129] flex flex-col justify-between p-6 md:p-8 z-10 animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-[#4a3129]/20">
                <span className="font-['DM_Serif_Display',serif] text-2xl text-[#4a3129]">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#4a3129] hover:opacity-70 transition-opacity"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 flex flex-col gap-4">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`text-left text-xl font-medium tracking-wide py-2 border-b border-[#4a3129]/10 transition-colors ${
                    currentView === 'home' ? 'text-[#4a3129] font-bold pl-2 border-l-2 border-l-[#4a3129]' : 'text-[#4a3129]/80 hover:text-[#4a3129]'
                  }`}
                >
                  Home Page
                </button>

                <div className="py-2 border-b border-[#4a3129]/10">
                  <div className="text-xs uppercase tracking-widest text-[#4a3129]/60 mb-3 font-semibold">
                    Shop Categories
                  </div>
                  <div className="flex flex-col gap-2.5 pl-2 text-base">
                    <button
                      onClick={() => handleNavClick('shop', 'all')}
                      className="text-left text-[#4a3129] hover:translate-x-1 transition-transform"
                    >
                      Shop All Products
                    </button>
                    <button
                      onClick={() => handleNavClick('shop', 'new-arrivals')}
                      className="text-left text-[#4a3129] hover:translate-x-1 transition-transform flex items-center justify-between"
                    >
                      <span>New Arrivals</span>
                      <span className="text-[10px] bg-[#4a3129] text-[#f4f1eb] px-1.5 py-0.5 uppercase tracking-wider font-bold">New</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('shop', 'tees')}
                      className="text-left text-[#4a3129] hover:translate-x-1 transition-transform"
                    >
                      Tees &amp; Tops
                    </button>
                    <button
                      onClick={() => handleNavClick('shop', 'bottoms')}
                      className="text-left text-[#4a3129] hover:translate-x-1 transition-transform"
                    >
                      Cargo &amp; Trousers
                    </button>
                    <button
                      onClick={() => handleNavClick('shop', 'outerwear')}
                      className="text-left text-[#4a3129] hover:translate-x-1 transition-transform"
                    >
                      Outerwear &amp; Jackets
                    </button>
                    <button
                      onClick={() => handleNavClick('shop', 'headwear')}
                      className="text-left text-[#4a3129] hover:translate-x-1 transition-transform"
                    >
                      Headwear &amp; Beanies
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onOpenCustomizer();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-lg font-bold text-[#4a3129] py-2 border-b border-[#4a3129]/10 hover:text-[#4a3129]/70 flex items-center justify-between"
                >
                  <span>Customize Theme &amp; Media</span>
                  <Sliders className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleNavClick('about')}
                  className="text-left text-lg font-medium text-[#4a3129] py-2 border-b border-[#4a3129]/10 hover:text-[#4a3129]/70"
                >
                  Our Story &amp; Ethos
                </button>
                <button
                  onClick={() => handleNavClick('size-guide')}
                  className="text-left text-lg font-medium text-[#4a3129] py-2 border-b border-[#4a3129]/10 hover:text-[#4a3129]/70"
                >
                  Sizing Guide
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-left text-lg font-medium text-[#4a3129] py-2 border-b border-[#4a3129]/10 hover:text-[#4a3129]/70"
                >
                  Contact Us
                </button>
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-[#4a3129]/20 text-xs text-[#4a3129]/70 flex flex-col gap-2">
              <p className="font-['DM_Serif_Display',serif] text-[#4a3129] text-base">
                {themeConfig.companyName}
              </p>
              <p>Timeless, slow fashion ethically crafted to last.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

