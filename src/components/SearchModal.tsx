import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Product, Category } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(200);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all'
          ? true
          : selectedCategory === 'new-arrivals'
          ? p.isNewArrival
          : p.category === selectedCategory;

      const matchesPrice = p.price <= maxPriceFilter;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [query, selectedCategory, maxPriceFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-20 px-3 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#4a3129]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#f4f1eb] border border-[#4a3129] shadow-2xl z-10 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Search Header */}
        <div className="p-4 md:p-6 border-b border-[#4a3129] flex items-center gap-3 bg-[#e3dbcf]/40">
          <Search className="w-5 h-5 text-[#4a3129] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tees, cargo pants, hoodies, outerwear..."
            autoFocus
            className="flex-1 bg-transparent border-none text-[#4a3129] placeholder-[#4a3129]/50 text-base md:text-lg focus:outline-none font-['Satoshi',sans-serif]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#4a3129]/60 hover:text-[#4a3129] text-xs font-semibold uppercase tracking-wider px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#4a3129] hover:bg-[#4a3129] hover:text-[#f4f1eb] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-3 border-b border-[#4a3129]/20 bg-[#f4f1eb] flex flex-wrap items-center gap-2 text-xs font-['Satoshi',sans-serif]">
          <span className="text-[#4a3129]/60 font-semibold uppercase tracking-wider flex items-center gap-1 mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
          </span>

          {(['all', 'new-arrivals', 'tees', 'bottoms', 'outerwear', 'headwear'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 border transition-colors capitalize ${
                selectedCategory === cat
                  ? 'bg-[#4a3129] text-[#f4f1eb] border-[#4a3129]'
                  : 'bg-transparent text-[#4a3129] border-[#4a3129]/30 hover:border-[#4a3129]'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2 text-[#4a3129]">
            <span className="text-[11px] text-[#4a3129]/70">Max Price: ${maxPriceFilter}</span>
            <input
              type="range"
              min="30"
              max="200"
              step="10"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="accent-[#4a3129] h-1.5 w-24 cursor-pointer"
            />
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#4a3129]/70 font-['Satoshi',sans-serif]">
              <p className="text-base font-medium">No items found matching your criteria.</p>
              <p className="text-xs mt-1">Try adjusting your keywords or clearing the category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="group bg-[#e3dbcf]/50 border border-[#4a3129]/30 p-3 cursor-pointer hover:border-[#4a3129] transition-all flex items-center gap-3"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover bg-[#d2c8be] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 font-['Satoshi',sans-serif]">
                    <h4 className="text-sm font-semibold text-[#4a3129] truncate group-hover:underline">
                      {p.name}
                    </h4>
                    <p className="text-xs text-[#4a3129]/60 capitalize">{p.category}</p>
                    <p className="text-sm font-bold text-[#4a3129] mt-0.5">${p.price}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#4a3129]/40 group-hover:text-[#4a3129] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
