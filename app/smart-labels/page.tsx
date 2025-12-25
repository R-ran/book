'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PayPalButton from '@/components/PayPalButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';
import { useCart } from '@/contexts/CartContext';

export default function SmartLabelsPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: 'smart-labels',
      title: 'Smart Labels',
      price: 6.00,
      imageUrl: 'https://glowupplanners.com/cdn/shop/files/betterlab_e156596e-e973-4e5d-af7b-5ad97fad0d54.webp?v=1750570974&width=1800',
      href: '/smart-labels',
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
                    src="https://glowupplanners.com/cdn/shop/files/betterlab_e156596e-e973-4e5d-af7b-5ad97fad0d54.webp?v=1750570974&width=1800"
                    alt="Smart Labels"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col self-stretch">
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Smart Labels
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
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold text-xl py-4 px-6 mb-4 rounded-2xl transition-colors shadow-lg disabled:opacity-50"
                >
                  Buy it now!
                </button>
                <PayPalButton amount="6.00" currency="USD" description="Smart Labels" />

                <p className="text-xl font-semibold text-gray-700 mt-6">
                  🚚 Reliable shipping
                </p>
                <p className="text-xl font-semibold text-gray-700 mt-6">
                  🔙 Flexible returns
                </p>
                <p className="text-xl font-semibold text-gray-700 mt-6">
                What's Inside?
                </p>
                <p className="text-lg  text-gray-700 mt-6">With 350 labels, including tags, icons, and so much more, these stickers are perfect for keeping your planner organized and stylish. ✨ From task management to creative customization, you'll have everything you need to make your planning truly yours! 😊</p>
                <p className="text-xl font-semibold text-gray-700 mt-6">
                How to Use?
                </p>
                <p className="text-lg  text-gray-700 mt-6">The stickers are in .png format, meaning they're just pictures with no background. This makes them super easy to use, not only in your GlowUp Digital Planner but anywhere you want!</p>
                <p className="text-lg  text-gray-700 mt-6">To use them, simply download the stickers you like and upload them into your annotation app, just like the digital planner. The import process is covered in our Quick & Easy Setup Guide included with the GlowUp Digital Planner.</p>

              </div>
            </div>
          </div>
        </div>
      </section>
      <YouMayAlsoLike excludeSlug="smart-labels" />
      <Footer />
    </main>
  );
}
