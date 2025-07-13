'use client';

import React, { useState, useEffect } from 'react';
import { FaStar, FaCommentDots } from 'react-icons/fa';
import { collection, addDoc, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FeedbackFormProps {
  show: boolean;
  onClose: () => void;
}

interface FeedbackData {
  rating: number;
  message: string;
  timestamp: Timestamp;
  ipAddress?: string;
  userAgent?: string;
}

export default function FeedbackForm({ show, onClose }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'warning';
    message: string;
  }>({ show: false, type: 'success', message: '' });

  // Check if user can submit feedback (12-hour limit)
  const checkSubmissionLimit = async () => {
    try {
      // Get user's IP address (simplified - in production you'd want a more robust solution)
      const userIdentifier = navigator.userAgent + window.location.hostname;
      const hashedId = btoa(userIdentifier).substring(0, 20); // Simple hash for identification
      
      const twelveHoursAgo = new Date();
      twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);
      
      const q = query(
        collection(db, 'feedback'),
        where('userIdentifier', '==', hashedId),
        where('timestamp', '>=', Timestamp.fromDate(twelveHoursAgo)),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const lastSubmission = querySnapshot.docs[0].data();
        const lastSubmissionTime = lastSubmission.timestamp.toDate();
        const nextAllowedTime = new Date(lastSubmissionTime.getTime() + 12 * 60 * 60 * 1000);
        const now = new Date();
        
        if (now < nextAllowedTime) {
          setCanSubmit(false);
          const remaining = Math.ceil((nextAllowedTime.getTime() - now.getTime()) / (60 * 60 * 1000));
          setTimeRemaining(remaining);
          return false;
        }
      }
      
      setCanSubmit(true);
      return true;
    } catch (error) {
      console.error('Error checking submission limit:', error);
      return true; // Allow submission if there's an error checking
    }
  };

  useEffect(() => {
    if (show) {
      checkSubmissionLimit();
    }
  }, [show]);

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      showNotification('warning', `Anda sudah memberikan masukan. Silakan coba lagi dalam ${timeRemaining} jam.`);
      return;
    }

    if (rating === 0) {
      showNotification('warning', 'Silakan berikan rating terlebih dahulu.');
      return;
    }

    if (message.trim().length < 10) {
      showNotification('warning', 'Masukan minimal 10 karakter.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create user identifier
      const userIdentifier = btoa(navigator.userAgent + window.location.hostname).substring(0, 20);
      
      const feedbackData: FeedbackData & { userIdentifier: string } = {
        rating,
        message: message.trim(),
        timestamp: Timestamp.fromDate(new Date()),
        userIdentifier,
        userAgent: navigator.userAgent,
        ipAddress: 'hidden' // In production, you might want to capture this server-side
      };

      await addDoc(collection(db, 'feedback'), feedbackData);
      
      showNotification('success', 'Terima kasih atas masukan Anda! Feedback telah berhasil dikirim.');
      
      // Reset form
      setRating(0);
      setMessage('');
      
      // Close form after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showNotification('error', 'Gagal mengirim masukan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaCommentDots className="w-6 h-6" />
              <h3 className="text-xl font-bold">Masukan & Saran</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-purple-100 text-sm mt-2">
            Bagikan pengalaman Anda dengan layanan Nagari Lima Koto
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {!canSubmit ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCommentDots className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Terima kasih!</h4>
              <p className="text-gray-600 text-sm">
                Anda sudah memberikan masukan. Silakan coba lagi dalam {timeRemaining} jam.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Tutup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Berikan Rating Layanan
                </label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-3xl transition-all hover:scale-110 transform"
                    >
                      <FaStar 
                        className={star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'} 
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center text-sm text-gray-600 mt-2">
                    Rating: {rating}/5 {rating >= 4 ? '😊' : rating >= 3 ? '😐' : '😞'}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Masukan & Saran
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Bagikan pengalaman, saran, atau kritik Anda untuk membantu kami meningkatkan pelayanan..."
                  required
                  minLength={10}
                  maxLength={500}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Minimal 10 karakter</span>
                  <span>{message.length}/500</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || rating === 0 || message.trim().length < 10}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mengirim...
                    </div>
                  ) : (
                    'Kirim Masukan'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className="fixed bottom-4 right-4 z-[110] animate-fade-in">
          <div className={`rounded-lg p-4 shadow-lg max-w-sm ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'warning' ? 'bg-yellow-500 text-white' :
            'bg-red-500 text-white'
          }`}>
            <p className="text-sm">{notification.message}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
