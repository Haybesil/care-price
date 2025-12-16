import React from 'react';
import { Calendar, Check,} from 'lucide-react';
import APP_METADATA from '../../metadata';

const AppointmentSuccess = ({ appointment}) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 max-w-4xl mx-auto pt-10 pb-36">
      {/* Logo */}
      <div className="mb-8">
        <img
                  src={APP_METADATA.logo}
                  alt={`${APP_METADATA.name} Logo`}
                  className="h-8"
                />
      </div>

      {/* Success Icon */}
      <div className="bg-[#4AC97E29] border-3 border-[#4AC97E] bg-opacity-10 rounded-full p-2 mb-6">
        <Check className="text-[#4AC97E] w-12 h-12" />
      </div>

      {/* Success Message */}
      <h2 className="text-4xl font-bold text-white text-center mb-2 max-w-lg">
        Your <span className="text-[#4AC97E]">appointment request</span> has
        been successfully submitted!
      </h2>
      <p className="text-[#ABB8C4] text-[18px] text-center pt-5 pb-6">
        We'll be in touch shortly to confirm.
      </p>
      {/* Appointment Details */}
      <div className="w-full flex gap-5 items-center border-t border-b border-[#2C333A] py-6">
        <h3 className="text-[#ABB8C4] text-2xl font-medium whitespace-nowrap">
          Requested appointment details:
        </h3>

        {/* Doctor Card */}
        <div className="bg-[rgba(35,40,43,0.4)] backdrop-blur-xs rounded-lg p-3 flex items-center">
          <img
            src={
              appointment?.doctorAvatar ||
              'https://randomuser.me/api/portraits/men/32.jpg'
            }
            alt={appointment?.doctor || 'Doctor'}
            className="w-5 h-5 rounded-full mr-3"
          />
          <div>
            <p className="text-white text-xs font-semibold">
              {appointment?.doctor || 'Dr. Adam Smith'}
            </p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center text-[18px] text-[#ABB8C4] space-x-2">
          <Calendar color='#ABB8C4' className='h-4 w-4'/>
          <span>{appointment?.date || '23 June 2024 - 5:00 PM'}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
