import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles, children }) => {
  const { user, token, requiresBranchSelection } = useSelector(state => state.auth);

  // 🔒 Not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // 🏢 Branch required but not selected
  if (requiresBranchSelection) {
    return <Navigate to="/select-branch" replace />;
  }

  // 🚫 Logged in but wrong role
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
