'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center py-6">
          <Link href="/" className="flex justify-center mb-2">
            <Image
              src="/logo.png"
              alt="GlowUp Planners Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center justify-center w-full relative">
            <nav className="flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900 font-medium bg-transparent data-[state=open]:bg-transparent h-auto p-0 [&>svg]:hidden">
                      Digital Stickers
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[220px] p-1 bg-white border border-gray-200 rounded-md shadow-lg">
                        <Link
                          href="/premium-stickers-bundle"
                          className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors text-left"
                        >
                          Premium Stickers Bundle
                        </Link>
                        <Link
                          href="/everyday-widgets"
                          className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors text-left"
                        >
                          Everyday Widgets
                        </Link>
                        <Link
                          href="/smart-labels"
                          className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors text-left"
                        >
                          Smart Labels
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                GlowUp Digital Planner
              </Link>
            </nav>

            <Link
              href="/cart"
              className="absolute -right-20 top-0 p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
