import React, { useState, useMemo } from 'react';
import { Category, Product, FilterState } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface ShopViewProps {
  initialCategory?: Category;
  onSelectProduct: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  initialCategory = 'all',
  onSelectProduct,
}) => {
  const [filter, setFilter] = useState<FilterState>({
    category: initialCategory,
    searchQuery: '',
    minPrice: 0,
    maxPrice: 200,
    selectedColor: null,
    selectedSize: null,
    sortBy: 'featured',
  });

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Available unique colors & sizes across all products
  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    PRODUCTS.forEach((p) => {
      p.colors.forEach((c) => map.set(c.name, c.hex));
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      // Category filter
      if (filter.category === 'new-arrivals') {
        if (!p.isNewArrival) return false;
      } else if (filter.category !== 'all') {
        if (p.category !== filter.category) return false;
      }

      // Search
      if (filter.searchQuery) {
        const q = filter.searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Price range
      if (p.price < filter.minPrice || p.price > filter.maxPrice) return false;

      // Color filter
      if (filter.selectedColor) {
        const hasColor = p.colors.some((c) => c.name === filter.selectedColor);
        if (!hasColor) return false;
      }

      // Size filter
      if (filter.selectedSize) {
        const hasSize = p.sizes.includes(filter.selectedSize);
        if (!hasSize) return false;
      }

      return true;
    });

    // Sort
    if (filter.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filter.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filter.sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [filter]);

  const resetFilters = () => {
    setFilter({
      category: 'all',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 200,
      selectedColor: null,
      selectedSize: null,
      sortBy: 'featured',
    });
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 md:py-12 font-['Satoshi',sans-serif]">
      {/* Title & Header */}
      <div className="mb-8 pb-6 border-b border-[#4a3129]/20">
        <h1 className="font-['DM_Serif_Display',serif] text-3xl md:text-5xl text-[#4a3129] tracking-tight">
          {filter.category === 'all'
            ? 'All Clothing & Essentials'
            : filter.category === 'new-arrivals'
            ? 'New Season Arrivals'
            : `${filter.category.toUpperCase()} Collection`}
        </h1>
        <p className="text-sm md:text-base text-[#4a3129]/70 mt-2 max-w-xl">
          Curated organic textiles, durable weaves, and timeless silhouettes engineered for everyday living.
        </p>
      </div>

      {/* Control Bar: Categories & Filter Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#e3dbcf]/40 p-4 border border-[#4a3129]">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase font-bold tracking-wider">
          {(['all', 'new-arrivals', 'tees', 'bottoms', 'outerwear', 'headwear'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter((f) => ({ ...f, category: cat }))}
              className={`px-3 py-1.5 border transition-all ${
                filter.category === cat
                  ? 'bg-[#4a3129] text-[#f4f1eb] border-[#4a3129]'
                  : 'bg-transparent text-[#4a3129] border-[#4a3129]/30 hover:border-[#4a3129]'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Sort & Filter Controls */}
        <div className="flex items-center gap-3 text-xs">
          {/* Sorting */}
          <div className="flex items-center gap-1.5 border border-[#4a3129] px-2.5 py-1.5 bg-[#f4f1eb]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#4a3129]" />
            <select
              value={filter.sortBy}
              onChange={(e) => setFilter((f) => ({ ...f, sortBy: e.target.value as any }))}
              className="bg-transparent text-[#4a3129] focus:outline-none cursor-pointer text-xs font-medium"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className="flex items-center gap-1.5 border border-[#4a3129] bg-[#4a3129] text-[#f4f1eb] px-3 py-1.5 uppercase font-bold tracking-wider hover:bg-[#3b261f] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {filterDrawerOpen && (
        <div className="mb-8 p-6 bg-[#e3dbcf]/60 border border-[#4a3129] space-y-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center pb-3 border-b border-[#4a3129]/20">
            <h3 className="font-['DM_Serif_Display',serif] text-xl text-[#4a3129]">
              Filter Collection
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-[#4a3129] underline hover:opacity-70 font-semibold"
            >
              Reset All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4a3129]">
            {/* Price Slider */}
            <div>
              <label className="block font-bold uppercase tracking-wider mb-2">
                Price Limit: ${filter.maxPrice}
              </label>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={filter.maxPrice}
                onChange={(e) => setFilter((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
                className="w-full accent-[#4a3129] cursor-pointer h-2"
              />
              <div className="flex justify-between text-[11px] text-[#4a3129]/60 mt-1">
                <span>$20</span>
                <span>$200</span>
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block font-bold uppercase tracking-wider mb-2">
                Color Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() =>
                      setFilter((f) => ({
                        ...f,
                        selectedColor: f.selectedColor === col.name ? null : col.name,
                      }))
                    }
                    className={`flex items-center gap-1.5 px-2.5 py-1 border text-[11px] ${
                      filter.selectedColor === col.name
                        ? 'border-[#4a3129] bg-[#4a3129] text-[#f4f1eb]'
                        : 'border-[#4a3129]/30 bg-[#f4f1eb] text-[#4a3129]'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block font-bold uppercase tracking-wider mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() =>
                      setFilter((f) => ({
                        ...f,
                        selectedSize: f.selectedSize === sz ? null : sz,
                      }))
                    }
                    className={`px-3 py-1 border font-bold text-xs ${
                      filter.selectedSize === sz
                        ? 'bg-[#4a3129] text-[#f4f1eb] border-[#4a3129]'
                        : 'bg-[#f4f1eb] text-[#4a3129] border-[#4a3129]/30'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {(filter.selectedColor || filter.selectedSize || filter.maxPrice < 200) && (
        <div className="flex items-center gap-2 mb-6 flex-wrap text-xs">
          <span className="text-[#4a3129]/60 font-semibold">Active Filters:</span>
          {filter.selectedColor && (
            <span className="bg-[#4a3129] text-[#f4f1eb] px-2.5 py-1 flex items-center gap-1">
              Color: {filter.selectedColor}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setFilter((f) => ({ ...f, selectedColor: null }))}
              />
            </span>
          )}
          {filter.selectedSize && (
            <span className="bg-[#4a3129] text-[#f4f1eb] px-2.5 py-1 flex items-center gap-1">
              Size: {filter.selectedSize}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setFilter((f) => ({ ...f, selectedSize: null }))}
              />
            </span>
          )}
          {filter.maxPrice < 200 && (
            <span className="bg-[#4a3129] text-[#f4f1eb] px-2.5 py-1 flex items-center gap-1">
              Max ${filter.maxPrice}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setFilter((f) => ({ ...f, maxPrice: 200 }))}
              />
            </span>
          )}
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#e3dbcf]/30 border border-[#4a3129]/20 p-8">
          <p className="font-['DM_Serif_Display',serif] text-2xl text-[#4a3129]">
            No matching products found
          </p>
          <p className="text-xs text-[#4a3129]/70 mt-2">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 bg-[#4a3129] text-[#f4f1eb] text-xs font-bold uppercase tracking-wider px-4 py-2"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      )}
    </div>
  );
};
