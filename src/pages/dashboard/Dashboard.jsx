import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import StatsCards from '../../components/dashboard/StatsCards';
import AppointmentsTable from '../../components/dashboard/AppointmentsTable';
import Loader, { InlineLoader } from '../../components/common/Loader';

const fetchDashboardData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    stats: {
      scheduled: 94,
      pending: 32,
      cancelled: 56,
    },
    appointments: [],
  };
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: { scheduled: 0, pending: 0, cancelled: 0 },
    appointments: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [data] = await Promise.all([
          fetchDashboardData(),
          new Promise((resolve) => setTimeout(resolve, 3000)), 
        ]);
        setDashboardData(data);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError(err.message);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1d2129]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#131619] rounded-2xl shadow-xl overflow-hidden">
          <DashboardHeader onLogout={handleLogout} />
          <main className="p-6 md:px-16 md:py-8">
            <WelcomeBanner />
            <div className="mt-8">
              <StatsCards stats={dashboardData.stats} />
            </div>
            <div className="mt-8">
              <AppointmentsTable appointments={dashboardData.appointments} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
