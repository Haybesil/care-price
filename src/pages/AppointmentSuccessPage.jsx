import { useLocation, useNavigate } from 'react-router-dom';
import AppointmentSuccess from '../components/modals/AppointmentSuccess';

const AppointmentSuccessPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClose = () => {
    navigate('/dashboard');
  };

  if (!state?.appointment) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F1318] p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            No Appointment Found
          </h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-[#24AE7C] text-white rounded-lg hover:bg-[#1e8e67] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1d2129] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#131619] rounded-2xl shadow-xl overflow-hidden">
        <AppointmentSuccess
          appointment={state.appointment}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default AppointmentSuccessPage;
