import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function StudentDashboard() {
  const complaints = [
    {
      id: 1,
      title: "WiFi Not Working",
      status: "Pending",
    },
    {
      id: 2,
      title: "Broken Fan",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Water Supply Issue",
      status: "Resolved",
    },
  ];

  return (
    <div
      className="min-vh-100 p-4 position-relative"
      style={{
        background:
          "linear-gradient(135deg,#dbeafe,#ede9fe,#cffafe)",
        overflow: "hidden",
      }}
    >
      {/* Floating Background Blobs */}
      <div
        style={{
          position: "fixed",
          top: "80px",
          left: "80px",
          width: "300px",
          height: "300px",
          background: "#60a5fa",
          filter: "blur(140px)",
          opacity: 0.25,
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "fixed",
          bottom: "80px",
          right: "80px",
          width: "300px",
          height: "300px",
          background: "#a78bfa",
          filter: "blur(140px)",
          opacity: 0.25,
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <div
        className="container-fluid position-relative"
        style={{ zIndex: 2 }}
      >
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">
            Student Dashboard
          </h2>

          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center px-3 py-2 rounded-pill shadow-sm"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(15px)",
              }}
            >
              <FaSearch className="me-2 text-secondary" />

              <input
                type="text"
                placeholder="Search complaints..."
                className="border-0 bg-transparent"
                style={{ outline: "none" }}
              />
            </div>

            <FaUserCircle
              size={42}
              className="text-primary"
            />
          </div>
        </div>

        {/* Welcome */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">
            Welcome Back 👋
          </h1>

          <p className="text-muted fs-5">
            Track and manage your complaints easily.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">

          {/* Total */}
          <div className="col-md-4">
            <div
              className="p-5 rounded-4 shadow-lg h-100"
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",
                color: "white",
                minHeight: "220px",
              }}
            >
              <FaClipboardList
                size={40}
                className="mb-3"
              />

              <h5>Total Complaints</h5>

              <h1 className="fw-bold display-4">
                12
              </h1>
            </div>
          </div>

          {/* Pending */}
          <div className="col-md-4">
            <div
              className="p-5 rounded-4 shadow-lg h-100"
              style={{
                background:
                  "linear-gradient(135deg,#f59e0b,#fbbf24)",
                color: "white",
                minHeight: "220px",
              }}
            >
              <FaClock
                size={40}
                className="mb-3"
              />

              <h5>Pending</h5>

              <h1 className="fw-bold display-4">
                5
              </h1>
            </div>
          </div>

          {/* Resolved */}
          <div className="col-md-4">
            <div
              className="p-5 rounded-4 shadow-lg h-100"
              style={{
                background:
                  "linear-gradient(135deg,#10b981,#34d399)",
                color: "white",
                minHeight: "220px",
              }}
            >
              <FaCheckCircle
                size={40}
                className="mb-3"
              />

              <h5>Resolved</h5>

              <h1 className="fw-bold display-4">
                7
              </h1>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="text-center mb-5">
          <Link
            to="/student/complaint"
            className="btn btn-primary btn-lg rounded-pill px-4 me-3 shadow"
          >
            Submit Complaint
          </Link>

          <Link
            to="/student/complaints"
            className="btn btn-outline-primary btn-lg rounded-pill px-4"
          >
            My Complaints
          </Link>
        </div>

        {/* Recent Complaints */}
        <div
          className="rounded-4 shadow-lg p-4"
          style={{
            background: "rgba(255,255,255,0.4)",
            backdropFilter: "blur(20px)",
            border:
              "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <h4 className="fw-bold mb-4">
            Recent Complaints
          </h4>

          <div className="table-responsive">
            <table className="table align-middle">

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>{complaint.title}</td>

                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          complaint.status === "Resolved"
                            ? "bg-success"
                            : complaint.status ===
                              "In Progress"
                            ? "bg-primary"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </td>

                    <td>
                      <Link
                        to={`/student/complaint/${complaint.id}`}
                        className="btn btn-sm btn-primary rounded-pill"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;