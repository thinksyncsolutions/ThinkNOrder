import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles, children }) => {
  const { user, token } = useSelector(state => state.auth);

  // 🔒 Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 🚫 Logged in but wrong role
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
