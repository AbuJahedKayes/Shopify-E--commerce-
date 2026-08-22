import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, Category, Product, ThemeConfig } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowUpRight, ChevronLeft, ChevronRight, Check, Star } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewMode, category?: Category) => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
  themeConfig: ThemeConfig;
  onOpenCustomizer: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProduct,
  products,
  themeConfig,
  onOpenCustomizer,
}) => {
  // Filter new arrivals for diagonal auto-scrolling showcase
  const newArrivals = products.filter((p) => p.isNewArrival);
  const carouselProducts = newArrivals.length >= 5 ? newArrivals : products.slice(0, 7);

  // Active slide state
  const [activeSlide, setActiveSlide] = useState(3); // Start near middle
  const [isPlaying, setIsPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % carouselProducts.length);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, carouselProducts.length]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % carouselProducts.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);
  };

  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 3);
  const currentHeroProduct = carouselProducts[activeSlide] || products[0];

  // Review quotes
  const reviewsList = [
    {
      quote: '"Flawless utility meets minimal design. The matte fabric resists the elements while maintaining a clean, tailored drape. An essential layer for everyday wear."',
      author: 'David M.',
      role: 'Verified Buyer',
      productName: 'Technical Overshirt',
      productPrice: '$110',
      productImage: 'https://framerusercontent.com/images/opNkgPwrgDRQGIZt2LtiLwJDJOw.jpg?width=1024&height=1024'
    },
    {
      quote: '"AK-27 gets slow fashion right. The Cargo Pants are incredibly durable yet soft, and knowing they\'re made sustainably makes wearing them feel even better."',
      author: 'Marcus K.',
      role: 'Verified Buyer',
      productName: 'Relaxed Cargo Pant',
      productPrice: '$90',
      productImage: 'https://framerusercontent.com/images/wALODyyP6YbbLSPSyEBUhBZXaM.jpg?width=1024&height=1024'
    },
    {
      quote: '"Heavyweight organic cotton with unmatched drape. I\'ve washed it dozens of times and it only gets softer. Truly built to last."',
      author: 'Elena R.',
      role: 'Verified Buyer',
      productName: 'Heavyweight Box Tee',
      productPrice: '$35',
      productImage: 'https://framerusercontent.com/images/XwFp99rmbkoVig8B4fYpHQXv3Ec.jpg?width=1024&height=1024'
    }
  ];
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 pt-16 md:pt-20 space-y-20 md:space-y-28 font-['Satoshi',sans-serif]">
      
      {/* 1. HERO SECTION WITH EXACT FRAMER DIAGONAL CAROUSEL */}
      <section className="relative w-full min-h-[550px] md:h-[82vh] md:max-h-[820px] bg-[#f4f1eb] overflow-hidden flex flex-col md:flex-row border border-[#4a3129] shadow-sm">
        
        {/* Left Text & Navigation Panel */}
        <div className="z-20 w-full md:w-2/5 p-6 md:p-12 flex flex-col justify-between bg-[#f4f1eb]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#e3dbcf] border border-[#4a3129] px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-[#4a3129] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a3129]">
                {themeConfig.shortName} Autumn/Winter Collection
              </span>
            </div>

            <h1 className="font-['DM_Serif_Display',serif] text-4xl sm:text-5xl md:text-6xl text-[#5d4037] leading-tight tracking-tight">
              {themeConfig.heroHeadline}
            </h1>
            
            <p className="text-sm md:text-base text-[#4a3129]/90 leading-relaxed font-normal">
              {themeConfig.heroSubheadline}
            </p>

            <div className="pt-3 flex items-center gap-3">
              <button
                onClick={() => onNavigate('shop', 'new-arrivals')}
                className="group inline-flex items-center border border-[#4a3129] bg-[#4a3129] text-[#f4f1eb] transition-all duration-300 hover:bg-[#3b261f]"
              >
                <span className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider border-r border-[#f4f1eb]">
                  Explore All
                </span>
                <div className="p-3.5">
                  <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
                </div>
              </button>

              <button
                onClick={onOpenCustomizer}
                className="hidden sm:inline-flex items-center border border-[#4a3129]/50 bg-[#e3dbcf] px-4 py-3.5 text-xs font-bold text-[#4a3129] hover:bg-[#4a3129] hover:text-[#f4f1eb] transition-colors"
                title="Customize Theme & Media"
              >
                Customize Theme
              </button>
            </div>
          </div>

          {/* Carousel Progress */}
          <div className="mt-8 pt-6 border-t border-[#4a3129]/20 flex items-center justify-between">
            <span className="text-xs font-bold text-[#4a3129] uppercase tracking-wider">
              Item 0{activeSlide + 1} / 0{carouselProducts.length}
            </span>

            <div className="flex items-center gap-1.5">
              {carouselProducts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`transition-all ${
                    idx === activeSlide ? 'w-6 h-2 bg-[#4a3129]' : 'w-2 h-2 bg-[#4a3129]/20 hover:bg-[#4a3129]/60'
                  }`}
                  title={p.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Diagonal 3D Interactive Stack Showcase */}
        <div className="w-full md:w-3/5 relative h-[420px] md:h-full bg-[#e3dbcf]/40 overflow-hidden border-t md:border-t-0 md:border-l border-[#4a3129] flex items-center justify-center">
          
          {/* Diagonal Stack Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {carouselProducts.map((p, idx) => {
              const diff = idx - activeSlide;
              const isCenter = diff === 0;

              // Diagonal transformation values matching mossandstonetemplate.framer.website exactly:
              // transform: translateX(diff * 240px) translateY(diff * -100px) scale(...)
              const translateX = diff * 240;
              const translateY = diff * -100;
              const scale = isCenter ? 1 : 0.85;
              const opacity = isCenter ? 1 : Math.max(0.1, 0.5 - Math.abs(diff) * 0.08);
              const zIndex = isCenter ? 20 : 10 - Math.abs(diff);

              return (
                <div
                  key={p.id}
                  onClick={() => setActiveSlide(idx)}
                  className="absolute cursor-pointer transition-all duration-700 ease-out border border-[#4a3129] bg-[#f4f1eb] p-2 shadow-2xl group"
                  style={{
                    width: '220px',
                    height: '380px',
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: 'auto',
                  }}
                >
                  <div className="w-full h-full overflow-hidden relative bg-[#e3dbcf]">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div
                      className="absolute inset-0 transition-colors duration-500"
                      style={{
                        backgroundColor: isCenter ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
                      }}
                    />

                    {isCenter && (
                      <div className="absolute top-3 left-3 bg-[#4a3129] text-[#f4f1eb] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-md">
                        {p.category}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Product Floating Card Detail (Bottom Right Overlay) */}
          <div className="absolute right-4 bottom-4 z-30 w-full max-w-[300px] sm:max-w-[320px] bg-[#f4f1eb]/95 backdrop-blur-md border border-[#4a3129] p-4 shadow-2xl flex flex-col gap-2 font-['Satoshi',sans-serif] animate-in fade-in duration-300">
            <p className="text-xs text-[#4a3129]/90 leading-snug line-clamp-2">
              {currentHeroProduct.description}
            </p>

            <div className="flex items-end justify-between gap-2 border-t border-[#4a3129]/20 pt-3 mt-1">
              <div>
                <h4 className="font-bold text-sm text-[#4a3129] leading-tight">
                  {currentHeroProduct.name}
                </h4>
                <p className="text-sm font-bold text-[#4a3129]">
                  ${currentHeroProduct.price}
                </p>
              </div>

              <button
                onClick={() => onSelectProduct(currentHeroProduct)}
                className="w-10 h-10 border border-[#4a3129] bg-[#4a3129] text-[#f4f1eb] hover:bg-[#3b261f] flex items-center justify-center transition-colors shrink-0"
                title="View Product Details"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Controls (Bottom Left Overlay) */}
          <div className="absolute left-4 bottom-4 z-30 flex items-center gap-2">
            <button
              onClick={handlePrevSlide}
              className="w-11 h-11 border border-[#4a3129] bg-[#f4f1eb] text-[#4a3129] hover:bg-[#4a3129] hover:text-[#f4f1eb] flex items-center justify-center transition-colors shadow-lg"
              title="Previous Product"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextSlide}
              className="w-11 h-11 border border-[#4a3129] bg-[#f4f1eb] text-[#4a3129] hover:bg-[#4a3129] hover:text-[#f4f1eb] flex items-center justify-center transition-colors shadow-lg"
              title="Next Product"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* 2. "SOFT AS MOSS. DURABLE AS STONE." SECTION WITH VIDEO PLAYER */}
      <section className="bg-[#4a3129] text-[#f4f1eb] p-6 md:p-14 border border-[#4a3129] grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Video Player Box */}
        <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden border border-[#f4f1eb]/30 bg-black group">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={themeConfig.ethosPosterUrl}
            className="w-full h-full object-cover object-center"
          >
            <source src={themeConfig.ethosVideoUrl} type="video/mp4" />
            <img
              src={themeConfig.ethosPosterUrl}
              alt="AK-27 Craftsmanship"
              className="w-full h-full object-cover"
            />
          </video>

          <div className="absolute top-4 left-4 bg-[#4a3129]/80 backdrop-blur-md border border-[#f4f1eb]/30 px-3 py-1 text-[10px] font-bold tracking-widest text-[#f4f1eb] uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Craftsmanship Video
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-6">
          <h2 className="font-['DM_Serif_Display',serif] text-3xl sm:text-4xl md:text-5xl text-[#f4f1eb] leading-tight whitespace-pre-line">
            {themeConfig.ethosTitle}
          </h2>

          <p className="text-sm md:text-base text-[#f4f1eb]/90 leading-relaxed font-normal">
            {themeConfig.ethosDescription}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('about')}
              className="group inline-flex items-center border border-[#f4f1eb] bg-transparent text-[#f4f1eb] transition-all duration-300 hover:bg-[#f4f1eb] hover:text-[#4a3129]"
            >
              <span className="px-5 py-3 text-xs uppercase font-bold tracking-wider border-r border-[#f4f1eb] group-hover:border-[#4a3129]">
                Read Our Story
              </span>
              <div className="p-3">
                <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
              </div>
            </button>

            <button
              onClick={onOpenCustomizer}
              className="text-xs text-[#f4f1eb]/70 hover:text-white underline p-3"
            >
              Change Video URL
            </button>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY SECTION */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-['DM_Serif_Display',serif] text-3xl md:text-4xl text-[#5d4037]">
              SHOP BY CATEGORY
            </h2>
            <p className="text-sm text-[#4a3129]/70 mt-1 max-w-md">
              Explore our curated collections of earth-toned essentials made for daily living.
            </p>
          </div>

          <button
            onClick={onOpenCustomizer}
            className="text-xs font-bold text-[#4a3129] underline hover:opacity-80"
          >
            Change Category Pictures
          </button>
        </div>

        {/* Dynamic Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {themeConfig.categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop', cat.id)}
              className="group cursor-pointer bg-[#e3dbcf] h-[380px] md:h-[430px] p-0 relative border border-[#4a3129] overflow-hidden flex flex-col justify-end transition-all shadow-xs"
            >
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-10 bg-[#e3dbcf] p-4 border-t border-[#4a3129] flex justify-between items-center font-['DM_Serif_Display',serif]">
                <div>
                  <h3 className="text-xl md:text-2xl text-[#4a3129] group-hover:underline">
                    {cat.title}
                  </h3>
                  <p className="font-['Satoshi',sans-serif] text-[11px] text-[#4a3129]/70 font-normal">
                    {cat.subtitle}
                  </p>
                </div>
                <div className="w-8 h-8 border border-[#4a3129] bg-[#f4f1eb] flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-[#4a3129]" />
                </div>
              </div>
            </div>
          ))}

          {/* SHOP ALL CARD */}
          <div
            onClick={() => onNavigate('shop', 'all')}
            className="group cursor-pointer bg-[#4a3129] text-[#f4f1eb] h-[380px] md:h-[430px] p-8 flex flex-col justify-between border border-[#4a3129] hover:bg-[#3b261f] transition-colors shadow-xs"
          >
            <p className="text-xs uppercase tracking-widest text-[#f4f1eb]/70 font-semibold">
              Full Catalogue
            </p>
            <div>
              <h3 className="font-['DM_Serif_Display',serif] text-3xl md:text-4xl leading-tight">
                SHOP ALL PRODUCTS
              </h3>
              <p className="text-xs text-[#f4f1eb]/80 mt-2">
                Discover the complete range of slow fashion garments.
              </p>
            </div>
            <div className="w-10 h-10 border border-[#f4f1eb] flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS SECTION */}
      <section className="space-y-8">
        <div>
          <h2 className="font-['DM_Serif_Display',serif] text-3xl md:text-4xl text-[#5d4037]">
            BESTSELLERS
          </h2>
          <p className="text-sm text-[#4a3129]/70 mt-1 max-w-md">
            Shop the crowd favorites. These are the most-loved styles our community adores.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      </section>

      {/* 5. PROVEN QUALITY (REVIEWS SECTION FROM REFERENCE FRAMER TEMPLATE) */}
      <section className="bg-[#e3dbcf] p-6 md:p-12 border border-[#4a3129] space-y-8">
        <div>
          <h2 className="font-['DM_Serif_Display',serif] text-3xl md:text-4xl text-[#5d4037]">
            PROVEN QUALITY
          </h2>
          <p className="text-sm text-[#4a3129]/80 mt-1 max-w-md">
            Hear from our community. Real experiences with the craftsmanship and quality of our everyday essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex gap-1 text-[#4a3129]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#4a3129] stroke-none" />
              ))}
            </div>

            <p className="font-['DM_Serif_Display',serif] text-2xl md:text-3xl text-[#4a3129] italic leading-snug">
              {reviewsList[activeReviewIdx].quote}
            </p>

            <div className="flex items-center gap-3">
              <div>
                <h4 className="font-bold text-base text-[#4a3129]">
                  {reviewsList[activeReviewIdx].author}
                </h4>
                <div className="flex items-center gap-1 text-xs text-[#4a3129]/80">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{reviewsList[activeReviewIdx].role}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              {reviewsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIdx(idx)}
                  className={`h-2 transition-all ${
                    idx === activeReviewIdx ? 'w-8 bg-[#4a3129]' : 'w-2 bg-[#4a3129]/30 hover:bg-[#4a3129]/60'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-[#f4f1eb] p-4 border border-[#4a3129] flex items-center gap-4">
            <img
              src={reviewsList[activeReviewIdx].productImage}
              alt={reviewsList[activeReviewIdx].productName}
              className="w-20 h-24 object-cover border border-[#4a3129]/30 shrink-0"
            />
            <div className="space-y-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#4a3129]/70">
                Reviewed Item
              </span>
              <p className="font-bold text-sm text-[#4a3129] truncate">
                {reviewsList[activeReviewIdx].productName}
              </p>
              <p className="text-xs font-bold text-[#4a3129]">
                {reviewsList[activeReviewIdx].productPrice}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "BUILT FOR THE JOURNEY" (2nd LAST SECTION) */}
      <section className="relative w-full h-[450px] md:h-[550px] overflow-hidden border border-[#4a3129] flex items-center justify-center text-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={themeConfig.journeyPosterUrl}
            className="w-full h-full object-cover object-center opacity-70"
          >
            <source src={themeConfig.journeyVideoUrl} type="video/mp4" />
            <img
              src={themeConfig.journeyPosterUrl}
              alt="Built for the Journey"
              className="w-full h-full object-cover"
            />
          </video>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-[#4a3129]/60 backdrop-blur-[1px]" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-2xl px-6 space-y-6 text-[#f4f1eb]">
          <span className="inline-block bg-[#f4f1eb] text-[#4a3129] text-[11px] font-bold uppercase tracking-widest px-3 py-1">
            {themeConfig.shortName} Heritage
          </span>

          <h2 className="font-['DM_Serif_Display',serif] text-4xl sm:text-5xl md:text-6xl text-[#f4f1eb] tracking-tight">
            {themeConfig.journeyTitle}
          </h2>

          <p className="text-sm sm:text-base text-[#f4f1eb]/90 max-w-lg mx-auto leading-relaxed">
            {themeConfig.journeySubtitle}
          </p>

          <div>
            <button
              onClick={() => onNavigate('shop', 'all')}
              className="group inline-flex items-center border border-[#f4f1eb] bg-[#f4f1eb] text-[#4a3129] transition-all duration-300 hover:bg-transparent hover:text-[#f4f1eb]"
            >
              <span className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider border-r border-[#4a3129] group-hover:border-[#f4f1eb]">
                Shop All Collection
              </span>
              <div className="p-3.5">
                <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 7. CONSCIOUS CALCULATIONS (LAST SECTION) */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-['DM_Serif_Display',serif] text-3xl md:text-4xl text-[#5d4037]">
              CONSCIOUS CALCULATIONS
            </h2>
            <p className="text-sm text-[#4a3129]/70 mt-1 max-w-md">
              Total transparency. Meaningful metrics behind the environmental cost of our goods.
            </p>
          </div>

          <button
            onClick={onOpenCustomizer}
            className="text-xs font-bold text-[#4a3129] underline hover:opacity-80"
          >
            Edit Metrics
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themeConfig.consciousMetrics.map((m) => (
            <div
              key={m.id}
              className="bg-[#e3dbcf] p-6 border border-[#4a3129] flex flex-col justify-between gap-6 shadow-xs"
            >
              <div className="w-14 h-14 border border-[#4a3129] bg-[#f4f1eb] flex items-center justify-center text-lg font-bold text-[#4a3129]">
                {m.value}
              </div>

              <div className="space-y-2">
                <h3 className="font-['DM_Serif_Display',serif] text-xl text-[#5d4037]">
                  {m.title}
                </h3>
                <p className="text-xs text-[#4a3129]/90 leading-relaxed">
                  <strong>{m.subtitle}</strong> {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
