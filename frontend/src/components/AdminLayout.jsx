import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ChefHat,
  ClipboardList,
  BookOpen,
  SquareKanban,
  LogOut,
  UserCircle,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Navigation items
export const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Orders", path: "/orders", icon: ClipboardList },
  { title: "Kitchen View", path: "/kitchen", icon: ChefHat },
  { title: "Menu Management", path: "/menu", icon: BookOpen },
  { title: "Table Management", path: "/tables", icon: SquareKanban },
];

const DashboardHeader = ({ restaurantName, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

 const handleLogout = async () => {
  try {
    await axios.post(`${baseURL}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("admin");
    navigate("/login", { replace: true });
    // window.location.reload(); // Optional but ensures fresh state
  }
};

  // Determine the current tab
  let currentTab = "Dashboard";
  const matchedItem = navItems.find((item) => item.path === location.pathname);
  if (matchedItem) {
    currentTab = matchedItem.title;
  } else if (location.pathname.startsWith("/table/")) {
    currentTab = "Table Management";
  } else {
    const startMatch = navItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    if (startMatch) currentTab = startMatch.title;
  }

  return (
    <header className="bg-blue-600 m-2 shadow-sm p-4 sm:p-6 rounded-xl">
      <div className="flex items-center justify-between">
        {/* Branding and Restaurant Name */}
        <div>
          <Link
            to="/dashboard"
            className="text-3xl font-bold text-white flex items-center gap-2"
          >
            <LayoutDashboard className="text-blue-600" />
            <span>Think&Order</span>
          </Link>
          {loading ? (
            <div className="h-5 w-48 bg-slate-200 rounded animate-pulse mt-2"></div>
          ) : (
            <p className="text-md text-slate-200 pl-8">
              {restaurantName || "Your Restaurant"}
            </p>
          )}
        </div>

        {/* User Menu and Navigation */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg bg-slate-50 hover:bg-slate-100"
          >
            <UserCircle size={24} />
            <span className="hidden sm:inline font-medium">{currentTab}</span>
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-10 border"
              onMouseLeave={() => setMenuOpen(false)}
            >
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100"
                >
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </Link>
              ))}
              <div className="border-t my-2"></div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const AdminLayout = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin.restaurantName) {
      setRestaurantName(admin.restaurantName);
    }
    setTimeout(() => setLoading(false), 300);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header: 15vh */}
      <div className="h-[15vh] z-50">
        <DashboardHeader restaurantName={restaurantName} loading={loading} />
      </div>

      {/* Outlet/Content: 85vh */}
      <main className="h-[85vh] overflow-auto">
        <div className="max-w-8xl mx-auto p-2 sm:p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
