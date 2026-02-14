import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles, children }) => {
  const { user, token, requiresBranchSelection } = useSelector(state => state.auth);

  // 🔒 Not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // 🚩 Requires branch selection
  if (requiresBranchSelection && window.location.pathname !== "/select-branch") {
    return <Navigate to="/select-branch" replace />;
  }

  // If branch is NOT needed but they try to go to select-branch, send them home
  if (!requiresBranchSelection && window.location.pathname === "/select-branch") {
    return <Navigate to="/" replace />;
  }

  // 🚫 Logged in but wrong role
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
