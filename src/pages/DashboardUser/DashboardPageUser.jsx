import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserSidebar from "@/components/shared/UserSidebar";


const DashboardPageUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Jika Anda ingin sidebar yang berbeda untuk user, buat komponen UserSidebar */}
      <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="text-lg font-semibold">User Dashboard</div>
        </header>
        <main className="p-6">
          <Outlet /> {/* Ini akan merender komponen anak seperti DashboardTaskUser */}
        </main>
      </div>
    </div>
  );
};

export default DashboardPageUser;