import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    // Periksa apakah peran pengguna diizinkan untuk mengakses rute ini
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/user" replace />; 
    }
    return <Outlet />;
  } catch (error) {
    console.error("Token tidak valid:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;