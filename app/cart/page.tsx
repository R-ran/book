'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setIsUpdating(id);
    updateQuantity(id, newQuantity);
    setTimeout(() => setIsUpdating(null), 300);
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="bg-[#3B3B52] text-white text-center py-4">
        <p className="text-sm md:text-base font-medium">
          SIMPLIFY YOUR SCHEDULE AND ACHIEVE YOUR GOALS EFFORTLESSLY
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              href="/"
              className="inline-block bg-black hover:bg-gray-800 text-white font-bold text-lg py-3 px-8 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Cart {totalItems}</h1>
              
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row gap-6"
                  >
                    {/* Product Image */}
                    <div className="relative w-full md:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h2>
                        {item.productCode && (
                          <p className="text-sm text-gray-500 mb-2">Product Code: {item.productCode}</p>
                        )}
                        <div className="flex items-center space-x-2 mb-4">
                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-green-600">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={isUpdating === item.id}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={isUpdating === item.id}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Estimated total</span>
                    <span className="font-bold text-xl">${totalPrice.toFixed(2)} USD</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold text-lg py-4 px-6 rounded-lg transition-colors inline-block text-center"
                >
                  Check out
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

