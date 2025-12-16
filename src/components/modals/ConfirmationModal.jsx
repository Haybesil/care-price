import React from 'react';
import { X } from 'lucide-react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  subtext,
  confirmText = 'Confirm',
  confirmButtonVariant = 'primary',
  children,
}) => {
  if (!isOpen) return null;

  const buttonVariants = {
    primary: 'bg-[#24AE7C] hover:bg-[#1e8c64]',
    danger: 'bg-red-600 hover:bg-red-700',
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-[rgba(25,28,33,0.8)] backdrop-blur-xs rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <p className='text-base text-[#ABB8C4] font-medium pl-4'>{subtext}</p>

        <form onSubmit={handleConfirm} className="p-6">
          <div className="mb-6">
            {message && <p className="text-gray-300 mb-4">{message}</p>}
            {children}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonVariants[confirmButtonVariant]} cursor-pointer`}
            >
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmationModal;
