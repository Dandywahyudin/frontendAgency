import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart3, Package, Settings, LogOut, Menu } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menu = [
    { to: "/dashboard", label: "Overview", Icon: LayoutDashboard },
    { to: "/dashboard/packages", label: "Packages", Icon: Package },
    { to: "/dashboard/analytics", label: "Analytics", Icon: BarChart3 },
    { to: "/dashboard/settings", label: "Settings", Icon: Settings },
  ];

  return (
    <aside className={`bg-white border-r shadow-md transition-all ${sidebarOpen ? "w-64" : "w-16"} hidden md:block`}>
      <div className="flex items-center justify-between p-4 border-b">
        {sidebarOpen ? <span className="font-bold text-lg">Admin</span> : <span className="font-bold">A</span>}
        <button onClick={() => setSidebarOpen(s => !s)} className="p-1 rounded hover:bg-gray-100">
          <Menu className="w-5 h-5"/>
        </button>
      </div>

      <nav className="p-2 space-y-1">
        {menu.map(({to, label, Icon}) => (
          <NavLink
            to={to}
            key={to}
            className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
          >
            <Icon className="w-5 h-5" />
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50">
          <LogOut className="w-4 h-4" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
