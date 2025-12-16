import { X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const OtpVerification = ({ onVerify, onClose, isLoading = false }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const modalRef = useRef();

  useEffect(() => {
    inputRefs.current[0]?.focus();

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (value === '' || /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    const newOtp = [...otp];

    for (let i = 0; i < Math.min(paste.length, 6); i++) {
      newOtp[i] = paste[i];
    }

    setOtp(newOtp);
    const nextIndex = Math.min(paste.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length === 6) {
      console.log('Verifying OTP:', otpCode);
      onVerify();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-[#1E293B] rounded-2xl p-8 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Verify OTP</h2>
          <p className="text-gray-400">
            Enter the OTP sent to your registered mobile number
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-2xl bg-[#0F172A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
              isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#24AE7C] hover:bg-[#1e8e67] text-white'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
