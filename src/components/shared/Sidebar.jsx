import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Package,
  Settings,
  ClipboardCheck,
  LogOut,
  Menu,
} from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const menu = [
    { to: "/dashboard", label: "Overview", Icon: LayoutDashboard, end: true }, // pakai end
    { to: "/dashboard/packages", label: "Packages", Icon: Package },
    { to: "/dashboard/analytics", label: "Analytics", Icon: BarChart3 },
    { to: "/dashboard/settings", label: "Settings", Icon: Settings },
    { to: "/dashboard/tasks", label: "Task", Icon: ClipboardCheck}

  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus token
    navigate("/login"); // redirect pakai navigate (lebih baik daripada window.location.href)
  };

  return (
    <aside
      className={`bg-white border-r shadow-md transition-all ${
        sidebarOpen ? "w-64" : "w-16"
      } hidden md:flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {sidebarOpen && (
          <span
            className="font-bold text-lg cursor-pointer"
            onClick={() => navigate("/")}
          >
            Digiency
          </span>
        )}
        <button
          onClick={() => setSidebarOpen((s) => !s)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1 flex-1">
        {menu.map(({ to, label, Icon, end }) => (
          <NavLink
            to={to}
            key={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
