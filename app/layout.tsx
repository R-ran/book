import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GlowUp Planners - All-in-One Digital Planner',
  description: 'Simplify your schedule and achieve your goals effortlessly with our all-in-one digital planner. One-time purchase, use every year with free lifetime updates.',
  keywords: 'digital planner, productivity, goal setting, scheduling, time management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''}&currency=USD&intent=capture&locale=en_US&disable-funding=paylater`}
          async
          defer
        ></script>
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
