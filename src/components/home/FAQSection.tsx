'use client';

import { useState, useMemo } from 'react';
import FAQCard from '@/components/FAQCard';

interface FAQData {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  faqData: FAQData[];
}

export default function FAQSection({ faqData }: FAQSectionProps) {
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  // Memoize categories untuk performance
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(faqData.map(faq => faq.category))];
    return uniqueCategories;
  }, [faqData]);

  // Memoize filtered FAQ data
  const filteredFaqData = useMemo(() => {
    return faqData.slice(0, 6); // Show only first 6 FAQs for performance
  }, [faqData]);

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pertanyaan Umum
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering diajukan tentang Nagari Lima Koto
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <span
              key={category}
              className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-sm"
            >
              {category}
            </span>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqData.map((faq, index) => (
            <FAQCard
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              category={faq.category}
              isExpanded={expandedFaqs.includes(index)}
              onToggle={() => toggleFaq(index)}
            />
          ))}
        </div>

        {/* View More Button */}
        {faqData.length > 6 && (
          <div className="text-center mt-8">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
              Lihat Semua FAQ
            </button>
          </div>
        )}
      </div>
    </section>
  );
} 