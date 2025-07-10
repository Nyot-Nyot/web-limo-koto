import React, { memo, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = memo<ModalProps>(({ isOpen, onClose, title, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - prevents body scroll */}
      <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Container - scrollable */}
      <div className="fixed inset-0 z-[10000] overflow-y-auto pt-20 pb-8">
        <div className="flex min-h-full items-start justify-center px-4">
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full border border-white/20 my-8">
            {/* Header - Static */}
            <div className="bg-white/95 backdrop-blur-lg border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-600" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

Modal.displayName = 'Modal';

export default Modal;
