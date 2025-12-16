import React, { useState } from 'react';
import appointmentsData from '../../data/appointmentsData';
import { ArrowLeft, ArrowRight, Check, Hourglass, X } from 'lucide-react';
import ScheduleAppointmentModal from '../modals/ScheduleAppointmentModal';
import CancelAppointmentModal from '../modals/CancelAppointmentModal';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    scheduled: 'bg-[#0D2A1F] text-[#24AE7C]',
    pending: 'bg-[#152432] text-[#79B5EC]',
    cancelled: 'bg-[#3E1716] text-[#F37877]',
  };

  const statusIcons = {
    scheduled: <Check color="#24AE7C" className="w-3 h-3 mr-1.5" />,
    pending: <Hourglass color="#79B5EC" className="w-3 h-3 mr-1.5" />,
    cancelled: <X color="#F37877" className="w-3 h-3 mr-1.5" />,
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {statusIcons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const DoctorAvatar = ({ name, imageUrl }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="flex items-center">
      {imageUrl ? (
        <img
          className="w-8 h-8 rounded-full mr-3 object-cover"
          src={imageUrl}
          alt={name}
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium mr-3">
          {initials}
        </div>
      )}
      <div>
        <div className="text-sm font-semibold text-[#E8E9E9]">{name}</div>
      </div>
    </div>
  );
};

const PatientAvatar = ({ name }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-yellow-100 text-yellow-800',
    'bg-pink-100 text-pink-800',
  ];
  const colorIndex = name.length % colors.length;
  const colorClass = colors[colorIndex];

  return (
    <div className="flex items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${colorClass}`}
      >
        <span className="text-xs font-medium">{initials}</span>
      </div>
      <div>
        <div className="text-sm font-semibold text-[#E8E9E9]">{name}</div>
      </div>
    </div>
  );
};

const AppointmentRow = ({ appointment, onSchedule, onCancel, index }) => {
  const rowColor = index % 2 === 0 ? 'bg-[#131619]' : 'bg-[#1c2023]';
  return (
    <tr className={`border-b border-gray-800 hover:bg-opacity-80 ${rowColor}`}>
      <TableCell>
        <PatientAvatar
          name={appointment.patient.name}
          email={appointment.patient.email}
        />
      </TableCell>
      <TableCell>
        <div className="text-[#E8E9E9] font-normal">{appointment.date}</div>
      </TableCell>
      <TableCell className="font-semibold">
        <StatusBadge status={appointment.status} />
      </TableCell>
      <TableCell>
        <DoctorAvatar
          name={appointment.doctor.name}
          specialty={appointment.doctor.specialty}
          imageUrl={appointment.doctor.imageUrl}
        />
      </TableCell>
      <ActionCell
        onSchedule={onSchedule}
        onCancel={onCancel}
        id={appointment.id}
      />
    </tr>
  );
};

const TableHeader = ({ children, className = '' }) => (
  <th
    className={`px-6 py-4 text-left text-xs font-medium text-[#CDCECF] uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);

const TableCell = ({ children, className = '', align = 'left' }) => {
  const alignment = {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  }[align];

  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm ${alignment} ${className}`}
    >
      {children}
    </td>
  );
};

const ActionCell = ({ onSchedule, onCancel, id }) => (
  <TableCell align="right" className="font-medium">
    <div className="space-x-4">
      <button
        onClick={() => onSchedule(id)}
        className="text-[#24AE7C] text-sm hover:text-opacity-90 font-semibold cursor-pointer"
      >
        Schedule
      </button>
      <button
        onClick={() => onCancel(id)}
        className="text-[#FBECEC] text-sm hover:text-opacity-90 font-semibold cursor-pointer"
      >
        Cancel
      </button>
    </div>
  </TableCell>
);

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const itemsPerPage = 5;

  const handleScheduleClick = (id) => {
    setSelectedAppointment(id);
    setIsScheduleModalOpen(true);
  };

  const handleScheduleModalClose = () => {
    setIsScheduleModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelClick = (id) => {
    setSelectedAppointment(id);
    setIsCancelModalOpen(true);
  };

  const handleCancelModalClose = () => {
    setIsCancelModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleSchedule = (id, appointmentData) => {
    setAppointments(
      appointments.map((appt) =>
        appt.id === id
          ? {
              ...appt,
              status: 'scheduled',
              doctor: {
                ...appt.doctor,
                name: appointmentData.doctor || appt.doctor.name,
              },
              date: appointmentData.date || appt.date,
              reason: appointmentData.reason || appt.reason,
            }
          : appt
      )
    );
    setIsScheduleModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancel = (id) => {
    setAppointments(
      appointments.map((appt) =>
        appt.id === id ? { ...appt, status: 'cancelled' } : appt
      )
    );
    setIsCancelModalOpen(false);
  };

  // Pagination logic
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-900 shadow rounded-lg overflow-hidden border border-slate-700">
      <ScheduleAppointmentModal
        isOpen={isScheduleModalOpen}
        onClose={handleScheduleModalClose}
        onSchedule={handleSchedule}
        appointmentId={selectedAppointment}
      />
      <CancelAppointmentModal
        isOpen={isCancelModalOpen}
        onClose={handleCancelModalClose}
        onCancel={handleCancel}
        appointmentId={selectedAppointment}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#0d0f10]">
            <tr>
              <TableHeader>Patient</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Doctor</TableHeader>
              <TableHeader className="text-right">Actions</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((appointment, index) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                onSchedule={handleScheduleClick}
                onCancel={handleCancelClick}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-[#131619] px-4 py-3 flex items-center justify-between border-t border-gray-800 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
            }
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="w-full flex justify-between items-center mt-4 px-4">
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className={`inline-flex items-center px-4 py-2 bg-[#1C2023] rounded-md shadow-sm text-sm font-medium ${
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            <ArrowLeft
              className="h-4 w-4"
              color={currentPage === 1 ? '#24AE7C' : '#24AE7C'}
            />
          </button>

          <button
            onClick={() =>
              paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
            }
            disabled={currentPage === totalPages}
            className={`inline-flex items-center px-4 py-2 bg-[#1C2023] rounded-md shadow-sm text-sm font-medium ${
              currentPage === totalPages
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            <ArrowRight
              className="h-4 w-4"
              color={currentPage === totalPages ? '#24AE7C' : '#24AE7C'}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTable;
