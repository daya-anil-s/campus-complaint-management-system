import { useState } from "react";
import { Link } from "react-router-dom";

function UpdateComplaint() {
  const [status, setStatus] = useState("Pending");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Complaint Updated!\nStatus: ${status}\nRemarks: ${remarks}`
    );
  };

  return (
    <div className="container mt-5">

      <Link
        to="/admin/complaints"
        className="btn btn-secondary mb-3"
      >
        ← Back to Complaints
      </Link>

      <div className="card shadow border-0">

        <div className="card-header bg-primary text-white">
          <h3 className="mb-0 text-center">
            Update Complaint
          </h3>
        </div>

        <div className="card-body">

          <div className="mb-3">
            <h5>Complaint Title</h5>
            <p>WiFi Not Working</p>
          </div>

          <div className="mb-3">
            <h5>Student</h5>
            <p>Vismaya</p>
          </div>

          <div className="mb-3">
            <h5>Category</h5>
            <p>Internet/Wi-Fi</p>
          </div>

          <div className="mb-3">
            <h5>Description</h5>
            <p>
              Internet connection is unavailable on the
              second floor of the library.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Update Status
              </label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Remarks
              </label>

              <textarea
                rows="4"
                className="form-control"
                placeholder="Enter remarks..."
                value={remarks}
                onChange={(e) =>
                  setRemarks(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Save Update
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}

export default UpdateComplaint;