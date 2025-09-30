import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import React from 'react';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PaymentPage from './pages/PaymentPage';
import DashboardTask from './pages/DashboardAdmin/DashboardTask.jsx';
import DashboardTaskUser from './pages/DashboardUser/DashboardTaskUser.jsx';
import DashboardPageUser from './pages/DashboardUser/DashboardPageUser.jsx';
import DashboardPage from './pages/DashboardAdmin/DashboardPage.jsx';
import ProtectedRoute from './components/shared/ProtectedRoute.jsx';
import DashboardPackages from './pages/DashboardAdmin/DashboardPackages.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App berisi semua section (Home, Services, Portfolio, dll) */}
        <Route path="/" element={<App />} />
        <Route path="/payment/:packageId" element={<PaymentPage />} />

        {/* Halaman Register */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<div className="p-6">Selamat datang di dashboard</div>} /> 
          <Route path="packages" element={<DashboardPackages />} /> 
          <Route path="tasks" element={<DashboardTask />} /> 
        </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['CUSTOMER']} />}>
          <Route path="/user" element={<DashboardPageUser />}>
            <Route index element={<div className="p-6">Selamat datang di dashboard User</div>} />
            <Route path="tasks" element={<DashboardTaskUser />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);