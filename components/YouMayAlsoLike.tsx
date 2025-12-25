'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

function ProductCard({ title, price, originalPrice, imageUrl, href, badge, badgeColor = 'red' }: ProductCardProps) {
  const badgeColorClass = badgeColor === 'red' ? 'bg-red-500' : 'bg-blue-500';
  
  return (
    <Link href={href} className="group">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
        {/* Badge */}
        {badge && (
          <div className={`absolute top-2 right-2 z-10 px-2 py-1 rounded text-xs font-bold text-white ${badgeColorClass}`}>
            {badge}
          </div>
        )}
        
        {/* Image */}
        <div className="relative w-full aspect-square bg-gray-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700">
            {title}
          </h3>
          <div className="flex items-center space-x-2">
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">{originalPrice}</span>
            )}
            <span className="text-xl font-bold text-green-600">{price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function YouMayAlsoLike({ excludeSlug }: { excludeSlug?: string }) {
  const allProducts = [
    {
      title: 'Widgets & Labels Pack',
      price: '$9.00',
      originalPrice: '$15.00',
      imageUrl: 'https://glowupplanners.com/cdn/shop/files/betterwid_2.webp?v=1750530763&width=1800',
      href: '/premium-stickers-bundle',
      badge: 'Sale',
      badgeColor: 'red',
    },
    {
      title: 'Best Digital Planner 2025 & 2026 - Forever Planner, No Subscription Needed',
      price: '$29.00',
      originalPrice: '$49.00',
      imageUrl: 'https://glowupplanners.com/cdn/shop/files/Screenshot_2025-07-21_at_09.41.53.png?v=1753087340',
      href: '/',
      badge: 'Sale',
      badgeColor: 'red',
    },
    {
      title: 'Everyday Widgets',
      price: '$6.00',
      imageUrl: 'https://glowupplanners.com/cdn/shop/files/betterwid_908f4cb8-88eb-4851-87f8-85d493e39550.webp?v=1750530843&width=1800',
      href: '/everyday-widgets',
    },
    {
      title: 'Smart Labels',
      price: '$6.00',
      imageUrl: 'https://glowupplanners.com/cdn/shop/files/betterlab_e156596e-e973-4e5d-af7b-5ad97fad0d54.webp?v=1750570974&width=1800',
      href: '/smart-labels',
    },
  ];

  // Filter out the current product and take first 3
  const filteredProducts = excludeSlug 
    ? allProducts.filter(p => !p.href.includes(excludeSlug)).slice(0, 3)
    : allProducts.slice(0, 3);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">You may also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

