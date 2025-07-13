import React, { memo, useState, useEffect } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { collection, addDoc, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FeedbackData {
  message: string;
  timestamp: Timestamp;
  ipAddress?: string;
  userAgent?: string;
}

const ReviewSection = memo(() => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'warning';
    message: string;
  }>({ show: false, type: 'success', message: '' });

  // Check if user can submit feedback (6-hour limit from last submission)
  const checkSubmissionLimit = async () => {
    try {
      const sixHoursAgo = new Date();
      sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);
      
      const q = query(
        collection(db, 'feedback'),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const lastSubmission = querySnapshot.docs[0].data();
        const lastSubmissionTime = lastSubmission.timestamp.toDate();
        const nextAllowedTime = new Date(lastSubmissionTime.getTime() + 6 * 60 * 60 * 1000);
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
    checkSubmissionLimit();
  }, []);

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      showNotification('warning', `Masukan terakhir belum mencapai 6 jam. Silakan coba lagi dalam ${timeRemaining} jam.`);
      return;
    }

    if (message.trim().length < 10) {
      showNotification('warning', 'Masukan minimal 10 karakter.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create user identifier for tracking
      const userIdentifier = btoa(navigator.userAgent + window.location.hostname).substring(0, 20);
      
      const feedbackData: FeedbackData & { userIdentifier: string } = {
        message: message.trim(),
        timestamp: Timestamp.fromDate(new Date()),
        userIdentifier,
        userAgent: navigator.userAgent,
        ipAddress: 'hidden' // In production, you might want to capture this server-side
      };

      await addDoc(collection(db, 'feedback'), feedbackData);
      
      showNotification('success', 'Terima kasih atas masukan Anda! Feedback telah berhasil dikirim.');
      
      // Reset form
      setMessage('');
      
      // Update submission status
      setCanSubmit(false);
      setTimeRemaining(6);
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showNotification('error', 'Gagal mengirim masukan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
      {!canSubmit ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-yellow-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCommentDots className="w-8 h-8 text-yellow-400" />
          </div>
          <h4 className="font-semibold text-white mb-2">Terima kasih!</h4>
          <p className="text-gray-300 text-sm">
            Masukan terakhir belum mencapai 6 jam. Silakan coba lagi dalam {timeRemaining} jam.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">
              Masukan & Saran
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg p-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Bagikan pengalaman, saran, atau kritik Anda untuk membantu kami meningkatkan pelayanan..."
              required
              minLength={10}
              maxLength={500}
            />
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>Minimal 10 karakter</span>
              <span>{message.length}/500</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || message.trim().length < 10}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
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
        </form>
      )}

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
});

ReviewSection.displayName = "ReviewSection";

export default ReviewSection;
