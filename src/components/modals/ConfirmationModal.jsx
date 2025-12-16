import React, { useRef } from 'react';
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
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isOpen) {
      isMounted.current = true;
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        if (!isOpen) {
          isMounted.current = false;
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const buttonVariants = {
    primary: 'bg-[#24AE7C] hover:bg-[#1e8c64]',
    danger: 'bg-red-600 hover:bg-red-700',
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsVisible(false);
    setTimeout(() => {
      onConfirm();
    }, 300); 
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div
        ref={modalRef}
        className={`bg-[rgba(25,28,33,0.8)] backdrop-blur-xs rounded-lg w-full max-w-md transform transition-all duration-700 ease-in-out ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <p className="text-base text-[#ABB8C4] font-medium pl-4">{subtext}</p>

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
