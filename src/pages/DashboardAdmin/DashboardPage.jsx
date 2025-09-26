import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "@/components/shared/Sidebar";
import { jwtDecode } from "jwt-decode";

const DashboardPage = () => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Token invalid:", err);
        setUser(null);
      }
    }
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="text-lg font-semibold">Dashboard</div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-black-600 font-bold">
              {user ? user.name || user.email : "User"}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
