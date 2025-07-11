'use client';
import React, { useEffect } from 'react';

interface NotificationModalProps {
  show: boolean;
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
}

export default function NotificationModal({
  show,
  type,
  message,
  onClose
}: NotificationModalProps) {
  // Auto-close notification after a certain period
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // 5 seconds (increased from 3)
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  if (!show) return null;
  
  return (
    <div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in"
      style={{ 
        animation: "fadeIn 0.3s ease-in-out",
        maxWidth: "90%",
        width: "400px"
      }}
    >
      <div 
        className={`shadow-2xl rounded-lg p-4 ${
          type === 'success' ? 'bg-gradient-to-r from-green-600 to-green-700' : 
          type === 'warning' ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' : 
                              'bg-gradient-to-r from-red-600 to-red-700'
        } border ${
          type === 'success' ? 'border-green-400' : 
          type === 'warning' ? 'border-yellow-400' : 
                              'border-red-400'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {type === 'success' ? (
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : type === 'warning' ? (
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.207-.833-2.976 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <div>
              <h3 className="text-base font-semibold text-white">
                {type === 'success' ? 'Berhasil' : type === 'warning' ? 'Perhatian' : 'Gagal'}
              </h3>
              <p className="text-sm text-white/90">{message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
