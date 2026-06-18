import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import ComplaintForm from "./pages/student/ComplaintForm";
import ComplaintList from "./pages/student/ComplaintList";
import ComplaintDetails from "./pages/student/ComplaintDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
  path="/dashboard"
  element={<StudentDashboard />}
/>
      <Route path="/complaint-form" element={<ComplaintForm />} />
      <Route path="/complaints" element={<ComplaintList />} />
      <Route path="/complaint-details" element={<ComplaintDetails />} />
    </Routes>
  );
}

export default App;