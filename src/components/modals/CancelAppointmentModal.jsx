import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const styles = {
  input: {
    label: 'block text-[14px] font-medium text-[#ABB8C4] mb-3',
  },
  textarea:
    'w-full bg-[#1E2226] border border-[#2C333A] rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#24AE7C] focus:border-transparent resize-none',
};

const CancelAppointmentModal = ({
  isOpen,
  onClose,
  onCancel,
  appointmentId,
}) => {
  const [formData, setFormData] = useState({
    reason: '',
  });

  const handleConfirm = () => {
    onCancel(appointmentId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Cancel Appointment"
      subtext="Are you sure you want to cancel your appointment"
      confirmText="Cancel Appointment"
      confirmButtonVariant="danger"
      cancelText="Go Back"
    >
      <div>
        <label htmlFor="reason" className={styles.input.label}>
          Reason for cancellation
        </label>
        <textarea
          id="reason"
          name="reason"
          rows="3"
          value={formData.reason}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="ex: Urgent meeting came up"
          required
        />
      </div>
    </ConfirmationModal>
  );
};

export default CancelAppointmentModal;
