'use client';
import React from 'react';
import { FaExclamationTriangle, FaTrash, FaQuestionCircle } from 'react-icons/fa';

interface ConfirmationModalProps {
  show: boolean;
  type: 'delete' | 'sms' | 'action';
  title: string;
  message: string;
  details?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmationModal({
  show,
  type,
  title,
  message,
  details,
  confirmText = 'Ya',
  cancelText = 'Batal',
  onConfirm,
  onCancel,
  loading = false
}: ConfirmationModalProps) {
  if (!show) return null;

  const getIconColor = () => {
    switch (type) {
      case 'delete':
        return 'text-red-600';
      case 'sms':
        return 'text-blue-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'delete':
        return <FaTrash className={`w-6 h-6 ${getIconColor()}`} />;
      case 'sms':
        return <FaQuestionCircle className={`w-6 h-6 ${getIconColor()}`} />;
      default:
        return <FaExclamationTriangle className={`w-6 h-6 ${getIconColor()}`} />;
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'delete':
        return 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800';
      case 'sms':
        return 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800';
      default:
        return 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-fade-in"
        style={{
          animation: "fadeInScale 0.3s ease-out"
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${
              type === 'delete' ? 'bg-red-50' : 
              type === 'sms' ? 'bg-blue-50' : 
              'bg-yellow-50'
            }`}>
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed mb-4">
            {message}
          </p>
          
          {details && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {details}
              </pre>
            </div>
          )}

          {type === 'delete' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex">
                <FaExclamationTriangle className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-700">
                  <strong>Peringatan:</strong> Data yang dihapus tidak dapat dikembalikan!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex space-x-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-6 py-2 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${getButtonColor()} ${
              loading ? 'cursor-wait' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Memproses...</span>
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
