'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between py-4 md:hidden">
          {/* Hamburger Menu */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="max-w-md mx-auto py-6 px-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <DrawerClose asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <X className="w-5 h-5 text-gray-700" />
                    </button>
                  </DrawerClose>
                </div>

                <nav className="space-y-1">
                  <div className="mb-4">
                    <p className="text-2xl block font-bold px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors font-medium">
                      Digital Stickers
                    </p>
                    <div className="ml-4 space-y-1">
                      <DrawerClose asChild>
                        <Link
                          href="/premium-stickers-bundle"
                          className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          Premium Stickers Bundle
                        </Link>
                      </DrawerClose>
                      <DrawerClose asChild>
                        <Link
                          href="/everyday-widgets"
                          className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          Everyday Widgets
                        </Link>
                      </DrawerClose>
                      <DrawerClose asChild>
                        <Link
                          href="/smart-labels"
                          className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          Smart Labels
                        </Link>
                      </DrawerClose>
                    </div>
                  </div>
                  <DrawerClose asChild>
                    <Link
                      href="/"
                      className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors font-medium"
                    >
                      GlowUp Digital Planner
                    </Link>
                  </DrawerClose>
                </nav>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Logo - Mobile */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="GlowUp Planners Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Shopping Cart - Mobile */}
          <Link
            href="/cart"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center py-4">
          {/* Center: Logo + Navigation */}
          <div className="flex flex-col items-center flex-1">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="GlowUp Planners Logo"
                width={100}
                height={40}
                className="object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-8 mt-2">
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
          </div>

          {/* Shopping Cart - Aligned with Logo */}
          <Link
            href="/cart"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative flex-shrink-0"
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
    </header>
  );
}
