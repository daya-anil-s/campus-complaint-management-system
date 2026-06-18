import { Link } from "react-router-dom";

function AdminDashboard() {
  const complaints = [
    {
      id: 1,
      title: "WiFi Not Working",
      student: "Vismaya",
      status: "Pending",
    },
    {
      id: 2,
      title: "Broken Fan",
      student: "Rahul",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Water Supply Issue",
      student: "Anu",
      status: "Resolved",
    },
  ];

  return (
    <div className="container mt-4">

      <div className="text-center mb-4">
        <h1>Admin Dashboard</h1>
        <p className="text-muted">
          Manage and monitor all complaints.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h5>Total Complaints</h5>
              <h2 className="text-primary">25</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h5>Pending</h5>
              <h2 className="text-warning">8</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h5>In Progress</h5>
              <h2 className="text-info">10</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
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
          to="/admin/complaints"
          className="btn btn-primary"
        >
          View All Complaints
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
                <th>Student</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id}>

                  <td>{complaint.title}</td>

                  <td>{complaint.student}</td>

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
                      to={`/admin/update/${complaint.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Update
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

export default AdminDashboard;