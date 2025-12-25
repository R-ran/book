'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, TrendingUp, Clock, Heart, Settings, Download, CreditCard } from 'lucide-react';
import Image from 'next/image';
import PayPalButton from './PayPalButton';
import { useCart } from '@/contexts/CartContext';

export default function Hero() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: 'digital-planner-2025-2026',
      title: 'All-in-One Digital Planner - 2025 & 2026 | One-Time Purchase, Use Every Year',
      price: 29.00,
      originalPrice: 120.00,
      imageUrl: 'https://glowupplanners.com/cdn/shop/files/Screenshot_2025-07-21_at_09.41.53.png?v=1753087340',
      href: '/',
    });
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 500);
  };

  return (
    <section className="bg-white">
      <div className="bg-[#3B3B52] text-white text-center py-4">
        <p className="text-sm md:text-base font-medium">
          SIMPLIFY YOUR SCHEDULE AND ACHIEVE YOUR GOALS EFFORTLESSLY
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <div className="relative">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://glowupplanners.com/cdn/shop/files/Screenshot_2025-07-21_at_09.41.53.png?v=1753087340"
                  alt="Digital Planner"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 flex flex-col self-stretch">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">10,000+ Lives Organized!</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              All-in-One Digital Planner – 2025 & 2026 | One-Time Purchase, Use Every Year
            </h1>

            <p className="text-lg text-gray-600">
              Includes 2025, 2026, 2027 + FREE Yearly Updates
            </p>

            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="bg-[#FF9999] rounded-full p-2 mt-1">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Boosts Your Productivity</h3>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#FF9999] rounded-full p-2 mt-1">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Saves Valuable Time</h3>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#FF9999] rounded-full p-2 mt-1">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Reduces Daily Stress</h3>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#FF9999] rounded-full p-2 mt-1">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Customizable to Your Needs</h3>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#FF9999] rounded-full p-2 mt-1">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Instant Download - Lifetime Access</h3>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#FF9999] rounded-full p-2 mt-1">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 underline">One-Time Payment - No Subscriptions</h3>
                </div>
              </div>
            </div>

            <div className="pt-0">
              <div className="flex items-center space-x-4 mb-1">
                <span className="text-xl text-gray-400 line-through">$120.00</span>
                <span className="text-2xl font-bold text-green-600">$29.00</span>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-[#FF9999] hover:bg-[#FF7777] text-black font-bold text-xl py-4 px-6 mb-4 rounded-2xl transition-colors shadow-lg disabled:opacity-50"
              >
                {isAdding ? 'Adding...' : '🛒 Add to Cart'}
              </button>
              {showSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                  ✓ Successfully added to cart
                </div>
              )}
              
              {/* Progress Bar */}
              <div className="mt-6 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full" style={{ width: '20%' }}></div>
              </div>

              {/* Sale Message */}
              <p className="text-sm font-semibold text-gray-700 text-center mt-3">
                Only <span className="text-xl text-red-600 font-bold">2</span> left before{' '}
                <span className="text-xl text-red-600 font-bold">70%</span> Sale Ends!
              </p>

              {/* PayPal Logo */}
              <div className="flex justify-center mt-1">
                <Image
                  src="/paypal.png"
                  alt="PayPal"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>

              {/* 4 Images Grid */}
              <div className="grid grid-cols-4 gap-4 mt-3">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-c32090f2-1090-4a5a-8dd3-4a4c678b07ac.png?v=1827214654837836705"
                    alt="Feature 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-548b48f9-5a6f-421f-9bb5-d9fbecc3dc92.png?v=11991845006926542344"
                    alt="Feature 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-f4e7e2f1-d048-4ba2-b4de-38b3da0ba11b.png?v=17474238973647066042"
                    alt="Feature 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-4c29a776-963f-43b5-a4bd-fd6bbacf169e.png?v=15153948043427434845"
                    alt="Feature 4"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
