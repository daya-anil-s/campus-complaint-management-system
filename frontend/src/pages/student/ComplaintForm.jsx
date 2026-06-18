import { useState } from "react";
import { Link } from "react-router-dom";

function ComplaintForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Complaint Submitted!");
    console.log(formData);
  };

  return (
    <div className="container mt-5">

      <Link
        to="/student/dashboard"
        className="btn btn-secondary mb-3"
      >
        ← Back to Dashboard
      </Link>

      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Submit Complaint</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Complaint Title
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter complaint title"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Category
              </label>
              <select
                name="category"
                className="form-select"
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option>Classroom</option>
                <option>Laboratory</option>
                <option>Hostel</option>
                <option>Library</option>
                <option>Internet/Wi-Fi</option>
                <option>Electrical</option>
                <option>Water Supply</option>
                <option>Cleanliness</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Location
              </label>
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="Enter location"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Description
              </label>
              <textarea
                rows="5"
                name="description"
                className="form-control"
                placeholder="Describe the issue"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Submit Complaint
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;