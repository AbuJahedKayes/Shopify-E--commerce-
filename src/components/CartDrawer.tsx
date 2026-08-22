import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoCodeError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'MOSS10') {
      setDiscount(subtotal * 0.1);
      setPromoCodeError('');
    } else if (promoCode.trim().toUpperCase() === 'FREESHIP') {
      setDiscount(15);
      setPromoCodeError('');
    } else {
      setPromoCodeError('Invalid code. Try "MOSS10" for 10% off.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#4a3129]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative bg-[#f4f1eb] w-full max-w-md h-full shadow-2xl border-l border-[#4a3129] flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-[#4a3129] flex justify-between items-center bg-[#e3dbcf]/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#4a3129]" />
            <h2 className="font-['DM_Serif_Display',serif] text-xl text-[#4a3129]">
              Your Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#4a3129] hover:bg-[#4a3129] hover:text-[#f4f1eb] transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#4a3129]/70 font-['Satoshi',sans-serif]">
              <div className="w-16 h-16 rounded-full border border-[#4a3129]/30 flex items-center justify-center mb-4 bg-[#e3dbcf]">
                <ShoppingBag className="w-8 h-8 text-[#4a3129]/60" />
              </div>
              <p className="text-lg font-medium text-[#4a3129]">Your cart is empty</p>
              <p className="text-xs mt-1 max-w-xs text-[#4a3129]/70">
                Explore our slow fashion earth-toned collections and add sustainable pieces to your order.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                className="bg-[#e3dbcf]/60 border border-[#4a3129]/30 p-3 flex gap-3 font-['Satoshi',sans-serif] relative group"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 object-cover bg-[#d2c8be] flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-[#4a3129] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-[#4a3129]/50 hover:text-red-700 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#4a3129]/80 mt-1">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-[#4a3129]/40"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                      <span>•</span>
                      <span>Size: {item.selectedSize}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#4a3129]/10">
                    <div className="flex items-center border border-[#4a3129] bg-[#f4f1eb]">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#4a3129] hover:bg-[#e3dbcf]"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-[#4a3129]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#4a3129] hover:bg-[#e3dbcf]"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#4a3129]">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 md:p-6 border-t border-[#4a3129] bg-[#e3dbcf]/40 space-y-4 font-['Satoshi',sans-serif]">
            {/* Promo Code Input */}
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4a3129]/50" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. MOSS10)"
                    className="w-full bg-[#f4f1eb] border border-[#4a3129]/40 pl-8 pr-2 py-1.5 text-xs text-[#4a3129] focus:outline-none focus:border-[#4a3129]"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="bg-[#4a3129] text-[#f4f1eb] text-xs font-semibold px-3 py-1.5 hover:opacity-90 transition-opacity"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-[11px] text-red-700 mt-1 font-medium">{promoError}</p>
              )}
              {discount > 0 && (
                <p className="text-[11px] text-green-800 font-medium mt-1">
                  Discount applied: -${discount.toFixed(2)}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#4a3129]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-800">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Eco-Shipping</span>
                <span className="font-semibold text-green-800">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-[#4a3129]/20">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Mobile-Optimized Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-[#4a3129] text-[#f4f1eb] py-3.5 px-4 flex items-center justify-between font-semibold text-sm hover:bg-[#3b261f] transition-all shadow-md group"
            >
              <span className="uppercase tracking-wider">Mobile Checkout</span>
              <div className="flex items-center gap-2">
                <span>${total.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#4a3129]/70 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-800" />
              <span>Encrypted &amp; mobile optimized checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
