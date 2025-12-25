'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';
import { useCart } from '@/contexts/CartContext';

export default function PremiumStickersBundlePage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: 'premium-stickers-bundle',
      title: 'Premium Stickers Bundle',
      price: 15.00,
      originalPrice: 30.00,
      imageUrl: 'https://glowupplanners.com/cdn/shop/files/betterwid_2.webp?v=1750530763&width=1800',
      href: '/premium-stickers-bundle',
      productCode: 'G031FC',
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
                    src="https://glowupplanners.com/cdn/shop/files/betterwid_2.webp?v=1750530763&width=1800"
                    alt="Premium Stickers Bundle"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col self-stretch">
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Premium Stickers Bundle
              </h1>


              <div className="pt-0">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-xl text-gray-400 line-through">$30.00</span>
                  <span className="text-2xl font-bold text-green-600">$15.00</span>
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
                
                <p className="text-lg  text-gray-700 mt-6"><strong>Add 10,000+ digital stickers</strong> to bring your planner to life! ✨ Stay inspired, get creative, and make planning even more fun! 😍</p>
               
                <p className="text-lg  text-gray-700 mt-6">The Premium Stickers Bundle include a wide variety of widgets, shapes, sticky notes, labels, and icons—everything you need to personalize and elevate your planning experience. Each variant comes in 7 unique colors, giving you endless options to create a planner that's truly your own.</p>
               

              </div>
            </div>
          </div>
        </div>
      </section>
      <YouMayAlsoLike excludeSlug="premium-stickers-bundle" />
      <Footer />
    </main>
  );
}
