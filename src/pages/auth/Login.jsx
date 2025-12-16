import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpVerification from '../../components/auth/OtpVerification';
import LoginForm from '../../components/auth/LoginForm';
import WelcomeSection from '../../components/auth/WelcomeSection';
import Copyright from '../../components/auth/Copyright';
import Loader from '../../components/common/Loader';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowOtp(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerified = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('OTP verified successfully!');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Failed to verify OTP. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d2129] p-4 relative">
      {/* Full-screen loader overlay */}
      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <Loader text={showOtp ? 'Verifying OTP...' : 'Sending OTP...'} />
        </div>
      )}

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 bg-[#131619] text-white p-8 md:p-12 flex flex-col justify-between">
          <div>
            <LoginForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <Copyright />
        </div>

        {/* Right Side - Welcome Section */}
        <div className="w-full md:w-1/2">
          <WelcomeSection />
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtp && (
        <OtpVerification
          onVerify={handleOtpVerified}
          onClose={() => setShowOtp(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Login;
