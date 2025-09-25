import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "@/components/shared/Sidebar";

const DashboardPage = () => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="text-lg font-semibold">Dashboard</div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-600">Admin</div>
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
