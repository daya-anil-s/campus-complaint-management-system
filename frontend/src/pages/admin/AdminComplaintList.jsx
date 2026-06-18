import { Link } from "react-router-dom";

function AdminComplaintList() {
  const complaints = [
    {
      id: 1,
      title: "WiFi Not Working",
      student: "Vismaya",
      category: "Internet/Wi-Fi",
      status: "Pending",
      date: "17-06-2026",
    },
    {
      id: 2,
      title: "Broken Fan",
      student: "Rahul",
      category: "Classroom",
      status: "In Progress",
      date: "15-06-2026",
    },
    {
      id: 3,
      title: "Water Supply Issue",
      student: "Anu",
      category: "Hostel",
      status: "Resolved",
      date: "12-06-2026",
    },
  ];

  return (
    <div className="container mt-5">

      <Link
        to="/admin/dashboard"
        className="btn btn-secondary mb-3"
      >
        ← Back to Dashboard
      </Link>

      <div className="card shadow border-0">

        <div className="card-header bg-primary text-white">
          <h3 className="mb-0 text-center">
            All Complaints
          </h3>
        </div>

        <div className="card-body">

          <table className="table table-hover">

            <thead>
              <tr>
                <th>Title</th>
                <th>Student</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id}>

                  <td>{complaint.title}</td>
                  <td>{complaint.student}</td>
                  <td>{complaint.category}</td>

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

                  <td>{complaint.date}</td>

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

export default AdminComplaintList;