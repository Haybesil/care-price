import React from 'react';
import { APP_METADATA } from '../../metadata';
import { Mail, Phone, UserRound } from 'lucide-react';


const inputStyle =
  'block w-full pl-10 pr-4 py-3 bg-[#1A1D21] border border-gray-600 rounded-lg text-white text-base font-medium placeholder-[#76828D] focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent focus:text-[#82DBF7]';
const iconContainerClasses =
  'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none';
const iconStyle = 'h-4 w-4 text-[#CDE9DF]';
const labelClasses = 'block text-sm font-medium text-[#ABB8C4] mb-1';

const LoginForm = ({
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto px-6 sm:px-8">
      {/* Logo */}
      <div className="mb-12 flex items-center">
        <img
          src={APP_METADATA.logo}
          alt={`${APP_METADATA.name} Logo`}
          className="h-10 w-auto mr-3"
        />
      </div>

      {/* Welcome Text */}
      <div className="mb-8 mt-24">
        <h2 className="text-4xl font-bold text-white mb-2">Hi there, ...</h2>
        <p className="text-[#ABB8C4] text-[18px] font-medium">
          Get Started with Appointments
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name Field */}
        <div className="relative">
          <label className={labelClasses}>Fullname</label>
          <div className="relative">
            <div className={iconContainerClasses}>
              <UserRound className={iconStyle} />
            </div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="relative">
          <label className={labelClasses}>Email address</label>
          <div className="relative">
            <div className={iconContainerClasses}>
              <Mail className={iconStyle} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="relative">
          <label className={labelClasses}>Phone number</label>
          <div className="relative">
            <div className={iconContainerClasses}>
              <Phone className={iconStyle} />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#24AE7C] hover:bg-[#24AE7C]/90 text-white font-medium py-3 px-6 rounded-lg transition duration-200 mt-6"
        >
          Get Started
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
