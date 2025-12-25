'use client';

import { useEffect, useRef } from 'react';

interface PayPalButtonProps {
  amount?: string;
  currency?: string;
  description?: string;
}

export default function PayPalButton({
  amount = '29.00',
  currency = 'USD',
  description = 'GlowUp Digital Planner'
}: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!clientId) {
      console.warn('PayPal Client ID not configured. Please add NEXT_PUBLIC_PAYPAL_CLIENT_ID to your .env file');
      return;
    }

    if (typeof window !== 'undefined' && (window as any).paypal) {
      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              description: description,
              amount: {
                currency_code: currency,
                value: amount
              }
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log('Order successful:', order);
          alert('Payment successful! Check your email for the download link.');
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          alert('Payment failed. Please try again.');
        },
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'pill',
          label: 'pay'
        }
      }).render(paypalRef.current);
    }
  }, [amount, currency, description]);

  return (
    <div>
      <div ref={paypalRef} className="paypal-button-container"></div>
      <button
        onClick={() => alert('Please configure your PayPal Client ID in the .env file to enable payments.')}
        className="w-full bg-[#FF9999] hover:bg-[#FF7777] text-white font-bold text-xl py-6 px-8 rounded-2xl transition-colors shadow-lg"
      >
        GO DIGITAL NOW! ⭐
      </button>
      
    </div>
  );
}
