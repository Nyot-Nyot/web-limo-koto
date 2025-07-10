'use client';

interface FAQCardProps {
  question: string;
  answer: string;
  category: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function FAQCard({ question, answer, category, isExpanded, onToggle }: FAQCardProps) {
  return (
    <div className="mb-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-t-2xl shadow-2xl border border-white/10">
        {/* Question header with arrow */}
        <div className="px-4 pt-4 flex justify-between items-center">
          <h3 className="font-bold text-lg text-white">{question}</h3>
          <button 
            className="p-1 transition-transform duration-200 cursor-pointer hover:bg-white/20 rounded-full"
            aria-label="Toggle FAQ"
            onClick={onToggle}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Category bar */}
        <div className="flex px-4 py-2">
          <span className="bg-yellow-400/20 py-1 px-3 mb-2 text-xs text-yellow-300 rounded-md">
            {category}
          </span>
        </div>
        
        {/* Answer container - only shows when expanded */}
        {isExpanded && (
          <div className="bg-white/20 p-4 border-t border-white/10">
            <p className="text-gray-200">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
