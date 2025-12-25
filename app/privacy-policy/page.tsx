import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'Privacy Policy - GlowUp Planners',
  description: 'Privacy Policy for GlowUp Planners',
};

export default function PrivacyPolicyPage() {
  const content = getMarkdownContent('privacy-policy.md');

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <MarkdownRenderer content={content} />
      </div>
      <Footer />
    </main>
  );
}
