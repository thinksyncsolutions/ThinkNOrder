import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useSelector } from "react-redux";

const RoleLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar role={user.role} user={user} />
      
      <main className="mx-auto max-w-full">
        {/* This adds a subtle fade-in effect to all sub-pages */}
        <div className="animate-in fade-in duration-500 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RoleLayout;