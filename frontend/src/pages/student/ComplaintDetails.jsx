import { Link, useNavigate } from "react-router-dom";

function ComplaintDetails() {
  const navigate = useNavigate();

  const complaint = {
    title: "WiFi Not Working",
    category: "Internet/Wi-Fi",
    location: "Library Block",
    date: "17 June 2026",
    status: "In Progress",
    description:
      "Internet connection is unavailable on the second floor of the library.",
  };

  return (
    <div className="container mt-5">

      <div className="card shadow border-0">

        <div className="card-header bg-primary text-white">
          <h3 className="mb-0 text-center">Complaint Details</h3>
        </div>

        <div className="card-body">

          <div className="mb-3">
            <h5>Title</h5>
            <p>{complaint.title}</p>
          </div>

          <div className="mb-3">
            <h5>Category</h5>
            <p>{complaint.category}</p>
          </div>

          <div className="mb-3">
            <h5>Location</h5>
            <p>{complaint.location}</p>
          </div>

          <div className="mb-3">
            <h5>Date Submitted</h5>
            <p>{complaint.date}</p>
          </div>

          <div className="mb-3">
            <h5>Description</h5>
            <p>{complaint.description}</p>
          </div>

          <div className="mb-4">
            <h5>Status</h5>
            <span className="badge bg-primary fs-6">
              {complaint.status}
            </span>
          </div>

          <div className="mt-4">

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/student/complaints")}
            >
              ← Back to Complaints
            </button>

            <Link
              to="/student/dashboard"
              className="btn btn-outline-secondary ms-2"
            >
              Dashboard
            </Link>

          </div>

        </div>
      </div>

    </div>
  );
}

export default ComplaintDetails;