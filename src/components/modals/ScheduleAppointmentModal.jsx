import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import Loader from '../common/Loader';
import ConfirmationModal from './ConfirmationModal';
import './datePickerStyles.css';

const styles = {
  input: {
    container: 'relative w-full',
    label: 'block text-[14px] font-medium text-[#ABB8C4] mb-3',
    field:
      'w-full bg-[#1E2226] border border-[#2C333A] rounded-xl py-4 px-4 text-white text-sm h-[52px]',
    focused: 'focus:ring-2 focus:ring-[#24AE7C] focus:border-transparent',
    icon: 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-20',
    dropdownIcon: 'absolute right-3 text-gray-400',
    dateInput:
      'relative w-full [&:has(input:not(:valid))_input]:text-transparent',
    dateWrapper: 'relative',
    datePlaceholder:
      'absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none select-none z-10',
  },
  dropdown: {
    container: 'relative',
    menu: 'absolute z-10 w-full mt-1 bg-[#1E2226] border border-[#2C333A] rounded-xl py-1 shadow-lg',
    item: 'px-4 py-2 hover:bg-[#2C333A] cursor-pointer flex items-center',
    itemActive: 'bg-[#2C333A]',
    avatar: 'w-6 h-6 rounded-full mr-3',
    doctorName: 'text-white text-sm truncate',
    specialty: 'text-gray-400 text-xs',
  },
  textarea:
    'w-full bg-[#1E2226] border border-[#2C333A] rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#24AE7C] focus:border-transparent resize-none',
  button: {
    primary:
      'w-full bg-[#24AE7C] hover:bg-[#1e8e67] text-white py-3 px-4 rounded-xl font-medium transition-colors',
  },
};

const ScheduleAppointmentModal = ({
  isOpen,
  onClose,
  onSchedule,
  appointmentId,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctor: '',
    reason: '',
    date: null,
  });

  const doctors = [
    {
      id: 1,
      name: 'Dr. Adam Smith',
      specialty: 'Cardiologist',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialty: 'Neurologist',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 3,
      name: 'Dr. Michael Brown',
      specialty: 'Dermatologist',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const handleDoctorSelect = (doctorName) => {
    setFormData((prev) => ({
      ...prev,
      doctor: doctorName,
    }));
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event) => {
      const dropdownElement = document.querySelector('.doctor-dropdown');
      const triggerElement = document.querySelector('.doctor-trigger');

      if (
        dropdownElement &&
        triggerElement &&
        !dropdownElement.contains(event.target) &&
        !triggerElement.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!formData.doctor || !formData.reason || !formData.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Prepare appointment details for success page
      const details = {
        doctor: formData.doctor,
        doctorAvatar:
          doctors.find((d) => d.name === formData.doctor)?.avatar ||
          'https://randomuser.me/api/portraits/men/32.jpg',
        date: formData.date
          ? formData.date.toLocaleString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          : '',
      };

      // Call the onSchedule prop with the appointment data
      onSchedule(appointmentId, {
        doctor: formData.doctor,
        reason: formData.reason,
        date: formData.date ? formData.date.toISOString() : '',
      });

      // Show success toast
      toast.success('Appointment scheduled successfully!');

      // Navigate to success page
      navigate('/appointment/success', {
        state: { appointment: details },
      });

      // Close the modal and reset form
      onClose();
      setFormData({
        doctor: '',
        reason: '',
        date: null,
      });
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast.error('Failed to schedule appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      title="Schedule Appointment"
      subtext="Please fill in the following details to schedule"
      confirmText={isLoading ? 'Scheduling...' : 'Schedule Appointment'}
      confirmButtonVariant="primary"
      cancelText="Cancel"
      isConfirmDisabled={isLoading}
    >
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader text="Scheduling your appointment..." withBackdrop={false} />
        </div>
      )}
      <div className="space-y-5">
        <div className="relative">
          <label className={styles.input.label}>Doctor</label>
          <div className={`${styles.input.container} dropdown-container`}>
            <div
              className={`doctor-trigger ${
                styles.input.field
              } pl-10 pr-10 flex items-center cursor-pointer ${
                isDropdownOpen ? 'ring-2 ring-[#24AE7C]' : ''
              }`}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <div className={styles.input.icon}>
                <Search size={18} />
              </div>
              <div className="flex items-center w-full">
                {formData.doctor ? (
                  <div className="flex items-center w-full">
                    <img
                      src={
                        doctors.find((d) => d.name === formData.doctor)
                          ?.avatar || ''
                      }
                      alt={formData.doctor}
                      className="w-6 h-6 rounded-full mr-2 shrink-0"
                    />
                    <span className="truncate">{formData.doctor}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">Select a doctor</span>
                )}
              </div>
              <div className={styles.input.dropdownIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            {isDropdownOpen && (
              <div
                className={`${styles.dropdown.menu} doctor-dropdown`}
                style={{ zIndex: 50 }}
              >
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`${styles.dropdown.item} ${
                      formData.doctor === doctor.name
                        ? styles.dropdown.itemActive
                        : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDoctorSelect(doctor.name);
                    }}
                  >
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className={styles.dropdown.avatar}
                    />
                    <div>
                      <div className={styles.dropdown.doctorName}>
                        {doctor.name}
                      </div>
                      <div className={styles.dropdown.specialty}>
                        {doctor.specialty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="reason" className={styles.input.label}>
            Reason for Visit
          </label>
          <textarea
            id="reason"
            name="reason"
            rows="3"
            value={formData.reason}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Briefly describe the reason for your visit"
            required
          />
        </div>

        <div className="relative">
          <label className={styles.input.label}>Date & Time</label>
          <div className={`${styles.input.container} datepicker-container`}>
            <div className="relative w-full">
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className={`${styles.input.field} pl-10 w-full text-white`}
                minDate={new Date()}
                required
              />
              <div className={styles.input.icon}>
                <Calendar size={18} />
              </div>
              {!formData.date && (
                <div className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none select-none">
                  Select your appointment date
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default ScheduleAppointmentModal;
