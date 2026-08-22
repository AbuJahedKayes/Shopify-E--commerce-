import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Product } from '../types';
import { ArrowRight, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

interface NewArrivalsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products, onSelectProduct }) => {
  // Filter new arrivals (ensure minimum 5 products)
  const newArrivalsList = products.filter((p) => p.isNewArrival);
  const displayProducts = newArrivalsList.length >= 5 ? newArrivalsList : products.slice(0, 6);

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor scroll within container to calculate active product index
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const total = displayProducts.length;
      // Map scroll progress (0 to 1) to product index
      const index = Math.min(Math.floor(latest * total), total - 1);
      setActiveIndex(Math.max(0, index));
    });
    return () => unsubscribe();
  }, [scrollYProgress, displayProducts.length]);

  const scrollToProduct = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.clientHeight;
    const targetScroll = containerTop + (index / displayProducts.length) * (containerHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const currentProduct = displayProducts[activeIndex] || displayProducts[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#f4f1eb] text-[#4a3129] font-['Satoshi',sans-serif]"
      style={{ height: `${displayProducts.length * 90}vh` }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 px-4 md:px-12 border-y border-[#4a3129]/30">
        
        {/* Section Header */}
        <div className="w-full max-w-4xl mx-auto text-center pt-4 z-20">
          <div className="inline-flex items-center gap-2 bg-[#e3dbcf] border border-[#4a3129] px-3 py-1 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#4a3129]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a3129]">
              Scroll Driven Catalog
            </span>
          </div>

          <h2 className="font-['DM_Serif_Display',serif] text-3xl md:text-5xl text-[#5d4037] tracking-tight">
            NEW ARRIVALS
          </h2>
          
          <p className="text-xs md:text-sm text-[#4a3129]/80 max-w-md mx-auto mt-1 font-medium">
            Discover our latest arrivals, thoughtfully selected for you.
          </p>
        </div>

        {/* Center Stage: Single Active Product Card with Motion Transitions */}
        <div className="relative flex-1 flex items-center justify-center my-4 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, scale: 0.92, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md md:max-w-lg bg-[#f4f1eb] border-2 border-[#4a3129] shadow-2xl p-4 md:p-6 flex flex-col items-center text-center relative"
            >
              {/* Product Badge */}
              <div className="absolute -top-3 left-6 bg-[#4a3129] text-[#f4f1eb] text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-[#4a3129]">
                NEW ARRIVAL &bull; {activeIndex + 1}/{displayProducts.length}
              </div>

              {/* Product Image Frame */}
              <div className="w-full h-[260px] sm:h-[320px] md:h-[360px] bg-[#e3dbcf] border border-[#4a3129]/40 overflow-hidden relative group cursor-pointer mt-2"
                   onClick={() => onSelectProduct(currentProduct)}>
                <img
                  src={currentProduct.images[0]}
                  alt={currentProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-[#4a3129]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-[#f4f1eb] text-[#4a3129] text-xs font-bold px-4 py-2 border border-[#4a3129] shadow-md uppercase tracking-wider">
                    Quick View
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 space-y-1.5 w-full">
                <div className="flex justify-between items-baseline border-b border-[#4a3129]/20 pb-2">
                  <h3 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-[#4a3129]">
                    {currentProduct.name}
                  </h3>
                  <span className="font-['Satoshi',sans-serif] text-base md:text-lg font-bold text-[#4a3129]">
                    ${currentProduct.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-[#4a3129]/80 line-clamp-2 px-2 pt-1 font-normal">
                  {currentProduct.description}
                </p>

                <div className="pt-3 flex items-center justify-center">
                  <button
                    onClick={() => onSelectProduct(currentProduct)}
                    className="group inline-flex items-center gap-2 bg-[#4a3129] text-[#f4f1eb] px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#3b261f] transition-all shadow-md"
                  >
                    <span>VIEW PRODUCT</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation & Progress Bar */}
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between z-20 pb-2">
          {/* Index Counter */}
          <div className="text-xs font-bold text-[#4a3129] uppercase tracking-widest flex items-center gap-2">
            <span className="text-sm font-black text-[#4a3129]">
              0{activeIndex + 1}
            </span>
            <span className="text-[#4a3129]/40">/</span>
            <span className="text-[#4a3129]/60">
              0{displayProducts.length}
            </span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2">
            {displayProducts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => scrollToProduct(idx)}
                className={`transition-all ${
                  idx === activeIndex
                    ? 'w-8 h-2 bg-[#4a3129] rounded-none'
                    : 'w-2 h-2 bg-[#4a3129]/30 hover:bg-[#4a3129]/60'
                }`}
                title={p.name}
              />
            ))}
          </div>

          {/* Up / Down Controls */}
          <div className="flex items-center gap-1">
            <button
              disabled={activeIndex === 0}
              onClick={() => scrollToProduct(activeIndex - 1)}
              className="p-2 border border-[#4a3129] text-[#4a3129] disabled:opacity-30 hover:bg-[#e3dbcf] transition-colors"
              title="Previous Product"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              disabled={activeIndex === displayProducts.length - 1}
              onClick={() => scrollToProduct(activeIndex + 1)}
              className="p-2 border border-[#4a3129] text-[#4a3129] disabled:opacity-30 hover:bg-[#e3dbcf] transition-colors"
              title="Next Product"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
