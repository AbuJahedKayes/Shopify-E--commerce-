import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  compact = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const mainImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer bg-[#e3dbcf] p-2.5 sm:p-3 flex flex-col justify-between border border-[#4a3129] transition-all duration-300 hover:shadow-md"
    >
      {/* Image Container */}
      <div className={`relative w-full ${compact ? 'h-[260px] sm:h-[300px]' : 'h-[320px] sm:h-[380px] md:h-[400px]'} overflow-hidden bg-[#d2c8be]`}>
        <img
          src={isHovered ? secondaryImage : mainImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="bg-[#4a3129] text-[#f4f1eb] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
              New Arrival
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#f4f1eb] text-[#4a3129] border border-[#4a3129] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
              Bestseller
            </span>
          )}
        </div>

        {/* Quick View Hover Button */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="w-10 h-10 bg-[#f4f1eb] border border-[#4a3129] text-[#4a3129] flex items-center justify-center shadow-sm">
            <ArrowUpRight className="w-5 h-5 stroke-[1.5]" />
          </div>
        </div>
      </div>

      {/* Info Block */}
      <div className="pt-3 pb-1 flex items-end justify-between gap-2 font-['Satoshi',sans-serif]">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-normal text-[#4a3129] truncate group-hover:underline">
            {product.name}
          </h3>
          <p className="text-xs text-[#4a3129]/70 capitalize truncate">
            {product.category}
          </p>
        </div>

        <div className="text-right flex-shrink-0">
          {product.originalPrice && (
            <span className="text-xs text-[#4a3129]/50 line-through mr-1.5 font-normal">
              ${product.originalPrice}
            </span>
          )}
          <span className="text-sm sm:text-base font-bold text-[#4a3129]">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};
