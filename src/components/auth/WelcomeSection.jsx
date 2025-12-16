import React from 'react';
import LoginImage from '/images/login.png';

const WelcomeSection = () => {
  return (
    <div className="hidden md:block w-full h-full bg-gray-100 relative">
      <img
        src={LoginImage}
        alt="Welcome to CarePulse"
        className="w-full h-full object-cover rounded-r-2xl"
        style={{ objectPosition: 'center' }}
      />
    </div>
  );
};

export default WelcomeSection;
