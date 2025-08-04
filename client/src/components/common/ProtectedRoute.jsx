// // src/components/common/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth'; 

// const ProtectedRoute = () => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) return null; // or a spinner/loader

//   if (!user) {
//     return <Navigate to="/auth/login" state={{ backgroundLocation: location }} replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
