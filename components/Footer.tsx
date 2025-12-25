'use client';

import Link from 'next/link';
import { Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image src="/logo.png" alt="GlowUp Planners Logo" width={100} height={40} className="object-contain" />
            </Link>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-2xl">Quick links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-gray-700 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-700 hover:text-gray-900">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-700 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center text-2xl">
              Need Help? <Sparkles className="w-4 h-4 ml-2 text-yellow-500" />
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-700">Contact Us!</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href="mailto:info@glowupplanners.com" className="text-gray-700 hover:text-gray-900">
                  info@glowupplanners.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-4">
          <Image src="/paypal.png" alt="PayPal" width={100} height={30} />
        
        </div>

        <div className="text-center text-sm text-gray-600 border-t border-gray-200 pt-4">
          <p>&copy; 2025 glowupplanners.com</p>
        </div>
      </div>
    </footer>
  );
}
