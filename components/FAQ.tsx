'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I access the digital planner after purchase?',
    answer: "Once you've completed your purchase, you'll receive an email with immediate access to all your purchased files.",
  },
  {
    question: 'Can I use the planner on multiple devices?',
    answer: 'Absolutely! You can sync your planner across multiple devices. Just download the planner to your device and it will sync across all your devices.',
  },
  {
    question: 'Do I need to be tech-savvy to use your planner?',
    answer: "No, you don't need advanced tech skills. Our planner comes with a comprehensive guide that walks you through getting started, customization, management, and more. You can also reach out to us anytime for assistance.",
  },
  {
    question: 'Is an internet connection required to use the digital planner?',
    answer: 'No, you can use the planner offline. An internet connection is only needed for syncing across devices.',
  },
  {
    question: 'Can I print the planner if I prefer paper??',
    answer: 'Yes! While the planner is designed for digital use, you can absolutely print any pages you like.',
  },
  {
    question: 'What if I accidentally delete the planner?',
    answer: 'You can re-download our planner as often as needed. If you encounter any issues, simply email us for assistance!',
  },
];

export default function FAQ() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg px-6 border-none shadow-sm"
            >
              <AccordionTrigger className="text-left font-bold text-gray-900 hover:no-underline py-6 text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
