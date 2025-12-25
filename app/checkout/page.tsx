'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    paypal?: any;
  }
}

interface BillingFormData {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const paypalRef = useRef<HTMLDivElement>(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const [billingData, setBillingData] = useState<BillingFormData>({
    email: '',
    country: 'United States',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: 'California',
    zipCode: ''
  });
  const totalPrice = getTotalPrice();

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  // Check if PayPal SDK is loaded
  useEffect(() => {
    const checkPayPalSDK = () => {
      if (typeof window !== 'undefined' && window.paypal) {
        setPaypalLoaded(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkPayPalSDK()) {
      return;
    }

    // Poll for PayPal SDK
    const interval = setInterval(() => {
      if (checkPayPalSDK()) {
        clearInterval(interval);
      }
    }, 100);

    // Cleanup after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!paypalLoaded) {
        setPaypalError('PayPal SDK failed to load. Please refresh the page.');
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [paypalLoaded]);

  // Initialize PayPal button
  useEffect(() => {
    if (items.length === 0 || !paypalLoaded || !paypalRef.current) return;

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!clientId || clientId === 'test') {
      setPaypalError('PayPal Client ID not configured. Please add NEXT_PUBLIC_PAYPAL_CLIENT_ID to your .env file');
      return;
    }

    // Clear any existing buttons
    if (paypalRef.current.hasChildNodes()) {
      paypalRef.current.innerHTML = '';
    }

    try {
      window.paypal?.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              description: `Order from GlowUp Planners - ${items.length} item(s)`,
              amount: {
                currency_code: 'USD',
                value: totalPrice.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: totalPrice.toFixed(2)
                  }
                }
              },
              items: items.map(item => ({
                name: item.title.substring(0, 127), // PayPal has a 127 character limit
                quantity: item.quantity.toString(),
                unit_amount: {
                  currency_code: 'USD',
                  value: item.price.toFixed(2)
                }
              }))
            }],
            application_context: {
              brand_name: 'GlowUp Planners',
              landing_page: 'BILLING',
              user_action: 'PAY_NOW',
              return_url: `${window.location.origin}/checkout/success`,
              cancel_url: `${window.location.origin}/checkout`
            }
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            const order = await actions.order.capture();
            console.log('Order successful:', order);
            
            // Clear cart after successful payment
            clearCart();
            
            // Redirect to success page
            router.push('/checkout/success?orderId=' + order.id);
          } catch (error: any) {
            console.error('Payment capture error:', error);
            setPaypalError('Payment processing failed. Please try again or contact support.');
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          setPaypalError('Payment failed. Please try again.');
        },
        onCancel: (data: any) => {
          console.log('Payment cancelled:', data);
          // User cancelled, stay on page
        },
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'pill',
          label: 'pay',
          height: 50
        }
      }).render(paypalRef.current);
    } catch (error) {
      console.error('Error rendering PayPal button:', error);
      setPaypalError('Failed to initialize PayPal. Please refresh the page.');
    }

    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = '';
      }
    };
  }, [items, totalPrice, clearCart, router, paypalLoaded]);

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="bg-[#3B3B52] text-white text-center py-4">
        <p className="text-sm md:text-base font-medium">
          SIMPLIFY YOUR SCHEDULE AND ACHIEVE YOUR GOALS EFFORTLESSLY
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-6">
          <Link href="/cart" className="text-gray-600 hover:text-gray-900 flex items-center">
            ← Back to Cart
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      {item.productCode && (
                        <p className="text-sm text-gray-500">Code: {item.productCode}</p>
                      )}
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Address Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Billing address</h2>
              
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={billingData.email}
                    onChange={(e) => setBillingData({ ...billingData, email: e.target.value })}
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>

                {/* Country/Region */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country/Region
                  </label>
                  <select
                    id="country"
                    value={billingData.country}
                    onChange={(e) => setBillingData({ ...billingData, country: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent appearance-none bg-white"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First name (optional)
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={billingData.firstName}
                      onChange={(e) => setBillingData({ ...billingData, firstName: e.target.value })}
                      placeholder="First name (optional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={billingData.lastName}
                      onChange={(e) => setBillingData({ ...billingData, lastName: e.target.value })}
                      placeholder="Last name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="address"
                      value={billingData.address}
                      onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
                      placeholder="Address"
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* City, State, ZIP */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={billingData.city}
                      onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <select
                      id="state"
                      value={billingData.state}
                      onChange={(e) => setBillingData({ ...billingData, state: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent appearance-none bg-white"
                    >
                      {US_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      value={billingData.zipCode}
                      onChange={(e) => setBillingData({ ...billingData, zipCode: e.target.value })}
                      placeholder="ZIP code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              <p className="text-gray-600 mb-4">We accept PayPal for secure payments.</p>
              
              <div className="mt-4">
                {paypalError ? (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{paypalError}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                      Refresh page
                    </button>
                  </div>
                ) : !paypalLoaded ? (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                    <p className="text-gray-600 text-sm">Loading PayPal...</p>
                  </div>
                ) : (
                  <div ref={paypalRef} className="paypal-button-container"></div>
                )}
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Total</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Image
                  src="/paypal.png"
                  alt="PayPal"
                  width={120}
                  height={40}
                  className="object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

