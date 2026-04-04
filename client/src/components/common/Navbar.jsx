import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogOut, Building2, UtensilsCrossed, AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout, clearBranch } from "../../redux/features/auth/auth.slice";
import { NavbarConfig } from "./NavbarConfig";

const Navbar = ({ role, user }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Modal state
  const dispatch = useDispatch();
  const links = NavbarConfig[role] || [];


  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutConfirm(false);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-orange-900/20 bg-orange-950 text-white shadow-xl">
        <div className="mx-auto flex h-20 max-w-full items-center justify-between px-6">
          
          {/* Logo Section */}
<div className="flex items-center gap-3">
  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600 shadow-lg shadow-orange-600/30 ring-2 ring-orange-500/20">
    <UtensilsCrossed size={24} className="text-white" />
  </div>
  <div className="flex flex-col leading-none">
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-black tracking-tight uppercase">
        Think<span className="text-orange-500">N</span>Order
      </span>
    </div>
    {/* This dynamic line shows the actual Restaurant Name */}
    <span className="text-[11px] uppercase tracking-wider text-orange-400 font-black mt-1 bg-orange-900/30 px-2 py-0.5 rounded">
      {user?.restaurantName || "By ThinkSync"}
    </span>
  </div>
</div>
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full
                  ${isActive 
                    ? "bg-orange-600 text-white shadow-md" 
                    : "text-orange-100 hover:bg-orange-900 hover:text-white"}
                `}
              >
                <link.icon size={18} />
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Area */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => dispatch(clearBranch())}
              className="group flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-orange-400 hover:text-orange-100 transition-colors"
            >
              <Building2 size={16} className="group-hover:scale-110 transition-transform" />
              {user?.branchName || "Select Branch"}
            </button>

            <div className="h-6 w-[1px] bg-orange-900" />

            {/* Logout Trigger */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 rounded-xl bg-black border border-orange-600/30 px-5 py-2.5 text-sm font-black text-white transition-all hover:bg-orange-600 hover:border-orange-600 active:scale-95"
            >
              <LogOut size={16} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="rounded-lg p-2 md:hidden bg-orange-900/50 hover:bg-orange-800 transition-colors" 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-20 left-0 w-full bg-orange-950 border-b border-orange-800 p-6 md:hidden shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="space-y-3">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-4 p-4 rounded-xl text-base font-bold transition-colors
                    ${isActive ? "bg-orange-600 text-white" : "text-orange-100 bg-orange-900/40 hover:bg-orange-900"}
                  `}
                >
                  <link.icon size={20} />
                  {link.label}
                </NavLink>
              ))}
            </div>
            
            <div className="mt-6 flex flex-col gap-3 border-t border-orange-900 pt-6">
               <button 
                 onClick={() => { dispatch(clearBranch()); setMobileOpen(false); }} 
                 className="flex items-center gap-4 p-4 text-orange-400 font-bold uppercase tracking-wider text-sm hover:text-orange-200 transition-colors"
               >
                 <Building2 size={20} /> {user?.branchName || "Select Branch"}
               </button>
               <button 
                 onClick={() => setShowLogoutConfirm(true)} 
                 className="flex items-center gap-4 p-4 text-white font-black bg-black border border-orange-600 rounded-xl hover:bg-orange-600 transition-all"
               >
                 <LogOut size={20} /> LOGOUT
               </button>
            </div>
          </div>
        )}
      </header>

      {/* --- CUSTOM LOGOUT MODAL --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowLogoutConfirm(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-orange-500/30 bg-orange-950 p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                <AlertCircle size={40} />
              </div>
              
              <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-white">
                Leaving so soon?
              </h3>
              <p className="mb-8 text-sm font-medium text-orange-200/60">
                Are you sure you want to log out of the Restaurant OS?
              </p>
              
              <div className="flex w-full flex-col gap-3">
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-orange-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-500 active:scale-[0.98]"
                >
                  Yes, Log Me Out
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full rounded-xl bg-orange-900/40 py-4 text-sm font-bold uppercase tracking-widest text-orange-200 transition-all hover:bg-orange-900 active:scale-[0.98]"
                >
                  Stay Logged In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;