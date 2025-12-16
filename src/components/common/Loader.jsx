import React from 'react';

const Loader = ({
  text = 'Loading...',
  withBackdrop = false,
  backdropClass = '',
}) => {
  const loader = (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#24AE7C] mb-4"></div>
      <p className="text-white text-sm font-medium">{text}</p>
    </div>
  );

  if (withBackdrop) {
    return (
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center ${backdropClass}`}
      >
        {loader}
      </div>
    );
  }

  return loader;
};

export const InlineLoader = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-t-2 border-b-2',
    md: 'h-6 w-6 border-t-2 border-b-2',
    lg: 'h-8 w-8 border-t-2 border-b-2',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full ${sizes[size]} border-indigo-500`}
      ></div>
    </div>
  );
};

export default Loader;
