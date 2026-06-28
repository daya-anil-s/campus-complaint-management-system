import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ allowedRole }) {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (
    allowedRole &&
    user.role.toLowerCase() !== allowedRole.toLowerCase()
  ) {
    return (
      <Navigate
        to={
          user.role === "Admin"
            ? "/admin/dashboard"
            : "/student/dashboard"
        }
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;