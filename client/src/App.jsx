import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Outlet,
  Navigate,
} from 'react-router-dom';

import Notix from './components/section/Notix';
import { MainApp } from './components/MainApp.jsx';
import { AuthProvider } from './context/AuthContext';
import { AuthForm } from './components/Auth/AuthForm';
import { useAuth } from './hooks/useAuth'; // Adjust path if different

//  Protected Route Component
const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="text-center py-10">Loading...</div>;

  // Prevent redirect loop:
  if (!user && location.pathname.startsWith('/app')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

// Modal Login/Signup Route
const ModalRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/auth/login';
  const isSignup = location.pathname === '/auth/signup';

  const handleClose = () => navigate(-1);

  if (!isLogin && !isSignup) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AuthForm
          isLogin={isLogin}
          onToggle={() =>
            navigate(isLogin ? '/auth/signup' : '/auth/login', {
              state: { backgroundLocation: location.state?.backgroundLocation || location },
            })
          }
        />
      </div>
    </div>
  );
};

// App Routes
const AppRoutes = () => {
  const location = useLocation();
  const state = location.state || {};

  return (
    <>
      <Routes location={state.backgroundLocation || location}>
        {/* Public Route */}
        <Route path="/" element={<Notix />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/app/*" element={<MainApp />} />
        </Route>

        {/*  routes to activate modal rendering */} 
        <Route path="/auth/login" element={<></>} />
        <Route path="/auth/signup" element={<></>} />
      </Routes>

      {/* Modal */}
      <ModalRoute />
    </>
  );
};

// App Entry
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
