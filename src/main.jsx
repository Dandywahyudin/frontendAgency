import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import React from 'react';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PaymentPage from './pages/PaymentPage';
import DashboardPage from './pages/DashboardAdmin/DashboardPage.jsx';
// import DashboardLayout from './pages/DashboardAdmin/DashboardLayout.jsx';
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
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<div className="p-6">Selamat datang di dashboard</div>} />         {/* /dashboard */}
          <Route path="packages" element={<DashboardPackages />} /> {/* /dashboard/packages */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);