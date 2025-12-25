'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, DollarSign, Clock, Heart, Check, X, Download, FileText, Tablet, CreditCard, Settings, TrendingUp, Star, Gift } from 'lucide-react';
import Image from 'next/image';
import PayPalButton from './PayPalButton';
import { useCart } from '@/contexts/CartContext';

const images = [
  { id: 1, src: 'https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-226e3f48-2bc1-42ca-aeab-1609eb63fcc7.png?v=8236210474981437862', alt: 'Image 1' },
  { id: 2, src: 'https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-69115c64-bfc5-49cf-8c37-aa5ce993b3e2.png?v=4492366609207984718', alt: 'Image 2' },
  { id: 3, src: 'https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-fcc1d0aa-a1de-47b8-9e35-2272865bf50a.png?v=4970604427945890674', alt: 'Image 3' },
  { id: 4, src: 'https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-b34ea883-3cd4-455f-acc4-7d11ac32e12a.png?v=17580999465123495619', alt: 'Image 4' },
  { id: 5, src: 'https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-89df4612-94de-49b2-85bb-ff75fda2b2d1.png?v=14144319111654501628', alt: 'Image 5' },
  { id: 6, src: 'https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-e72d3578-c632-448e-8283-59e423c249cd.png?v=11369492411298848451', alt: 'Image 6' },
  { id: 7, src: 'https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-9e03c963-c224-4b42-a0e1-19479945b681.png?v=17065527212742047419', alt: 'Image 7' },
  { id: 8, src: 'https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-2b5327ba-436f-407b-8db9-8aed78ce4410.png?v=6683051410858129243', alt: 'Image 8' },
  { id: 9, src: 'https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-fcc1d0aa-a1de-47b8-9e35-2272865bf50a.png?v=4970604427945890674', alt: 'Image 9' },
];

const ITEMS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(images.length / ITEMS_PER_PAGE);

export default function Testimonials() {
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
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

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % TOTAL_PAGES);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + TOTAL_PAGES) % TOTAL_PAGES);
  };

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const visibleImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Before/After Slider handlers
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (isDragging) {
      const mouseMoveHandler = (e: MouseEvent) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
      };

      const mouseUpHandler = () => {
        setIsDragging(false);
      };

      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseup', mouseUpHandler);
      return () => {
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
      };
    }
  }, [isDragging]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const touchMoveHandler = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = slider.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    };

    slider.addEventListener('touchmove', touchMoveHandler);
    return () => {
      slider.removeEventListener('touchmove', touchMoveHandler);
    };
  }, []);

  

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted By More Than
          </h2>
          <p className="text-3xl md:text-4xl">
            <span className="text-[#FF9999] font-bold">10,000+ Customers</span>{' '}
            <span className="font-bold text-gray-900">All Over The World.</span>
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            {visibleImages.map((image) => (
              <div key={image.id} className="relative w-full rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={prevPage}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentPage ? 'bg-[#FF9999]' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="mt-16 bg-[#3B3B52] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <div className="bg-[#3B3B52] rounded-lg flex items-center justify-center p-12">
                <div className="text-center max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#FFCCCC] mb-6">
                    Are You Truly Living Your Dream Life?
                  </h2>
                  <p className="text-white text-lg mb-4">
                    With limited hours each day, it's easy to feel overwhelmed and stressed. A busy schedule can make you lose sight of what's most important, adding to the pressure. ⏰
                  </p>
                  <p className="text-white text-lg">
                    Our All-In-One digital tool brings everything into one place, helping you manage your time better, reduce stress, and make space for what's truly important. 💖🗓️
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <Image 
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-dc090c2d-8265-4a9b-9f6a-37831e34ca58.webp?v=4323678471294256063" 
                alt="Testimonial" 
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Plan Your Dream Life Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Left: Image */}
            <div className="order-2 md:order-1">
              <video 
                src="https://cdn.shopify.com/videos/c/o/v/79dbd8596656413b9558b9d61e6e8375.mp4" 
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-lg"
                preload="auto"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Right: Text Content */}
            <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FFCCCC] mb-4 text-left">
                Plan Your Dream Life With The GlowUp
              </h2>
              <h3 className="text-2xl md:text-3xl text-center font-bold text-[#FFCCCC] mb-6 text-left">
                Digital Planner!
              </h3>
              
              <p className="text-gray-900 text-lg leading-relaxed">
                Boost your productivity and organization effortlessly. Track every area of your life with ease. Achieve your goals and stay on top of everything with the GlowUp Digital Planner. 🥰
              </p>
            </div>
          </div>
        </div>

        {/* Second Plan Your Dream Life Section */}
        <div className="mt-16 bg-[#3B3B52] rounded-2xl overflow-hidden">
          <div className="flex flex-col gap-8 p-8 md:p-12">
            {/* Top: Text Content */}
            <div className="text-center">
              <h2 className="text-4xl md:text-3xl font-bold text-[#FFCCCC] mb-2">
                The Only Planner That Tracks Every Area of Your Life
              </h2>
            </div>

            {/* Bottom: Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <Image 
                  src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-853e5351-7a81-433f-9bb6-07936b3e10f4.png?v=13045088966902018695" 
                  alt="Digital Planner Interface" 
                  width={800} 
                  height={600}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Wellness and Lifestyle Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Left: Wellness */}
              <div>
                <h3 className="text-3xl md:text-4xl text-center font-bold text-[#FFCCCC] mb-4">
                  WELLNESS
                </h3>
                <p className="text-white text-center text-lg mb-6">
                  Improve your habits and enhance your wellness with our comprehensive tool.
                </p>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-900">
                  <Image 
                    src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-fc0ed87d-7573-447d-b68e-1b901263a436.webp?v=1042447703729404502" 
                    alt="Wellness Planner" 
                    width={600} 
                    height={600}
                    className="w-full h-auto object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Right: Lifestyle */}
              <div>
                <h3 className="text-3xl md:text-4xl text-center font-bold text-[#FFCCCC] mb-4">
                  LIFESTYLE
                </h3>
                <p className="text-white text-center text-lg mb-6">
                  Enjoy a more balanced life with dedicated space for meal planning, travel, routines, and daily self-care.
                </p>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-900">
                  <Image 
                    src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-8e00aa62-f82a-4ba0-820c-8960d4c13348.webp?v=5965834109534688431" 
                    alt="Lifestyle Planner" 
                    width={600} 
                    height={600}
                    className="w-full h-auto object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Second Wellness and Lifestyle Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Left: Wellness */}
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-[#FFCCCC] mb-4">
                FINANCE
                </h3>
                <p className="text-white text-lg mb-6">
                Keep track of where your money goes each month and finally start to make your dream experiences come true!
                </p>
                <div className="relative w-full rounded-lg overflow-hidden">
                  <Image 
                    src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-6a98af81-7803-45ee-9aad-cee5de5a6f40.webp?v=2419267841512241011" 
                    alt="Wellness Planner" 
                    width={600} 
                    height={400}
                    className="w-full h-auto object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Right: Lifestyle */}
                <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-[#FFCCCC] mb-4">
                PRODUCTIVITY
                </h3>
                <p className="text-white text-lg mb-6">
                Stay organized and track your progress with ease on all your projects.
                </p>
                <div className="relative w-full rounded-lg overflow-hidden">
                  <Image 
                    src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-17e54eab-a429-44fc-91f3-bb17bf3e4e79.webp?v=1200616287472278836" 
                    alt="Lifestyle Planner" 
                    width={600} 
                    height={400}
                    className="w-full h-auto object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Your Dream Life Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-2xl md:text-2xl font-bold text-[#FFCCCC] mb-4 text-left">
                DESKTOP, TABLET, MOBILE...
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-[#FFCCCC] mb-6 text-left">
                Use It On Your Favorite Device
              </h3>
              
              <p className="text-gray-900 text-lg leading-relaxed text-left">
                The GlowUp Digital Planner is compatible with Apple, Android, and Windows devices, seamlessly integrating with PDF apps like Goodnotes or Xodo!
              </p>
            </div>

            {/* Right: Image */}
            <div>
              <img 
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-ea50a157-edd8-4684-a4eb-2280a44e0890.webp?v=6763419512480743522"
                alt="Desktop, Tablet, Mobile"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Say Goodbye To Paper Planners Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-0">
            {/* Left: Before/After Slider */}
            <div className="bg-[#3B3B52] relative  overflow-hidden h-full">
              <div 
                ref={sliderRef}
                className="relative w-full h-full"
              >
                {/* Before Image (Bottom Layer) */}
                <div className="absolute inset-0 h-full">
                  <img 
                    src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-1aefc4b3-375f-46f3-8cbe-49b0e7943cce.webp?v=11833109528057082862"
                    alt="Cluttered Paper Planner - Before"
                    width={600}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* After Image (Top Layer, clipped) */}
                <div 
                  className="absolute inset-0 overflow-hidden h-full"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-749cdb0c-5a5d-4a28-b360-23180078b1d0.webp?v=8659480017297740657"
                    alt="Clean Digital Planner - After"
                    width={600}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-300">
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </div>
                </div>

                
              </div>
            </div>

            {/* Right: Text Content with Dark Background */}
            <div className="bg-[#3B3B52] p-8 md:p-12 flex flex-col justify-center h-full">
              <h2 className="text-2xl md:text-3xl font-bold text-[#FFCCCC] mb-6">
                Say Goodbye To Paper Planners
              </h2>
              
              <p className="text-white text-lg mb-4 leading-relaxed">
                We get it – paper planners can be a real pain. Pages tear out, covers fall off, sticky notes pile up, and everything becomes a cluttered mess.
              </p>
              
              <p className="text-white text-lg mb-4 leading-relaxed">
                That's why we created the GlowUp Digital Planner. It's flexible, customizable, and eco-friendly—no clutter or wasted paper. Just a smooth, organized way to plan your life.
              </p>
              
              <p className="text-white text-lg mb-6 leading-relaxed">
                Enjoy an efficient, eco-friendly solution that cuts out paper waste. Say goodbye to flimsy planners and hello to staying organized, productive, and on top of your goals.
              </p>

              <p className="text-white text-lg mb-8 leading-relaxed">
                Check out the before-and-after slider to see the difference! 📸✨
              </p>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="bg-[#FF9999] hover:bg-[#FF7777] text-white font-bold text-xl py-4 px-8 rounded-2xl transition-colors shadow-lg w-full md:w-auto disabled:opacity-50"
              >
                GO DIGITAL NOW! ⚡
              </button>
              {showSuccess && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                  ✓ Successfully added to cart
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#FFCCCC] mb-6 text-center">
        Enjoy these advanced features!
              </h2>
              <p className="text-gray-900 text-lg mb-4 text-center leading-relaxed">
              The GlowUp Digital Planner is packed with features that boost productivity, organization, and your planning experience.
              </p>
              <p className="text-gray-900 text-lg mb-4 text-center leading-relaxed">
              Enjoy the convenience and efficiency of a tool designed to make your life easier and more streamlined.
              </p>
        </div>

        <div className="mt-16 bg-[#3B3B52] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 md:p-10">
              <div className="bg-[#3B3B52] rounded-lg flex items-center justify-center p-12">
                <div className="text-center max-w-2xl">
                  <h2 className="text-3xl md:text-3xl font-bold text-[#FFCCCC] mb-6">
                  Quick & Intuitive Navigation
                  </h2>
                  <p className="text-white text-lg mb-4">
                  Countless hyperlinks strategically placed for seamless transitions between sections with just a few clicks!
                  </p>
                  
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <Image 
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-fae2805f-5618-4049-b087-04a758db9ea1.png?v=4785715220631362674"
                alt="Advanced Features"
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Plan Your Dream Life Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Left: Image */}
            <div className="order-2 md:order-1">
              <Image 
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-ffd93e6c-1819-466f-a6e8-0f407218957e.webp?v=9327018167318803293" 
                alt="Advanced Features"
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
              />
              
            </div>

            {/* Right: Text Content */}
            <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FFCCCC] mb-4 text-left">
            Integrate With Your Favorite Calendar
              </h2>
              <p className="text-gray-900 text-lg leading-relaxed">
              Easily set reminders and events—just tap a time slot to open Google or Apple Calendar with pre-filled details.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-[#3B3B52] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 md:p-10">
              <div className="bg-[#3B3B52] rounded-lg flex items-center justify-center p-12">
                <div className="text-center max-w-2xl">
                  <h2 className="text-3xl md:text-3xl font-bold text-[#FFCCCC] mb-6">
                  Stay On Top Of Your Schedule
                  </h2>
                  <p className="text-white text-lg mb-4">
                  Get a clear overview of your tasks and plans with our daily, weekly, and monthly pages.
                  </p>
                  
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <Image 
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-cac7f78d-293a-46e4-b627-21e730181db1.webp?v=8472319744437177694"
                alt="Stay On Top Of Your Schedule"
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#FFCCCC] mb-6 text-center">
              Maximize Your Personalization!
              </h2>
              <p className="text-gray-900 text-lg mb-4 text-center leading-relaxed">
              The GlowUp Digital Planner lets you customize it to fit your style and needs.
              </p>
              <p className="text-gray-900 text-lg mb-4 text-center leading-relaxed">
              Personalization makes planning more enjoyable and efficient, improving productivity, organization, and daily satisfaction.
              </p>
        </div>

        <div className="mt-16 bg-[#3B3B52] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <Image 
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-d6117b80-bf33-4b3a-88a8-b9f3fcf6a914.webp?v=17587922092463336603"
                alt="Versatile Layout Options!"
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>

            <div className="p-8 md:p-10">
              <div className="bg-[#3B3B52] rounded-lg flex items-center justify-center p-12">
                <div className="text-center max-w-2xl">
                  <h2 className="text-3xl md:text-3xl font-bold text-[#FFCCCC] mb-6">
                    Versatile Layout Options!
                  </h2>
                  <p className="text-white text-lg mb-4">
                    Make planning effortless and enjoyable with layouts that fit your style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Your Dream Life Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-2xl md:text-3xl text-center font-bold text-[#FFCCCC] mb-4 text-left">
                Pick Your Preferred Look
              </h2>
              <p className="text-gray-900 text-lg leading-relaxed">
                Choose from 3 distinct colors. Same structure, varied tab designs!
              </p>
            </div>

            {/* Right: Image */}
            <div>
              <Image 
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-5c140a42-ca26-4faf-bd0f-3a21a2d8b5a9.webp?v=4754856355626921668"
                alt="Pick Your Preferred Look"
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="mt-16 bg-[#3B3B52] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <Image 
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-a9c91b0d-6922-440f-b78a-a83cd575a99b.webp?v=16401802578151407804"
                alt="Choose Your Start Day"
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>

            <div className="p-8 md:p-10">
              <div className="bg-[#3B3B52] rounded-lg flex items-center justify-center p-12">
                <div className="text-center max-w-2xl">
                  <h2 className="text-3xl md:text-3xl text-center font-bold text-[#FFCCCC] mb-6">
                  Choose Your Start Day
                  </h2>
                  <p className="text-white text-lg mb-4">
                  Align your planner with your schedule for a more intuitive and personalized planning experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* One Planner, Infinite Benefits Section */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FFCCCC] mb-12 text-center">
            One Planner, Infinite benefits!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Top Left */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#FFCCCC] rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-900 text-lg leading-relaxed">
                  Organize your entire year to never miss a deadline or important event again.
                </p>
              </div>
            </div>

            {/* Top Right */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#FFCCCC] rounded-full flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-900 text-lg leading-relaxed">
                  Say goodbye to anxiety and gain clear insights into your spending.
                </p>
              </div>
            </div>

            {/* Bottom Left */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#FFCCCC] rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-900 text-lg leading-relaxed">
                  Set aside time for yourself and enjoy quality moments with your family.
                </p>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#FFCCCC] rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-900 text-lg leading-relaxed">
                  Experience consistent well-being as you effortlessly maintain a balanced routine.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FF9999] mb-12 text-center">
            Let's Compare...
          </h2>
          <div className="flex justify-center">
          <Image
          src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-72f677ed-79ef-4659-b48c-2cb798334104.jpg?v=2275930588665007618"
          alt="Comparison Table"
          width={800} 
          height={600} 
          unoptimized
          />
          </div>
            {/* Bottom Button */}
            <div className="mt-12 text-center">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="bg-[#FF9999] hover:bg-[#FF7777] text-white font-bold text-xl py-4 px-8 rounded-2xl transition-colors shadow-lg disabled:opacity-50"
              >
                MAKE THE SWITCH NOW! 👍
              </button>
              {showSuccess && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                  ✓ Successfully added to cart
                </div>
              )}
            </div>
        </div>

        {/* Amazing Bonuses Section */}
        <div className="mt-16 bg-[#3B3B52] rounded-2xl overflow-hidden p-8 md:p-12">
          <div className="text-center mb-8">
            <p className="text-white text-lg md:text-xl font-bold mb-2">
              BUT WAIT!
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#FFCCCC]">
              Discover These Amazing Bonuses When You Buy Today 👈
            </h2>
            <p className="text-white text-base">
              (Limited-Time Only!)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {/* Left: Quick & Easy Setup Guide */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold text-[#FF9999] mb-4">
                Quick & Easy Setup Guide
              </h3>
              <p className="text-white text-lg mb-6 leading-relaxed">
                Easily set up your planner with our user-friendly guide! Learn how to integrate it with your favorite PDF apps.
              </p>
              <div className="flex justify-center">
                <Image
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-e592a946-3227-4f26-92cc-dcbed6258a41.jpg?v=15674709510338182049"
                alt="Quick & Easy Setup Guide"
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
                />
              </div>
            </div>

            {/* Middle: Lifetime Updates Guarantee */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold text-[#FF9999] mb-4">
                Lifetime Updates Guarantee!
              </h3>
              <p className="text-white text-lg mb-6 leading-relaxed">
                Never buy a planner again! Unlike paper planners, our digital version updates every year for FREE. Buy once, use forever!
              </p>
              <div className="flex justify-center">
                <Image
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-14a894b1-b35f-4fd8-8548-ace9c12a86c7.webp?v=5423704363474102805"
                alt="Lifetime Updates Guarantee"
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
                />
              </div>
            </div>

            {/* Right: 150 Exclusive Cover Designs */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold text-[#FF9999] mb-4">
                150 Exclusive Cover Designs
              </h3>
              <p className="text-white text-lg mb-6 leading-relaxed">
                Elevate your planner with 150 stunning special covers! Customize the look to match your style and mood.
              </p>
              <div className="flex justify-center">
                <Image
                src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-f2d4c3db-01fd-42a8-a999-11d9963b66ef.webp?v=10143849823397742136"
                alt="150 Exclusive Cover Designs"
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Simple Steps Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Organize Your Dream Life In
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FFCCCC]">
              Just 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#FF9999] rounded-full flex items-center justify-center mb-2 shadow-lg">
                <Download className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#FF9999] rounded-2xl p-6 w-full text-center">
                <h3 className="text-lg md:text-lg font-bold text-white mb-4 uppercase">
                  CHOOSE YOUR NOTE-TAKING APP
                </h3>
                <p className="text-white text-base leading-relaxed">
                  Download one of the many apps available to your device (Apple, Android, or Windows).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#FF9999] rounded-full flex items-center justify-center mb-2 shadow-lg">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#FF9999] rounded-2xl p-6 w-full text-center">
                <h3 className="text-lg md:text-lg font-bold text-white mb-4 uppercase">
                  IMPORT THE PLANNER INTO THE APP
                </h3>
                <p className="text-white text-base leading-relaxed">
                  Follow the Step-by-Step Guide given to you as a bonus.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#FF9999] rounded-full flex items-center justify-center mb-2 shadow-lg">
                <Tablet className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#FF9999] rounded-2xl p-6 w-full text-center">
                <h3 className="text-lg md:text-lg font-bold text-white mb-4 uppercase">
                  START PLANNING WITH IT!
                </h3>
                <p className="text-white text-base leading-relaxed">
                  Customize the planner and start organizing and planning your life.
                </p>
              </div>
            </div>
          </div>

          {/* Founder Branding */}
          <div className="text-center mt-12">
            <p className="text-gray-900 text-lg font-semibold">
              FOUNDER OF
              <p className="text-2xl md:text-3xl font-bold text-[#FFCCCC]">
                GlowUP PLANNERS
              </p>
            </p>
          </div>
        </div>

        
        {/* Plan Your Dream Life Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
             {/* Left: Image */}
             <div className="order-2 md:order-1">
               <Image 
                 src="https://glowupplanners.com/cdn/shop/files/gempages_571273806870480024-5fa0a911-991f-44a4-8ac6-fb1729a9c749.webp?v=11820948281161441114" 
                 alt="customer review"
                 width={800} 
                 height={600}
                 className="w-full h-auto object-contain"
                 unoptimized
               />
               
             </div>
 
             {/* Right: Text Content */}
             <div className="order-1 md:order-2">
               <p className="text-gray-900 text-lg leading-relaxed mb-4">
                 Hey there, I'm Kiersten, the founder of GlowUp Planners. 😊
               </p>
               
               <p className="text-gray-900 text-lg leading-relaxed mb-4">
                 After trying countless planners, I found something was always missing. <strong>No planner could track every area of my life</strong> and offer the right mix of customization. Plus, <strong>I wanted to stop wasting paper</strong> and find a solution that keeps me organized while being kind to the planet. ♻️
               </p>
               
               <p className="text-gray-900 text-lg leading-relaxed mb-4">
                 Frustrated with flimsy paper planners that fell apart, <strong>I wanted something that would last.</strong> 🗒️💔
               </p>
               
               <p className="text-gray-900 text-lg leading-relaxed mb-4">
                 That's why I created the GlowUp Digital Planner. <strong>It's packed with customization options</strong>, syncs easily with Google and Apple calendars via integrated links, and <strong>offers FREE updates for upcoming years</strong>, so you never have to buy another planner again.
               </p>
               
               <p className="text-gray-900 text-lg leading-relaxed mb-4">
                 Unlike paper planners that need replacing every year, our digital planner <strong>updates every year for a lifetime.</strong> 🗓️✨
               </p>
               
               <p className="text-gray-900 text-lg leading-relaxed">
                 Let's transform your routine together. Discover how this planner can bring <strong>order and simplicity to every aspect of your life.</strong> ❤️
               </p>
             </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-0">
            <div className="p-8 md:p-12 bg-[#3B3B52]">
              <Image 
                src="https://glowupplanners.com/cdn/shop/files/Screenshot_2025-07-21_at_09.41.53.png?v=1753087340"
                alt="product"
                width={800} 
                height={600}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>

            <div className="bg-white p-8 md:p-12 flex items-center">
              <div className="w-full">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">10,000+ Lives Organized!</span>
                </div>

                <h1 className="text-2xl md:text-2xl lg:text-2xl font-bold text-gray-900 leading-tight mb-4">
              All-in-One Digital Planner – 2025 & 2026 | One-Time Purchase, Use Every Year
            </h1>

                <p className="text-base text-gray-600 mb-6">
                  Includes 2025, 2026, 2027 + FREE Yearly Updates
                </p>

                <div className="space-y-2 mb-6">
              <div className="flex items-start space-x-3">
                <div className="bg-[#FFCCCC] rounded-full p-2 mt-1 flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#FF9999]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    GlowUp Digital Planner <span className="text-[#FF9999] font-normal">($26 Value)</span>
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#FFCCCC] rounded-full p-2 mt-1 flex-shrink-0">
                  <Gift className="w-5 h-5 text-[#FF9999]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Lifetime Updates Guarantee <span className="text-[#FF9999] font-normal">($19 Value)</span>
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#FFCCCC] rounded-full p-2 mt-1 flex-shrink-0">
                  <Gift className="w-5 h-5 text-[#FF9999]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Customizable Layouts & Themes <span className="text-[#FF9999] font-normal">($9 Value)</span>
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#FFCCCC] rounded-full p-2 mt-1 flex-shrink-0">
                  <Gift className="w-5 h-5 text-[#FF9999]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    150 Exclusive Cover Designs <span className="text-[#FF9999] font-normal">($9 Value)</span>
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#FFCCCC] rounded-full p-2 mt-1 flex-shrink-0">
                  <Gift className="w-5 h-5 text-[#FF9999]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Quick & Easy Setup Guide <span className="text-[#FF9999] font-normal">($3 Value)</span>
                  </h3>
                </div>
              </div>
            </div>



                <div className="text-center mb-6">
                  <p className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                    Total Value: $120
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    You Get It ALL Today For:
                  </p>
                  <p className="text-5xl md:text-6xl font-bold text-green-600 mb-2">
                    $29.00
                  </p>
                  <p className="text-lg text-gray-900 italic">
                    (That's $91 OFF!)
                  </p>
                </div>

                <div className="text-center mb-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="bg-[#FF9999] hover:bg-[#FF7777] text-white font-bold text-xl py-4 px-8 rounded-2xl transition-colors shadow-lg disabled:opacity-50"
                  >
                    GET INSTANT DOWNLOAD! 👍
                  </button>
                  {showSuccess && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                      ✓ Successfully added to cart
                    </div>
                  )}
                </div>

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
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12 mt-14">
          <p className="text-gray-500 text-base leading-relaxed mb-4">
          98% Customers Are Satisfied
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted By More Than
          </h2>
          <p className="text-3xl md:text-4xl">
            <span className="text-[#FF9999] font-bold">10,000+ Customers</span>{' '}
            <span className="font-bold text-gray-900">All Over The World.</span>
          </p>
        </div>
        <div className="relative max-w-6xl mx-auto">
          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            {visibleImages.map((image) => (
              <div key={image.id} className="relative w-full rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={prevPage}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentPage ? 'bg-[#FF9999]' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
        <div className="text-center mb-6 mt-8">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-[#FF9999] hover:bg-[#FF7777] text-white font-bold text-xl py-4 px-8 rounded-2xl transition-colors shadow-lg disabled:opacity-50"
            >
              GET INSTANT DOWNLOAD! 👍
            </button>
            {showSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                ✓ Successfully added to cart
              </div>
            )}
        </div>
 

      </div>
    </section>
  );
}
