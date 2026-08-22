import React, { useState } from 'react';
import { X, Check, Lock, ShieldCheck, ArrowRight, Smartphone, CreditCard, ChevronLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onClearCart,
}) => {
  const [step, setStep] = useState<'express' | 'address' | 'payment' | 'success'>('express');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal; // Free eco-shipping

  const handleCompleteOrder = (methodName: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-['Satoshi',sans-serif]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#4a3129]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Checkout Window */}
      <div className="relative w-full max-w-lg bg-[#f4f1eb] border border-[#4a3129] shadow-2xl z-10 my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-[#4a3129] bg-[#e3dbcf]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step !== 'express' && step !== 'success' && (
              <button
                onClick={() => setStep(step === 'payment' ? 'address' : 'express')}
                className="p-1 text-[#4a3129] hover:bg-[#4a3129]/10 rounded"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <Lock className="w-4 h-4 text-[#4a3129]" />
            <span className="font-['DM_Serif_Display',serif] text-lg text-[#4a3129]">
              {step === 'success' ? 'Order Confirmed' : 'Mobile Checkout'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#4a3129] hover:bg-[#4a3129] hover:text-[#f4f1eb] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 md:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {step !== 'success' && (
            /* Order Brief Summary */
            <div className="bg-[#e3dbcf]/50 p-3.5 border border-[#4a3129]/20 flex justify-between items-center text-xs text-[#4a3129]">
              <div>
                <p className="font-bold">{cart.length} item(s) in your bag</p>
                <p className="text-[11px] text-[#4a3129]/70">Includes Free Carbon-Neutral Shipping</p>
              </div>
              <span className="text-base font-bold">${total.toFixed(2)}</span>
            </div>
          )}

          {/* STEP 1: Express 1-Tap Mobile Checkout Buttons */}
          {step === 'express' && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#4a3129]">
                  Express Mobile Pay
                </h3>
                <p className="text-xs text-[#4a3129]/70 mt-0.5">
                  1-Tap Instant Checkout for maximum speed
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => handleCompleteOrder('Apple Pay')}
                  disabled={isProcessing}
                  className="w-full bg-black text-white py-3 px-4 rounded-none font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Pay with Apple Pay</span>
                </button>

                <button
                  onClick={() => handleCompleteOrder('Shop Pay')}
                  disabled={isProcessing}
                  className="w-full bg-[#5a31f4] text-white py-3 px-4 rounded-none font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#4922dc] transition-colors"
                >
                  <span>Pay with Shop Pay</span>
                </button>

                <button
                  onClick={() => handleCompleteOrder('Google Pay')}
                  disabled={isProcessing}
                  className="w-full bg-white text-gray-900 border border-gray-300 py-3 px-4 rounded-none font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <span>Pay with Google Pay</span>
                </button>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#4a3129]/20"></div>
                <span className="flex-shrink mx-3 text-[11px] uppercase tracking-widest text-[#4a3129]/60 font-semibold">
                  Or enter details manually
                </span>
                <div className="flex-grow border-t border-[#4a3129]/20"></div>
              </div>

              <button
                onClick={() => setStep('address')}
                className="w-full bg-transparent border border-[#4a3129] text-[#4a3129] py-3 text-xs uppercase font-bold tracking-wider hover:bg-[#4a3129] hover:text-[#f4f1eb] transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Shipping Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Address Entry */}
          {step === 'address' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep('payment');
              }}
              className="space-y-4 text-xs"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a3129] border-b border-[#4a3129]/20 pb-2">
                1. Shipping Address
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-[#4a3129] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#e3dbcf]/40 border border-[#4a3129]/40 p-2.5 text-xs text-[#4a3129] focus:outline-none focus:border-[#4a3129]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a3129] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className="w-full bg-[#e3dbcf]/40 border border-[#4a3129]/40 p-2.5 text-xs text-[#4a3129] focus:outline-none focus:border-[#4a3129]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a3129] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full bg-[#e3dbcf]/40 border border-[#4a3129]/40 p-2.5 text-xs text-[#4a3129] focus:outline-none focus:border-[#4a3129]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#4a3129] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Organic Fashion Way"
                  className="w-full bg-[#e3dbcf]/40 border border-[#4a3129]/40 p-2.5 text-xs text-[#4a3129] focus:outline-none focus:border-[#4a3129]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a3129] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Portland"
                    className="w-full bg-[#e3dbcf]/40 border border-[#4a3129]/40 p-2.5 text-xs text-[#4a3129] focus:outline-none focus:border-[#4a3129]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a3129] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="97201"
                    className="w-full bg-[#e3dbcf]/40 border border-[#4a3129]/40 p-2.5 text-xs text-[#4a3129] focus:outline-none focus:border-[#4a3129]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4a3129] text-[#f4f1eb] py-3 text-xs uppercase font-bold tracking-wider hover:bg-[#3b261f] transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 3: Manual Payment */}
          {step === 'payment' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCompleteOrder('Credit Card');
              }}
              className="space-y-4 text-xs"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a3129] border-b border-[#4a3129]/20 pb-2 flex items-center justify-between">
                <span>2. Payment Details</span>
                <span className="flex items-center gap-1 text-[10px] text-green-800 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
                </span>
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-[#4a3129] mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 •••• •••• 8892"
                    className="w-full bg-[#e3dbcf]/40 border border-[#4a3129]/40 p-2.5 pr-8 text-xs text-[#4a3129] focus:outline-none focus:border-[#4a3129]"
                  />
                  <CreditCard className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4a3129]/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a3129] mb-1">
                    Expires (MM/YY)
                  </label>
                  <input
                    type="text"
                    required
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    placeholder="08/28"
                    className="w-full bg-[#e3dbcf]/40 border border-[#4a3129]/40 p-2.5 text-xs text-[#4a3129] focus:outline-none focus:border-[#4a3129]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a3129] mb-1">
                    CVC / CVV
                  </label>
                  <input
                    type="text"
                    required
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="123"
                    className="w-full bg-[#e3dbcf]/40 border border-[#4a3129]/40 p-2.5 text-xs text-[#4a3129] focus:outline-none focus:border-[#4a3129]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#4a3129] text-[#f4f1eb] py-3.5 text-xs uppercase font-bold tracking-wider hover:bg-[#3b261f] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <span>Complete Order • ${total.toFixed(2)}</span>
                )}
              </button>
            </form>
          )}

          {/* STEP 4: Order Confirmation Success */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 border border-green-800 text-green-800 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-['DM_Serif_Display',serif] text-2xl text-[#4a3129]">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-[#4a3129]/80 mt-1">
                  Order #MS-883401 confirmed. We're carefully preparing your sustainable pieces.
                </p>
              </div>

              <div className="bg-[#e3dbcf]/60 p-4 border border-[#4a3129]/20 text-left text-xs text-[#4a3129] space-y-1">
                <p className="font-bold">Shipping Confirmation:</p>
                <p className="text-[#4a3129]/80">A confirmation email has been dispatched to {email || 'your email'}.</p>
                <p className="text-[#4a3129]/80">Tracking link will activate as soon as the package leaves our eco-facility.</p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#4a3129] text-[#f4f1eb] py-3 text-xs uppercase font-bold tracking-wider hover:bg-[#3b261f] transition-all mt-4"
              >
                Return to Store
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
