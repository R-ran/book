import Header from '@/components/Header';
import Hero from '@/components/Hero';

import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
     
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
