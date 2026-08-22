import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShieldCheck, Truck, RefreshCw, Star, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: { name: string; hex: string }, size: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Default', hex: '#4A3129' });
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'sustainability'>('details');

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#4a3129]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-[#f4f1eb] border border-[#4a3129] shadow-2xl z-10 my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#f4f1eb] border border-[#4a3129] text-[#4a3129] hover:bg-[#4a3129] hover:text-[#f4f1eb] transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Gallery Section */}
          <div className="p-4 sm:p-6 bg-[#e3dbcf]/40 border-b md:border-b-0 md:border-r border-[#4a3129] flex flex-col gap-4">
            {/* Main Featured Gallery Image */}
            <div className="relative w-full aspect-square bg-[#d2c8be] overflow-hidden border border-[#4a3129]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={`${product.name} view ${selectedImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {product.isNewArrival && (
                <span className="absolute top-3 left-3 bg-[#4a3129] text-[#f4f1eb] text-xs uppercase font-bold tracking-wider px-2.5 py-1">
                  New
                </span>
              )}
            </div>

            {/* Thumbnail Carousel / List */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border transition-all ${
                      selectedImageIndex === idx
                        ? 'border-2 border-[#4a3129] scale-95 opacity-100'
                        : 'border-[#4a3129]/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="p-5 sm:p-8 flex flex-col justify-between font-['Satoshi',sans-serif] bg-[#f4f1eb]">
            <div className="space-y-6">
              {/* Category & Title */}
              <div>
                <p className="text-xs uppercase tracking-widest text-[#4a3129]/60 font-semibold mb-1">
                  {product.category}
                </p>
                <h1 className="font-['DM_Serif_Display',serif] text-2xl sm:text-3xl text-[#4a3129] leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Pricing */}
                <div className="flex items-center justify-between mt-3 pb-4 border-b border-[#4a3129]/20">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#4a3129]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#4a3129]/50 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[#4a3129]">
                    <div className="flex text-amber-800">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating) ? 'fill-amber-800' : 'fill-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-[#4a3129]/60">({product.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a3129] mb-2">
                  Color: <span className="text-[#4a3129]/70 normal-case font-normal">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-transform ${
                        selectedColor.name === col.name
                          ? 'border-2 border-[#4a3129] scale-110 shadow-sm'
                          : 'border-[#4a3129]/30 hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColor.name === col.name && (
                        <Check className="w-4 h-4 text-white drop-shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4a3129]">
                    Size: <span className="font-normal text-[#4a3129]/70">{selectedSize}</span>
                  </label>
                  <span className="text-[11px] text-[#4a3129]/70 underline cursor-pointer">
                    Size Guide
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-bold border transition-colors ${
                        selectedSize === sz
                          ? 'bg-[#4a3129] text-[#f4f1eb] border-[#4a3129]'
                          : 'bg-transparent text-[#4a3129] border-[#4a3129]/30 hover:border-[#4a3129]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center border border-[#4a3129] bg-[#e3dbcf]/40 h-11">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-[#4a3129] hover:bg-[#e3dbcf]"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold text-sm text-[#4a3129]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-[#4a3129] hover:bg-[#e3dbcf]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#4a3129] text-[#f4f1eb] h-11 font-semibold text-xs uppercase tracking-wider hover:bg-[#3b261f] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                  )}
                </button>
              </div>

              {/* Tabbed Info Accordion */}
              <div className="pt-4 border-t border-[#4a3129]/20">
                <div className="flex border-b border-[#4a3129]/20 text-xs font-semibold uppercase tracking-wider text-[#4a3129]">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-[#4a3129] text-[#4a3129]'
                        : 'border-transparent text-[#4a3129]/50 hover:text-[#4a3129]'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'fabric'
                        ? 'border-[#4a3129] text-[#4a3129]'
                        : 'border-transparent text-[#4a3129]/50 hover:text-[#4a3129]'
                    }`}
                  >
                    Fabric &amp; Care
                  </button>
                  <button
                    onClick={() => setActiveTab('sustainability')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'sustainability'
                        ? 'border-[#4a3129] text-[#4a3129]'
                        : 'border-transparent text-[#4a3129]/50 hover:text-[#4a3129]'
                    }`}
                  >
                    Sustainability
                  </button>
                </div>

                <div className="py-3 text-xs text-[#4a3129]/80 leading-relaxed min-h-[70px]">
                  {activeTab === 'details' && <p>{product.description}</p>}
                  {activeTab === 'fabric' && <p>{product.fabricDetails}</p>}
                  {activeTab === 'sustainability' && <p>{product.sustainabilityNote}</p>}
                </div>
              </div>
            </div>

            {/* Service Guarantees */}
            <div className="pt-4 mt-6 border-t border-[#4a3129]/10 grid grid-cols-3 gap-2 text-[10px] text-[#4a3129] text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#4a3129]" />
                <span>Free Carbon-Neutral Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-[#4a3129]" />
                <span>30-Day Easy Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#4a3129]" />
                <span>1-Year Seam Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
