'use client';
import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

interface ReasonModalProps {
  show: boolean;
  title: string;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ReasonModal({
  show,
  title,
  placeholder = 'Masukkan alasan penolakan',
  confirmText = 'Kirim',
  cancelText = 'Batal',
  onConfirm,
  onCancel,
  loading = false
}: ReasonModalProps) {
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (show) setReason('');
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fade-in scale-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="p-6">
          <textarea
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder={placeholder}
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={() => onConfirm(reason)}
            disabled={loading || !reason.trim()}
            className={`px-6 py-2 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 ${loading ? 'cursor-wait' : ''}`}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Memproses...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <FaCheck />
                <span>{confirmText}</span>
              </div>
            )}
          </button>
        </div>
        <style jsx>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fadeIn 0.2s ease-out; }`}</style>
      </div>
    </div>
  );
}
