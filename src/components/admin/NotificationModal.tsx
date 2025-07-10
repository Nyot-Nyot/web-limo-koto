'use client';
import React from 'react';

interface NotificationModalProps {
  show: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export default function NotificationModal({
  show,
  type,
  message,
  onClose
}: NotificationModalProps) {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center space-x-3 mb-4">
          {type === 'success' ? (
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          <h3 className="text-lg font-semibold text-white">
            {type === 'success' ? 'Berhasil' : 'Gagal'}
          </h3>
        </div>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
