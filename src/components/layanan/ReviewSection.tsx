import React, { memo, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewSection = memo(() => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Terima kasih atas masukan Anda!');
      setRating(0);
      setReview('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-semibold mb-2">
            Berikan Rating Layanan
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl transition-colors hover:scale-110 transform"
              >
                <FaStar className={star <= rating ? 'text-yellow-400' : 'text-gray-400'} />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-white font-semibold mb-2">
            Masukan & Saran
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full bg-white/20 border border-white/30 rounded-lg p-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={4}
            placeholder="Bagikan pengalaman Anda dengan layanan kami..."
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Masukan'}
        </button>
      </form>
    </div>
  );
});

ReviewSection.displayName = 'ReviewSection';

export default ReviewSection;
