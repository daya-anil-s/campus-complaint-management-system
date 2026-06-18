import { Link } from "react-router-dom";

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
    <div className="container mt-4">

      <div className="text-center mb-4">
        <h1>Welcome Back 👋</h1>
        <p className="text-muted">
          Track and manage your complaints easily.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h5>Total Complaints</h5>
              <h2 className="text-primary">12</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h5>Pending</h5>
              <h2 className="text-warning">5</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h5>Resolved</h5>
              <h2 className="text-success">7</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="text-center mt-5">
       <Link
  to="/student/complaint"
  className="btn btn-primary me-3"
>
  Submit Complaint
</Link>

       <Link
  to="/student/complaints"
  className="btn btn-outline-primary"
>
  My Complaints
</Link>
      </div>

      <div className="card shadow border-0 mt-5">
        <div className="card-header bg-primary text-white">
          Recent Complaints
        </div>

        <div className="card-body">
          <table className="table table-hover">
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
                      className={`badge ${
                        complaint.status === "Resolved"
                          ? "bg-success"
                          : complaint.status === "In Progress"
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
  className="btn btn-sm btn-primary"
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
  );
}

export default StudentDashboard;