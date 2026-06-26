import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

function ProtectedRoute({ allowedRole }) {
  const location = useLocation();
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRole && user.role !== allowedRole) {
    const dashboard = user.role === "admin" ? "/admin/dashboard" : "/student/dashboard";
    return <Navigate to={dashboard} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
