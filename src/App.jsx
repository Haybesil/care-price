import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';

// Lazy load components for better performance
const Login = React.lazy(() => import('./pages/auth/Login'));
import Dashboard from './pages/dashboard/Dashboard';
import AppointmentSuccessPage from './pages/AppointmentSuccessPage';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route
              path="/appointment/success"
              element={
                <Suspense fallback={<Loader />}>
                  <AppointmentSuccessPage />
                </Suspense>
              }
            />
          </Routes>
        </Suspense>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
