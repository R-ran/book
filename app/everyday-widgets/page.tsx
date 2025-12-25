'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';
import { useCart } from '@/contexts/CartContext';

export default function EverydayWidgetsPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: 'everyday-widgets',
      title: 'Everyday Widgets',
      price: 6.00,
      imageUrl: 'https://glowupplanners.com/cdn/shop/files/betterwid_908f4cb8-88eb-4851-87f8-85d493e39550.webp?v=1750530843&width=1800',
      href: '/everyday-widgets',
    });
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      router.push('/checkout');
    }, 500);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-white">
        <div className="bg-[#3B3B52] text-white text-center py-4">
          <p className="text-sm md:text-base font-medium">
            SIMPLIFY YOUR SCHEDULE AND ACHIEVE YOUR GOALS EFFORTLESSLY
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <div className="relative">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="https://glowupplanners.com/cdn/shop/files/betterwid_908f4cb8-88eb-4851-87f8-85d493e39550.webp?v=1750530843&width=1800"
                    alt="Everyday Widgets"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col self-stretch">
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Everyday Widgets
              </h1>


              <div className="pt-0">
                <div className="flex items-center space-x-4 mb-6">
                  
                  <span className="text-2xl font-bold text-green-600">$6.00</span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold text-xl py-4 px-6 mb-4 rounded-2xl transition-colors shadow-lg disabled:opacity-50"
                >
                  {isAdding ? 'Adding...' : '🛒 Add to Cart'}
                </button>
                {showSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                    ✓ Successfully added to cart
                  </div>
                )}
                <button
                  onClick={handleBuyNow}
                  disabled={isAdding}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold text-xl py-4 px-6 rounded-2xl transition-colors shadow-lg disabled:opacity-50"
                >
                  Buy it now!
                </button>

                <p className="text-xl font-semibold text-gray-700 mt-6">
                  🚚 Reliable shipping
                </p>
                <p className="text-xl font-semibold text-gray-700 mt-6">
                  🔙 Flexible returns
                </p>


              </div>
            </div>
          </div>
        </div>
      </section>
      <YouMayAlsoLike excludeSlug="everyday-widgets" />
      <Footer />
    </main>
  );
}
