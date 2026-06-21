import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import StudentDashboard from "../pages/student/StudentDashboard";
import ComplaintForm from "../pages/student/ComplaintForm";
import ComplaintList from "../pages/student/ComplaintList";
import ComplaintDetails from "../pages/student/ComplaintDetails";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminComplaintList from "../pages/admin/AdminComplaintList";
import UpdateComplaint from "../pages/admin/UpdateComplaint";

import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute allowedRole="student" />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/complaint" element={<ComplaintForm />} />
        <Route path="/student/complaints" element={<ComplaintList />} />
        <Route path="/student/complaint/:id" element={<ComplaintDetails />} />
      </Route>

      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaintList />} />
        <Route path="/admin/update/:id" element={<UpdateComplaint />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
